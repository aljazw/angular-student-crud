import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ThemeService } from '../../../../../core/services/theme.service';

@Component({
    selector: 'app-theme-switch-button',
    imports: [ToggleSwitchModule, FormsModule],
    templateUrl: './theme-switch-button.html',
    styleUrl: './theme-switch-button.scss',
})
export class ThemeSwitchButton implements OnInit {
    themeService = inject(ThemeService);

    isDark = false;
    iconClass: 'pi pi-moon' | 'pi pi-sun' = 'pi pi-sun';
    label = 'Dark Mode';

    ngOnInit() {
        this.isDark = this.themeService.isDark();
        this.label = this.isDark ? 'Dark Mode' : 'Light Mode';
        this.iconClass = this.isDark ? 'pi pi-moon' : 'pi pi-sun';
    }

    onToggle() {
        const newMode = !this.themeService.isDark();
        this.themeService.toggleTheme(newMode);

        this.iconClass = newMode ? 'pi pi-moon' : 'pi pi-sun';
        this.label = newMode ? 'Dark Mode' : 'Light Mode';
    }
}
