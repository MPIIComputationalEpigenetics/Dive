import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { trigger } from '@angular/core';
import { state } from '@angular/core';
import { transition } from '@angular/core';
import { style } from '@angular/core';
import { animate } from '@angular/core';
import { Inject } from '@angular/core';
import { forwardRef } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';

import { AppComponent } from 'app/app.component';
import { MenuService } from 'app/service/menu';

@Component({
    selector: 'app-menu',
    template: `
    <app-data-stack></app-data-stack>
        <ul app-submenu [item]="model" root="true" class="ultima-menu ultima-main-menu clearfix" [reset]="reset" visible="true"></ul>
    <dive-menu></dive-menu>
    `
})
export class AppMenuComponent {

    @Input() reset: boolean;

    model: any[];

    constructor( @Inject(forwardRef(() => AppComponent)) public app: AppComponent,
        public menuService: MenuService) {

        menuService.genomeValue$.subscribe((menuItems: Object[]) => this.model = menuItems);
    }

    changeTheme(theme) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');

        themeLink.href = 'assets/theme/theme-' + theme + '.css';
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
    }

}

@Component({
    selector: '[app-submenu]',
    template: `
        <template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" *ngIf="child.visible === false ? false : true">

                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)"
                    class="ripplelink" *ngIf="!child.type && !child.routerLink" [attr.tabindex]="!visible ? '-1' : null">
                        <i class="material-icons">{{child.icon}}</i>
                        <span>{{child.label}}</span>
                        <i class="material-icons" *ngIf="child.items">keyboard_arrow_down</i>
                </a>

                <a (click)="itemClick($event,child,i)" class="ripplelink" *ngIf="!child.type && child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                    [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null">
                        <i class="material-icons">{{child.icon}}</i>
                        <span>{{child.label}}</span>
                        <i class="material-icons" *ngIf="child.items">keyboard_arrow_down</i>
                </a>

                <form novalidate *ngIf="child.type == 'number'" [formGroup]=child.group (ngSubmit)="child.submit()">
                    <input type="{{ child.type }}" [formControlName]="child.control_name" pInputText/>
                    <label>{{ child.label }}</label>
                </form>

                <ul app-submenu [item]="child" *ngIf="child.items" [@children]="isActive(i) ? 'visible' : 'hidden'" [visible]="isActive(i)" [reset]="reset"></ul>
            </li>
        </template>
    `,
    animations: [
        trigger('children', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenu {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _reset: boolean;

    activeIndex: number;

    constructor( @Inject(forwardRef(() => AppComponent)) public app: AppComponent, public router: Router, public location: Location) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            if (!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }

            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isHorizontal()) {
                this.app.resetMenu = true;
            } else {
                this.app.resetMenu = false;
            }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && this.app.isHorizontal()) {
            this.activeIndex = null;
        }
    }
}