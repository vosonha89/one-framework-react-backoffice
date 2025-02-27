import validator from 'validator';
import { BaseModel, ErrorModel } from '../../common/types/baseModel';

export class LoginModel extends BaseModel {
    public username: string = '';
    public password: string = '';

    public isValid(): boolean {
        const me = this;
        me.errors = [];
        if (validator.isEmpty(me.username)) {
            me.errors.push({
                property: 'username',
                error: this.languageService.text.errorMessage.requiredField.replace('{field}', this.languageService.text.auth.username)
            } as ErrorModel);
        }

        if (validator.isEmpty(me.password)) {
            me.errors.push({
                property: 'password',
                error: this.languageService.text.errorMessage.requiredField.replace('{field}', this.languageService.text.auth.password)
            } as ErrorModel);
        }
        if (me.errors.length == 0) return true;
        return false;
    }
}