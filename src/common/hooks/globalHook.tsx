import { AnyType } from 'one-frontend-framework';
import { AppEnvironment } from '../constants/appEnvironment';

/**
 * To use for all screen
 * @returns 
 */
function GlobalHook() {
    const appVersion = AppEnvironment.VITE_APP_VERSION;
    const appName = AppEnvironment.VITE_APP_TITLE;
    const appEnv = AppEnvironment.VITE_APP_ENV;

    /**
     * add script to page
     * @param id 
     * @param link 
     */
    function addScript(id: string, link: string, checkerName: string, maxCheck: number) {
        return new Promise<boolean>((resolve, reject) => {
            try {
                const scripts = Array.from(document.scripts);
                if (scripts.findIndex(a => a.id == id) == -1) {
                    const script = document.createElement('script');
                    script.id = id;
                    script.src = link;
                    script.async = true;
                    script.onload = () => {
                        console.log('loaded');
                    };
                    document.body.appendChild(script);
                    let checkTime = 0;
                    const intervalChecker = setInterval(() => {
                        checkTime++;
                        console.log('checking ' + id + ' at ' + checkTime);
                        if (checkTime < maxCheck) {
                            const checker = (window as AnyType)[checkerName];
                            if (checker) {
                                clearInterval(intervalChecker);
                                resolve(true);
                            }
                        }
                        else {
                            clearInterval(intervalChecker);
                            resolve(false);
                        }
                    }, 200);
                }
            }
            catch (ex) {
                console.log(ex);
                reject(ex as Error);
            }
        });
    }

    function onImageError(imgEl: HTMLImageElement) {
        if (imgEl.src.includes(import.meta.env.VITE_IMAGENOSSL)) {
            imgEl.src = imgEl.src.replace(import.meta.env.VITE_IMAGENOSSL, import.meta.env.VITE_IMAGESSL);
        }
    }

    return { addScript, onImageError, appVersion, appName, appEnv };
}

export default GlobalHook;