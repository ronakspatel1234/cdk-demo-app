/**
 * @author Binal Lad
 * @description A spec file which holds the test cases for accordion component.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
// ---------------------------------------------------- //
import { AccordionComponent } from './accordion.component';
import { AccordionConfiguration } from './accordion.model';

describe('AccordionComponent', function () {
    let component: AccordionComponent;
    let fixture: ComponentFixture<AccordionComponent>;

    beforeEach(function () {
    TestBed.configureTestingModule({
        imports: [],
        declarations: [AccordionComponent],
        providers: []
    })
    });

    beforeEach(function () {
        fixture = TestBed.createComponent(AccordionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create the component', function () {
        expect(component).toBeTruthy();
    })

    describe('getter setter', function() {
        it('should set and get the configuration', function () {
            // arrange 
            const expectedConfiguration: AccordionConfiguration = {
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
