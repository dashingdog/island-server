'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class CreateOrUpdateClassicValidator extends LinValidator {
  constructor () {
    super();
    this.title = new Rule('isNotEmpty', '必须传入title');
    this.content = new Rule('isNotEmpty', '必须传入content');
    this.image = new Rule('isLength', 'classic插图的url长度必须在0～300之间', {
      min: 0,
      max: 300
    });
  }
}

module.exports = {
  CreateOrUpdateClassicValidator
};
