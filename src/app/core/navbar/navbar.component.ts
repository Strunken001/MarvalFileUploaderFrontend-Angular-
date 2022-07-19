import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isCollapsed: boolean = false;
    loginLogoutText = 'Login';
    isLogged = 'true';

    constructor(@Inject(DOCUMENT) public document: Document) { }

    ngOnInit() {

      console.log(localStorage.getItem('islogged'))

      if (localStorage.getItem('islogged')) {
        this.isLogged = 'true'
      }

    }


}
