import { LinRouter, disableLoading } from 'lin-mizar';

import { CreateRecording } from '../../validator/recording';
import { Recording } from '../../model/recording';
const recordingApi = new LinRouter({
  prefix: '/v1/recording',
  module: '录音'
});
recordingApi.get('/getList/:type', async ctx => {

});

recordingApi.post('/create', async ctx => {
  const v = await new CreateRecording().validate(ctx);
  const r = new Recording();
  r.name = v.get('body.name');
  r.path = v.get('body.path');
  await r.save();
  ctx.success();
});

module.exports = { recordingApi, [disableLoading]: false };