import { StorageKey } from '../constants/storageKey';
import { ObjectHelper } from '../functions/objectHelper';
import { BaseService } from './baseService';
import { AuthObject } from '../../types/authObject';

/**
 * Abstract api service
 */
export abstract class BaseApiService extends BaseService{
    public abstract apiUrl: { [key: string]: string; }; 

    /**
     * Get header with authentication
     * @param needAuthentication 
     * @param accept 
     * @param contentType 
     * @returns 
     */
    public getAuthHeader(needAuthentication?: boolean, accept?: string, contentType?: string): Headers {
        const headers = super.getDefaultHeader(accept, contentType);
        if (needAuthentication) {
            const authObject = ObjectHelper.getCookie(StorageKey.authObject);
            if (authObject) {
                const accessToken = (JSON.parse(authObject) as AuthObject).accessToken;
                headers.append('Authorization', 'Bearer ' + accessToken);
            }
        }
        return headers;
    }
}