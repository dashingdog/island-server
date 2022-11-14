import { toSafeInteger, get, isInteger } from 'lodash';
import { ParametersException } from 'lin-mizar';

function getSafeParamId (ctx) {
  const id = toSafeInteger(get(ctx.params, 'id'));
  if (!isInteger(id)) {
    throw new ParametersException({
      code: 10030
    });
  }
  return id;
}

function getSafeParamType (ctx) {
  const type = toSafeInteger(get(ctx.params, 'type'));
  if (!isInteger(type)) {
    throw new ParametersException({
      msg: '路由参数错误'
    });
  }
  return type;
}

function isOptional (val) {
  // undefined , null , ""  , "    ", 皆通过
  if (val === undefined) {
    return true;
  }
  if (val === null) {
    return true;
  }
  if (typeof val === 'string') {
    return val === '' || val.trim() === '';
  }
  return false;
}

export { getSafeParamId, isOptional };
