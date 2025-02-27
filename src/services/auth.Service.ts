import { injectable } from 'tsyringe';
import { AppError, BaseService, SystemError } from '../common/services/baseService';
import { AppEnvironment } from '../common/constants/appEnvironment';
import { LoginRequest } from './requestObject/auth.Request';
import { LoginResponse, ProfileResponse } from './responseObject/auth.Response';
import { AuthObject, AuthProfileObject } from '../types/authObject';
import { StorageKey } from '../common/constants/storageKey';

@injectable()
export class AuthService extends BaseService {
    public apiUrl: { [key: string]: string; } = {
        loginUrl: AppEnvironment.VITE_APP_API_URL + '/5db9-d92b-4d90-9448',
        profileUrl: AppEnvironment.VITE_APP_API_URL + '/f286-45cf-4ce5-8c5b'
    };

    /**
     * Login to application
     * @param request 
     * @returns 
     */
    public async login(request: LoginRequest): Promise<boolean | SystemError> {
        const me = this;
        try {
            const myHeaders = me.getDefaultHeader();
            const raw = JSON.stringify(request);
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            } as RequestInit;
            const response = await fetch(me.apiUrl.loginUrl, requestOptions);
            if (response.ok) {
                const result = await response.json() as LoginResponse;
                if (result.successful) {
                    const authObjet = new AuthObject();
                    authObjet.map(result.data);
                    await me.getApiProfile(authObjet);
                    await me.storageService.saveObject<AuthObject>(StorageKey.authObject, authObjet);
                    return true;
                }
                else {
                    throw new AppError(me.languageService.text.auth.error001);
                }
            }
            else {
                throw new AppError(me.languageService.text.auth.error001);
            }
        } catch (error) {
            return me.handleError(error as Error);
        }
    }

    /**
     * Get profile from api
     * @param authObject 
     */
    public async getApiProfile(authObject: AuthObject): Promise<void> {
        const me = this;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", authObject.accessToken);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        } as RequestInit;
        const response = await fetch(me.apiUrl.profileUrl, requestOptions);
            if (response.ok) {
                const result = await response.json() as ProfileResponse;
                if (result.successful) {
                    const authProfileObject = new AuthProfileObject();
                    authProfileObject.map(result.data);
                    await me.storageService.saveObject<AuthProfileObject>(StorageKey.authObjectProfile, authProfileObject);
                }
                else {
                    throw new AppError(me.languageService.text.auth.error004);
                }
            }
    }

    /**
    * Check authentication
    * @returns 
    */
    public async isAuthenticated(): Promise<boolean> {
        const me = this;
        try {
            const authObject = await me.storageService.getObject<AuthObject>(StorageKey.authObject);
            if (authObject) {
                const expiredDate = new Date(authObject.expiredDate);
                if (expiredDate > new Date()) {
                    return true;
                }
            }
        } catch (error) {
            me.handleError(error as Error);
        }
        return false;
    }

    /**
     * Get profile
     * @returns 
     */
    public async getLocalProfile(): Promise<AuthProfileObject | SystemError> {
        const me = this;
        try {
            const authProfileObject = await me.storageService.getObject<AuthProfileObject>(StorageKey.authObjectProfile);
            if (authProfileObject) {
                return authProfileObject;
            }
            else {
                throw new AppError(me.languageService.text.auth.error004);
            }
        } catch (error) {
            return me.handleError(error as Error);
        }
    }

    /**
     * Logout
     * @returns 
     */
    public async logout(): Promise<boolean | SystemError> {
        const me = this;
        try {
            await me.storageService.deleteObject(StorageKey.authObject);
            await me.storageService.deleteObject(StorageKey.authObjectProfile);
            return true;
        } catch (error) {
            return me.handleError(error as Error);
        }
    }
}