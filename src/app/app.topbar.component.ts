import { Component, Inject, forwardRef } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <div class="logo"></div>
            </div>

            <div class="topbar-right">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i></i>
                </a>

                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="material-icons">menu</i>
                </a>

                <ul class="topbar-items animated fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                    <li style="width:475px">
                        <p-toolbar>
                            <div class="ui-toolbar-group-left">
                                <label>Dive is in test. Please, give your <a target="_blank" style="color: yellow" href="https://deepblue.userecho.com/">click here for feedback and suggestions</a></label>
                            </div>
                        </p-toolbar>
                    </li>
                </ul>
            </div>
        </div>

    `
})
export class AppTopBar {
    constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent) { }
}