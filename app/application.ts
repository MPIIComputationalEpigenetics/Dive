import {Component,AfterViewInit,ElementRef} from '@angular/core';
import {MenuModule,MenuItem} from 'primeng/primeng';

import { DeepBlueService } from './demo/service/deepblue';

declare var Ultima: any;

@Component({
    selector: 'my-app',
    templateUrl: 'app/application.html'
})
export class Application implements AfterViewInit {

    layoutCompact: boolean = true;

    layoutMode: string = 'static';
    
    darkMenu: boolean = false;
    
    profileMode: string = 'inline';

    constructor(private el: ElementRef, private deepBlueService: DeepBlueService) {}

    ngAfterViewInit() {
        Ultima.init(this.el.nativeElement);
    }
    
    changeTheme(event, theme) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        let layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');
        
        themeLink.href = 'resources/theme/theme-' + theme +'.css';
        layoutLink.href = 'resources/layout/css/layout-' + theme +'.css';
        event.preventDefault();
    }
}