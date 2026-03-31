const mongoose = require("mongoose");
const User = require("../models/User");
const Prompt = require("../models/Prompt");
const ApiError = require("../utils/ApiError");
const { PROMPT_STATUS } = require("../constants/prompt");
const { getPagination, buildPaginationMeta } = require("../utils/pagination");

async function getUserById(userId) {
  const user = await User.findById(userId).select(
    "_id name role bio avatarUrl favoriteTags createdAt updatedAt"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
}

async function updateCurrentUser(userId, payload) {
  const user = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  }).select("_id name email role bio avatarUrl favoriteTags createdAt updatedAt");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
}

async function getCreatorProfile(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid creator id");
  }

  const [creator] = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "prompts",
        localField: "_id",
        foreignField: "author",
        as: "prompts",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        bio: 1,
        avatarUrl: 1,
        favoriteTags: 1,
        stats: {
          activePrompts: {
            $size: {
              $filter: {
                input: "$prompts",
                as: "prompt",
                cond: { $eq: ["$$prompt.status", PROMPT_STATUS.PUBLISHED] },
              },
            },
          },
          totalViews: { $sum: "$prompts.views" },
          averageRating: { $avg: "$prompts.ratingAverage" },
        },
      },
    },
  ]);

  if (!creator) {
    throw new ApiError(404, "Creator not found");
  }

  return creator;
}

async function listCreators(query = {}) {
  const { page, limit, skip } = getPagination(query);
  const search = query.search?.trim();
  const pipeline = [
    {
      $lookup: {
        from: "prompts",
        localField: "_id",
        foreignField: "author",
        as: "prompts",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        bio: 1,
        avatarUrl: 1,
        favoriteTags: 1,
        activePrompts: {
          $size: {
            $filter: {
              input: "$prompts",
              as: "prompt",
              cond: { $eq: ["$$prompt.status", PROMPT_STATUS.PUBLISHED] },
            },
          },
        },
        averageRating: { $avg: "$prompts.ratingAverage" },
        totalViews: { $sum: "$prompts.views" },
      },
    },
    { $match: { activePrompts: { $gt: 0 } } },
  ];

  if (search) {
    pipeline.push({
      $match: {
        name: {
          $regex: search,
          $options: "i",
        },
      },
    });
  }

  pipeline.push(
    { $sort: { totalViews: -1, averageRating: -1, activePrompts: -1 } },
    {
      $facet: {
        items: [{ $skip: skip }, { $limit: limit }],
        meta: [{ $count: "total" }],
      },
    }
  );

  const [result] = await User.aggregate(pipeline);
  const items = result?.items || [];
  const total = result?.meta?.[0]?.total || 0;

  return {
    items,
    meta: buildPaginationMeta({ total, page, limit }),
  };
}

async function getCreatorPrompts(userId, { limit = 12, skip = 0 }) {
  const [items, total] = await Promise.all([
    Prompt.find({
      author: userId,
      status: PROMPT_STATUS.PUBLISHED,
    })
      .sort({ rankingScore: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name avatarUrl")
      .lean(),
    Prompt.countDocuments({
      author: userId,
      status: PROMPT_STATUS.PUBLISHED,
    }),
  ]);

  return {
    items,
    total,
  };
}

module.exports = {
  getUserById,
  updateCurrentUser,
  getCreatorProfile,
  listCreators,
  getCreatorPrompts,
};
