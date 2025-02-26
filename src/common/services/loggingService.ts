import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { AbstractLogggingService, ObjectHelper } from 'one-frontend-framework';
import { LanguageText } from '../types/languageText';

export interface ServerError {
    code: string;
    title: string;
    message: string;
    type: string;
}

@singleton()
export class LogggingService extends AbstractLogggingService {
    /**
     * Log error
     * @param ex
     */
    public logError(ex: unknown): void {
        console.log(ex);
    }

    /**
     * Get error in language for client side
     * @param language 
     * @param code 
     * @param defaultValue 
     * @returns 
     */
    public getError(language: LanguageText, code: string, defaultValue: string): string {
        try {
            const value = ObjectHelper.getValue(language, code) as string;
            if (value) {
                return value;
            }
            return defaultValue;
        }
        catch (ex) {
            console.log(ex);
            return defaultValue;
        }
    }
}