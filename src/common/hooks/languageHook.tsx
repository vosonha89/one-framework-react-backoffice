import 'reflect-metadata';
import { container } from 'tsyringe';
import { useEffect, useState } from 'react';
import { GlobalEventValue } from '../constants/eventValue';
import { LanguageService } from '../services/languageService';

/**
 * For transtate language globally
 * @returns 
 */
function LanguageHook() {
    const languageService = container.resolve(LanguageService);
    const [text, setText] = useState(languageService.text);
    
    useEffect(() => {
        function onLanguageChanged(e: CustomEvent<string>): void {
            const value = e.detail;
            languageService.setLanguage(value);
            const languageText = languageService.text;
            setText(languageText);
        }
        window.addEventListener(GlobalEventValue.languageChanged, (e) => { onLanguageChanged(e as CustomEvent<string>); }, false);

        return () => {
            window.addEventListener(GlobalEventValue.languageChanged, (e) => { onLanguageChanged(e as CustomEvent<string>); }, false);
        };
    }, [languageService]);
    return text;
}

export default LanguageHook;