import { Component, Inject, forwardRef } from '@angular/core';
import { AppComponent } from './app.component';
import { SelectedData } from './service/selected-data';

@Component({
  selector: 'app-topbar',
  template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <div class="logo"></div>
            </div>

            <div class="topbar-right" style="padding:16px;padding-right: 40px;">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i></i>
                </a>

                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="material-icons">menu</i>
                </a>

                <ul class="topbar-items animated fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                    <li #settings [ngClass]="{'active-top-menu':app.activeTopbarItem === settings}">
                      <a href="#" (click)="app.onTopbarItemClick($event,settings)">
                        <i class="topbar-icon material-icons" style="font-size:44px;">share</i>
                          <span class="topbar-item-name">Settings</span>
                      </a>
                      <ul class="ultima-menu animated fadeInDown" style="width:475px">
                        <li role="menuitem">
                          <a>
                            <i class="material-icons">share</i>
                            <span>{{ exportLink() }}</span><cmp-copy [text]=exportLink()></cmp-copy>
                          </a>
                        </li>
                      </ul>
                    </li>

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
  constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent,
    public selectedData: SelectedData) { }

  display = false;

  exportLink() {
    return this.selectedData.generateStateUrl();
  }
}