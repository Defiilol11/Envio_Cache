import { Injectable } from '@angular/core';

type ToastType = 'success' | 'error';
interface Toast {
  type: ToastType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private toast: Toast | null = null;
  private timeout: any;

  success(message: string) {
    this.show({ type: 'success', message });
  }
  error(message: string) {
    this.show({ type: 'error', message });
  }
  current() {
    return this.toast;
  }

  private show(t: Toast) {
    this.toast = t;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.hide(), 3500);
  }
  private hide() {
    this.toast = null;
  }
}
