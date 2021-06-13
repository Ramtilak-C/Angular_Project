import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { CommonService } from 'src/app/services/common.service';

import { EmployeeDetailsComponent } from './employee-details.component';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  beforeEach(() => {
    const commonServiceStub = {
      getHttpResponse: () => {}
    }
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsComponent ],
      providers: [
        {
          provide: CommonService, useValue : commonServiceStub
        },
        {
          provide: Location, useValue : { back: () => {}}
        },
        Constants
      ]
    });
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call fetchEmployeeDetails', () => {
      spyOn(component, 'fetchEmployeeDetails');
      component.ngOnInit();
      expect(component.fetchEmployeeDetails).toHaveBeenCalled();
    })
  });

  describe('backPage', () => {
    it('should call back from _location', () => {
      const locationStub: Location = TestBed.get(
        Location
      );
      spyOn(locationStub, 'back');
      component.backPage();
      expect(locationStub.back).toHaveBeenCalled();
    })
  });

  describe('fetchEmployeeDetails', () => {
    it('should call getHttpResponse', () => {
      const commonServiceStub: CommonService = TestBed.get(
        CommonService
      );
      spyOn(commonServiceStub, 'getHttpResponse').and.returnValue(of({employees : [ {name : 'test'} ]}));
      component.fetchEmployeeDetails();
      expect(commonServiceStub.getHttpResponse).toHaveBeenCalledWith(
        `${Constants.eventListUrl}/${commonServiceStub.selectedId}`,
          null,
          'GET'
      );
    })
  });

});
