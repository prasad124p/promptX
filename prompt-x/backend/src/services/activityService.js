const UserActivity = require("../models/UserActivity");

async function trackActivity({ userId, promptId, type, tagsSnapshot = [] }) {
  if (!userId || !promptId || !type) {
    return null;
  }

  return UserActivity.create({
    user: userId,
    prompt: promptId,
    type,
    tagsSnapshot,
  });
}

module.exports = {
  trackActivity,
};
