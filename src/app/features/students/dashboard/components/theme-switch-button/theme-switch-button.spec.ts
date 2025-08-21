import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwitchButton } from './theme-switch-button';

describe('ThemeSwitchButton', () => {
    let component: ThemeSwitchButton;
    let fixture: ComponentFixture<ThemeSwitchButton>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ThemeSwitchButton],
        }).compileComponents();

        fixture = TestBed.createComponent(ThemeSwitchButton);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
