const MongoLib = require("../lib/mongo");

class BadgesServices {
  constructor() {
    this.collection = "badges";
    this.mongoDB = new MongoLib();
  }

  async getBadges({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const badges = await this.mongoDB.getAll(this.collection, query);
    return badges || [];
  }

  async getBadge({ badgeId }) {
    const badge = await this.mongoDB.get(this.collection, badgeId);
    return badge || [];
  }

  async createBadge({ badge }) {
    const createBadgeId = await this.mongoDB.create(this.collection, badge);
    return createBadgeId || {};
  }

  async updateBadge({ badgeId, badge }) {
    const updateBadge = await this.mongoDB.updated(
      this.collection,
      badgeId,
      badge
    );
  }

  async deletedBadge({ badgeId }) {
    const deletedBadgeId = await this.mongoDB.delete(this.collection, badgeId);
    return deletedBadgeId || badgeId;
  }
}

module.exports = BadgesServices;
