import 'reflect-metadata';
import { container } from 'tsyringe';
import { LogggingService } from './loggingService';
import { LanguageService } from './languageService';
import { StorageKey } from '../common/constants/storageKey';
import { ObjectHelper } from '../common/functions/objectHelper';
import { AuthObject } from '../types/authType';
import { StorageService } from './storageService';

/**
 * For error system throwing
 */
export class SystemError {
    public code = 0;
    public message = '';
}

/**
 * Base service
 */
export class BaseService {
    protected readonly languageService: LanguageService = container.resolve(LanguageService);
    protected readonly loggingService: LogggingService = container.resolve(LogggingService);
    protected readonly storageService: StorageService = container.resolve(StorageService);

    /**
     * Get normal header for request
     * @param needAuthentication 
     * @param accept 
     * @param contentType 
     * @returns 
     */
    protected getHeader(needAuthentication = false, accept = 'application/json', contentType = 'application/json'): Headers {
        const headers = new Headers();
        if (accept) {
            headers.append('Accept', accept);
        }
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
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