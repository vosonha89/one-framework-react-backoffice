import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import { LanguageService } from './languageService';
import { AlertType } from '../constants/alertType';

@singleton()
export class AlertService {
    private readonly language: LanguageService = container.resolve(LanguageService);
    private readonly alertTypes: AlertType = new AlertType();

    /**
     * Add alert box
     * @param alertType
     * @param message
     */
    public addAlert(alertType: number, message: string, timeout = 2000): void {
        const me = this;
        let alertTypeValue = '';
        let alertClassName = 'alert-item ';
        switch (alertType.toString()) {
            case me.alertTypes.error.toString():
                alertTypeValue = me.language.text.label.error;
                alertClassName += 'text-danger border-danger bg-white';
                break;
            case me.alertTypes.warning.toString():
                alertTypeValue = me.language.text.label.warning;
                alertClassName += 'text-warning border-warning bg-white';
                break;
            case me.alertTypes.success.toString():
                alertTypeValue = me.language.text.label.success;
                alertClassName += 'text-success border-success bg-white';
                break;
            case me.alertTypes.info.toString():
                alertTypeValue = me.language.text.label.information;
                alertClassName += 'text-info border-info bg-white';
                break;
        }
        const mainContainer = document.getElementById('alertContainer');
        const alertBox = document.createElement('div');
        alertBox.setAttribute('role', 'alert');
        alertBox.setAttribute('aria-live', 'assertive');
        alertBox.setAttribute('aria-atomic', 'true');
        alertBox.className = 'alert-item';
        const html = `<div class="alert ` + alertClassName + ` alert-dismissible" role="alert">
                    <div>
                        <h4 class="alert-title mb-1">` + alertTypeValue + `</h4>
                        <div class="text-dark">` + message + `</div>
                    </div>
                    <a class="btn-close small text-dark" data-bs-dismiss="alert" aria-label="close"></a>
                    </div>`;
        alertBox.innerHTML = html;
        mainContainer?.appendChild(alertBox);
        setTimeout(() => {
            alertBox.remove();
        }, timeout);
    }
}