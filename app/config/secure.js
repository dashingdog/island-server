'use strict';

module.exports = {
  db: {
    database: 'isLand',
    host: 'localhost',
    // host: '101.34.12.21',
    dialect: 'mysql',
    port: 3306,
    username: 'root',
    // password: '123321',
    password: 'fa123321',
    logging: true,
    timezone: '+08:00',
    define: {
      charset: 'utf8mb4'
    }
  },
  // 腾讯云cor配置
  tencentCos: {
    secretId: 'AKIDRgfOq1vYuzmKbaIjtmNhkW1FDtIQGq9B',
    secretKey: 'l9LHyQdaLq66qKZYHkywe6MOAgy1oLcf',
    bucket: 'dahingdog-1306260763',
    region: 'ap-guangzhou'
  },
  secret:
    '\x88W\xf09\x91\x07\x98\x89\x87\x96\xa0A\xc68\xf9\xecJJU\x17\xc5V\xbe\x8b\xef\xd7\xd8\xd3\xe6\x95*4' // 发布生产环境前，请务必修改此默认秘钥
};
