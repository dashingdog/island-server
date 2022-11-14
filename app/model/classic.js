const { Sequelize, Model } = require('sequelize');
const { InfoCrudMixin } = require('lin-mizar/lin/interface');
const { merge } = require('lodash');
const { db } = require('lin-mizar/lin/db');

const classicFields = {
  image: {
    type: Sequelize.STRING
  },
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
};

class Movie extends Model {

}

Movie.init(classicFields, merge(
  InfoCrudMixin.options,
  {
    sequelize: db,
    tableName: 'movie',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: false
  }
));

class Sentence extends Model {

}

Sentence.init(classicFields, merge(
  InfoCrudMixin.options,
  {
    sequelize: db,
    tableName: 'sentence',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: false
  }
));

class Music extends Model {

}

const musicFields = Object.assign({
  url: Sequelize.STRING
}, classicFields);

Music.init(musicFields,
  merge(
    InfoCrudMixin.options,
    {
      sequelize: db,
      tableName: 'music',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: false
    }
  ));

module.exports = {
  Movie,
  Sentence,
  Music
};