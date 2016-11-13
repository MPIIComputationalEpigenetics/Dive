import { PreloadingStrategy } from '@angular/router';
import { Component } from '@angular/core';
import { Http, HttpModule, Request } from '@angular/http';

import './rxjs-operators';

import { AnnotationListComponent} from './deepblue.ui.components' ;

@Component({
  selector: 'my-app',
  template: `
    <h1>Express Not First Angular App</h1> 
    <list-annotations></list-annotations>
   `
})

export class AppComponent { }