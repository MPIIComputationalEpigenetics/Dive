import {Component,AfterViewInit,ElementRef} from '@angular/core';

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

    constructor(private el: ElementRef) {}

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