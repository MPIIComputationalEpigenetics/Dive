import { PreloadingStrategy } from '@angular/router';
import { Component } from '@angular/core';
import { Http, HttpModule, Request } from '@angular/http';

@Component({
  selector: 'my-app',
  template: `
    <h1>Express Not First Angular App</h1> 
    <simple-http>aaa</simple-http>
   `
})

export class AppComponent { }