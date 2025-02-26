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
    public addAlert(alertType: string, message: string, timeout = 2000): void {
        const me = this;
        let alertTypeValue = '';
        let className = 'alert-item';
        switch (alertType) {
            case me.alertTypes.error.toString():
                alertTypeValue = me.language.text.label.error;
                className = 'bg-danger';
                break;
            case me.alertTypes.warning.toString():
                alertTypeValue = me.language.text.label.warning;
                className = 'bg-warning';
                break;
            case me.alertTypes.success.toString():
                alertTypeValue = me.language.text.label.success;
                className = 'bg-success';
                break;
            case me.alertTypes.info.toString():
                alertTypeValue = me.language.text.label.information;
                className = 'bg-info';
                break;
        }
        const mainContainer = document.getElementById('alertContainer');
        const alertBox = document.createElement('div');
        alertBox.setAttribute('role', 'alert');
        alertBox.setAttribute('aria-live', 'assertive');
        alertBox.setAttribute('aria-atomic', 'true');
        alertBox.className = className;
        const html = `<div class="toast-header">
                        <i class="bx bx-bell me-2"></i>
                        <div class="me-auto fw-semibold">` + alertTypeValue + `</div>
                        <small>11 mins ago</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                    ` + message + `
                    </div>`;
        alertBox.innerHTML = html;
        mainContainer?.appendChild(alertBox);
        setTimeout(() => {
            alertBox.remove();
        }, timeout);
    }
}