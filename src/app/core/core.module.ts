import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverlayModule } from './overlay/overlay.module';


@NgModule({
  declarations: [
    NavbarComponent,
    ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    OverlayModule
    
  ],
  exports: [
    OverlayModule,
    HttpClientModule,
    NavbarComponent
  ]
})
export class CoreModule { }
