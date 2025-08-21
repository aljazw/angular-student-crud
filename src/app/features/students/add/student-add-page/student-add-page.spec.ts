import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentAddPage } from './student-add-page';

describe('StudentAddPage', () => {
    let component: StudentAddPage;
    let fixture: ComponentFixture<StudentAddPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StudentAddPage],
        }).compileComponents();

        fixture = TestBed.createComponent(StudentAddPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
