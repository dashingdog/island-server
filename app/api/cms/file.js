import { LinRouter, ParametersException } from 'lin-mizar';

import { loginRequired } from '../../middleware/jwt';
import { LocalUploader } from '../../extension/file/local-uploader';
import { CorsUploader } from '../../extension/file/cors-uploader';

const file = new LinRouter({
  prefix: '/cms/file'
});

file.linPost('upload', '/', loginRequired, async ctx => {
  const files = await ctx.multipart();
  if (files.length < 1) {
    throw new ParametersException({ code: 10033 });
  }
  const uploader = new LocalUploader('assets');
  const arr = await uploader.upload(files);
  ctx.json(arr);
});

file.linPost('upload', '/cors', {},
  async ctx => {
    const files = await ctx.multipart();
    if (files.length < 1) {
      throw new ParametersException({ message: '未找到符合条件的文件资源' });
    }
    // await wxManager.checkImages(files);
    const uploader = new CorsUploader('app/assets');
    const arr = await uploader.upload(files);
    ctx.json(arr);
  });

export { file };
