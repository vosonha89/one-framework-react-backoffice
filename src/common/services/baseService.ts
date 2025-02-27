import 'reflect-metadata';
import { container } from 'tsyringe';
import { LogggingService } from './loggingService';
import { LanguageService } from './languageService';
import { StorageService } from './storageService';
import { StatusCode } from 'one-frontend-framework';
/**
 * For throwing app error using error message in lanaugage file
 */
export class AppError extends Error {
    public onApp: boolean = true;
}

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

    public abstract apiUrl: { [key: string]: string };

    /**
     * Get normal header for request
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

    /**
     * Handle error
     * @param error 
     * @returns 
     */
    public handleError<T extends Error>(error: T): SystemError {
        const me = this;
        me.loggingService.logError(error);
        if (error instanceof AppError) {
            return {
                code: StatusCode.InternalServerError,
                message: error.message
            } as SystemError;
        }
        return {
            code: StatusCode.InternalServerError,
            message: me.languageService.text.errorMessage.internalServerError
        } as SystemError;
    }
}