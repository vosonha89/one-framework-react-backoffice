import 'reflect-metadata';
import { container } from 'tsyringe';
import { ObjectHelper } from '../functions/objectHelper';
import { ComponentState as FWComponentState } from 'one-frontend-framework';
import { LanguageService } from '../services/languageService';
import { AlertService } from '../services/alertService';
import { AlertType } from '../constants/alertType';
import { LoadingService } from '../services/loadingService';
import { BaseInfoModel } from './baseModel';

export abstract class ComponentState extends FWComponentState {
    public languageService: LanguageService = container.resolve(LanguageService);
    public loadingService = container.resolve(LoadingService);
    public alertService: AlertService = container.resolve(AlertService);
    public alertType = new AlertType();

    /**
     * App on init
     */
    public abstract init(): Promise<void>;

    constructor() {
        super();
    }

    /**
     * Deep copy current state
     * @returns 
     */
    public copy<TObject>(): TObject {
        return ObjectHelper.deepCopy(this) as unknown as TObject;
    }
}

/**
 * For modify views/components
 */
export abstract class InformationComponentState<TDetail, TModel extends BaseInfoModel<TDetail>> extends ComponentState {
    public id = '';
    public get isEdit(): boolean {
        return this.id !== '';
    }
    public abstract model: TModel;
    public abstract modelPropName: string;

    public abstract createRequest<T>(): T;
    public abstract saveData(): void;
}