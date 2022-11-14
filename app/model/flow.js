const { Sequelize, Model } = require('sequelize');
const { InfoCrudMixin } = require('lin-mizar/lin/interface');
const { merge } = require('lodash');
const { db } = require('lin-mizar/lin/db');

class Flow extends Model {

}

Flow.init({
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
}, merge(
  InfoCrudMixin.options,
  {
    sequelize: db,
    tableName: 'flow',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: false
  }));

module.exports = {
  Flow
};