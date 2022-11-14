import { ClassicDao } from '../../dao/classic';
import { LinRouter, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';

import { getSafeParamId, getSafeParamType } from '../../lib/util';
import { PositiveIdValidator } from '../../validator/common';
const {
  CreateOrUpdateClassicValidator
} = require('../../validator/classic');
const classicApi = new LinRouter({
  prefix: '/v1/classic',
  module: '期刊'
});
const classicDao = new ClassicDao();
classicApi.get('/getList/:type', async ctx => {
  const type = getSafeParamType(ctx);
  ctx.body = await classicDao.getList(type);
});

classicApi.get('/getDetail/:type/:id', async ctx => {
  const id = getSafeParamId(ctx);
  const type = getSafeParamType(ctx);
  ctx.body = await classicDao.getDetail(type, id);
});

classicApi.get('/getFlowList', async ctx => {
  let flows = await classicDao.getFlowList();
  let newFlows = flows.sort((a, b) => {
    return b.getDataValue('index') - a.getDataValue('index');
  });
  ctx.body = newFlows;
});

classicApi.post('/addFlow/:type/:id', async ctx => {
  const id = getSafeParamId(ctx);
  const type = getSafeParamType(ctx);
  await classicDao.addFlow(type, id);
  ctx.success({
    msg: '添加成功'
  });
});

classicApi.put('/update/:type/:id', async ctx => {
  const v = await new CreateOrUpdateClassicValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  const type = getSafeParamType(ctx);
  await classicDao.updateClassic(type, id, v);
  ctx.success({
    msg: '更新图书成功'
  });
});

classicApi.post('/create/:type', async ctx => {
  const v = await new CreateOrUpdateClassicValidator().validate(ctx);
  const type = getSafeParamType(ctx);
  await classicDao.createClassic(v, parseInt(type));
  ctx.success({
    msg: '添加成功'
  });
});

classicApi.delete('/removeFlow/:type/:id', async ctx => {
  const id = getSafeParamId(ctx);
  const type = getSafeParamType(ctx);
  await classicDao.removeFlow(type, id);
  ctx.success({
    msg: '成功移除'
  });
});

classicApi.linDelete(
  'deleteClass',
  '/delete/:type/:id',
  classicApi.permission('删除期刊'),
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = getSafeParamId(ctx);
    const type = getSafeParamType(ctx);
    await classicDao.delete(type, id);
    ctx.success({
      msg: '删除期刊成功'
    });
  }
);

module.exports = { classicApi, [disableLoading]: false };