const Prompt = require("../models/Prompt");
const env = require("../config/env");
const logger = require("../config/logger");
const ApiError = require("../utils/ApiError");
const { EVALUATION_STATUS } = require("../constants/prompt");
const { recalculatePromptRanking } = require("./rankingService");
const { evaluatePromptHeuristically } = require("../utils/heuristicEvaluation");

function buildEvaluationPrompt(prompt) {
  return [
    "You are evaluating an AI prompt marketplace submission.",
    "Score the prompt from 0 to 100 for clarity, creativity, relevance.",
    "Return strict JSON with keys clarity, creativity, relevance, overall, summary.",
    `Title: ${prompt.title}`,
    `Description: ${prompt.description}`,
    `Category: ${prompt.category}`,
    `Tags: ${prompt.tags.join(", ")}`,
    `Prompt Content: ${prompt.content}`,
  ].join("\n");
}

async function requestOpenAiEvaluation(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    signal: AbortSignal.timeout(env.openAiTimeoutMs),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.openAiApiKey}`,
    },
    body: JSON.stringify({
      model: env.openAiModel,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a strict evaluator for prompt quality. Output valid JSON only.",
        },
        {
          role: "user",
          content: buildEvaluationPrompt(prompt),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorPayload = await response.text();
    throw new ApiError(502, "OpenAI evaluation request failed", errorPayload);
  }

  const payload = await response.json();
  const rawContent = payload.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new ApiError(502, "OpenAI evaluation response was empty");
  }

  return JSON.parse(rawContent);
}

function normalizeEvaluation(evaluation, source) {
  const clarity = Number(evaluation.clarity || 0);
  const creativity = Number(evaluation.creativity || 0);
  const relevance = Number(evaluation.relevance || 0);
  const overall =
    Number(evaluation.overall || 0) ||
    Number((clarity * 0.4 + creativity * 0.25 + relevance * 0.35).toFixed(2));

  return {
    aiScore: {
      clarity,
      creativity,
      relevance,
      overall,
    },
    evaluationSummary: String(evaluation.summary || ""),
    evaluationSource: source,
  };
}

async function getEvaluationResult(prompt) {
  if (!env.openAiApiKey) {
    return normalizeEvaluation(evaluatePromptHeuristically(prompt), "heuristic");
  }

  try {
    const evaluation = await requestOpenAiEvaluation(prompt);
    return normalizeEvaluation(evaluation, "openai");
  } catch (error) {
    logger.warn("OpenAI evaluation failed, falling back to heuristic scoring", {
      promptId: prompt._id?.toString(),
      error: error.message,
    });

    return normalizeEvaluation(evaluatePromptHeuristically(prompt), "heuristic");
  }
}

async function evaluatePrompt(promptId) {
  const prompt = await Prompt.findById(promptId);

  if (!prompt) {
    throw new ApiError(404, "Prompt not found");
  }

  try {
    const evaluation = await getEvaluationResult(prompt);

    prompt.aiScore = evaluation.aiScore;
    prompt.evaluationSummary = evaluation.evaluationSummary;
    prompt.evaluationStatus = EVALUATION_STATUS.COMPLETED;
    prompt.evaluationSource = evaluation.evaluationSource;
    await prompt.save();
    await recalculatePromptRanking(prompt._id);

    return prompt;
  } catch (error) {
    prompt.evaluationStatus = EVALUATION_STATUS.FAILED;
    prompt.evaluationSummary =
      error instanceof Error ? error.message : "Evaluation failed";
    prompt.evaluationSource = "failed";
    await prompt.save();

    logger.error("Prompt evaluation failed", {
      promptId,
      error: error.message,
    });

    throw error;
  }
}

module.exports = {
  evaluatePrompt,
};
