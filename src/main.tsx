import "reflect-metadata";
import { container } from 'tsyringe';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { LanguageService } from './common/services/languageService.ts';

/**
 * Register dependency service
 */
const languageService = container.resolve(LanguageService);
/**
 * Init language service
 */
await languageService.initLanguage();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
