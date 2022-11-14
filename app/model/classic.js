import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';
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
    sequelize,
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
    sequelize,
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
      sequelize,
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