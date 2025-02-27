import { BaseResponseData } from '../../common/types/baseResponse'

export interface LoginResponse extends BaseResponseData<AuthObjectResponse> {
}

export interface ProfileResponse extends BaseResponseData<AuthProfileObjectResponse> {
}

export interface AuthObjectResponse {
    id: number
    username: string
    email: string
    accessToken: string
    expiredTime: number
    refreshToken: string
}

export interface AuthProfileObjectResponse {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
}
