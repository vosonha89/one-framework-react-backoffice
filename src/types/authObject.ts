import { AbstractObjectType } from 'one-frontend-framework';
import { AuthObjectResponse, AuthProfileObjectResponse } from '../services/responseObject/auth.Response';

/**
 * Auth object
 */
export class AuthObject extends AbstractObjectType<AuthObjectResponse> {
    public id!: number;
    public username!: string;
    public email!: string;
    public accessToken!: string;
    public expiredTime!: number;
    public refreshToken!: string;

    /**
     * Extend
     */
    public expiredDate!: Date;

    constructor() {
        super();
    }

    public override map(object: AuthObjectResponse): void {
        super.map(object);
        const expiredDate = new Date();
        expiredDate.setSeconds(expiredDate.getSeconds() + this.expiredTime);
        this.expiredDate = expiredDate;
    }
}

/**
 * Auth profile
 */
export class AuthProfileObject extends AbstractObjectType<AuthProfileObjectResponse> {
    public id!: number;
    public username!: string;
    public email!: string;
    public firstName!: string;
    public lastName!: string;
    public gender!: string;
    public image!: string;

    public override map(object: AuthProfileObjectResponse): void {
        super.map(object);
    }
}