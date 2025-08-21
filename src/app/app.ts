import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ThemeService } from './core/services/theme.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ConfirmDialogModule],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    private themeService = inject(ThemeService);

    protected readonly title = signal('student-management');
}
