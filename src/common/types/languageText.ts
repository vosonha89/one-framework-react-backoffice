import { AnyType } from 'one-frontend-framework';
//#region Ext language
export interface LanguageText {
    [key: string]: string | AnyType;
}
export interface Menu {
    [key: string]: string | AnyType;
}
//#endregion

export interface LanguageText {
    appName: string;
    label: Label;
    normalMessage: NormalMessage;
    errorMessage: ErrorMessage;
}

export interface ErrorMessage {
    internalServerError: string;
    requiredField: string;
}

export interface Label {
    hi: string;
    error: string;
    warning: string;
    success: string;
    create: string;
    edit: string;
    delete: string;
    list: string;
    first: string;
    last: string;
    next: string;
    previous: string;
    show: string;
    records: string;
    pageOf: string;
    status: string;
    search: string;
    save: string;
    information: string;
    active: string;
    inactive: string;
    select: string;
}

export interface NormalMessage {
    saveSuccess: string;
}
