import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material.module';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check menuItems array is initialized', () => {
    const menuMock = [{
      name: 'Home'
    }, {
      name: 'Gallery'
    }, {
      name: 'About Us'
    }, {
      name: 'Contact Us'
    }];

    expect(component.menuItems).toEqual(menuMock);
  });

  it('should check menuItem is rendered', () => {
    const menuList = fixture.debugElement.queryAll(By.css('.nav-items button'));

    expect(menuList[0].nativeElement.textContent.trim()).toEqual('Home');
    expect(menuList[1].nativeElement.textContent.trim()).toEqual('Gallery');
    expect(menuList[2].nativeElement.textContent.trim()).toEqual('About Us');
    expect(menuList[3].nativeElement.textContent.trim()).toEqual('Contact Us');
  });
});
