import { container } from 'tsyringe';
import { ObjectHelper } from '../../common/functions/objectHelper';
import { ComponentState } from '../../common/types/componentState';
import { AuthService } from '../../services/auth.Service';
import { LoginModel } from './Login.model';
import { LoginRequest } from '../../services/requestObject/auth.Request';
import { SystemError } from '../../common/services/baseService';
import { AppRouterName } from '../../AppRouter';

export class LoginState extends ComponentState {
    public authService = container.resolve(AuthService);
    public model = new LoginModel();
    public modelPropName = 'model';

    public async init(): Promise<void> {
        const me = this;
        const isAuth = await me.authService.isAuthenticated();
        if (isAuth) {
            window.location.href = AppRouterName.home;
        }
        else {
            me.model.username = 'admin';
            me.model.password = 'abcd1234';
            me.isReady = true;
        }
    }

    public async login(): Promise<boolean> {
        const me = this;
        if (me.model.isValid()) {
            me.loadingService.show();
            const response = await me.authService.login(new LoginRequest(me.model.username, me.model.password));
            me.loadingService.hide();
            if (ObjectHelper.hasApiError(response)) {
                me.alertService.addAlert(me.alertType.error.toString(), (response as SystemError).message);
            }
            else {
                return true;
            }
        }
        return false;
    }
}