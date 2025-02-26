import { AbstractStorageService } from 'one-frontend-framework';
import 'reflect-metadata';
import { singleton } from 'tsyringe';

@singleton()
export class StorageService extends AbstractStorageService {    
    /**
     * Get store type to apply
     * @param isLocal
     */
    public getStore(isLocal = true): Storage {
        if (isLocal) {
            return localStorage;
        }
        else {
            return sessionStorage;
        }
    }

    /**
     * Clear all storage
     */
    public async clear(): Promise<void> {
        localStorage.clear();
        sessionStorage.clear();
    }

    /**
     * Save object to storage
     * @param key
     * @param value
     * @param isLocal
     */
    public async saveObject<T>(key: string, value: T, isLocal = true): Promise<boolean> {
        const me = this;
        try {
            const store = me.getStore(isLocal);
            store.setItem(key, JSON.stringify(value));
            return true;
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }

    /**
     * Get object from storage
     * @param key
     * @param isLocal
     */
    public async getObject<T>(key: string, isLocal = true): Promise<T | undefined> {
        const me = this;
        try {
            const store = me.getStore(isLocal);
            const data = store.getItem(key);
            if (data) {
                return JSON.parse(data);
            }
            else {
                return undefined;
            }
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    }

    /**
    * Delete object to storage
    * @param key
    * @param value
    * @param isLocal
    */
    public async deleteObject(key: string, isLocal = true): Promise<boolean> {
        const me = this;
        try {
            const store = me.getStore(isLocal);
            store.removeItem(key);
            return true;
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }
}