import { bootstrap } from '@angular/upgrade/src/angular_js';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { AnnotationListComponent } from './deepblue.ui.components';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [ 
     AppComponent, 
     AnnotationListComponent     
  ],
  bootstrap: [ 
    AppComponent 
  ]
})

export class AppModule { }