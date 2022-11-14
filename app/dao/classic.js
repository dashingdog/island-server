const {
  Music,
  Sentence,
  Movie
} = require('../models/classic');
const { Sequelize } = require('sequelize');
const {
  Flow
} = require('../models/flow');
const {
  Art
} = require('../models/art');
const { NotFound, Forbidden } = require('lin-mizar');
class ClassicDao {
  async getFlowList () {
    const flows = await Flow.findAll();
    const list = await Art.getList(flows);
    return list;
  }

  async addFlow (type, id) {
    await this.getDetail(type, id);
    const flow = await this._getFlow(type, id);
    if (flow) {
      throw new Forbidden({
        msg: '期刊已添加过'
      });
    }
    const indexMax = await Flow.max('index');
    const newFlow = await Flow.create({
      art_id: id,
      type,
      index: indexMax + 1
    });
    return newFlow;
  }

  async removeFlow (type, id) {
    const flow = await Flow.findOne({
      where: {
        type,
        art_id: id
      }
    });
    console.log(flow);
    if (flow) {
      console.log(flow);
      await flow.destroy();
    }
  }

  async _getFlow (type, id) {
    const flow = await Flow.findOne({
      where: {
        type,
        art_id: id
      }
    });
    return flow;
  }

  _getModel (type) {
    let mModel = null;
    switch (type) {
      case 100:
        mModel = Movie;
        break;
      case 200:
        mModel = Music;
        break;
      case 300:
        mModel = Sentence;
    }
    return mModel;
  }
  async getList (type) {
    let list = [];
    let mModel = this._getModel(type);
    list = mModel.findAll();
    return list;
  }
  async createClassic (v, type) {
    switch (type) {
      case 100:
        this._findOrCreate(Movie, v, type);
        break;
      case 200:
        this._findOrCreate(Music, v, type);
        break;
      case 300:
        this._findOrCreate(Sentence, v, type);
    }
  }

  async getDetail (type, id) {
    let classic = null;
    let mModel = this._getModel(type);
    classic = await mModel.findOne({
      where: {
        id
      }
    });
    if (!classic) {
      throw new NotFound({
        msg: '期刊不存在'
      });
    }
    return classic;
  }

  async updateClassic (type, id, v) {
    let mModel = this._getModel(type);
    const classic = await mModel.findByPk(id);
    if (!classic) {
      throw new NotFound({
        msg: '没有找到相关期刊'
      });
    }
    classic.title = v.get('body.title');
    classic.contnet = v.get('body.content');
    classic.image = v.get('body.image');
    classic.save();
  }

  async delete (type, id) {
    let classic = null;
    switch (type) {
      case 100:
        classic = await Movie.findOne({
          where: {
            id
          }
        });
        break;
      case 200:
        classic = await Music.findOne({
          where: {
            id
          }
        });
        break;
      case 300:
        classic = await Sentence.findOne({
          where: {
            id
          }
        });
    }
    if (!classic) {
      throw new NotFound({
        msg: '没有找到相关期刊'
      });
    }
    classic.destroy();
  }

  async _findOrCreate (MModel, v, type) {
    const classic = await MModel.findOne({
      where: {
        title: v.get('body.title'),
        deleted_at: null
      }
    });
    if (classic) {
      throw new Forbidden({
        msg: '期刊已存在'
      });
    }
    const bk = new MModel();
    bk.title = v.get('body.title');
    bk.content = v.get('body.content');
    bk.pubdate = '2019-12-18';
    bk.type = type;
    bk.image = v.get('body.image');
    if (type === 200) {
      bk.url = v.get('body.url');
    }
    bk.save();
  }
}
module.exports = { ClassicDao };