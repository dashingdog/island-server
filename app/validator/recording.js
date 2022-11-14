import { LinValidator, Rule } from 'lin-mizar';

class CreateRecording extends LinValidator {
  constructor () {
    super();
    this.name = new Rule('isNotEmpty', '必须传入名称');
    this.path = new Rule('isNotEmpty', '必须传入音频地址');
  }
}

export { CreateRecording };
