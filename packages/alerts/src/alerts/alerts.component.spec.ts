/**
 * @author Binal Lad
 * @description A spec file which holds the test cases for alerts component.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
// ---------------------------------------------------- //
import { AlertsComponent } from './alerts.component';
import { AlertsConfiguration } from './alerts.model';

describe('AlertsComponent', function () {
    let component: AlertsComponent;
    let fixture: ComponentFixture<AlertsComponent>;

    beforeEach(function () {
    TestBed.configureTestingModule({
        imports: [],
        declarations: [AlertsComponent],
        providers: []
    })
    });

    beforeEach(function () {
        fixture = TestBed.createComponent(AlertsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create the component', function () {
        expect(component).toBeTruthy();
    })

    describe('getter setter', function() {
        it('should set and get the configuration', function () {
            // arrange 
            const expectedConfiguration: AlertsConfiguration = {
                // your default configuration here
            };
            // act 
            spyOnProperty(component, 'configuration', 'get').and.returnValue(expectedConfiguration);
            component.configuration = expectedConfiguration;
            // assert
            expect(component.configuration).toEqual(expectedConfiguration);
        });
    });

    afterEach(function () {
        fixture.destroy();
        fixture.nativeElement.remove();
    });
  
});
