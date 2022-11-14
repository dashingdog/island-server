import { Model, Sequelize } from 'sequelize';
import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import sequelize from '../lib/db';

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
    sequelize,
    tableName: 'flow',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: false
  }));

exports = {
  Flow
};