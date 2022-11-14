const { flatten } = require('lodash');
const { Op } = require('sequelize');
const {
  Movie,
  Sentence,
  Music
} = require('./classic');

class Art {
//   constructor (art_id, type) {
//     this.art_id = art_id,
//     this.type = type;
//   }

  static async getList (artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    };
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id);
    }
    let arts = [];
    for (let key in artInfoObj) {
      const ids = artInfoObj[key];
      if (ids.length === 0) {
        continue;
      }
      key = parseInt(key);
      arts.push(await Art._getListByType(ids, key));
    }
    return flatten(arts);
  }

  static async _getListByType (ids, type) {
    let arts = [];
    const finder = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    };
    switch (type) {
      case 100:
        arts = await Movie.findAll(finder);
        break;
      case 200:
        arts = await Music.findAll(finder);
        break;
      case 300:
        arts = await Sentence.findAll(finder);
        break;
      case 400:
        // arts = await Movie.findOne(finder)
        break;
      default:
        break;
    }
    // 这里执行in查询flow表，循环arts判断id相同
    arts = await Art._setIndex(type, arts);
    // setDataValue('index',flow.index)
    return arts;
  }
  static async _setIndex (type, arts) {
    const { Flow } = require('./flow.js');
    const flows = await Flow.findAll({
      where: {
        type
      }
    });
    let flowsObj = {};
    for (let flowInfo of flows) {
      flowsObj[flowInfo.art_id] = flowInfo.index;
    }

    for (let artInfo of arts) {
      if (flowsObj[artInfo.id]) {
        artInfo.setDataValue('index', flowsObj[artInfo.id]);
      }
    }

    return arts;
  }
  //   static async getData (art_id, type, useScope = true) {
  //     let art = null;
  //     const finder = {
  //       where: {
  //         id: art_id
  //       }
  //     };
  //     const scope = useScope ? 'bh' : null;
  //     switch (type) {
  //       case 100:
  //         art = await Movie.findOne(finder);
  //         break;
  //       case 200:
  //         art = await Music.findOne(finder);
  //         break;
  //       case 300:
  //         art = await Sentence.findOne(finder);
  //         break;
  //       case 400:
  //         const { Book } = require('./book');
  //         art = await Book.scope(scope).findOne(finder);
  //         if (!art) {
  //           art = await Book.create({
  //             id: art_id
  //           });
  //         }
  //         break;
  //       default:
  //         break;
  //     }

//     return art;
//   }
}

module.exports = {
  Art
};