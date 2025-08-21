import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    isDark = signal(true);

    constructor() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        this.toggleTheme(darkMode);
    }

    toggleTheme(isDarkMode: boolean) {
        this.isDark.set(isDarkMode);

        const element = document.querySelector('html');
        if (!element) return;

        if (isDarkMode) {
            element.classList.add('my-app-dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            element.classList.remove('my-app-dark');
            localStorage.setItem('darkMode', 'false');
        }
    }
}
