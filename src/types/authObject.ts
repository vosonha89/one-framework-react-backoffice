import { AbstractObjectType } from 'one-frontend-framework';
import { AuthObjectResponse } from '../services/responseObject/auth.Response';

/**
 * Auth object
 */
export class AuthObject extends AbstractObjectType<AuthObjectResponse> {
    public id: number;
    public username: string;
    public email: string;
    public accessToken: string;
    public expiredTime: number;
    public refreshToken: string;

    /**
     * Extend
     */
    public expiredDate!: Date;

    /**
     * Constructor
     * @param id 
     * @param username 
     * @param email 
     * @param accessToken 
     * @param expiredTime 
     * @param refreshToken 
     */
    constructor(id: number, username: string, email: string, accessToken: string, expiredTime: number, refreshToken: string) {
        super();
        this.id = id;
        this.username = username;
        this.email = email;
        this.accessToken = accessToken;
        this.expiredTime = expiredTime;
        this.refreshToken = refreshToken;
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
export class AuthProfileObject {
    public id: number;
    public username: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public gender: string;
    public image: string;

    /**
     * Constructor
     * @param id 
     * @param username 
     * @param email 
     * @param firstName 
     * @param lastName 
     * @param gender 
     * @param image 
     */
    constructor(id: number, username: string, email: string, firstName: string, lastName: string, gender: string, image: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.image = image;
    }
}