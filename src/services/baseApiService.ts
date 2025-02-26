import { StorageKey } from '../common/constants/storageKey';
import { ObjectHelper } from '../common/functions/objectHelper';
import { BaseService } from '../common/services/baseService';
import { AuthObject } from '../types/authObject';

/**
 * Abstract api service
 */
export class BaseApiService extends BaseService{ 
    public getHeader(needAuthentication?: boolean, accept?: string, contentType?: string): Headers {
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