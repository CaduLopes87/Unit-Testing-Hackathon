import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  /**
   * Create a list with the menu options 
   */
  menuItems = [{
      name: 'Home'
    }, {
      name: 'Gallery'
    }, {
      name: 'About Us'
    }, {
      name: 'Contact Us'
    }];
    
  constructor() { }

  ngOnInit(): void { }
}
