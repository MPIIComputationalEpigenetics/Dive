import { Component } from '@angular/core';
import { Input } from '@angular/core';

import {trigger, state, style, transition, animate} from '@angular/animations';

import { Inject } from '@angular/core';
import { forwardRef } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { DiveMenuService } from 'app/service/menu';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
    selector: 'app-menu',
    template: `
    <app-data-stack></app-data-stack>
    <ul app-submenu [item]="model" root="true" class="ultima-menu ultima-main-menu clearfix" [reset]="reset" visible="true"></ul>

    <columns-filtering></columns-filtering>
    <length-filtering></length-filtering>
    <dna-pattern-filtering></dna-pattern-filtering>
    `
})
export class AppMenuComponent {

    @Input() reset: boolean;

    model: any[];

    constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent,
        public menuService: DiveMenuService) {

        menuService.menuValue$.subscribe((menuItems: Object[]) => {
            this.model = menuItems
        });
    }
}

@Component({
    selector: '[app-submenu]',
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
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
                    <div class="ui-g">
                        <div class="ui-g-4"><label>{{ child.label }}</label></div>
                        <div class="ui-g-offset-1 ui-g-4"><input style="width:80px" type="{{ child.type }}" [formControlName]="child.control_name" pInputText/></div>
                        <div class="ui-g-offset-1 ui-g-1"><p-button (onClick)="child.submit()" icon="fa fa-fw fa-check"></p-button></div>
                    </div>
                </form>

                <form novalidate *ngIf="child.type == 'string'" [formGroup]=child.group (ngSubmit)="child.submit()">
                    <div class="ui-g">
                        <div class="ui-g-4"><label>{{ child.label }}</label></div>
                        <div class="ui-g-offset-1 ui-g-4"><input style="width:80px" type="{{ child.type }}" [formControlName]="child.control_name" pInputText/></div>
                        <div class="ui-g-offset-1 ui-g-1"><p-button (onClick)="child.submit()" icon="fa fa-fw fa-check"></p-button></div>
                    </div>
                </form>

                <form *ngIf="child.type == 'filter_by'" [formGroup]=child.group (keydown.enter)="child.submit()" (ngSubmit)="child.submit()">
                    <div class="ui-g">
                        <div class="ui-g-4"><label>{{child.label}}</label></div>
                        <div class="ui-g-offset-1 ui-g-2"><p-dropdown   [autoWidth]="false" [style]="{'width':'100%'}" [options]="child.options" [formControlName]="child.operation_control_name"></p-dropdown></div>
                        <div class="ui-g-offset-1 ui-g-1"><input style="width:40px" type="{{ child.type }}" [formControlName]="child.value_control_name" pInputText/></div>
                        <div class="ui-g-offset-1 ui-g-1"><p-button (onClick)="child.submit()" icon="fa fa-fw fa-check"></p-button></div>
                    </div>
                </form>

                <ul app-submenu [item]="child" *ngIf="child.items" [@children]="isActive(i) ? 'visible' : 'hidden'" [visible]="isActive(i)" [reset]="reset"></ul>
            </li>
        </ng-template>
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

    constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent, public router: Router, public location: Location) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        //activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        //prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }

        //hide menu
        if (!item.items) {
            if (this.app.isHorizontal())
                this.app.resetMenu = true;
            else
                this.app.resetMenu = false;

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