import {Component,NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ButtonModule,PasswordModule,InputTextModule} from 'primeng/primeng';

@Component({
    selector: 'login-app',
    templateUrl: 'login.html'
})
export class LoginApplication {}

@NgModule({
    imports: [
        BrowserModule,
        ButtonModule,
        PasswordModule,
        InputTextModule
    ],
    declarations: [
        LoginApplication
    ],
    bootstrap:[LoginApplication]
})
export class LoginAppModule { }

platformBrowserDynamic().bootstrapModule(LoginAppModule);
