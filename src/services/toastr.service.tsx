export class NotificationService {
    static notify(message: string,
                  variant: 'primary' | 'warning' | 'success' | 'danger' = 'primary',
                  icon = 'info-circle',
                  duration = 3000) {
        const alert = Object.assign(document.createElement('sl-alert'), {
            variant,
            closable: true,
            duration: duration,
            innerHTML: `<sl-icon name="${icon}" slot="icon"></sl-icon>
                        ${NotificationService.escapeHtml(message)}`
        });

        document.body.append(alert);
        return alert.toast();
    }

    static escapeHtml(html: string) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }
}
