const Prompt = require("../models/Prompt");
const UserActivity = require("../models/UserActivity");
const { PROMPT_STATUS } = require("../constants/prompt");
const { attachFavoriteState } = require("./favoriteService");

const ACTIVITY_WEIGHTS = {
  view: 1,
  create: 2,
  review: 3,
  favorite: 5,
};

async function getRecommendedPrompts(user, limit = 10) {
  if (!user) {
    const prompts = await Prompt.find({ status: PROMPT_STATUS.PUBLISHED })
      .sort({ rankingScore: -1, createdAt: -1 })
      .limit(limit)
      .populate("author", "name avatarUrl")
      .lean();

    return attachFavoriteState(prompts, null);
  }

  const activities = await UserActivity.find({ user: user._id })
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  const tagWeights = new Map();

  for (const tag of user.favoriteTags || []) {
    tagWeights.set(tag, (tagWeights.get(tag) || 0) + 4);
  }

  for (const activity of activities) {
    const weight = ACTIVITY_WEIGHTS[activity.type] || 1;

    for (const tag of activity.tagsSnapshot || []) {
      tagWeights.set(tag, (tagWeights.get(tag) || 0) + weight);
    }
  }

  const preferredTags = [...tagWeights.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  const query = {
    status: PROMPT_STATUS.PUBLISHED,
  };

  if (preferredTags.length) {
    query.tags = { $in: preferredTags };
  }

  const prompts = await Prompt.find(query)
    .sort({ rankingScore: -1, reviewCount: -1, createdAt: -1 })
    .limit(limit)
    .populate("author", "name avatarUrl")
    .lean();

  return attachFavoriteState(prompts, user._id);
}

module.exports = {
  getRecommendedPrompts,
};
