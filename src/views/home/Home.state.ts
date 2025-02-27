import { container } from 'tsyringe';
import { ComponentState } from '../../common/types/componentState';
import { AuthProfileObject } from '../../types/authObject';
import { HomeModel } from './Home.model';
import { AuthService } from '../../services/auth.Service';
import { SystemError } from '../../common/services/baseService';
import { ObjectHelper } from 'one-frontend-framework';

export class HomeState extends ComponentState {
    private readonly authService = container.resolve(AuthService);

    public model: HomeModel = new HomeModel();
    public modelPropName = 'model';
    public currentProfile!: AuthProfileObject;

    public async init(): Promise<void> {
        const me = this;
        const profileInfo = await me.authService.getLocalProfile();
        if (ObjectHelper.hasApiError(profileInfo)) {
            me.alertService.addAlert(me.alertType.error.toString(), (profileInfo as SystemError).message);
        }
        else {
            me.currentProfile = profileInfo as AuthProfileObject;
            me.isReady = true;
        }
    }
}