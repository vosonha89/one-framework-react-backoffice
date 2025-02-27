import 'reflect-metadata';
import { singleton } from 'tsyringe';

@singleton()
export class LoadingService {
    /**
     * Show loading
     * @returns 
     */
    public show(): boolean {
        const loadingEl = document.getElementById('loading');
        if (loadingEl) {
            loadingEl.style.display = 'flex';
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Hide loading
     * @returns 
     */
    public hide(): boolean {
        const loadingEl = document.getElementById('loading');
        if (loadingEl) {
            loadingEl.style.display = 'none';
            return true;
        }
        else {
            return false;
        }
    }
}