import { Uploader } from 'lin-mizar';
import { FileModel } from '../../model/file';
import path from 'path';
// import fs from 'fs';
// const { Failed } = require('lin-mizar');
import COS from 'cos-nodejs-sdk-v5';
class CorsUploader extends Uploader {
  constructor () {
    super();
    // this.cos = new COS({
    //   SecretId: 'AKIDOdhaGpQSVcaVFooT3RjrvoWr22Umcask',
    //   SecretKey: 'qVvHrHbnplXXNBoHNK6EF6ushMq9HIBw'
    // });
    // this.Bucket = 'dashingdog-1256515399';
    // this.Region = 'ap-nanjing';
    this.cos = new COS({
      SecretId: 'AKIDRgfOq1vYuzmKbaIjtmNhkW1FDtIQGq9B',
      SecretKey: 'l9LHyQdaLq66qKZYHkywe6MOAgy1oLcf'
    });
    this.Bucket = 'dahingdog-1306260763';
    this.Region = 'ap-guangzhou';
  }

  async upload (files) {
    const arr = [];
    for (const file of files) {
      // 由于stream的特性，当读取其中的数据时，它的buffer会被消费
      // 所以此处深拷贝一份计算md5值
      const md5 = this.generateMd5(file);
      //   const siteDomain = config.getItem('siteDomain', 'http://localhost');
      // 检查md5存在
      const exist = await FileModel.findOne({
        where: {
          md5: md5
        }
      });
      if (exist) {
        arr.push({
          id: exist.id,
          key: file.fieldName,
          path: exist.path,
          url: exist.path,
          type: exist.type,
          name: exist.name,
          extension: exist.extension,
          size: exist.size
        });
      } else {
        const { realName } = this.getStorePath(
          file.filename
        );
        // const target = fs.createWriteStream(absolutePath);
        // await target.write(file.data);
        const ext = path.extname(realName);
        const data = await this.corsPutObject(file, md5);
        const saved = await FileModel.createRecord(
          {
            path: `https://${data.Location}`,
            // type: 1,
            name: realName,
            extension: ext,
            size: file.size,
            md5: md5
          },
          true
        );
        arr.push({
          id: saved.id,
          key: file.fieldName,
          path: saved.path,
          url: `${saved.path}`,
          type: saved.type,
          name: file.name,
          extension: saved.extension,
          size: saved.size
        });
      }
    }
    return arr;
  }

  corsPutObject (file, md5) {
    return new Promise((resolve, reject) => {
      this.cos.putObject(
        {
          Bucket: this.Bucket /* 必须 */,
          Region: this.Region /* 必须 */,
          Key: file.filename /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file.data, // 上传文件对象
          onProgress: async function (progressData) {

          }
        },
        function (err, data) {
          if (err) {
            reject(err);
          }
          resolve(data);
        }
      );
    });
  }
}

module.exports = { CorsUploader };
