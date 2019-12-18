class KatasService {
  constructor(uuid) {
    this.uuid = uuid;
    const db = require('monk')(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URL}`,
    );
    this.profileDB = db.get('profile');
    this.reviewsDB = db.get('reviews');
    this.score = {
      '1': 300,
      '2': 200,
      '3': 150,
      '4': 100,
      '5': 50,
      '6': 25,
      '7': 10,
    };

    this.gold = {
      '1': 50,
      '2': 33,
      '3': 25,
      '4': 20,
      '5': 10,
      '6': 8,
      '7': 5,
    };
  }

  async updateProfile(id, answer, code, username, title, level) {
    let profile = await this.profileDB.findOne({
      username,
      [`${level}Kyu.id`]: id,
    });
    if (profile !== null) {
      await this.profileDB.findOneAndUpdate(
        {
          username,
          [`${level}Kyu.id`]: id,
        },
        {
          $set: {
            [`${level}Kyu.$.code`]: code,
            [`${level}Kyu.$.refactorDate`]: new Date().getTime(),
          },
        },
      );
    }
    if (profile === null) {
      await this.profileDB.findOneAndUpdate(
        { username },
        {
          $push: {
            [`${level}Kyu`]: {
              id,
              title,
              answer,
              code,
              date: new Date().getTime(),
              refactorDate: 0,
            },
          },
          $inc: {
            score: this.score[`${level}`],
            gold: this.gold[`${level}`],
          },
        },
      );
    }
  }

  async updateReviews(id, answer, code, username, title) {
    let review = await this.reviewsDB.findOne({
      username,
      id,
    });
    if (review === null) {
      await this.reviewsDB.insert({
        id: this.uuid.v4(),
        username,
        kataId: id,
        title,
        answer,
        code,
        date: new Date().getTime(),
        checked: false,
      });
    }
    if (review !== null) {
      await this.reviewsDB.findOneAndUpdate(
        { username, id },
        {
          $set: {
            refactorCode: code,
            date: new Date().getTime(),
            checked: false,
          },
        },
      );
    }
  }
}

module.exports = KatasService;
