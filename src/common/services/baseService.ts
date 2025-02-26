import 'reflect-metadata';
import { container } from 'tsyringe';
import { LogggingService } from './loggingService';
import { LanguageService } from './languageService';
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
export abstract class BaseService {
    public readonly languageService: LanguageService = container.resolve(LanguageService);
    public readonly loggingService: LogggingService = container.resolve(LogggingService);
    public readonly storageService: StorageService = container.resolve(StorageService);

    /**
     * Get normal header for request
     * @param needAuthentication 
     * @param accept 
     * @param contentType 
     * @returns 
     */
    public getDefaultHeader(accept = 'application/json', contentType = 'application/json'): Headers {
        const headers = new Headers();
        if (accept) {
            headers.append('Accept', accept);
        }
        if (contentType) {
            headers.append('Content-Type', contentType);
        }
        return headers;
    }
}