import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import en from '../../assets/language/en.json';
import vi from '../../assets/language/vi.json';
import { LanguageCode, StorageKey } from 'one-frontend-framework';
import { StorageService } from './storageService';
import { LanguageText } from '../types/languageText';

@singleton()
export class LanguageService {
    public readonly storeService = container.resolve(StorageService);
    public text!: LanguageText;
    public readonly defaultLanguage = LanguageCode.VI;

    /**
     * Init language
     */
    public async initLanguage(): Promise<void> {
        const me = this;
        let currentLanguage = await this.storeService.getObject<string>(StorageKey.language);
        if (!currentLanguage) {
            currentLanguage = me.defaultLanguage;
        }
        this.getLanguageText(currentLanguage);
    }

    /**
     * Set language to store
     * @param value 
     */
    public setLanguage(value: string) {
        const me = this;
        me.storeService.saveObject<string>(StorageKey.language, value);
        me.getLanguageText(value);
    }

    /**
     * Get language text from json
     * @param value 
     */
    public getLanguageText(value: string): void {
        const me = this;
        if (value == LanguageCode.EN) {
            me.text = en as unknown as LanguageText;
        }
        else {
            me.text = vi as unknown as LanguageText;
        }
    }
}