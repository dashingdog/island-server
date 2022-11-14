import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Recording extends Model {

}

Recording.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    path: {
      type: Sequelize.STRING(512),
      allowNull: false
    }
  },
  merge(
    {
      sequelize,
      tableName: 'recording',
      modelName: 'recording'
    },
    InfoCrudMixin.options
  )
);

export { Recording };
