webpackJsonp(["main"],{

/***/ "../../../../../package.json":
/***/ (function(module, exports) {

module.exports = {"name":"deepblue-dive","version":"0.5.6","license":"GPL3","angular-cli":{},"scripts":{"ng":"ng","start":"ng serve  --proxy-config proxy.config.json --port 1234","test":"ng test","pree2e":"webdriver-manager update --standalone false --gecko false","e2e":"protractor"},"private":true,"dependencies":{"@angular/animations":"^5.2.4","@angular/common":"^5.2.4","@angular/compiler":"^5.2.4","@angular/core":"^5.2.4","@angular/forms":"^5.2.4","@angular/http":"^5.2.4","@angular/platform-browser":"^5.2.4","@angular/platform-browser-dynamic":"^5.2.4","@angular/platform-server":"^5.2.4","@angular/router":"^5.2.4","@swimlane/ngx-datatable":"^11.0.4","ajv":"^6.0.1","angular2-highcharts":"^0.5.5","angulartics2":"^5.1.0","chart.js":"^2.6.0","core-js":"^2.4.1","jquery":"^3.2.1","karma-chrome-launcher":"^2.1.1","latest":"^0.2.0","ngx-bootstrap":"^2.0.2","primeng":"^5.2.0","randomcolor":"^0.5.3","rxjs":"^5.5.6","ts-helpers":"^1.1.2","typescript":"^2.7.1","zone":"^0.3.4","zone.js":"^0.8.20"},"devDependencies":{"@angular/cli":"^1.6.8","@angular/compiler-cli":"^5.2.4","@types/node":"^8.0.17","jasmine-core":"2.8.0","jasmine-spec-reporter":"4.2.1","karma":"1.7.1","karma-chrome-launcher":"^2.2.0","karma-cli":"^1.0.1","karma-jasmine":"^1.1.0","karma-remap-istanbul":"^0.6.0","protractor":"~5.1.2","ts-node":"3.3.0","tslint":"^5.5.0","typescript":"^2.7.1"}}

/***/ }),

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"layout-wrapper\" [ngClass]=\"{'layout-compact':layoutCompact}\">\n\n    <div #layoutContainer class=\"layout-container\"\n            [ngClass]=\"{'menu-layout-static': !isOverlay(),\n            'menu-layout-overlay': isOverlay(),\n            'layout-menu-overlay-active': overlayMenuActive,\n            'menu-layout-horizontal': isHorizontal(),\n            'layout-menu-static-inactive': staticMenuDesktopInactive,\n            'layout-menu-static-active': staticMenuMobileActive}\">\n\n        <app-topbar></app-topbar>\n\n        <div class=\"layout-menu\" [ngClass]=\"{'layout-menu-dark':darkMenu}\" (click)=\"onMenuClick($event)\">\n            <p-scrollPanel #scrollPanel [style]=\"{height: '100%'}\">\n                <app-menu [reset]=\"resetMenu\"></app-menu>\n            </p-scrollPanel>\n        </div>\n\n        <div class=\"topmenu\"\n            [ngClass]=\"{'topmenu-full': staticMenuDesktopInactive,\n                        'topmenu-partial': !staticMenuDesktopInactive}\"\n            >\n            <selected-data></selected-data>\n        </div>\n\n        <div class=\"layout-main\">\n            <router-outlet></router-outlet>\n\n            <data-load-progress-bar #progressbar></data-load-progress-bar>\n            <app-footer></app-footer>\n        </div>\n\n        <div class=\"layout-mask\"></div>\n    </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angulartics2_ga__ = __webpack_require__("../../../../angulartics2/ga/ga.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MenuOrientation;
(function (MenuOrientation) {
    MenuOrientation[MenuOrientation["STATIC"] = 0] = "STATIC";
    MenuOrientation[MenuOrientation["OVERLAY"] = 1] = "OVERLAY";
    MenuOrientation[MenuOrientation["SLIM"] = 2] = "SLIM";
    MenuOrientation[MenuOrientation["HORIZONTAL"] = 3] = "HORIZONTAL";
})(MenuOrientation || (MenuOrientation = {}));
console.log("Loading version");
var appVersion = __webpack_require__("../../../../../package.json").version;
console.log(appVersion);
console.info('Loading Highcharts...');
var Highcharts = __webpack_require__("../../../../highcharts/highcharts.js");
console.info('Loading Highcharts-More');
var HighchartsMore = __webpack_require__("../../../../highcharts/highcharts-more.js");
console.info('Initializing Highcharts-More');
HighchartsMore(Highcharts);
console.info('Highcharts-More done');
console.info('Loading Highcharts-Exporting');
var HighchartsExporting = __webpack_require__("../../../../highcharts/modules/exporting.js");
console.info('Initializing Highcharts-Exporting');
HighchartsExporting(Highcharts);
console.info('Highcharts-Exporting done');
var AppComponent = /** @class */ (function () {
    function AppComponent(renderer, zone, titleService, angulartics2GoogleAnalytics) {
        this.renderer = renderer;
        this.zone = zone;
        this.titleService = titleService;
        this.layoutCompact = true;
        this.layoutMode = MenuOrientation.STATIC;
        this.darkMenu = false;
        this.profileMode = 'inline';
        this.rightPanelActive = false;
        this.rightPanelClick = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () { _this.bindRipple(); });
        this.titleService.setTitle("Dive (" + appVersion + ")");
    };
    AppComponent.prototype.bindRipple = function () {
        this.rippleInitListener = this.init.bind(this);
        document.addEventListener('DOMContentLoaded', this.rippleInitListener);
    };
    AppComponent.prototype.init = function () {
        this.rippleMouseDownListener = this.rippleMouseDown.bind(this);
        document.addEventListener('mousedown', this.rippleMouseDownListener, false);
    };
    AppComponent.prototype.rippleMouseDown = function (e) {
        for (var target = e.target; target && target !== this; target = target['parentNode']) {
            if (!this.isVisible(target)) {
                continue;
            }
            // Element.matches() -> https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
            if (this.selectorMatches(target, '.ripplelink, .ui-button')) {
                var element = target;
                this.rippleEffect(element, e);
                break;
            }
        }
    };
    AppComponent.prototype.selectorMatches = function (el, selector) {
        var p = Element.prototype;
        var f = p['matches'] || p['webkitMatchesSelector'] || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
        return f.call(el, selector);
    };
    AppComponent.prototype.isVisible = function (el) {
        return !!(el.offsetWidth || el.offsetHeight);
    };
    AppComponent.prototype.rippleEffect = function (element, e) {
        if (element.querySelector('.ink') === null) {
            var inkEl = document.createElement('span');
            this.addClass(inkEl, 'ink');
            if (this.hasClass(element, 'ripplelink')) {
                element.querySelector('span').insertAdjacentHTML('afterend', '<span class=\'ink\'></span>');
            }
            else {
                element.appendChild(inkEl);
            }
        }
        var ink = element.querySelector('.ink');
        this.removeClass(ink, 'ripple-animate');
        if (!ink.offsetHeight && !ink.offsetWidth) {
            var d = Math.max(element.offsetWidth, element.offsetHeight);
            ink.style.height = d + 'px';
            ink.style.width = d + 'px';
        }
        var x = e.pageX - this.getOffset(element).left - (ink.offsetWidth / 2);
        var y = e.pageY - this.getOffset(element).top - (ink.offsetHeight / 2);
        ink.style.top = y + 'px';
        ink.style.left = x + 'px';
        ink.style.pointerEvents = 'none';
        this.addClass(ink, 'ripple-animate');
    };
    AppComponent.prototype.hasClass = function (element, className) {
        if (element.classList) {
            return element.classList.contains(className);
        }
        else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    };
    AppComponent.prototype.addClass = function (element, className) {
        if (element.classList) {
            element.classList.add(className);
        }
        else {
            element.className += ' ' + className;
        }
    };
    AppComponent.prototype.removeClass = function (element, className) {
        if (element.classList) {
            element.classList.remove(className);
        }
        else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };
    AppComponent.prototype.getOffset = function (el) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
            left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
        };
    };
    AppComponent.prototype.unbindRipple = function () {
        if (this.rippleInitListener) {
            document.removeEventListener('DOMContentLoaded', this.rippleInitListener);
        }
        if (this.rippleMouseDownListener) {
            document.removeEventListener('mousedown', this.rippleMouseDownListener);
        }
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.layoutContainer = this.layourContainerViewChild.nativeElement;
        setTimeout(function () { _this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    };
    AppComponent.prototype.onLayoutClick = function () {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }
        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.resetMenu = true;
            }
            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }
            this.menuHoverActive = false;
        }
        if (!this.rightPanelClick) {
            this.rightPanelActive = false;
        }
        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightPanelClick = false;
    };
    AppComponent.prototype.onMenuButtonClick = function (event) {
        this.menuClick = true;
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;
        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }
        else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            }
            else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
            }
        }
        event.preventDefault();
    };
    AppComponent.prototype.onMenuClick = function ($event) {
        this.menuClick = true;
        this.resetMenu = false;
    };
    AppComponent.prototype.onTopbarMenuButtonClick = function (event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;
        this.hideOverlayMenu();
        event.preventDefault();
    };
    AppComponent.prototype.onTopbarItemClick = function (event, item) {
        this.topbarItemClick = true;
        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        }
        else {
            this.activeTopbarItem = item;
        }
        event.preventDefault();
    };
    AppComponent.prototype.onRightPanelButtonClick = function (event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
    };
    AppComponent.prototype.onRightPanelClick = function () {
        this.rightPanelClick = true;
    };
    AppComponent.prototype.hideOverlayMenu = function () {
        this.rotateMenuButton = false;
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    };
    AppComponent.prototype.isTablet = function () {
        var width = window.innerWidth;
        return width <= 1024 && width > 640;
    };
    AppComponent.prototype.isDesktop = function () {
        return window.innerWidth > 1024;
    };
    AppComponent.prototype.isMobile = function () {
        return window.innerWidth <= 640;
    };
    AppComponent.prototype.isOverlay = function () {
        return this.layoutMode === MenuOrientation.OVERLAY;
    };
    AppComponent.prototype.isHorizontal = function () {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    };
    AppComponent.prototype.isSlim = function () {
        return this.layoutMode === MenuOrientation.SLIM;
    };
    AppComponent.prototype.changeToStaticMenu = function () {
        this.layoutMode = MenuOrientation.STATIC;
    };
    AppComponent.prototype.changeToOverlayMenu = function () {
        this.layoutMode = MenuOrientation.OVERLAY;
    };
    AppComponent.prototype.changeToHorizontalMenu = function () {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    };
    AppComponent.prototype.changeToSlimMenu = function () {
        this.layoutMode = MenuOrientation.SLIM;
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.unbindRipple();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('layoutContainer'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], AppComponent.prototype, "layourContainerViewChild", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('scrollPanel'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["ScrollPanel"])
    ], AppComponent.prototype, "layoutMenuScrollerViewChild", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["Title"], __WEBPACK_IMPORTED_MODULE_3_angulartics2_ga__["a" /* Angulartics2GoogleAnalytics */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppFooter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppFooter = /** @class */ (function () {
    function AppFooter() {
    }
    AppFooter = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-footer',
            template: "\n        <div class=\"footer\">\n            <div class=\"card clearfix\">\n                <span class=\"footer-text-left\">Max Planck Institute for Informatics - Computational Biology and Applied Algorithmics Department</span>\n                <span class=\"footer-text-right\"><span class=\"ui-icon ui-icon-copyright\"></span>  <span>All Rights Reserved</span></span>\n            </div>\n        </div>\n    "
        })
    ], AppFooter);
    return AppFooter;
}());



/***/ }),

/***/ "../../../../../src/app/app.menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMenuComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppSubMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_service_menu__ = __webpack_require__("../../../../../src/app/service/menu.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};













var AppMenuComponent = /** @class */ (function () {
    function AppMenuComponent(app, menuService) {
        var _this = this;
        this.app = app;
        this.menuService = menuService;
        menuService.menuValue$.subscribe(function (menuItems) { return _this.model = menuItems; });
    }
    AppMenuComponent.prototype.changeTheme = function (theme) {
        var themeLink = document.getElementById('theme-css');
        var layoutLink = document.getElementById('layout-css');
        themeLink.href = 'assets/theme/theme-' + theme + '.css';
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AppMenuComponent.prototype, "reset", void 0);
    AppMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-menu',
            template: "\n    <app-data-stack></app-data-stack>\n    <ul app-submenu [item]=\"model\" root=\"true\" class=\"ultima-menu ultima-main-menu clearfix\" [reset]=\"reset\" visible=\"true\"></ul>\n\n    <columns-filtering></columns-filtering>\n    <length-filtering></length-filtering>\n    <dna-pattern-filtering></dna-pattern-filtering>\n    "
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_3_app_app_component__["a" /* AppComponent */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_4_app_service_menu__["a" /* DiveMenuService */]])
    ], AppMenuComponent);
    return AppMenuComponent;
}());

var AppSubMenu = /** @class */ (function () {
    function AppSubMenu(app, router, location) {
        this.app = app;
        this.router = router;
        this.location = location;
    }
    AppSubMenu.prototype.itemClick = function (event, item, index) {
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
    };
    AppSubMenu.prototype.isActive = function (index) {
        return this.activeIndex === index;
    };
    Object.defineProperty(AppSubMenu.prototype, "reset", {
        get: function () {
            return this._reset;
        },
        set: function (val) {
            this._reset = val;
            if (this._reset && this.app.isHorizontal()) {
                this.activeIndex = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppSubMenu.prototype, "item", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AppSubMenu.prototype, "root", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AppSubMenu.prototype, "visible", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AppSubMenu.prototype, "reset", null);
    AppSubMenu = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: '[app-submenu]',
            template: "\n        <ng-template ngFor let-child let-i=\"index\" [ngForOf]=\"(root ? item : item.items)\">\n            <li [ngClass]=\"{'active-menuitem': isActive(i)}\" *ngIf=\"child.visible === false ? false : true\">\n\n                <a [href]=\"child.url||'#'\" (click)=\"itemClick($event,child,i)\"\n                    class=\"ripplelink\" *ngIf=\"!child.type && !child.routerLink\" [attr.tabindex]=\"!visible ? '-1' : null\">\n                        <i class=\"material-icons\">{{child.icon}}</i>\n                        <span>{{child.label}}</span>\n                        <i class=\"material-icons\" *ngIf=\"child.items\">keyboard_arrow_down</i>\n                </a>\n\n                <a (click)=\"itemClick($event,child,i)\" class=\"ripplelink\" *ngIf=\"!child.type && child.routerLink\"\n                    [routerLink]=\"child.routerLink\" routerLinkActive=\"active-menuitem-routerlink\"\n                    [routerLinkActiveOptions]=\"{exact: true}\" [attr.tabindex]=\"!visible ? '-1' : null\">\n                        <i class=\"material-icons\">{{child.icon}}</i>\n                        <span>{{child.label}}</span>\n                        <i class=\"material-icons\" *ngIf=\"child.items\">keyboard_arrow_down</i>\n                </a>\n\n                <form novalidate *ngIf=\"child.type == 'number'\" [formGroup]=child.group (ngSubmit)=\"child.submit()\">\n                    <div class=\"ui-g\">\n                        <div class=\"ui-g-4\"><label>{{ child.label }}</label></div>\n                        <div class=\"ui-g-offset-1 ui-g-4\"><input style=\"width:80px\" type=\"{{ child.type }}\" [formControlName]=\"child.control_name\" pInputText/></div>\n                        <div class=\"ui-g-offset-1 ui-g-1\"><p-button (onClick)=\"child.submit()\" icon=\"fa fa-fw fa-check\"></p-button></div>\n                    </div>\n                </form>\n\n                <form novalidate *ngIf=\"child.type == 'string'\" [formGroup]=child.group (ngSubmit)=\"child.submit()\">\n                    <div class=\"ui-g\">\n                        <div class=\"ui-g-4\"><label>{{ child.label }}</label></div>\n                        <div class=\"ui-g-offset-1 ui-g-4\"><input style=\"width:80px\" type=\"{{ child.type }}\" [formControlName]=\"child.control_name\" pInputText/></div>\n                        <div class=\"ui-g-offset-1 ui-g-1\"><p-button (onClick)=\"child.submit()\" icon=\"fa fa-fw fa-check\"></p-button></div>\n                    </div>\n                </form>\n\n                <form *ngIf=\"child.type == 'filter_by'\" [formGroup]=child.group (keydown.enter)=\"child.submit()\" (ngSubmit)=\"child.submit()\">\n                    <div class=\"ui-g\">\n                        <div class=\"ui-g-4\"><label>{{child.label}}</label></div>\n                        <div class=\"ui-g-offset-1 ui-g-2\"><p-dropdown [style]=\"{'width':'40px'}\" [options]=\"child.options\" [formControlName]=\"child.operation_control_name\"></p-dropdown></div>\n                        <div class=\"ui-g-offset-1 ui-g-1\"><input style=\"width:40px\" type=\"{{ child.type }}\" [formControlName]=\"child.value_control_name\" pInputText/></div>\n                        <div class=\"ui-g-offset-1 ui-g-1\"><p-button (onClick)=\"child.submit()\" icon=\"fa fa-fw fa-check\"></p-button></div>\n                    </div>\n                </form>\n\n                <ul app-submenu [item]=\"child\" *ngIf=\"child.items\" [@children]=\"isActive(i) ? 'visible' : 'hidden'\" [visible]=\"isActive(i)\" [reset]=\"reset\"></ul>\n            </li>\n        </ng-template>\n    ",
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('children', [
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('hidden', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        height: '0px'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('visible', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                        height: '*'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('visible => hidden', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('hidden => visible', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
                ])
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_3_app_app_component__["a" /* AppComponent */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"]])
    ], AppSubMenu);
    return AppSubMenu;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export highchartsFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_view_component_datastack__ = __webpack_require__("../../../../../src/app/view/component/datastack.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_datastack__ = __webpack_require__("../../../../../src/app/service/datastack.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_routes__ = __webpack_require__("../../../../../src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_primeng_card__ = __webpack_require__("../../../../primeng/card.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_primeng_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_primeng_card__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_menu_component__ = __webpack_require__("../../../../../src/app/app.menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_topbar_component__ = __webpack_require__("../../../../../src/app/app.topbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_footer_component__ = __webpack_require__("../../../../../src/app/app.footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__swimlane_ngx_datatable__ = __webpack_require__("../../../../@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__swimlane_ngx_datatable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__swimlane_ngx_datatable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_app_view_component_charts_overlappingbar__ = __webpack_require__("../../../../../src/app/view/component/charts/overlappingbar.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_app_view_component_charts_similarity__ = __webpack_require__("../../../../../src/app/view/component/charts/similarity.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_app_view_screen_data_selection__ = __webpack_require__("../../../../../src/app/view/screen/data-selection.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_app_view_screen_regions__ = __webpack_require__("../../../../../src/app/view/screen/regions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_app_view_screen_genes__ = __webpack_require__("../../../../../src/app/view/screen/genes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_app_view_screen_go_enrichment__ = __webpack_require__("../../../../../src/app/view/screen/go-enrichment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_app_view_screen_overlap_enrichment__ = __webpack_require__("../../../../../src/app/view/screen/overlap-enrichment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_app_view_screen_similar_finder__ = __webpack_require__("../../../../../src/app/view/screen/similar-finder.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_app_view_component_progressbar__ = __webpack_require__("../../../../../src/app/view/component/progressbar.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_angular2_highcharts_dist_HighchartsService__ = __webpack_require__("../../../../angular2-highcharts/dist/HighchartsService.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_angular2_highcharts_dist_HighchartsService___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_angular2_highcharts_dist_HighchartsService__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_angular2_highcharts__ = __webpack_require__("../../../../angular2-highcharts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_angular2_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29_angular2_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_primeng_colorpicker__ = __webpack_require__("../../../../primeng/colorpicker.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_primeng_colorpicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_30_primeng_colorpicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_app_view_screen_chromatin_states__ = __webpack_require__("../../../../../src/app/view/screen/chromatin_states.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_app_view_component_biosources__ = __webpack_require__("../../../../../src/app/view/component/biosources.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_app_view_component_data_selection_select_tiling_regions__ = __webpack_require__("../../../../../src/app/view/component/data-selection/select-tiling-regions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_app_view_component_data_selection_select_experiments__ = __webpack_require__("../../../../../src/app/view/component/data-selection/select-experiments.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_app_view_component_data_selection_select_annotations__ = __webpack_require__("../../../../../src/app/view/component/data-selection/select-annotations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_app_view_component_data_selection_select_genes__ = __webpack_require__("../../../../../src/app/view/component/data-selection/select-genes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_app_view_component_data_selection_select_datasets__ = __webpack_require__("../../../../../src/app/view/component/data-selection/select-datasets.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_app_view_component_data_selection_select_databases__ = __webpack_require__("../../../../../src/app/view/component/data-selection/select-databases.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_app_view_component_data_info_box__ = __webpack_require__("../../../../../src/app/view/component/data-info-box.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_app_view_component_deepblue__ = __webpack_require__("../../../../../src/app/view/component/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_app_view_component_menu_length_filtering__ = __webpack_require__("../../../../../src/app/view/component/menu/length-filtering.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_app_view_component_menu_dna_pattern_filtering__ = __webpack_require__("../../../../../src/app/view/component/menu/dna-pattern-filtering.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_app_view_component_menu_columns_filtering__ = __webpack_require__("../../../../../src/app/view/component/menu/columns-filtering.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_app_view_component_data_selection_upload_regions__ = __webpack_require__("../../../../../src/app/view/component/data-selection/upload-regions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_app_view_component_data_selection_paste_regions__ = __webpack_require__("../../../../../src/app/view/component/data-selection/paste-regions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_app_view_component_data_selection_select_query__ = __webpack_require__("../../../../../src/app/view/component/data-selection/select-query.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_app_view_screen_peaks_overlap__ = __webpack_require__("../../../../../src/app/view/screen/peaks-overlap.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49_app_service_requests_manager__ = __webpack_require__("../../../../../src/app/service/requests-manager.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50_app_view_component_data_selection_data_selection_main__ = __webpack_require__("../../../../../src/app/view/component/data-selection/data-selection-main.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51_app_view_screen_initial__ = __webpack_require__("../../../../../src/app/view/screen/initial.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52_app_view_component_query_flow__ = __webpack_require__("../../../../../src/app/view/component/query-flow.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_app_service_menu__ = __webpack_require__("../../../../../src/app/service/menu.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54_app_service_router_guard__ = __webpack_require__("../../../../../src/app/service/router-guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55_app_view_screen_comparison_selection__ = __webpack_require__("../../../../../src/app/view/screen/comparison-selection.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56_angulartics2__ = __webpack_require__("../../../../angulartics2/bundles/core.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56_angulartics2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_56_angulartics2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57_angulartics2_ga__ = __webpack_require__("../../../../angulartics2/ga/ga.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};































































































function highchartsFactory() {
    return __webpack_require__("../../../../highcharts/highcharts.js");
}



























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_8__app_routes__["a" /* AppRoutes */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["AccordionModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["AutoCompleteModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["BreadcrumbModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["ButtonModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["CalendarModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["CarouselModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["CheckboxModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["ChipsModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["CodeHighlighterModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["ConfirmDialogModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["SharedModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["ContextMenuModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["DataGridModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["DataListModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["DataScrollerModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["DialogModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["DragDropModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["DropdownModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["EditorModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["FieldsetModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["GalleriaModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["GMapModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["GrowlModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["InplaceModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["InputMaskModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["InputSwitchModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["InputTextModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["InputTextareaModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["LightboxModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["ListboxModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["MegaMenuModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["MenuModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["MenubarModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["MessagesModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["MultiSelectModule"],
                __WEBPACK_IMPORTED_MODULE_16__swimlane_ngx_datatable__["NgxDatatableModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["OrderListModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["OverlayPanelModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["PaginatorModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["PanelModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["PanelMenuModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["PasswordModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["PickListModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["ProgressBarModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["RadioButtonModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["RatingModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["ScrollPanelModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["ScheduleModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["SelectButtonModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["SidebarModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["SlideMenuModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["SliderModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["SpinnerModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["SplitButtonModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["StepsModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["TabMenuModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["TabViewModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["TerminalModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["TieredMenuModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["ToggleButtonModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["ToolbarModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["TooltipModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["TreeModule"],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["TreeTableModule"],
                __WEBPACK_IMPORTED_MODULE_29_angular2_highcharts__["ChartModule"],
                __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["OrganizationChartModule"],
                __WEBPACK_IMPORTED_MODULE_11_primeng_card__["CardModule"],
                __WEBPACK_IMPORTED_MODULE_30_primeng_colorpicker__["ColorPickerModule"],
                __WEBPACK_IMPORTED_MODULE_56_angulartics2__["Angulartics2Module"].forRoot([__WEBPACK_IMPORTED_MODULE_57_angulartics2_ga__["a" /* Angulartics2GoogleAnalytics */]])
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_31__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_13__app_menu_component__["a" /* AppMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_13__app_menu_component__["b" /* AppSubMenu */],
                __WEBPACK_IMPORTED_MODULE_14__app_topbar_component__["a" /* AppTopBar */],
                __WEBPACK_IMPORTED_MODULE_15__app_footer_component__["a" /* AppFooter */],
                __WEBPACK_IMPORTED_MODULE_0_app_view_component_datastack__["a" /* DataStackViewComponent */],
                __WEBPACK_IMPORTED_MODULE_27_app_view_component_progressbar__["a" /* DataLoadProgressBar */],
                __WEBPACK_IMPORTED_MODULE_50_app_view_component_data_selection_data_selection_main__["a" /* DataSelectionMainComponent */],
                __WEBPACK_IMPORTED_MODULE_19_app_view_component_charts_overlappingbar__["a" /* OverlapsBarChartComponent */],
                __WEBPACK_IMPORTED_MODULE_20_app_view_component_charts_similarity__["a" /* SimilarityBarChartComponent */],
                __WEBPACK_IMPORTED_MODULE_36_app_view_component_data_selection_select_annotations__["a" /* SelectAnnotationsComponent */],
                __WEBPACK_IMPORTED_MODULE_38_app_view_component_data_selection_select_datasets__["a" /* SelectDatasetsComponent */],
                __WEBPACK_IMPORTED_MODULE_35_app_view_component_data_selection_select_experiments__["a" /* SelectExperimentsComponent */],
                __WEBPACK_IMPORTED_MODULE_34_app_view_component_data_selection_select_tiling_regions__["a" /* SelectTilingRegionsComponent */],
                __WEBPACK_IMPORTED_MODULE_37_app_view_component_data_selection_select_genes__["a" /* SelectGenesComponent */],
                __WEBPACK_IMPORTED_MODULE_39_app_view_component_data_selection_select_databases__["a" /* SelectDatabasesComponent */],
                __WEBPACK_IMPORTED_MODULE_51_app_view_screen_initial__["a" /* InitialScreenComponent */],
                __WEBPACK_IMPORTED_MODULE_21_app_view_screen_data_selection__["a" /* DataSelectionScreen */],
                __WEBPACK_IMPORTED_MODULE_55_app_view_screen_comparison_selection__["a" /* ComparisonSelectionScreen */],
                __WEBPACK_IMPORTED_MODULE_22_app_view_screen_regions__["a" /* RegionsScreen */],
                __WEBPACK_IMPORTED_MODULE_26_app_view_screen_similar_finder__["a" /* SimilarFinder */],
                __WEBPACK_IMPORTED_MODULE_33_app_view_component_biosources__["a" /* BioSourcesScreenComponent */],
                __WEBPACK_IMPORTED_MODULE_32_app_view_screen_chromatin_states__["a" /* ChromatinStatesScreenComponent */],
                __WEBPACK_IMPORTED_MODULE_23_app_view_screen_genes__["a" /* GenesScreen */],
                __WEBPACK_IMPORTED_MODULE_24_app_view_screen_go_enrichment__["a" /* GoEnrichmentScreenComponent */],
                __WEBPACK_IMPORTED_MODULE_25_app_view_screen_overlap_enrichment__["a" /* OverlapEnrichmentScreenComponent */],
                __WEBPACK_IMPORTED_MODULE_48_app_view_screen_peaks_overlap__["a" /* PeaksOverlapScreenComponent */],
                __WEBPACK_IMPORTED_MODULE_41_app_view_component_deepblue__["b" /* SelectedDataView */],
                __WEBPACK_IMPORTED_MODULE_41_app_view_component_deepblue__["a" /* SelectedDataButton */],
                __WEBPACK_IMPORTED_MODULE_40_app_view_component_data_info_box__["a" /* DataInfoBoxComponent */],
                __WEBPACK_IMPORTED_MODULE_42_app_view_component_menu_length_filtering__["a" /* LengthMenuFilterComponent */],
                __WEBPACK_IMPORTED_MODULE_43_app_view_component_menu_dna_pattern_filtering__["a" /* DnaPatternMenuFilterComponent */],
                __WEBPACK_IMPORTED_MODULE_44_app_view_component_menu_columns_filtering__["a" /* ColumnsMenuFilterComponent */],
                __WEBPACK_IMPORTED_MODULE_45_app_view_component_data_selection_upload_regions__["a" /* RegionsUpload */],
                __WEBPACK_IMPORTED_MODULE_46_app_view_component_data_selection_paste_regions__["a" /* RegionsPaste */],
                __WEBPACK_IMPORTED_MODULE_52_app_view_component_query_flow__["a" /* QueryFlow */],
                __WEBPACK_IMPORTED_MODULE_47_app_view_component_data_selection_select_query__["a" /* SelectQuery */]
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_7__angular_common__["LocationStrategy"], useClass: __WEBPACK_IMPORTED_MODULE_7__angular_common__["HashLocationStrategy"] },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_28_angular2_highcharts_dist_HighchartsService__["HighchartsStatic"],
                    useFactory: highchartsFactory
                },
                __WEBPACK_IMPORTED_MODULE_53_app_service_menu__["a" /* DiveMenuService */],
                __WEBPACK_IMPORTED_MODULE_9_primeng_primeng__["ConfirmationService"],
                __WEBPACK_IMPORTED_MODULE_17_app_service_deepblue__["a" /* DeepBlueService */],
                __WEBPACK_IMPORTED_MODULE_54_app_service_router_guard__["a" /* RouterGuard */],
                __WEBPACK_IMPORTED_MODULE_18_app_service_progresselement__["a" /* ProgressElement */],
                __WEBPACK_IMPORTED_MODULE_1_app_service_datastack__["b" /* DataStackFactory */],
                __WEBPACK_IMPORTED_MODULE_2_app_service_selecteddata__["a" /* SelectedData */],
                __WEBPACK_IMPORTED_MODULE_49_app_service_requests_manager__["a" /* RequestManager */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_31__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_view_screen_data_selection__ = __webpack_require__("../../../../../src/app/view/screen/data-selection.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_view_screen_regions__ = __webpack_require__("../../../../../src/app/view/screen/regions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_view_screen_chromatin_states__ = __webpack_require__("../../../../../src/app/view/screen/chromatin_states.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_view_screen_genes__ = __webpack_require__("../../../../../src/app/view/screen/genes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_view_screen_overlap_enrichment__ = __webpack_require__("../../../../../src/app/view/screen/overlap-enrichment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__view_screen_go_enrichment__ = __webpack_require__("../../../../../src/app/view/screen/go-enrichment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_view_screen_peaks_overlap__ = __webpack_require__("../../../../../src/app/view/screen/peaks-overlap.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_view_screen_similar_finder__ = __webpack_require__("../../../../../src/app/view/screen/similar-finder.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_view_screen_initial__ = __webpack_require__("../../../../../src/app/view/screen/initial.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_service_router_guard__ = __webpack_require__("../../../../../src/app/service/router-guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_view_screen_comparison_selection__ = __webpack_require__("../../../../../src/app/view/screen/comparison-selection.ts");












var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_9_app_view_screen_initial__["a" /* InitialScreenComponent */] },
    { path: 'dataselection', component: __WEBPACK_IMPORTED_MODULE_1_app_view_screen_data_selection__["a" /* DataSelectionScreen */] },
    { path: 'comparisonselection', component: __WEBPACK_IMPORTED_MODULE_11_app_view_screen_comparison_selection__["a" /* ComparisonSelectionScreen */], canActivate: [__WEBPACK_IMPORTED_MODULE_10_app_service_router_guard__["a" /* RouterGuard */]] },
    { path: 'similarfinder', component: __WEBPACK_IMPORTED_MODULE_8_app_view_screen_similar_finder__["a" /* SimilarFinder */], canActivate: [__WEBPACK_IMPORTED_MODULE_10_app_service_router_guard__["a" /* RouterGuard */]] },
    { path: 'regions', component: __WEBPACK_IMPORTED_MODULE_2_app_view_screen_regions__["a" /* RegionsScreen */], canActivate: [__WEBPACK_IMPORTED_MODULE_10_app_service_router_guard__["a" /* RouterGuard */]] },
    { path: 'genes', component: __WEBPACK_IMPORTED_MODULE_4_app_view_screen_genes__["a" /* GenesScreen */], canActivate: [__WEBPACK_IMPORTED_MODULE_10_app_service_router_guard__["a" /* RouterGuard */]] },
    { path: 'go_enrichment', component: __WEBPACK_IMPORTED_MODULE_6__view_screen_go_enrichment__["a" /* GoEnrichmentScreenComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_10_app_service_router_guard__["a" /* RouterGuard */]] },
    { path: 'chromatin_states', component: __WEBPACK_IMPORTED_MODULE_3_app_view_screen_chromatin_states__["a" /* ChromatinStatesScreenComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_10_app_service_router_guard__["a" /* RouterGuard */]] },
    { path: 'overlap_enrichment', component: __WEBPACK_IMPORTED_MODULE_5_app_view_screen_overlap_enrichment__["a" /* OverlapEnrichmentScreenComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_10_app_service_router_guard__["a" /* RouterGuard */]] },
    { path: 'peaks_overlap', component: __WEBPACK_IMPORTED_MODULE_7_app_view_screen_peaks_overlap__["a" /* PeaksOverlapScreenComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_10_app_service_router_guard__["a" /* RouterGuard */]] }
];
var AppRoutes = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forRoot(routes);


/***/ }),

/***/ "../../../../../src/app/app.topbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppTopBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_components_multiselect_multiselect__ = __webpack_require__("../../../../primeng/components/multiselect/multiselect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_components_multiselect_multiselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_components_multiselect_multiselect__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var AppTopBar = /** @class */ (function () {
    function AppTopBar(app, deepBlueService) {
        this.app = app;
        this.deepBlueService = deepBlueService;
        this.genomeItems = [];
        this.selectedGenome = null;
        this.projectItems = [];
        this.selectedProjects = [];
        this.defaultSelectProjects = 'Select the Projects';
    }
    AppTopBar.prototype.ngOnInit = function () {
        var _this = this;
        this.deepBlueService.genomeValue$.subscribe(function () { return _this.updateProjects(); });
        this.deepBlueService.getGenomes().subscribe(function (genomes) {
            _this.deepBlueService.setGenome(genomes[0]);
            for (var _i = 0, genomes_1 = genomes; _i < genomes_1.length; _i++) {
                var genome = genomes_1[_i];
                var item = { label: genome.name, value: genome };
                _this.genomeItems.push(item);
                if (!_this.selectedGenome) {
                    _this.genomesDropdown.selectItem(null, item);
                }
            }
        });
    };
    AppTopBar.prototype.updateProjects = function () {
        var _this = this;
        this.deepBlueService.listProjects().subscribe(function (projects) {
            _this.projectItems = [];
            _this.selectedProjects = [];
            for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
                var project = projects_1[_i];
                var item = { label: project.name, value: project };
                _this.projectItems.push(item);
                _this.selectedProjects.push(item.value);
            }
            _this.selectProjects({ value: projects });
            _this.multiselect.updateLabel();
            console.log(_this.projectItems, _this.projectItems.length);
        });
    };
    AppTopBar.prototype.selectGenome = function ($event) {
        this.deepBlueService.setGenome($event.value);
    };
    AppTopBar.prototype.selectProjects = function ($event) {
        this.deepBlueService.setProjects($event.value);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('genomesDropdown'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["Dropdown"])
    ], AppTopBar.prototype, "genomesDropdown", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('multiselect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_primeng_components_multiselect_multiselect__["MultiSelect"])
    ], AppTopBar.prototype, "multiselect", void 0);
    AppTopBar = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-topbar',
            template: "\n        <div class=\"topbar clearfix\">\n            <div class=\"topbar-left\">\n                <div class=\"logo\"></div>\n            </div>\n\n            <div class=\"topbar-right\">\n                <a id=\"menu-button\" href=\"#\" (click)=\"app.onMenuButtonClick($event)\">\n                    <i></i>\n                </a>\n\n                <a id=\"topbar-menu-button\" href=\"#\" (click)=\"app.onTopbarMenuButtonClick($event)\">\n                    <i class=\"material-icons\">menu</i>\n                </a>\n\n                <ul class=\"topbar-items animated fadeInDown\" [ngClass]=\"{'topbar-items-visible': app.topbarMenuActive}\">\n                    <li style=\"width:175px\">\n                        <p-toolbar>\n                            <div class=\"ui-toolbar-group-left\">\n                                <div class=\"ui-inputgroup\">\n                                    <span class=\"ui-inputgroup-addon\" style=\"border-style: none\">Genome</span>\n                                    <p-dropdown #genomesDropdown [options]=\"genomeItems\" [style]=\"{'width':'75px'}\" (onChange)=\"selectGenome($event)\"  [(ngModel)]=\"selectedGenome\"></p-dropdown>\n                                </div>\n                                </div>\n                        </p-toolbar>\n                    </li>\n                    <li style=\"width:250px\">\n                        <p-toolbar>\n                            <div class=\"ui-toolbar-group-left\">\n                                <div class=\"ui-inputgroup\">\n                                    <span class=\"ui-inputgroup-addon\" style=\"border-style: none\">Projects</span>\n                                    <p-multiSelect #multiselect [defaultLabel]=\"defaultSelectProjects\" [options]=\"projectItems\" [(ngModel)]=\"selectedProjects\" (onChange)=\"selectProjects($event)\"></p-multiSelect>\n                                </div>\n                            </div>\n                        </p-toolbar>\n                    </li>\n                    <li style=\"width:475px\">\n                        <p-toolbar>\n                            <div class=\"ui-toolbar-group-left\">\n                                <label>Dive is in test. Please, give your <a target=\"_blank\" style=\"color: yellow\" href=\"https://deepblue.userecho.com/\">click here for feedback and suggestions</a></label>\n                            </div>\n                        </p-toolbar>\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n    "
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_3__service_deepblue__["a" /* DeepBlueService */]])
    ], AppTopBar);
    return AppTopBar;
}());



/***/ }),

/***/ "../../../../../src/app/domain/deepblue.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return Id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return Name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return IdName; });
/* unused harmony export IdNameCount */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return EpigeneticMark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BioSource; });
/* unused harmony export Technique */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return Project; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Annotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Experiment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return Genome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return GeneModel; });
/* unused harmony export Gene */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return FullMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FullAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return FullGeneModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return FullExperiment; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Id = /** @class */ (function () {
    function Id(id) {
        this.id = id;
    }
    Id.prototype.key = function () {
        return this.id;
    };
    Id.prototype.clone = function () {
        return new Id(this.id);
    };
    Id.prototype.text = function () {
        return 'ID: ' + this.id;
    };
    return Id;
}());

var Name = /** @class */ (function () {
    function Name(name) {
        this.name = name;
    }
    Name.prototype.key = function () {
        return this.name;
    };
    Name.prototype.text = function () {
        throw name;
    };
    Name.prototype.clone = function () {
        return new Name(this.name);
    };
    return Name;
}());

var IdName = /** @class */ (function (_super) {
    __extends(IdName, _super);
    function IdName(id, name) {
        var _this = _super.call(this, name) || this;
        _this.id = id;
        _this.name = name;
        return _this;
    }
    IdName.prototype.key = function () {
        return this.id.id;
    };
    IdName.prototype.clone = function () {
        return new IdName(this.id, this.name);
    };
    IdName.prototype.text = function () {
        return this.name + "(" + this.id + ")";
    };
    return IdName;
}(Name));

var IdNameCount = /** @class */ (function (_super) {
    __extends(IdNameCount, _super);
    /*

            count: number;

            constructor(data: string[]) {
                super(new Id(data[0]), data[1]);
                if (data.length >= 2) {
                    this.count = parseInt(data[2]);
                } else {
                    this.count = -1;
                }
            }
        }
    */
    function IdNameCount(id, name, count) {
        var _this = _super.call(this, id, name) || this;
        _this.id = id;
        _this.name = name;
        _this.count = count;
        return _this;
    }
    IdNameCount.prototype.Count = function () {
        return this.count;
    };
    IdNameCount.prototype.clone = function () {
        return new IdNameCount(this.id, this.name, this.count);
    };
    return IdNameCount;
}(IdName));

var EpigeneticMark = /** @class */ (function (_super) {
    __extends(EpigeneticMark, _super);
    function EpigeneticMark(data) {
        return _super.call(this, new Id(data[0]), data[1]) || this;
    }
    return EpigeneticMark;
}(IdName));

var BioSource = /** @class */ (function (_super) {
    __extends(BioSource, _super);
    function BioSource(data) {
        return _super.call(this, new Id(data[0]), data[1]) || this;
    }
    return BioSource;
}(IdName));

var Technique = /** @class */ (function (_super) {
    __extends(Technique, _super);
    function Technique(data) {
        return _super.call(this, new Id(data[0]), data[1]) || this;
    }
    return Technique;
}(IdName));

var Project = /** @class */ (function (_super) {
    __extends(Project, _super);
    function Project(data) {
        return _super.call(this, new Id(data[0]), data[1]) || this;
    }
    return Project;
}(IdName));

var Annotation = /** @class */ (function (_super) {
    __extends(Annotation, _super);
    function Annotation(data) {
        return _super.call(this, new Id(data[0]), data[1]) || this;
    }
    return Annotation;
}(IdName));

var Experiment = /** @class */ (function (_super) {
    __extends(Experiment, _super);
    function Experiment(data) {
        return _super.call(this, new Id(data[0]), data[1]) || this;
    }
    return Experiment;
}(IdName));

var Genome = /** @class */ (function (_super) {
    __extends(Genome, _super);
    function Genome(data) {
        return _super.call(this, new Id(data[0]), data[1]) || this;
    }
    return Genome;
}(IdName));

var GeneModel = /** @class */ (function (_super) {
    __extends(GeneModel, _super);
    function GeneModel(data) {
        return _super.call(this, new Id(data[0]), data[1]) || this;
    }
    return GeneModel;
}(IdName));

var Gene = /** @class */ (function (_super) {
    __extends(Gene, _super);
    function Gene(data) {
        var _this = _super.call(this, new Id(data["_id"]), data["gene_name"]) || this;
        _this.data = data;
        return _this;
    }
    Gene.prototype.gene_id = function () {
        return this.data["gene_id"];
    };
    Gene.prototype.gene_name = function () {
        return this.data["gene_name"];
    };
    return Gene;
}(IdName));

var FullMetadata = /** @class */ (function (_super) {
    __extends(FullMetadata, _super);
    function FullMetadata(data) {
        var _this = _super.call(this, new Id(data["_id"]), data["name"]) || this;
        _this.values = data;
        return _this;
    }
    FullMetadata.fromObject = function (o) {
        return new FullMetadata(o.values);
    };
    FullMetadata.prototype.get = function (key) {
        return this.values[key];
    };
    FullMetadata.prototype.genome = function () {
        return this.values['genome'];
    };
    FullMetadata.prototype.description = function () {
        return this.values['description'];
    };
    FullMetadata.prototype.format = function () {
        return this.values['format'];
    };
    FullMetadata.prototype.columns = function () {
        return this.values['columns'];
    };
    return FullMetadata;
}(IdName));

var FullAnnotation = /** @class */ (function (_super) {
    __extends(FullAnnotation, _super);
    function FullAnnotation(data) {
        return _super.call(this, data) || this;
    }
    return FullAnnotation;
}(FullMetadata));

var FullGeneModel = /** @class */ (function (_super) {
    __extends(FullGeneModel, _super);
    function FullGeneModel(data) {
        return _super.call(this, data) || this;
    }
    return FullGeneModel;
}(FullMetadata));

var FullExperiment = /** @class */ (function (_super) {
    __extends(FullExperiment, _super);
    function FullExperiment(data) {
        return _super.call(this, data) || this;
    }
    FullExperiment.prototype.sample_info = function () {
        return this.values['sample_info'];
    };
    FullExperiment.prototype.biosource = function () {
        return this.sample_info()['biosource_name'];
    };
    FullExperiment.prototype.sample_id = function () {
        return this.values['sample_id'];
    };
    FullExperiment.prototype.epigenetic_mark = function () {
        return this.values['epigenetic_mark'];
    };
    FullExperiment.prototype.technique = function () {
        return this.values['technique'];
    };
    FullExperiment.prototype.project = function () {
        return this.values['project'];
    };
    return FullExperiment;
}(FullMetadata));



/***/ }),

/***/ "../../../../../src/app/domain/operations.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DeepBlueResultStatus */
/* unused harmony export DeepBlueCommandExecutionResult */
/* unused harmony export AbstractNamedDataType */
/* unused harmony export AbstractDataParameter */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DeepBlueEmptyParameter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeepBlueDataParameter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return DeepBlueOperationArgs; });
/* unused harmony export DeepBlueMetadataParameters */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DeepBlueFilterParameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return DeepBlueOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return DeepBlueTiling; });
/* unused harmony export DeepBlueIntersection */
/* unused harmony export DeepBlueAggregate */
/* unused harmony export DeepBlueFilter */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return DeepBlueOperationError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return DeepBlueResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return StackValue; });
/* unused harmony export DeepBlueError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DeepBlueMiddlewareGOEnrichtmentResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return DeepBlueMiddlewareOverlapEnrichtmentResult; });
/* unused harmony export AbstractDeepBlueRequest */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return DeepBlueRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return DeepBlueMiddlewareRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return DeepBlueMiddlewareOverlapEnrichtmentResultItem; });
/* harmony export (immutable) */ __webpack_exports__["o"] = toClass;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deepblue__ = __webpack_require__("../../../../../src/app/domain/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__ = __webpack_require__("../../../../../src/app/domain/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_querystring__ = __webpack_require__("../../../../querystring-es3/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_querystring___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_querystring__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



function clone(obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj)
        return obj;
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}
function textify(obj) {
    if ("string" == typeof obj) {
        return obj;
    }
    if ("number" == typeof obj) {
        return obj.toString();
    }
    // Handle Date
    if (obj instanceof Date) {
        return obj.toDateString();
    }
    // Handle Array
    if (obj instanceof Array) {
        var text = "";
        for (var i = 0, len = obj.length; i < len; i++) {
            text += textify(obj[i]);
        }
        return text;
    }
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) {
        return "";
    }
    // Handle Object
    if (obj instanceof Object) {
        var text = "";
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                text += textify(obj[attr]);
            }
        }
        return text;
    }
    throw new Error("Unable to textify " + obj + "! Its type isn't supported.");
}
var DeepBlueResultStatus;
(function (DeepBlueResultStatus) {
    DeepBlueResultStatus["Error"] = "error";
    DeepBlueResultStatus["Okay"] = "okay";
})(DeepBlueResultStatus || (DeepBlueResultStatus = {}));
var DeepBlueCommandExecutionResult = /** @class */ (function () {
    function DeepBlueCommandExecutionResult(status, result) {
        this.status = status;
        this.result = result;
    }
    return DeepBlueCommandExecutionResult;
}());

var AbstractNamedDataType = /** @class */ (function () {
    function AbstractNamedDataType(_data_type) {
        this._data_type = _data_type;
    }
    AbstractNamedDataType.prototype.dataType = function () {
        return this._data_type;
    };
    return AbstractNamedDataType;
}());

var AbstractDataParameter = /** @class */ (function (_super) {
    __extends(AbstractDataParameter, _super);
    function AbstractDataParameter(_data_type) {
        var _this = _super.call(this, _data_type) || this;
        _this._data_type = _data_type;
        return _this;
    }
    AbstractDataParameter.prototype.dataType = function () {
        return this._data_type;
    };
    return AbstractDataParameter;
}(AbstractNamedDataType));

var DeepBlueEmptyParameter = /** @class */ (function (_super) {
    __extends(DeepBlueEmptyParameter, _super);
    function DeepBlueEmptyParameter() {
        return _super.call(this, "empty_parameter") || this;
    }
    DeepBlueEmptyParameter.prototype.name = function () {
        return "";
    };
    DeepBlueEmptyParameter.prototype.id = function () {
        return null;
    };
    DeepBlueEmptyParameter.prototype.key = function () {
        return "";
    };
    DeepBlueEmptyParameter.prototype.clone = function (request_count) {
        return this;
    };
    DeepBlueEmptyParameter.prototype.text = function () {
        return "";
    };
    return DeepBlueEmptyParameter;
}(AbstractDataParameter));

var DeepBlueDataParameter = /** @class */ (function (_super) {
    __extends(DeepBlueDataParameter, _super);
    function DeepBlueDataParameter(_data) {
        var _this = _super.call(this, "data_parameter") || this;
        _this._data = _data;
        return _this;
    }
    DeepBlueDataParameter.prototype.name = function () {
        if (this._data instanceof __WEBPACK_IMPORTED_MODULE_0__deepblue__["m" /* Name */]) {
            return this._data.name;
        }
        else if (typeof this._data === 'string') {
            return this._data;
        }
        else {
            return this._data.join(",");
        }
    };
    DeepBlueDataParameter.prototype.id = function () {
        if (this._data instanceof __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["l" /* IdName */]) {
            return this._data.id;
        }
        if (this._data instanceof __WEBPACK_IMPORTED_MODULE_0__deepblue__["m" /* Name */]) {
            return new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](this._data.name);
        }
        else if (typeof this._data === 'string') {
            return new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](this._data);
        }
        else {
            return new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](this._data.join(","));
        }
    };
    DeepBlueDataParameter.prototype.key = function () {
        return this.id().id + "_" + this.name();
    };
    DeepBlueDataParameter.prototype.clone = function (request_count) {
        return new DeepBlueDataParameter(this._data);
    };
    DeepBlueDataParameter.prototype.text = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_2_querystring__["stringify"])(this._data);
    };
    return DeepBlueDataParameter;
}(AbstractDataParameter));

var DeepBlueOperationArgs = /** @class */ (function (_super) {
    __extends(DeepBlueOperationArgs, _super);
    function DeepBlueOperationArgs(args) {
        var _this = _super.call(this, "operation_args") || this;
        _this.args = args;
        return _this;
    }
    DeepBlueOperationArgs.prototype.key = function () {
        return textify(this.args);
    };
    DeepBlueOperationArgs.prototype.clone = function () {
        return new DeepBlueOperationArgs(clone(this.args));
    };
    DeepBlueOperationArgs.prototype.asKeyValue = function () {
        return this.args;
    };
    DeepBlueOperationArgs.prototype.text = function () {
        return textify(this.args);
    };
    DeepBlueOperationArgs.prototype.name = function () {
        return this.text();
    };
    DeepBlueOperationArgs.prototype.id = function () {
        throw new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](this.text());
    };
    return DeepBlueOperationArgs;
}(AbstractDataParameter));

var DeepBlueMetadataParameters = /** @class */ (function (_super) {
    __extends(DeepBlueMetadataParameters, _super);
    function DeepBlueMetadataParameters(genome, type, epigenetic_mark, biosource, sample, technique, project) {
        var _this = _super.call(this, "metadata_parameters") || this;
        _this.genome = genome;
        _this.type = type;
        _this.epigenetic_mark = epigenetic_mark;
        _this.biosource = biosource;
        _this.sample = sample;
        _this.technique = technique;
        _this.project = project;
        return _this;
    }
    DeepBlueMetadataParameters.prototype.key = function () {
        var key = "";
        if (this.genome)
            key += this.genome;
        if (this.type)
            key += this.type;
        if (this.epigenetic_mark)
            key += this.epigenetic_mark;
        if (this.biosource)
            key += this.biosource;
        if (this.sample)
            key += this.sample;
        if (this.technique)
            key += this.technique;
        if (this.project)
            key += this.project;
        return key;
    };
    DeepBlueMetadataParameters.prototype.clone = function () {
        return new DeepBlueMetadataParameters(this.genome, this.type, this.epigenetic_mark, this.biosource, this.sample, this.technique, this.project);
    };
    DeepBlueMetadataParameters.prototype.asKeyValue = function () {
        var params = {};
        if (this.genome) {
            params['genome'] = this.genome;
        }
        if (this.type) {
            params['type'] = this.type;
        }
        if (this.epigenetic_mark) {
            params['epigenetic_mark'] = this.epigenetic_mark;
        }
        if (this.biosource) {
            params['biosource'] = this.biosource;
        }
        if (this.sample) {
            params['sample'] = this.sample;
        }
        if (this.technique) {
            params['technique'] = this.technique;
        }
        if (this.project) {
            params['project'] = this.project;
        }
        return params;
    };
    DeepBlueMetadataParameters.prototype.text = function () {
        return textify(this.asKeyValue());
    };
    DeepBlueMetadataParameters.prototype.name = function () {
        return "Metadata Parameters: " + textify(this.asKeyValue());
    };
    DeepBlueMetadataParameters.prototype.id = function () {
        return new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](textify(this.asKeyValue()));
    };
    return DeepBlueMetadataParameters;
}(AbstractDataParameter));

var DeepBlueFilterParameters = /** @class */ (function (_super) {
    __extends(DeepBlueFilterParameters, _super);
    function DeepBlueFilterParameters(field, operation, value, type) {
        var _this = _super.call(this, "filter_parameters") || this;
        _this.field = field;
        _this.operation = operation;
        _this.value = value;
        _this.type = type;
        return _this;
    }
    DeepBlueFilterParameters.fromObject = function (o) {
        return new DeepBlueFilterParameters(o.field, o.operation, o.value, o.type);
    };
    DeepBlueFilterParameters.prototype.asKeyValue = function () {
        var params = {};
        params["field"] = this.field;
        params["operation"] = this.operation;
        params["value"] = this.value;
        params["type"] = this.type;
        return params;
    };
    DeepBlueFilterParameters.prototype.text = function () {
        return JSON.stringify(this.asKeyValue());
    };
    DeepBlueFilterParameters.prototype.clone = function () {
        return new DeepBlueFilterParameters(this.field, this.operation, this.value, this.type);
    };
    DeepBlueFilterParameters.prototype.name = function () {
        return "Filter Parameters: " + textify(this.asKeyValue);
    };
    DeepBlueFilterParameters.prototype.id = function () {
        return new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](textify(this.asKeyValue));
    };
    DeepBlueFilterParameters.prototype.key = function () {
        return this.id().id;
    };
    return DeepBlueFilterParameters;
}(AbstractDataParameter));

var DeepBlueOperation = /** @class */ (function (_super) {
    __extends(DeepBlueOperation, _super);
    function DeepBlueOperation(_data, query_id, command, request_count, cached) {
        if (cached === void 0) { cached = false; }
        var _this = _super.call(this, "data_operation") || this;
        _this._data = _data;
        _this.query_id = query_id;
        _this.command = command;
        _this.request_count = request_count;
        _this.cached = cached;
        return _this;
    }
    DeepBlueOperation.prototype.data = function () {
        return this._data;
    };
    DeepBlueOperation.prototype.mainOperation = function () {
        if (this._data instanceof DeepBlueOperation) {
            return this._data.mainOperation();
        }
        return this;
    };
    DeepBlueOperation.prototype.clone = function (request_count) {
        if (request_count === void 0) { request_count = -1; }
        return new DeepBlueOperation(this._data, this.query_id, this.command, request_count, this.cached);
    };
    DeepBlueOperation.prototype.cacheIt = function (query_id) {
        return new DeepBlueOperation(this._data, query_id, this.command, this.request_count, true);
    };
    DeepBlueOperation.prototype.key = function () {
        return this.query_id.id;
    };
    DeepBlueOperation.prototype.text = function () {
        return this.command + " " + this._data.name();
    };
    DeepBlueOperation.prototype.name = function () {
        return this._data.name();
    };
    DeepBlueOperation.prototype.id = function () {
        return this.query_id;
    };
    return DeepBlueOperation;
}(AbstractNamedDataType));

var DeepBlueTiling = /** @class */ (function (_super) {
    __extends(DeepBlueTiling, _super);
    function DeepBlueTiling(size, genome, chromosomes, query_id, request_count, cached) {
        if (cached === void 0) { cached = false; }
        var _this = _super.call(this, "tiling") || this;
        _this.size = size;
        _this.genome = genome;
        _this.chromosomes = chromosomes;
        _this.query_id = query_id;
        _this.request_count = request_count;
        _this.cached = cached;
        return _this;
    }
    DeepBlueTiling.prototype.data = function () {
        return new DeepBlueDataParameter(new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["l" /* IdName */](this.query_id, "Tiling Regions of " + this.size.toLocaleString() + "bp"));
    };
    DeepBlueTiling.prototype.mainOperation = function () {
        return this;
    };
    DeepBlueTiling.prototype.clone = function (request_count) {
        if (request_count === void 0) { request_count = -1; }
        return new DeepBlueTiling(this.size, this.genome, this.chromosomes, this.query_id, this.request_count, this.cached);
    };
    DeepBlueTiling.prototype.cacheIt = function (query_id) {
        return new DeepBlueTiling(this.size, this.genome, this.chromosomes, this.query_id, this.request_count, true);
    };
    DeepBlueTiling.prototype.key = function () {
        return this.query_id.id;
    };
    DeepBlueTiling.prototype.text = function () {
        return "Tiling regions of " + this.size;
    };
    DeepBlueTiling.prototype.name = function () {
        return this.text();
    };
    DeepBlueTiling.prototype.id = function () {
        return this.query_id;
    };
    return DeepBlueTiling;
}(AbstractNamedDataType));

var DeepBlueIntersection = /** @class */ (function (_super) {
    __extends(DeepBlueIntersection, _super);
    function DeepBlueIntersection(_subject, _filter, query_id, cached) {
        if (cached === void 0) { cached = false; }
        var _this = _super.call(this, _subject.data(), query_id, "intersection") || this;
        _this._subject = _subject;
        _this._filter = _filter;
        _this.query_id = query_id;
        _this.cached = cached;
        return _this;
    }
    DeepBlueIntersection.prototype.clone = function () {
        return new DeepBlueIntersection(this._subject.clone(), this._filter.clone(), this.query_id, this.cached);
    };
    DeepBlueIntersection.prototype.data = function () {
        return this._subject;
    };
    DeepBlueIntersection.prototype.key = function () {
        return "intersect_" + this._subject.id().id + '_' + this._filter.id().id;
    };
    DeepBlueIntersection.prototype.mainOperation = function () {
        return this._subject.mainOperation();
    };
    DeepBlueIntersection.prototype.filter = function () {
        return this._filter;
    };
    DeepBlueIntersection.prototype.cacheIt = function (query_id) {
        return new DeepBlueIntersection(this._subject, this._filter, this.query_id, true);
    };
    DeepBlueIntersection.prototype.text = function () {
        return this._subject.text() + " filtered by " + this._filter.text();
    };
    return DeepBlueIntersection;
}(DeepBlueOperation));

var DeepBlueAggregate = /** @class */ (function (_super) {
    __extends(DeepBlueAggregate, _super);
    function DeepBlueAggregate(_subject, _ranges, field, query_id, cached) {
        if (cached === void 0) { cached = false; }
        var _this = _super.call(this, _subject.data(), query_id, "aggregate") || this;
        _this._subject = _subject;
        _this._ranges = _ranges;
        _this.field = field;
        _this.query_id = query_id;
        _this.cached = cached;
        return _this;
    }
    DeepBlueAggregate.prototype.clone = function () {
        return new DeepBlueIntersection(this._subject.clone(), this._ranges.clone(), this.query_id, this.cached);
    };
    DeepBlueAggregate.prototype.data = function () {
        return this._subject;
    };
    DeepBlueAggregate.prototype.key = function () {
        return "aggreate_" + this._subject.id().id + '_' + this._ranges.id().id;
    };
    DeepBlueAggregate.prototype.mainOperation = function () {
        return this._subject.mainOperation();
    };
    DeepBlueAggregate.prototype.filter = function () {
        return this._ranges;
    };
    DeepBlueAggregate.prototype.cacheIt = function (query_id) {
        return new DeepBlueIntersection(this._subject, this._ranges, this.query_id, true);
    };
    DeepBlueAggregate.prototype.text = function () {
        return this._subject.text() + " aggregated by " + this._ranges.text();
    };
    return DeepBlueAggregate;
}(DeepBlueOperation));

var DeepBlueFilter = /** @class */ (function (_super) {
    __extends(DeepBlueFilter, _super);
    function DeepBlueFilter(_data, _params, query_id, cached) {
        if (cached === void 0) { cached = false; }
        var _this = _super.call(this, _data, query_id, "regions_filter") || this;
        _this._data = _data;
        _this._params = _params;
        _this.query_id = query_id;
        _this.cached = cached;
        return _this;
    }
    DeepBlueFilter.prototype.data = function () {
        return this._data;
    };
    DeepBlueFilter.prototype.mainOperation = function () {
        return this._data.mainOperation();
    };
    DeepBlueFilter.prototype.filter = function () {
        return this._params;
    };
    DeepBlueFilter.prototype.key = function () {
        return "filter_" + this.id().id;
    };
    DeepBlueFilter.prototype.clone = function () {
        return new DeepBlueFilter(this._data.clone(), this._params.clone(), this.query_id, this.cached);
    };
    DeepBlueFilter.prototype.cacheIt = function (query_id) {
        return new DeepBlueFilter(this._data, this._params, this.query_id, this.cached);
    };
    DeepBlueFilter.prototype.text = function () {
        return this._data.text() + "(" + this._params.text() + ")";
    };
    return DeepBlueFilter;
}(DeepBlueOperation));

var DeepBlueOperationError = /** @class */ (function (_super) {
    __extends(DeepBlueOperationError, _super);
    function DeepBlueOperationError(message, request_count) {
        var _this = _super.call(this, "error") || this;
        _this.message = message;
        _this.request_count = request_count;
        return _this;
    }
    DeepBlueOperationError.prototype.data = function () {
        throw new DeepBlueDataParameter(this.message);
    };
    DeepBlueOperationError.prototype.mainOperation = function () {
        return this;
    };
    DeepBlueOperationError.prototype.cacheIt = function (query_id) {
        return this;
    };
    DeepBlueOperationError.prototype.name = function () {
        return this.message;
    };
    DeepBlueOperationError.prototype.id = function () {
        return new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](this.message);
    };
    DeepBlueOperationError.prototype.key = function () {
        return this.message;
    };
    DeepBlueOperationError.prototype.clone = function (request_count) {
        return new DeepBlueOperationError(this.message, this.request_count);
    };
    DeepBlueOperationError.prototype.text = function () {
        return this.message;
    };
    return DeepBlueOperationError;
}(AbstractNamedDataType));

var DeepBlueResult = /** @class */ (function () {
    function DeepBlueResult(request, result, request_count) {
        this.request = request;
        this.result = result;
        this.request_count = request_count;
    }
    DeepBlueResult.fromObject = function (obj) {
        return new DeepBlueResult(DeepBlueRequest.fromObject(obj['request']), obj['result']);
    };
    DeepBlueResult.prototype.clone = function () {
        return new DeepBlueResult(this.request.clone(), this.result, this.request_count);
    };
    DeepBlueResult.prototype.resultAsString = function () {
        return this.result;
    };
    DeepBlueResult.hasResult = function (result, key) {
        return result[key] !== undefined;
    };
    DeepBlueResult.prototype.resultAsCount = function () {
        if (DeepBlueResult.hasResult(this.result, 'count')) {
            return this.result.count;
        }
        else {
            return null;
        }
    };
    DeepBlueResult.prototype.resultAsDistinct = function () {
        if (DeepBlueResult.hasResult(this.result, 'distinct')) {
            return this.result.distinct;
        }
        else {
            return null;
        }
    };
    DeepBlueResult.prototype.resultAsTuples = function () {
        return this.result;
    };
    DeepBlueResult.prototype.resultAsEnrichment = function () {
        if (DeepBlueResult.hasResult(this.result, 'enrichment')) {
            return this.result.enrichment["results"];
        }
        return [];
    };
    DeepBlueResult.prototype.getRequestId = function () {
        return this.request._id;
    };
    DeepBlueResult.prototype.getData = function () {
        return this.request.getData();
    };
    DeepBlueResult.prototype.getFilter = function () {
        return this.request.getFilter();
    };
    return DeepBlueResult;
}());

var StackValue = /** @class */ (function () {
    function StackValue(stack, value) {
        this.stack = stack;
        this.value = value;
    }
    StackValue.prototype.getDeepBlueOperation = function () {
        return this.value;
    };
    StackValue.prototype.getDeepBlueRequest = function () {
        return this.value;
    };
    StackValue.prototype.getDeepBlueResult = function () {
        return this.value;
    };
    return StackValue;
}());

var DeepBlueError = /** @class */ (function (_super) {
    __extends(DeepBlueError, _super);
    function DeepBlueError(request, error, request_count) {
        var _this = _super.call(this, request, error, request_count) || this;
        _this.request = request;
        _this.error = error;
        _this.request_count = request_count;
        return _this;
    }
    DeepBlueError.prototype.getError = function () {
        return this.error;
    };
    return DeepBlueError;
}(DeepBlueResult));

var DeepBlueMiddlewareGOEnrichtmentResult = /** @class */ (function () {
    function DeepBlueMiddlewareGOEnrichtmentResult(data_name, gene_model, results) {
        this.data_name = data_name;
        this.gene_model = gene_model;
        this.results = results;
    }
    DeepBlueMiddlewareGOEnrichtmentResult.fromObject = function (obj) {
        return new DeepBlueMiddlewareGOEnrichtmentResult(obj['data_name'], obj['gene_model'], obj['results']);
    };
    DeepBlueMiddlewareGOEnrichtmentResult.prototype.getDataName = function () {
        return this.data_name;
    };
    DeepBlueMiddlewareGOEnrichtmentResult.prototype.getGeneModel = function () {
        return this.gene_model;
    };
    DeepBlueMiddlewareGOEnrichtmentResult.prototype.getResults = function () {
        return this.results;
    };
    return DeepBlueMiddlewareGOEnrichtmentResult;
}());

var DeepBlueMiddlewareOverlapEnrichtmentResult = /** @class */ (function () {
    function DeepBlueMiddlewareOverlapEnrichtmentResult(data_name, universe_id, datasets, results) {
        this.data_name = data_name;
        this.universe_id = universe_id;
        this.datasets = datasets;
        this.results = results;
    }
    DeepBlueMiddlewareOverlapEnrichtmentResult.fromObject = function (obj) {
        return new DeepBlueMiddlewareOverlapEnrichtmentResult(obj['data_name'], new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](obj['universe_id']), obj['datasets'], obj['results']['enrichment']['results'].map(function (obj) { return DeepBlueMiddlewareOverlapEnrichtmentResultItem.fromObject(obj); }));
    };
    DeepBlueMiddlewareOverlapEnrichtmentResult.prototype.getDataName = function () {
        return this.data_name;
    };
    DeepBlueMiddlewareOverlapEnrichtmentResult.prototype.getUniverseId = function () {
        return this.universe_id;
    };
    DeepBlueMiddlewareOverlapEnrichtmentResult.prototype.getDatasets = function () {
        return this.datasets;
    };
    DeepBlueMiddlewareOverlapEnrichtmentResult.prototype.getResults = function () {
        return this.results;
    };
    return DeepBlueMiddlewareOverlapEnrichtmentResult;
}());

var AbstractDeepBlueRequest = /** @class */ (function () {
    function AbstractDeepBlueRequest(_id, command) {
        this._id = _id;
        this.command = command;
        this.canceled = false;
    }
    AbstractDeepBlueRequest.prototype.isCanceled = function () {
        return this.canceled;
    };
    AbstractDeepBlueRequest.prototype.cancel = function () {
        this.canceled = true;
    };
    AbstractDeepBlueRequest.prototype.key = function () {
        return this._id.id;
    };
    AbstractDeepBlueRequest.prototype.clone = function (request_count) {
        throw new Error("Method not implemented.");
    };
    AbstractDeepBlueRequest.prototype.text = function () {
        return "Request - " + this.command + "(" + this.id + ")";
    };
    AbstractDeepBlueRequest.prototype.id = function () {
        return this._id;
    };
    return AbstractDeepBlueRequest;
}());

var DeepBlueRequest = /** @class */ (function (_super) {
    __extends(DeepBlueRequest, _super);
    function DeepBlueRequest(_operation, _id, command, request_count) {
        var _this = _super.call(this, _id, command) || this;
        _this._operation = _operation;
        _this._id = _id;
        _this.command = command;
        _this.request_count = request_count;
        return _this;
    }
    DeepBlueRequest.fromObject = function (obj) {
        return new DeepBlueRequest(toClass(obj['_operation']), new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](obj['_id']), obj['command']);
    };
    DeepBlueRequest.prototype.clone = function (request_count) {
        return new DeepBlueRequest(this._operation.clone(), this._id, this.command, request_count);
    };
    DeepBlueRequest.prototype.key = function () {
        return this._id.id;
    };
    DeepBlueRequest.prototype.data = function () {
        return this._operation;
    };
    DeepBlueRequest.prototype.getData = function () {
        return this._operation.data();
    };
    DeepBlueRequest.prototype.getFilter = function () {
        if (this._operation.filter) {
            return this._operation.filter();
        }
        else {
            return null;
        }
    };
    DeepBlueRequest.prototype.text = function () {
        throw "Request: " + this._id.id;
    };
    DeepBlueRequest.prototype.id = function () {
        return this._id;
    };
    return DeepBlueRequest;
}(AbstractDeepBlueRequest));

var DeepBlueMiddlewareRequest = /** @class */ (function (_super) {
    __extends(DeepBlueMiddlewareRequest, _super);
    function DeepBlueMiddlewareRequest(parameters, command, _id) {
        var _this = _super.call(this, _id, command) || this;
        _this.parameters = parameters;
        _this.command = command;
        _this._id = _id;
        return _this;
    }
    DeepBlueMiddlewareRequest.prototype.clone = function (request_count) {
        return new DeepBlueMiddlewareRequest(this.parameters, this.command, this._id);
    };
    DeepBlueMiddlewareRequest.prototype.requestId = function () {
        return this._id;
    };
    DeepBlueMiddlewareRequest.prototype.key = function () {
        return this._id.id;
    };
    DeepBlueMiddlewareRequest.prototype.text = function () {
        return "MiddlewareRequest: " + this._id.id;
    };
    return DeepBlueMiddlewareRequest;
}(AbstractDeepBlueRequest));

var DeepBlueMiddlewareOverlapEnrichtmentResultItem = /** @class */ (function () {
    function DeepBlueMiddlewareOverlapEnrichtmentResultItem(dataset, biosource, epigenetic_mark, description, experiment_size, database_name, p_value_log, odds_ratio, support, b, c, d, support_rank, log_rank, odd_rank, max_rank, mean_rank, data) {
        this.dataset = dataset;
        this.biosource = biosource;
        this.epigenetic_mark = epigenetic_mark;
        this.description = description;
        this.experiment_size = experiment_size;
        this.database_name = database_name;
        this.p_value_log = p_value_log;
        this.odds_ratio = odds_ratio;
        this.support = support;
        this.b = b;
        this.c = c;
        this.d = d;
        this.support_rank = support_rank;
        this.log_rank = log_rank;
        this.odd_rank = odd_rank;
        this.max_rank = max_rank;
        this.mean_rank = mean_rank;
        this.data = data;
        // JSON does not send infinity values, so we have to fix it manually.
        this.p_value_log = this.p_value_log != null ? this.p_value_log : Infinity;
        this.odds_ratio = this.odds_ratio != null ? this.odds_ratio : Infinity;
    }
    DeepBlueMiddlewareOverlapEnrichtmentResultItem.fromObject = function (obj) {
        return new DeepBlueMiddlewareOverlapEnrichtmentResultItem(obj['dataset'], obj['biosource'], obj['epigenetic_mark'], obj['description'], obj['experiment_size'], obj['database_name'], obj['p_value_log'], obj['odds_ratio'], obj['support'], obj['b'], obj['c'], obj['d'], obj['support_rank'], obj['log_rank'], obj['odd_rank'], obj['max_rank'], obj['mean_rank'], obj);
    };
    DeepBlueMiddlewareOverlapEnrichtmentResultItem.asColumns = function () {
        return [
            { name: 'dataset', prop: 'dataset', column_type: 'string' },
            { name: 'biosource', prop: 'biosource', column_type: 'string' },
            { name: 'epigenetic_mark', prop: 'epigeneticmark', column_type: 'string' },
            { name: 'description', prop: 'description', column_type: 'string' },
            { name: 'experiment_size', prop: 'experimentsize', column_type: 'integer' },
            { name: 'database_name', prop: 'databasename', column_type: 'string' },
            { name: 'p_value_log', prop: 'pvaluelog', column_type: 'double' },
            { name: 'odds_ratio', prop: 'oddsratio', column_type: 'double' },
            { name: 'support', prop: 'support', column_type: 'integer' },
            { name: 'b', prop: 'b', column_type: 'integer' },
            { name: 'c', prop: 'c', column_type: 'integer' },
            { name: 'd', prop: 'd', column_type: 'integer' },
            { name: 'support_rank', prop: 'supportrank', column_type: 'integer' },
            { name: 'log_rank', prop: 'logrank', column_type: 'integer' },
            { name: 'odd_rank', prop: 'oddrank', column_type: 'integer' },
            { name: 'max_rank', prop: 'maxrank', column_type: 'integer' },
            { name: 'mean_rank', prop: 'meanrank', column_type: 'integer' }
        ];
    };
    return DeepBlueMiddlewareOverlapEnrichtmentResultItem;
}());

function toClass(o) {
    switch (o._data_type) {
        case 'data_parameter': {
            var data = void 0;
            if (o._data.name) {
                data = new __WEBPACK_IMPORTED_MODULE_0__deepblue__["m" /* Name */](o._data.name);
            }
            else {
                data = o._data;
            }
            return new DeepBlueDataParameter(data);
        }
        case 'operation_args': {
            return new DeepBlueOperationArgs(o.args);
        }
        case 'metadata_parameters': {
            return new DeepBlueMetadataParameters(o.genome, o.type, o.epigenetic_mark, o.biosource, o.sample, o.technique, o.project);
        }
        case 'tiling': {
            return new DeepBlueTiling(o.size, o.genome, o.chromosomes, new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](o.query_id.id), o.request_count, o.cached);
        }
        case 'data_operation': {
            switch (o.command) {
                case 'intersection': {
                    var subject = toClass(o._subject);
                    var filter = toClass(o._filter);
                    var query_id = new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](o.query_id.id);
                    return new DeepBlueIntersection(subject, filter, query_id, o.cached);
                }
                case 'aggregate': {
                    var subject = toClass(o._subject);
                    var filter = toClass(o._ranges);
                    var field = o.field;
                    var query_id = new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](o.query_id.id);
                    return new DeepBlueAggregate(subject, filter, field, query_id, o.cached);
                }
                case 'regions_filter': {
                    var data = toClass(o._data);
                    var filter = DeepBlueFilterParameters.fromObject(o._params);
                    var query_id = new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](o.query_id.id);
                    return new DeepBlueFilter(data, filter, query_id, o.cached);
                }
                default: {
                    var data = toClass(o._data);
                    var query_id = new __WEBPACK_IMPORTED_MODULE_1__domain_deepblue__["k" /* Id */](o.query_id.id);
                    return new DeepBlueOperation(data, query_id, o.command, o.request_count, o.cached);
                }
            }
        }
        default: {
            console.warn("Invalid type: ", o._data_type);
        }
    }
}


/***/ }),

/***/ "../../../../../src/app/service/datastack.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DataStackFactory; });
/* unused harmony export DataStackItem */
/* unused harmony export DataStackItems */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataStack; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_domain_operations__ = __webpack_require__("../../../../../src/app/domain/operations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_service_requests_manager__ = __webpack_require__("../../../../../src/app/service/requests-manager.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DataStackFactory = /** @class */ (function () {
    function DataStackFactory(deepBlueService, requestManager, progress_element, router) {
        this.deepBlueService = deepBlueService;
        this.requestManager = requestManager;
        this.progress_element = progress_element;
        this.router = router;
    }
    DataStackFactory.prototype.newDataStack = function () {
        return new DataStack(this.deepBlueService, this.requestManager, this.progress_element, this.router);
    };
    DataStackFactory = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_6_app_service_requests_manager__["a" /* RequestManager */],
            __WEBPACK_IMPORTED_MODULE_5_app_service_progresselement__["a" /* ProgressElement */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]])
    ], DataStackFactory);
    return DataStackFactory;
}());

var DataStackItem = /** @class */ (function () {
    function DataStackItem(op, what, description, count) {
        this.op = op;
        this.what = what;
        this.description = description;
        this.count = count;
    }
    DataStackItem.prototype.clone = function () {
        return new DataStackItem(this.op, this.what, this.description, this.count);
    };
    return DataStackItem;
}());

var DataStackItems = /** @class */ (function () {
    function DataStackItems() {
        this._data = [];
        this.topStackSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.topStackValue$ = this.topStackSubject.asObservable();
        this.stackSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.stackValue$ = this.stackSubject.asObservable();
    }
    DataStackItems.prototype.DataStackItems = function () {
        this._data = [];
    };
    DataStackItems.prototype.init = function (data) {
        if (data) {
            this._data = data;
        }
        else {
            this._data = [];
        }
    };
    DataStackItems.prototype.getInitialOperation = function () {
        if (this._data.length > 0) {
            return this._data[0].op;
        }
        return null;
    };
    DataStackItems.prototype.getCurrentOperation = function () {
        if (this._data.length > 0) {
            return this._data[this._data.length - 1].op;
        }
        return null;
    };
    DataStackItems.prototype.push = function (item) {
        this._data.push(item);
        this.topStackSubject.next(item);
        this.stackSubject.next(this._data);
    };
    DataStackItems.prototype.unshift = function (item) {
        this._data.unshift(item);
        this.stackSubject.next(this._data);
    };
    // Return true if the stack is empty
    DataStackItems.prototype.remove = function (data) {
        var query_id = data.op.id().id;
        // find position
        var i = this._data.length - 1;
        for (; i >= 0; i--) {
            if (this._data[i].op.id().id === query_id) {
                break;
            }
        }
        this._data = this._data.slice(0, i);
        if (this._data.length > 0) {
            this.topStackSubject.next(this._data[this._data.length - 1]);
            this.stackSubject.next(this._data);
            return false;
        }
        else {
            this.topStackSubject.next(null);
            this.stackSubject.next(this._data);
            return true;
        }
    };
    DataStackItems.prototype.clone = function () {
        var newStack = [];
        for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
            var item = _a[_i];
            newStack.push(item);
        }
        return newStack;
    };
    DataStackItems.prototype.name = function () {
        var top = this._data[0];
        if (top === undefined) {
            return '(loading..)';
        }
        if (this._data.length > 1) {
            return top.op.data().name() + ' (filtered)';
        }
        else {
            return top.op.data().name();
        }
    };
    return DataStackItems;
}());

var DataStack = /** @class */ (function () {
    function DataStack(deepBlueService, requestManager, progress_element, router) {
        this.deepBlueService = deepBlueService;
        this.requestManager = requestManager;
        this.progress_element = progress_element;
        this.router = router;
        this.color_array = {
            r: 0,
            g: 0,
            b: 0
        };
        this._data = new DataStackItems();
        var random_color = randomColor({ format: 'rgbArray', luminosity: 'dark' });
        this.color_array = {
            r: random_color[0],
            g: random_color[1],
            b: random_color[2]
        };
        this.color = 'rgba(' + this.color_array.r + ',' + this.color_array.g + ',' + this.color_array.b + ', 1)';
    }
    DataStack.prototype.getColor = function (alpha) {
        if (alpha) {
            return 'rgba(' + this.color_array.r + ',' + this.color_array.g + ',' + this.color_array.b + ',' + alpha + ')';
        }
        return 'rgba(' + this.color_array.r + ',' + this.color_array.g + ',' + this.color_array.b + ',' + 1 + ')';
    };
    DataStack.prototype.onColorChange = function ($color) {
        this.color = 'rgba(' + $color.r + ',' + $color.g + ',' + $color.b + ', 1)';
    };
    DataStack.prototype.setInitialData = function (data) {
        var _this = this;
        this._data.init();
        if (data == null) {
            return;
        }
        var request_count = 0;
        this.progress_element.reset(4, request_count);
        // TODO: use/make a generic method for experiments and annotations
        this.deepBlueService.cacheQuery(data, this.progress_element, request_count).subscribe(function (cached_data) {
            _this.deepBlueService.countRegionsRequest(cached_data, _this.progress_element, request_count).subscribe(function (total) {
                var totalSelectedRegtions = total.resultAsCount();
                var dataStackItem = new DataStackItem(cached_data, data.dataType(), data.text(), totalSelectedRegtions);
                _this._data.push(dataStackItem);
                _this.stackOperations(data.data());
            });
        });
    };
    DataStack.prototype.stackOperations = function (data) {
        var _this = this;
        if (!(data instanceof __WEBPACK_IMPORTED_MODULE_3_app_domain_operations__["h" /* DeepBlueOperation */])) {
            return;
        }
        else {
            this.deepBlueService.countRegionsRequest(data, this.progress_element, -1).subscribe(function (total) {
                var totalSelectedRegtions = total.resultAsCount();
                var dataStackItem = new DataStackItem(data, data.dataType(), data.text(), totalSelectedRegtions);
                _this._data.unshift(dataStackItem);
                _this.stackOperations(data.data());
            });
        }
    };
    DataStack.prototype.setInitialDataArray = function (data) {
        this._data.init(data);
    };
    DataStack.prototype.overlap = function (operation) {
        var _this = this;
        var current_op = this.getCurrentOperation();
        if (current_op == null) {
            return;
        }
        var request_count = 0;
        this.progress_element.reset(5, request_count);
        this.requestManager.cancelAllRequest();
        this.deepBlueService.overlap(current_op, operation, 'true', this.progress_element, request_count).subscribe(function (overlap_operation) {
            _this.deepBlueService.cacheQuery(overlap_operation, _this.progress_element, request_count).subscribe(function (cached_data) {
                _this.deepBlueService.countRegionsRequest(cached_data, _this.progress_element, request_count).subscribe(function (total) {
                    var totalSelectedRegtions = total.resultAsCount();
                    var dataStackItem = new DataStackItem(cached_data, cached_data.dataType(), operation.text(), totalSelectedRegtions);
                    _this._data.push(dataStackItem);
                });
            });
        });
    };
    DataStack.prototype.non_overlap = function (operation) {
        var _this = this;
        // TODO: use/make a generic method for experiments and annotations
        var current_op = this.getCurrentOperation();
        if (current_op == null) {
            return;
        }
        var request_count = 0;
        this.progress_element.reset(5, request_count);
        this.requestManager.cancelAllRequest();
        this.deepBlueService.overlap(current_op, operation, 'false', this.progress_element, request_count)
            .subscribe(function (overlap_operation) {
            _this.deepBlueService.cacheQuery(overlap_operation, _this.progress_element, request_count).subscribe(function (cached_data) {
                _this.deepBlueService.countRegionsRequest(cached_data, _this.progress_element, request_count).subscribe(function (total) {
                    var totalSelectedRegtions = total.resultAsCount();
                    var dataStackItem = new DataStackItem(cached_data, cached_data.dataType(), operation.text(), totalSelectedRegtions);
                    _this._data.push(dataStackItem);
                });
            });
        });
    };
    DataStack.prototype.filter_regions = function (field, operation, value, type) {
        var _this = this;
        var request_count = 0;
        this.progress_element.reset(4, request_count);
        var current_op = this.getCurrentOperation();
        if (current_op == null) {
            return;
        }
        this.requestManager.cancelAllRequest();
        this.deepBlueService.filter_region(current_op, field, operation, value, type, this.progress_element, request_count)
            .subscribe(function (filter_operation) {
            _this.deepBlueService.cacheQuery(filter_operation, _this.progress_element, request_count).subscribe(function (cached_data) {
                _this.deepBlueService.countRegionsRequest(cached_data, _this.progress_element, request_count).subscribe(function (total) {
                    var totalSelectedRegtions = total.resultAsCount();
                    var text = field;
                    if (text === '@LENGTH') {
                        text = 'length';
                    }
                    var dataStackItem = new DataStackItem(cached_data, cached_data.dataType(), cached_data.text(), totalSelectedRegtions);
                    _this._data.push(dataStackItem);
                });
            });
        });
    };
    DataStack.prototype.filter_by_dna_motif = function (pattern) {
        var _this = this;
        var request_count = 0;
        this.progress_element.reset(4, request_count);
        var current_op = this.getCurrentOperation();
        if (current_op == null) {
            return;
        }
        this.requestManager.cancelAllRequest();
        this.deepBlueService.findMotif(pattern, this.progress_element, request_count).subscribe(function (motif_op) {
            _this.overlap(motif_op);
        });
    };
    DataStack.prototype.remove = function (data) {
        if (!this._data.remove(data)) {
            this.router.navigate(['/']);
        }
    };
    DataStack.prototype.getData = function () {
        return this._data._data;
    };
    DataStack.prototype.getInitialOperation = function () {
        return this._data.getInitialOperation();
    };
    DataStack.prototype.getCurrentOperation = function () {
        return this._data.getCurrentOperation();
    };
    DataStack.prototype.getTopStackValueObserver = function () {
        return this._data.topStackValue$;
    };
    DataStack.prototype.getStackValueObserver = function () {
        return this._data.stackValue$;
    };
    DataStack.prototype.cloneStackItems = function () {
        return this._data.clone();
    };
    DataStack.prototype.name = function () {
        return this._data.name();
    };
    return DataStack;
}());



/***/ }),

/***/ "../../../../../src/app/service/deepblue.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DataCache */
/* unused harmony export MultiKeyDataCache */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeepBlueService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__ = __webpack_require__("../../../../../src/app/domain/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__domain_operations__ = __webpack_require__("../../../../../src/app/domain/operations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DataCache = /** @class */ (function () {
    function DataCache(_data) {
        if (_data === void 0) { _data = new Map(); }
        this._data = _data;
    }
    DataCache.prototype.put = function (key, value) {
        var cloneValue = value.clone(-1);
        this._data.set(key.key(), cloneValue);
    };
    DataCache.prototype.get = function (key, request_count) {
        var value = this._data.get(key.key());
        if (value) {
            return value.clone(request_count);
        }
        else {
            return null;
        }
    };
    return DataCache;
}());

var MultiKeyDataCache = /** @class */ (function () {
    function MultiKeyDataCache(_data) {
        if (_data === void 0) { _data = new Map(); }
        this._data = _data;
    }
    MultiKeyDataCache.prototype.put = function (keys, value) {
        var key_value = keys.map(function (k) { return k.key(); }).join();
        var cloneValue = value.clone(-1);
        this._data.set(key_value, cloneValue);
    };
    MultiKeyDataCache.prototype.get = function (keys, request_count) {
        var key_value = keys.map(function (k) { return k.key(); }).join();
        var value = this._data.get(key_value);
        if (value) {
            return value.clone(request_count);
        }
        else {
            return null;
        }
    };
    return MultiKeyDataCache;
}());

var DeepBlueService = /** @class */ (function () {
    //
    function DeepBlueService(http, progress_element) {
        this.http = http;
        this.progress_element = progress_element;
        this.deepBlueUrl = 'api';
        // Observable string sources
        this.genomeSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.projectsSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.dataToDiveSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.epigeneticMarkSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["c" /* EpigeneticMark */](['', '']));
        this.dataInfoSelectedSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.selectedBioSources = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        // Observable string streams
        this.genomeValue$ = this.genomeSource.asObservable();
        this.projectsValue$ = this.projectsSource.asObservable();
        this.dataToDiveValue$ = this.dataToDiveSource.asObservable();
        this.epigeneticMarkValue$ = this.epigeneticMarkSource.asObservable();
        this.dataInfoSelectedValue$ = this.dataInfoSelectedSource.asObservable();
        this.selectedBioSourcesValue$ = this.selectedBioSources.asObservable();
        this.idNamesQueryCache = new DataCache();
        this.intersectsQueryCache = new MultiKeyDataCache();
        this.overlapsQueryCache = new DataCache();
        this.filtersQueryCache = new DataCache();
        this.operationCache = new DataCache();
        this.requestCache = new DataCache();
        this.resultCache = new DataCache();
        this.biosourcesCache = null;
        console.info('Starting DeepBlue Service');
    }
    DeepBlueService.prototype.setDataInfoSelected = function (cliked_data) {
        this.dataInfoSelectedSource.next(cliked_data);
    };
    DeepBlueService.prototype.getDataInfoSelected = function () {
        return this.dataInfoSelectedSource.getValue();
    };
    // Service messages
    DeepBlueService.prototype.setGenome = function (genome) {
        this.genomeSource.next(genome);
    };
    DeepBlueService.prototype.setProjects = function (projects) {
        this.projectsSource.next(projects);
    };
    /* Define the annotation that we are going to dive */
    DeepBlueService.prototype.setDataToDive = function (dataToDive) {
        this.dataToDiveSource.next(dataToDive);
    };
    DeepBlueService.prototype.setEpigeneticMark = function (epigeneticMark) {
        this.epigeneticMarkSource.next(epigeneticMark);
    };
    DeepBlueService.prototype.getGenome = function () {
        return this.genomeSource.getValue();
    };
    DeepBlueService.prototype.getDivingData = function () {
        return this.dataToDiveSource.getValue();
    };
    DeepBlueService.prototype.getSelectedEpigeneticMark = function () {
        return this.epigeneticMarkSource.getValue();
    };
    // Functions to select data from the Server
    DeepBlueService.prototype.listEpigeneticMarks = function () {
        if (!this.getGenome()) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', this.getGenome().name)
            .set('controlled_vocabulary', 'epigenetic_marks')
            .set('type', 'peaks');
        return this.http.get(this.deepBlueUrl + '/collection_experiments_count', { params: params })
            .map(this.extractEpigeneticMarks);
    };
    DeepBlueService.prototype.getHistones = function () {
        if (!this.getGenome()) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', this.getGenome().name)
            .set('controlled_vocabulary', 'epigenetic_marks')
            .set('type', 'peaks');
        return this.http.get(this.deepBlueUrl + '/collection_experiments_count', { params: params })
            .map(this.extractHistone);
    };
    DeepBlueService.prototype.getChromatinStateSegments = function () {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', this.getGenome().name);
        return this.http.get(this.deepBlueUrl + '/composed_commands/chromatin_states_by_genome', { params: params })
            .map(function (data) {
            var states = data[1] || [];
            // Remove the numbers and the _
            return Object.keys(states).map(function (k) { return [k, k.replace(/[0-9]+_/, "").replace(/_/g, " ")]; }).sort();
        });
    };
    DeepBlueService.prototype.getAnnotations = function (genome) {
        if (!genome) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', genome.name);
        return this.http.get(this.deepBlueUrl + '/list_annotations', { params: params })
            .map(this.extractAnnotation);
    };
    DeepBlueService.prototype.listBioSources = function () {
        var _this = this;
        if (!this.getGenome()) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', this.getGenome().name)
            .set('controlled_vocabulary', 'biosources')
            .set('type', 'peaks');
        return this.http.get(this.deepBlueUrl + '/collection_experiments_count', { params: params })
            .map(this.extractBioSources)
            .do(function (biosources) { return _this.biosourcesCache = biosources; });
    };
    DeepBlueService.prototype.getBioSourceByName = function (name) {
        for (var _i = 0, _a = this.biosourcesCache; _i < _a.length; _i++) {
            var biosource = _a[_i];
            if (biosource.name.toLowerCase().replace(/[\W_]+/g, "") == name.toLowerCase().replace(/[\W_]+/g, "")) {
                return biosource;
            }
        }
        return null;
    };
    DeepBlueService.prototype.listTechniques = function () {
        if (!this.getGenome()) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', this.getGenome().name)
            .set('controlled_vocabulary', 'techniques')
            .set('type', 'peaks');
        return this.http.get(this.deepBlueUrl + '/collection_experiments_count', { params: params })
            .map(this.extractBioSources);
    };
    DeepBlueService.prototype.listProjects = function () {
        if (!this.getGenome()) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', this.getGenome().name)
            .set('controlled_vocabulary', 'projects')
            .set('type', 'peaks');
        return this.http.get(this.deepBlueUrl + '/collection_experiments_count', { params: params })
            .map(this.extractProjects);
    };
    DeepBlueService.prototype.listExperiments = function (epigenetic_marks, biosources, techniques, projects) {
        if (!this.getGenome()) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', this.getGenome().name)
            .set('controlled_vocabulary', 'projects')
            .set('type', 'peaks');
        epigenetic_marks.forEach(function (em) {
            params = params.append("epigenetic_mark", em.name);
        });
        biosources.forEach(function (bs) {
            params = params.append("biosource", bs.name);
        });
        techniques.forEach(function (tc) {
            params = params.append("technique", tc.name);
        });
        projects.forEach(function (pj) {
            params = params.append("project", pj.name);
        });
        return this.http.get(this.deepBlueUrl + '/list_experiments', { params: params })
            .map(this.extractExperiments);
    };
    DeepBlueService.prototype.extractBioSources = function (body) {
        var data = body[1] || [];
        return data.map(function (value) {
            return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["b" /* BioSource */](value);
        }).sort(function (a, b) { return a.name.localeCompare(b.name); });
    };
    DeepBlueService.prototype.extractEpigeneticMarks = function (body) {
        var data = body[1] || [];
        return data.map(function (value) {
            return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["c" /* EpigeneticMark */](value);
        }).sort(function (a, b) { return a.name.localeCompare(b.name); });
    };
    DeepBlueService.prototype.extractProjects = function (body) {
        var data = body[1] || [];
        return data.map(function (value) {
            return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["n" /* Project */](value);
        }).sort(function (a, b) { return a.name.localeCompare(b.name); });
    };
    DeepBlueService.prototype.extractExperiments = function (body) {
        var data = body[1] || [];
        return data.map(function (value) {
            return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["d" /* Experiment */](value);
        }).sort(function (a, b) { return a.name.localeCompare(b.name); });
    };
    DeepBlueService.prototype.extractHistone = function (body) {
        var data = body[1] || [];
        var regexp = new RegExp('h([134]|2[ab])([a-z])([0-9]+)(.*)');
        var filtered_data = data.filter(function (em) {
            // em[1] is where the name is
            return regexp.test(em[1].toLowerCase());
        }).sort(function (em1, em2) {
            return em1[1].localeCompare(em2[1]);
        });
        return filtered_data.map(function (value) {
            return (new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["c" /* EpigeneticMark */](value));
        }).sort(function (a, b) { return a.name.localeCompare(b.name); });
    };
    ;
    DeepBlueService.prototype.extractFullMetadata = function (body) {
        var data = body[1] || [];
        return data.map(function (value) {
            return __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["h" /* FullMetadata */].fromObject(value);
        }).sort(function (a, b) { return a.name.localeCompare(b.name); });
    };
    DeepBlueService.prototype.getGenomes = function () {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('controlled_vocabulary', 'genomes')
            .set('type', 'peaks');
        return this.http.get(this.deepBlueUrl + '/collection_experiments_count', { params: params })
            .map(this.extractGenomes);
    };
    DeepBlueService.prototype.extractGenomes = function (body) {
        var data = body[1] || [];
        return data.map(function (value) {
            return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["j" /* Genome */](value);
        }).sort(function (a, b) { return a.name.localeCompare(b.name); });
    };
    DeepBlueService.prototype.extractAnnotation = function (body) {
        var data = body[1] || [];
        return data.map(function (value) {
            return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["a" /* Annotation */](value);
        }).sort(function (a, b) { return a.name.localeCompare(b.name); });
    };
    DeepBlueService.prototype.getExperiments = function (genome, epigenetic_mark) {
        if (!genome) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        if (!epigenetic_mark) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        var epigenetic_mark_name = "";
        if (epigenetic_mark instanceof __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["l" /* IdName */]) {
            epigenetic_mark_name = epigenetic_mark.name;
        }
        else {
            epigenetic_mark_name = epigenetic_mark;
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', genome.name)
            .set('type', 'peaks')
            .set('epigenetic_mark', epigenetic_mark_name);
        return this.http.get(this.deepBlueUrl + '/list_experiments', { params: params })
            .map(function (body) {
            var data = body[1] || [];
            return data.map(function (value) {
                return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["d" /* Experiment */](value);
            });
        });
    };
    DeepBlueService.prototype.addSelectedBiosource = function (biosource) {
        var bss = this.selectedBioSources.value;
        var found = false;
        for (var _i = 0, bss_1 = bss; _i < bss_1.length; _i++) {
            var bs = bss_1[_i];
            if (bs.id.id == biosource.id.id) {
                found = true;
            }
        }
        if (!found) {
            bss.push(biosource.clone());
            this.selectedBioSources.next(bss);
        }
    };
    DeepBlueService.prototype.removeSelectedBiosource = function (biosource) {
        var bs = this.selectedBioSources.value;
        var index = bs.indexOf(biosource);
        if (index >= -1) {
            bs.splice(index, 1);
            this.selectedBioSources.next(bs);
        }
    };
    DeepBlueService.prototype.setSelectedBioSources = function (biosources) {
        this.selectedBioSources.next(biosources);
    };
    DeepBlueService.prototype.tilingRegions = function (size, chromosomes, progress_element, request_count) {
        var _this = this;
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('size', size.toString())
            .set('genome', this.getGenome().name);
        for (var _i = 0, chromosomes_1 = chromosomes; _i < chromosomes_1.length; _i++) {
            var chromosome = chromosomes_1[_i];
            params = params.append('chromosome', chromosome);
        }
        return this.http.get(this.deepBlueUrl + '/tiling_regions', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            var query_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response);
            progress_element.increment(request_count);
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["m" /* DeepBlueTiling */](size, _this.getGenome().name, chromosomes, query_id, request_count);
        });
    };
    DeepBlueService.prototype.selectAnnotation = function (annotation, progress_element, request_count) {
        var _this = this;
        if (!annotation) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        if (this.idNamesQueryCache.get(annotation, request_count)) {
            progress_element.increment(request_count);
            var cached_operation = this.idNamesQueryCache.get(annotation, request_count);
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(cached_operation);
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('annotation_name', annotation.name)
            .set('genome', this.getGenome().name);
        return this.http.get(this.deepBlueUrl + '/select_annotations', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            var query_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response);
            progress_element.increment(request_count);
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["h" /* DeepBlueOperation */](new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["a" /* DeepBlueDataParameter */](annotation), query_id, 'select_annotation', request_count);
        })
            .do(function (operation) { _this.idNamesQueryCache.put(annotation, operation); });
    };
    DeepBlueService.prototype.selectExperiment = function (experiment, progress_element, request_count) {
        var _this = this;
        if (!experiment) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        if (this.idNamesQueryCache.get(experiment, request_count)) {
            progress_element.increment(request_count);
            var cached_operation = this.idNamesQueryCache.get(experiment, request_count);
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(cached_operation);
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('experiment_name', experiment.name)
            .set('genome', this.getGenome().name);
        return this.http.get(this.deepBlueUrl + '/select_experiments', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            var query_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response);
            progress_element.increment(request_count);
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["h" /* DeepBlueOperation */](new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["a" /* DeepBlueDataParameter */](experiment), query_id, 'select_experiment', request_count);
        })
            .do(function (operation) { _this.idNamesQueryCache.put(experiment, operation); });
    };
    DeepBlueService.prototype.selectMultipleExperiments = function (experiments, progress_element, request_count) {
        var _this = this;
        var observableBatch = [];
        experiments.forEach(function (experiment, key) {
            progress_element.increment(request_count);
            observableBatch.push(_this.selectExperiment(experiment, progress_element, request_count));
        });
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].forkJoin(observableBatch);
    };
    DeepBlueService.prototype.mergeQueries = function (queries_id, progress_element, request_count) {
        if (!queries_id || queries_id.length == 0) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        if (queries_id.length == 1) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(queries_id[0]);
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('query_a_id', queries_id[0].id().id);
        for (var _i = 0, _a = queries_id.slice(1); _i < _a.length; _i++) {
            var query_b = _a[_i];
            params = params.append('query_b_id', query_b.id().id);
        }
        return this.http.get(this.deepBlueUrl + '/merge_queries', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            var query_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response);
            progress_element.increment(request_count);
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["h" /* DeepBlueOperation */](new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["a" /* DeepBlueDataParameter */]("Merged queries"), query_id, 'merge_queries', request_count);
        });
    };
    DeepBlueService.prototype.filter_region = function (data, field, operation, value, type, progress_element, request_count) {
        var _this = this;
        var parameters = [field, operation, value, type];
        var cache_key = new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["i" /* DeepBlueOperationArgs */]([data, parameters, 'filter']);
        if (this.filtersQueryCache.get(cache_key, request_count)) {
            progress_element.increment(request_count);
            var cached_operation = this.filtersQueryCache.get(cache_key, request_count);
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(cached_operation);
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('query_id', data.id().id)
            .set('field', field)
            .set('operation', operation)
            .set('value', value)
            .set('type', type);
        return this.http.get(this.deepBlueUrl + '/filter_regions', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            var query_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response);
            progress_element.increment(request_count);
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["h" /* DeepBlueOperation */](data.data(), query_id, 'filter', request_count);
        })
            .do(function (result_operation) { _this.filtersQueryCache.put(cache_key, result_operation); });
    };
    DeepBlueService.prototype.intersectWithSelected = function (current_operations, selected_data, progress_element, request_count) {
        var _this = this;
        var observableBatch = [];
        current_operations.forEach(function (current, stack_pos) {
            selected_data.forEach(function (selected) {
                var o;
                var cache_key = [current, selected];
                if (_this.intersectsQueryCache.get(cache_key, request_count)) {
                    progress_element.increment(request_count);
                    var cached_operation = _this.intersectsQueryCache.get(cache_key, request_count);
                    o = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["n" /* StackValue */](stack_pos, cached_operation));
                }
                else {
                    var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
                        .set('query_data_id', current.query_id.id)
                        .set('query_filter_id', selected.query_id.id);
                    o = _this.http.get(_this.deepBlueUrl + '/intersection', { params: params })
                        .map(function (body) {
                        var response = body[1] || '';
                        var query_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response);
                        progress_element.increment(request_count);
                        return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["n" /* StackValue */](stack_pos, new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["h" /* DeepBlueOperation */](selected.data(), query_id, 'intersection', request_count));
                    })
                        .do(function (operation) { _this.intersectsQueryCache.put(cache_key, operation.getDeepBlueOperation()); });
                }
                observableBatch.push(o);
            });
        });
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].forkJoin(observableBatch);
    };
    DeepBlueService.prototype.overlap = function (data_one, data_two, overlap, progress_element, request_count) {
        var _this = this;
        var amount = '1';
        var amount_type = 'bp';
        var parameters = [overlap, amount, amount_type];
        var cache_key = new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["i" /* DeepBlueOperationArgs */]([data_one, data_two, parameters, 'overlap']);
        if (this.overlapsQueryCache.get(cache_key, request_count)) {
            progress_element.increment(request_count);
            var cached_operation = this.overlapsQueryCache.get(cache_key, request_count);
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(cached_operation);
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('query_data_id', data_one.id().id)
            .set('query_filter_id', data_two.id().id)
            .set('overlap', overlap)
            .set('amount', amount) // TODO:  receive this parameter
            .set('amount_type', 'bp'); // TODO:  receive this parameter
        return this.http.get(this.deepBlueUrl + '/overlap', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            var query_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response);
            progress_element.increment(request_count);
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["h" /* DeepBlueOperation */](data_one.data(), query_id, 'overlap', request_count);
        })
            .do(function (operation) { _this.overlapsQueryCache.put(cache_key, operation); });
    };
    DeepBlueService.prototype.findMotif = function (dna_motif, progress_element, request_count) {
        if (!dna_motif) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('motif', dna_motif)
            .set('genome', this.getGenome().name);
        return this.http.get(this.deepBlueUrl + '/find_motif', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            var query_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response);
            progress_element.increment(request_count);
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["h" /* DeepBlueOperation */](new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["a" /* DeepBlueDataParameter */](dna_motif), query_id, 'find_motif', request_count);
        });
    };
    DeepBlueService.prototype.cacheQuery = function (selected_data, progress_element, request_count) {
        var _this = this;
        if (!selected_data) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        if (this.operationCache.get(selected_data, request_count)) {
            progress_element.increment(request_count);
            var cached_operation = this.operationCache.get(selected_data, request_count);
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(cached_operation);
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('query_id', selected_data.id().id)
            .set('cache', 'true');
        return this.http.get(this.deepBlueUrl + '/query_cache', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            var query_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response);
            progress_element.increment(request_count);
            return selected_data.cacheIt(query_id);
        })
            .do(function (operation) { return _this.operationCache.put(selected_data, operation); });
    };
    DeepBlueService.prototype.getResult = function (op_request, progress_element, request_count) {
        var _this = this;
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('request_id', op_request.id().id);
        var pollSubject = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        if (this.resultCache.get(op_request, request_count)) {
            progress_element.increment(request_count);
            var cached_result = this.resultCache.get(op_request, request_count);
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(cached_result);
        }
        var pollData = this.http.get(this.deepBlueUrl + '/get_request_data', { params: params })
            .map(function (body) {
            console.info('polling...', op_request.id().id);
            var status = body[0] || 'error';
            if (status === 'okay') {
                progress_element.increment(request_count);
                var op_result = new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["l" /* DeepBlueResult */](op_request, body[1], request_count);
                _this.resultCache.put(op_request, op_result);
                expand.unsubscribe();
                pollSubject.next(op_result);
                pollSubject.complete();
            }
        });
        var expand = pollData.expand(function () { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].timer(250).concatMap(function () { return pollData; }); }).subscribe();
        return pollSubject.asObservable();
    };
    DeepBlueService.prototype.countRegionsRequest = function (op_exp, progress_element, request_count) {
        var _this = this;
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('query_id', op_exp.id().id);
        if (this.requestCache.get(op_exp, request_count)) {
            progress_element.increment(request_count);
            var cached_result = this.requestCache.get(op_exp, request_count);
            return this.getResult(cached_result, progress_element, request_count);
        }
        else {
            var request = this.http.get(this.deepBlueUrl + '/count_regions', { params: params })
                .map(function (body) {
                var request_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](body[1]);
                progress_element.increment(request_count);
                var deepblue_request = new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["k" /* DeepBlueRequest */](op_exp, request_id, 'count_regions', request_count);
                _this.requestCache.put(op_exp, deepblue_request);
                return deepblue_request;
            })
                .flatMap(function (request_id) {
                return _this.getResult(request_id, progress_element, request_count);
            });
            return request;
        }
    };
    DeepBlueService.prototype.getRegions = function (data, format, progress_element, request_count) {
        var _this = this;
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('query_id', data.id().id)
            .set('output_format', format);
        var request = this.http.get(this.deepBlueUrl + '/get_regions', { params: params })
            .map(function (body) {
            var request_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](body[1]);
            progress_element.increment(request_count);
            var deepblue_request = new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["k" /* DeepBlueRequest */](data, request_id, 'get_regions', request_count);
            return deepblue_request;
        })
            .flatMap(function (deepblue_request) {
            return _this.getResult(deepblue_request, progress_element, request_count);
        });
        return request;
    };
    DeepBlueService.prototype.getResultBatch = function (op_requests, progress_element, request_count) {
        var _this = this;
        var observableBatch = [];
        op_requests.forEach(function (op_request, key) {
            var o = _this.getResult(op_request, progress_element, request_count);
            observableBatch.push(o);
        });
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].forkJoin(observableBatch);
    };
    DeepBlueService.prototype.countRegionsBatch = function (query_ids, progress_element, request_count) {
        var _this = this;
        var observableBatch = [];
        query_ids.forEach(function (op_exp, key) {
            var o = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */](function (observer) {
                _this.countRegionsRequest(op_exp.getDeepBlueOperation(), progress_element, request_count).subscribe(function (result) {
                    observer.next(new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["n" /* StackValue */](op_exp.stack, result));
                    observer.complete();
                });
            });
            observableBatch.push(o);
        });
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].forkJoin(observableBatch);
    };
    // TODO: remove and use new features of Angular5
    DeepBlueService.prototype.extractId = function (body) {
        return body[1] || '';
    };
    DeepBlueService.prototype.getExperimentsInfos = function (ids) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        headers.append('Content-Type', 'application/json');
        var request = {
            "id": ids
        };
        return this.http.post(this.deepBlueUrl + '/info', request, { headers: headers })
            .map(function (body) {
            var data = body[1] || [];
            return data.map(function (value) {
                return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["f" /* FullExperiment */](value);
            });
        });
    };
    DeepBlueService.prototype.getInfo = function (id) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('id', id.id);
        return this.http.get(this.deepBlueUrl + '/info', { params: params })
            .map(function (body) {
            var data = body[1] || [];
            if (id.id[0] === 'e') {
                return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["f" /* FullExperiment */](data[0]);
            }
            else if (id.id[0] === 'a') {
                return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["e" /* FullAnnotation */](data[0]);
            }
            else if (id.id[0] === 'g' && id.id[1] === 's') {
                return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["g" /* FullGeneModel */](data[0]);
            }
            else {
                console.warn('UNKNOW TYPE: ' + id);
                return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["f" /* FullExperiment */](data[0]);
            }
        });
    };
    DeepBlueService.prototype.getGeneModelsInfo = function (ids) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            params = params.append('id', id);
        }
        return this.http.get(this.deepBlueUrl + '/info', { params: params })
            .map(function (body) {
            var data = body[1] || [];
            return data.map(function (value) {
                return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["g" /* FullGeneModel */](value);
            });
        });
    };
    DeepBlueService.prototype.getGeneModels = function () {
        return this.http.get(this.deepBlueUrl + '/list_gene_models')
            .map(function (body) {
            var data = body[1] || [];
            return data.map(function (value) {
                return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["i" /* GeneModel */](value);
            });
        });
    };
    DeepBlueService.prototype.previewExperiment = function (experiment_name) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('experiment_name', experiment_name);
        return this.http.get(this.deepBlueUrl + '/preview_experiment', { params: params });
    };
    DeepBlueService.prototype.getGeneModelsBySelectedGenome = function () {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', this.getGenome().name);
        return this.http.get(this.deepBlueUrl + '/composed_commands/gene_models_by_genome', { params: params })
            .map(function (body) {
            var data = body[1] || [];
            return data.map(function (value) {
                return new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["g" /* FullGeneModel */](value['values']);
            });
        });
    };
    DeepBlueService.prototype.selectGenes = function (genes, gene_model, progress_element, request_count) {
        if (!gene_model) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('gene_model', gene_model.name);
        for (var _i = 0, genes_1 = genes; _i < genes_1.length; _i++) {
            var name_1 = genes_1[_i];
            params = params.append('genes', name_1);
        }
        return this.http.get(this.deepBlueUrl + '/select_genes', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            var query_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](body[1]);
            progress_element.increment(request_count);
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["h" /* DeepBlueOperation */](new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["i" /* DeepBlueOperationArgs */]({ genes: genes, gene_model: gene_model }), query_id, 'select_genes', request_count);
        });
    };
    DeepBlueService.prototype.inputRegions = function (region_set, progress_element, request_count) {
        if (!region_set) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].empty();
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        headers.append('Content-Type', 'application/json');
        var request = {
            "genome": this.getGenome().name,
            "region_set": region_set
        };
        return this.http.post(this.deepBlueUrl + '/composed_commands/input_regions', request, { headers: headers })
            .map(function (body) {
            progress_element.increment(request_count);
            if (body[0] == "okay") {
                var query_id = new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](body[1]);
                return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["h" /* DeepBlueOperation */](new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["b" /* DeepBlueEmptyParameter */](), query_id, 'input_regions', -1);
            }
            else {
                return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["j" /* DeepBlueOperationError */](body[1]);
            }
        });
    };
    DeepBlueService.prototype.composedOverlapEnrichmentDatabase = function (gene_model) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .append('genome', gene_model.name);
        return this.http.get(this.deepBlueUrl + '/composed_commands/get_enrichment_databases', { params: params });
    };
    DeepBlueService.prototype.composedCountOverlaps = function (queries, experiments, filters) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        for (var _i = 0, queries_1 = queries; _i < queries_1.length; _i++) {
            var query_op_id = queries_1[_i];
            params = params.append('queries_id', query_op_id.id().id);
        }
        for (var _a = 0, experiments_1 = experiments; _a < experiments_1.length; _a++) {
            var exp = experiments_1[_a];
            params = params.append('experiments_id', exp.id.id);
        }
        if (filters) {
            params = params.append("filters", JSON.stringify(filters));
        }
        var paramsMap = new Map();
        for (var k in params.keys()) {
            paramsMap.set(k, params.getAll(k));
        }
        return this.http.get(this.deepBlueUrl + '/composed_commands/count_overlaps', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["g" /* DeepBlueMiddlewareRequest */](paramsMap, "count_overlaps", new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response));
            ;
        });
    };
    DeepBlueService.prototype.composedCountGenesOverlaps = function (queries, gene_model) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('gene_model_name', gene_model.name);
        for (var _i = 0, queries_2 = queries; _i < queries_2.length; _i++) {
            var query_op_id = queries_2[_i];
            params = params.append('queries_id', query_op_id.id().id);
        }
        var paramsMap = new Map();
        for (var k in params.keys()) {
            paramsMap.set(k, params.getAll(k));
        }
        return this.http.get(this.deepBlueUrl + '/composed_commands/count_genes_overlaps', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["g" /* DeepBlueMiddlewareRequest */](paramsMap, "count_genes_overlaps", new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response));
        });
    };
    DeepBlueService.prototype.composedCalculateGenesEnrichment = function (queries, gene_model) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('gene_model_name', gene_model.name);
        for (var _i = 0, queries_3 = queries; _i < queries_3.length; _i++) {
            var query_op_id = queries_3[_i];
            params = params.append('queries_id', query_op_id.id().id);
        }
        var paramsMap = new Map();
        for (var k in params.keys()) {
            paramsMap.set(k, params.getAll(k));
        }
        return this.http.get(this.deepBlueUrl + '/composed_commands/enrich_regions_go_terms', { params: params })
            .map(function (body) {
            var response = body[1] || '';
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["g" /* DeepBlueMiddlewareRequest */](paramsMap, "enrich_regions_go_terms", new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response));
        });
    };
    DeepBlueService.prototype.composedCalculateOverlapsEnrichment = function (queries, universe_id, datasets) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        headers.append('Content-Type', 'application/json');
        var request = {
            "queries_id": queries.map(function (op) { return op.id().id; }),
            "universe_id": universe_id.id,
            "genome": this.genomeSource.getValue().name,
            "datasets": datasets
        };
        var request_map = new Map();
        for (var _i = 0, _a = Object.keys(request); _i < _a.length; _i++) {
            var key = _a[_i];
            request_map.set(key, request[key]);
        }
        return this.http.post(this.deepBlueUrl + '/composed_commands/enrich_regions_overlap', request, { headers: headers })
            .map(function (body) {
            var response = body[1] || '';
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["g" /* DeepBlueMiddlewareRequest */](request_map, "enrich_regions_overlap", new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response));
        });
    };
    DeepBlueService.prototype.composedCalculateFastsEnrichment = function (op) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        headers.append('Content-Type', 'application/json');
        var request = {
            "query_id": op.id().id,
            "genome": this.genomeSource.getValue().name
        };
        var request_map = new Map();
        for (var _i = 0, _a = Object.keys(request); _i < _a.length; _i++) {
            var key = _a[_i];
            request_map.set(key, request[key]);
        }
        return this.http.post(this.deepBlueUrl + '/composed_commands/enrich_regions_fast', request, { headers: headers })
            .map(function (body) {
            var response = body[1] || '';
            return new __WEBPACK_IMPORTED_MODULE_6__domain_operations__["g" /* DeepBlueMiddlewareRequest */](request_map, "enrich_regions_fast", new __WEBPACK_IMPORTED_MODULE_5__domain_deepblue__["k" /* Id */](response));
        });
    };
    DeepBlueService.prototype.composedCancel = function (request) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .append('id', request.id().id);
        return this.http.get(this.deepBlueUrl + '/composed_commands/cancel', { params: params });
    };
    DeepBlueService.prototype.getComposedResult = function (request) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('request_id', request.requestId().id);
        return this.http.get(this.deepBlueUrl + '/composed_commands/get_request', { params: params });
    };
    // TODO: Move the logic of converting the data to the function callers
    DeepBlueService.prototype.getComposedResultIterator = function (request, progress_element, request_type, callback, param) {
        var _this = this;
        var pollSubject = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        var timer = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].timer(0, 1000).concatMap(function () {
            if (request.isCanceled()) {
                timer.unsubscribe();
                return null;
            }
            return _this.getComposedResult(request).map(function (data) {
                if (data[0] === 'okay') {
                    timer.unsubscribe();
                    if (request_type === 'overlaps') {
                        pollSubject.next((data[1]).map(function (ee) { return __WEBPACK_IMPORTED_MODULE_6__domain_operations__["l" /* DeepBlueResult */].fromObject(ee); }));
                    }
                    else if (request_type === 'go_enrichment') {
                        pollSubject.next((data[1]).map(function (ee) { return __WEBPACK_IMPORTED_MODULE_6__domain_operations__["d" /* DeepBlueMiddlewareGOEnrichtmentResult */].fromObject(ee); }));
                    }
                    else if (request_type === 'overlaps_enrichment_fast') {
                        pollSubject.next((data[1]).map(function (ee) { return __WEBPACK_IMPORTED_MODULE_6__domain_operations__["f" /* DeepBlueMiddlewareOverlapEnrichtmentResultItem */].fromObject(ee); }));
                    }
                    else if (request_type === 'overlaps_enrichment') {
                        pollSubject.next((data[1]).map(function (ee) { return __WEBPACK_IMPORTED_MODULE_6__domain_operations__["e" /* DeepBlueMiddlewareOverlapEnrichtmentResult */].fromObject(ee); }));
                    }
                    pollSubject.complete();
                    progress_element.finish();
                }
                else {
                    var status_1 = data[1];
                    var partial = status_1["partial"];
                    if (partial && callback) {
                        if (request_type === 'overlaps') {
                            partial = (partial).map(function (ee) { return __WEBPACK_IMPORTED_MODULE_6__domain_operations__["l" /* DeepBlueResult */].fromObject(ee); });
                        }
                        else if (request_type === 'go_enrichment') {
                            partial = (partial).map(function (ee) { return __WEBPACK_IMPORTED_MODULE_6__domain_operations__["d" /* DeepBlueMiddlewareGOEnrichtmentResult */].fromObject(ee); });
                        }
                        else if (request_type === 'overlaps_enrichment_fast') {
                            partial = (partial).map(function (ee) { return __WEBPACK_IMPORTED_MODULE_6__domain_operations__["f" /* DeepBlueMiddlewareOverlapEnrichtmentResultItem */].fromObject(ee); });
                        }
                        else if (request_type === 'overlaps_enrichment') {
                            partial = (partial).map(function (ee) { return __WEBPACK_IMPORTED_MODULE_6__domain_operations__["e" /* DeepBlueMiddlewareOverlapEnrichtmentResult */].fromObject(ee); });
                        }
                        if (partial) {
                            pollSubject.next(partial);
                            callback(param, partial);
                        }
                    }
                    progress_element.setStatus(status_1['step'], status_1['processed'], status_1['total']);
                }
            });
        }).subscribe();
        return pollSubject;
    };
    DeepBlueService.prototype.getComposedListGenes = function (gene_model, gene_id_name) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('gene_model', gene_model)
            .set('gene_id_name', gene_id_name);
        return this.http.get(this.deepBlueUrl + '/composed_commands/list_genes', { params: params });
    };
    DeepBlueService.prototype.getComposedEnrichmentDatabases = function (genome) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', genome);
        return this.http.get(this.deepBlueUrl + '/composed_commands/get_enrichment_databases', { params: params });
    };
    DeepBlueService.prototype.getComposedEpigeneticMarksCategories = function () {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('genome', this.getGenome().name);
        return this.http.get(this.deepBlueUrl + '/composed_commands/get_epigenetic_marks_categories', { params: params });
    };
    DeepBlueService.prototype.getComposedEpigeneticMarksFromCategory = function (category) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('category', category)
            .set('genome', this.getGenome().name);
        return this.http.get(this.deepBlueUrl + '/composed_commands/get_epigenetic_marks_from_category', { params: params })
            .map(this.extractFullMetadata);
    };
    DeepBlueService.prototype.getRelatedBioSources = function (biosource) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('biosource', biosource.name)
            .set('genome', this.getGenome().name);
        return this.http.get(this.deepBlueUrl + '/composed_commands/get_related_biosources', { params: params });
    };
    DeepBlueService.prototype.getQueryInfo = function (id) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
            .set('query_id', id.id);
        return this.http.get(this.deepBlueUrl + '/composed_commands/query_info', { params: params })
            .map(function (body) {
            return Object(__WEBPACK_IMPORTED_MODULE_6__domain_operations__["o" /* toClass */])(body);
        });
    };
    DeepBlueService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_7__service_progresselement__["a" /* ProgressElement */]])
    ], DeepBlueService);
    return DeepBlueService;
}());



/***/ }),

/***/ "../../../../../src/app/service/menu.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiveMenuService; });
/* unused harmony export EpigeneticMarkMenu */
/* unused harmony export CSSExperimentsMenu */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_domain_deepblue__ = __webpack_require__("../../../../../src/app/domain/deepblue.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BASIC_MENU = [
    { label: 'Data Selection', icon: 'dashboard', routerLink: ['/dataselection'] }
];
var EXTRA_MENU_ITEMS = [
    { label: 'Similar Data', icon: 'compare_arrows', routerLink: ['/similarfinder'] },
    { label: 'Comparison Selection', icon: 'compare', routerLink: ['comparisonselection'] },
    { label: 'Get regions', icon: 'dehaze', routerLink: ['/regions'] },
    { name: 'filtering', label: 'Filtering', icon: 'pause', items: [] },
    { name: 'columns', label: 'Columns Filtering', icon: 'view_week', items: [] },
    { name: 'genes', label: 'Genes', icon: 'room', routerLink: ['/genes'] },
    { name: 'go_enrichment', label: 'Gene Ontology', icon: 'view_quilt', routerLink: ['/go_enrichment'] },
    { name: 'overlap_enrichment', label: 'Overlap Enrichment', icon: 'view_quilt', routerLink: ['/overlap_enrichment'] }
];
var DiveMenuService = /** @class */ (function () {
    function DiveMenuService(deepBlueService) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.model = [];
        this.menus = [];
        this.menuItems = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](this.model);
        this.menuValue$ = this.menuItems.asObservable();
        this.menus = [
            new CSSExperimentsMenu(this.deepBlueService, this),
            new EpigeneticMarkMenu(this.deepBlueService, this)
        ];
        this.menus.forEach(function (menu) {
            menu.reloadMenu();
        });
        this.deepBlueService.dataToDiveValue$.subscribe(function (data) {
            _this.model = BASIC_MENU;
            if (data !== null) {
                _this.model = _this.model.concat(EXTRA_MENU_ITEMS);
            }
            _this.menuItems.next(_this.model);
        });
    }
    DiveMenuService.prototype.findMenu = function (parentName) {
        return this.model.find(function (m) { return m.name == parentName; });
    };
    DiveMenuService.prototype.findMenuPos = function (parentName) {
        return this.model.findIndex(function (m) { return m.name == parentName; });
    };
    DiveMenuService.prototype.pushItem = function (subMenu, item) {
        if ('items' in subMenu) {
            if (subMenu['items'].find(function (i) { return i.label == item.label; })) {
                return;
            }
            subMenu['items'].push(item);
        }
        else {
            subMenu['items'] = [item];
        }
    };
    DiveMenuService.prototype.add = function (parentName, label, icon) {
        var item = {
            name: parentName,
            label: parentName,
            icon: 'change_history',
            items: new Array()
        };
        if (label) {
            item.label = label;
        }
        if (icon) {
            item.icon = icon;
        }
        this.model.push(item);
    };
    DiveMenuService.prototype.remove = function (parentName) {
        var pos = this.findMenuPos(parentName);
        if (pos > -1) {
            this.model.splice(pos, 1);
        }
    };
    DiveMenuService.prototype.clean = function (parentName) {
        var subMenu = this.findMenu(parentName);
        if (!subMenu) {
            console.error('Sub Menu ' + parentName + ' not found');
            return;
        }
        subMenu['items'] = [];
    };
    DiveMenuService.prototype.includeItem = function (parentName, label, icon, command, routerLink, url) {
        var subMenu = this.findMenu(parentName);
        if (!subMenu) {
            console.error('Sub Menu ' + parentName + ' not found');
            return;
        }
        var item = { 'label': label };
        if (icon) {
            item['icon'] = icon;
        }
        if (command) {
            item['command'] = command;
        }
        if (routerLink) {
            item['routerLink'] = routerLink;
        }
        if (url) {
            item['url'] = url;
        }
        this.pushItem(subMenu, item);
    };
    DiveMenuService.prototype.includeObject = function (parentName, item) {
        var subMenu = this.findMenu(parentName);
        if (!subMenu) {
            console.error('Sub Menu ' + parentName + ' not found');
            return;
        }
        this.pushItem(subMenu, item);
    };
    DiveMenuService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__["a" /* DeepBlueService */]])
    ], DiveMenuService);
    return DiveMenuService;
}());

var EpigeneticMarkMenu = /** @class */ (function () {
    function EpigeneticMarkMenu(deepBlueService, diveMenu) {
        this.deepBlueService = deepBlueService;
        this.diveMenu = diveMenu;
        this.actualItems = new Array();
    }
    EpigeneticMarkMenu.prototype.reloadMenu = function () {
        var _this = this;
        this.deepBlueService.dataToDiveValue$.subscribe(function (data) {
            if (data === null) {
                return;
            }
            _this.deepBlueService.getComposedEpigeneticMarksCategories().subscribe(function (categories) {
                if (_this.actualItems.length > 0) {
                    for (var _i = 0, _a = _this.actualItems; _i < _a.length; _i++) {
                        var item = _a[_i];
                        _this.diveMenu.remove(item);
                    }
                }
                _this.actualItems = categories;
                var _loop_1 = function (category) {
                    // Do not include the SPECIAL CASES menu
                    if (EpigeneticMarkMenu.SPECIAL_CASES.indexOf(category) > -1) {
                        return "continue";
                    }
                    _this.deepBlueService.getComposedEpigeneticMarksFromCategory(category).subscribe(function (ems) {
                        _this.diveMenu.add(category);
                        var _loop_2 = function (em) {
                            _this.diveMenu.includeItem(category, em.name, 'fiber_manual_record', function (event) { return _this.selectItem(em); }, ['/peaks_overlap'], null);
                        };
                        for (var _i = 0, ems_1 = ems; _i < ems_1.length; _i++) {
                            var em = ems_1[_i];
                            _loop_2(em);
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                for (var _b = 0, categories_1 = categories; _b < categories_1.length; _b++) {
                    var category = categories_1[_b];
                    _loop_1(category);
                }
            });
        });
    };
    EpigeneticMarkMenu.prototype.selectItem = function (epigenetic_mark) {
        this.deepBlueService.setEpigeneticMark(epigenetic_mark);
    };
    EpigeneticMarkMenu.SPECIAL_CASES = ['DNA Methylation', 'State Segmentation', 'Chromatin State Segmentation'];
    return EpigeneticMarkMenu;
}());

var CSSExperimentsMenu = /** @class */ (function () {
    function CSSExperimentsMenu(deepBlueService, diveMenu) {
        this.deepBlueService = deepBlueService;
        this.diveMenu = diveMenu;
    }
    CSSExperimentsMenu.prototype.reloadMenu = function () {
        var _this = this;
        this.deepBlueService.dataToDiveValue$.subscribe(function (data) {
            if (data === null) {
                return;
            }
            _this.deepBlueService.getChromatinStateSegments().subscribe(function (csss) {
                if (csss.length > 0) {
                    _this.diveMenu.remove('css');
                    _this.diveMenu.add('css', 'Chromatin State Segmentation', 'change_history');
                    var _loop_3 = function (css) {
                        _this.diveMenu.includeItem('css', css[1], 'fiber_manual_record', function (event) { _this.selectItem(css[0]); }, ['/chromatin_states'], /* router link */ null /* url */);
                    };
                    for (var _i = 0, csss_1 = csss; _i < csss_1.length; _i++) {
                        var css = csss_1[_i];
                        _loop_3(css);
                    }
                }
            });
        }, function (error) { return _this.errorMessage = error; });
    };
    CSSExperimentsMenu.prototype.selectItem = function (css) {
        this.deepBlueService.setEpigeneticMark(new __WEBPACK_IMPORTED_MODULE_3_app_domain_deepblue__["c" /* EpigeneticMark */](["Chromatin State Segmentation", css]));
    };
    return CSSExperimentsMenu;
}());



/***/ }),

/***/ "../../../../../src/app/service/progresselement.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressElement; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");

var ProgressElement = /** @class */ (function () {
    function ProgressElement() {
        this.total_to_load = 0;
        this.total_loaded = 0;
        this.request_count = -1;
        this.progressValueSource = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"](-1);
        this.progressValueValue$ = this.progressValueSource.asObservable();
        this.progressMode = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]("determinate");
        this.progressModeValue$ = this.progressMode.asObservable();
    }
    ProgressElement.prototype.reset = function (total, request_count) {
        this.total_to_load = total;
        this.total_loaded = 0;
        this.request_count = request_count;
        this.progressValueSource.next(0);
    };
    ProgressElement.prototype.setStatus = function (step, processed, total) {
        this.total_loaded = processed;
        this.total_to_load = total;
        var next_value = Math.ceil(this.total_loaded * 100 / this.total_to_load);
        this.progressValueSource.next(next_value);
    };
    ProgressElement.prototype.setMode = function (mode) {
        this.progressMode.next(mode);
    };
    ProgressElement.prototype.startIndeterminate = function () {
        this.setMode("indeterminate");
        this.reset(1, -1);
        this.setStatus("loading", 0, 1);
    };
    ProgressElement.prototype.finishIndeterminate = function () {
        this.setMode("determinate");
        this.finish();
    };
    ProgressElement.prototype.increment = function (request_count) {
        if (request_count !== this.request_count) {
            return;
        }
        this.total_loaded++;
        var next_value = Math.ceil(this.total_loaded * 100 / this.total_to_load);
        this.progressValueSource.next(next_value);
    };
    ProgressElement.prototype.finish = function () {
        this.total_loaded = this.total_to_load;
        var next_value = Math.ceil(this.total_loaded * 100 / this.total_to_load);
        this.progressValueSource.next(next_value);
    };
    return ProgressElement;
}());



/***/ }),

/***/ "../../../../../src/app/service/requests-manager.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RequestManager = /** @class */ (function () {
    function RequestManager(deepBlueService, router) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.router = router;
        this.requests = new Array();
        router.events.subscribe(function (val) {
            if (val instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["NavigationEnd"]) {
                _this.cancelAllRequest();
            }
        });
    }
    RequestManager.prototype.enqueueRequest = function (request) {
        this.requests.push(request);
    };
    RequestManager.prototype.cancelAllRequest = function () {
        for (var _i = 0, _a = this.requests; _i < _a.length; _i++) {
            var request_1 = _a[_i];
            request_1.cancel();
            this.deepBlueService.composedCancel(request_1).subscribe(function (id) { return console.warn("Canceled: " + id); });
        }
        this.requests = [];
    };
    RequestManager = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]])
    ], RequestManager);
    return RequestManager;
}());



/***/ }),

/***/ "../../../../../src/app/service/router-guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RouterGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RouterGuard = /** @class */ (function () {
    function RouterGuard(deepBlueService, router) {
        this.deepBlueService = deepBlueService;
        this.router = router;
    }
    RouterGuard.prototype.canActivate = function (route, state) {
        if (this.deepBlueService.dataToDiveSource.getValue() === null) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    };
    RouterGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]])
    ], RouterGuard);
    return RouterGuard;
}());



/***/ }),

/***/ "../../../../../src/app/service/selecteddata.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectedData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_service_datastack__ = __webpack_require__("../../../../../src/app/service/datastack.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SelectedData = /** @class */ (function () {
    function SelectedData(deepBlueService, dataStackFactory) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.dataStackFactory = dataStackFactory;
        this._stacks = [];
        this.currentStackSubscription = null;
        this.activeStackSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.activeStackValue$ = this.activeStackSubject.asObservable();
        this.activeTopStackSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.activeTopStackValue$ = this.activeTopStackSubject.asObservable();
        this.annotationSubscription = deepBlueService.dataToDiveValue$.subscribe(function (op) {
            var stack = dataStackFactory.newDataStack();
            if (op !== null) {
                // TODO: Ask if the user want to save the previous stack
                stack.setInitialData(op);
                _this.replaceStack(0, stack);
                _this.setActiveStack(stack);
            }
        });
    }
    SelectedData.prototype.ngOnDestroy = function () {
        this.annotationSubscription.unsubscribe();
    };
    SelectedData.prototype.insertForComparison = function (comparisonData) {
        var stack = this.dataStackFactory.newDataStack();
        stack.setInitialData(comparisonData);
        this.insertStack(1, stack);
    };
    SelectedData.prototype.insertStack = function (position, stack) {
        this._stacks.splice(position, 0, stack);
    };
    SelectedData.prototype.replaceStack = function (position, stack) {
        this._stacks[position] = stack;
    };
    SelectedData.prototype.setActiveStack = function (stack) {
        var _this = this;
        var index = this._stacks.indexOf(stack);
        if (index <= -1) {
            console.warn("(setActiveStack)", stack, 'not found');
            return;
        }
        var toChange = this._stacks[index];
        this._stacks[index] = this._stacks[0];
        this._stacks[0] = toChange;
        if (this.currentStackSubscription != null && !this.currentStackSubscription.closed) {
            this.currentStackSubscription.unsubscribe();
        }
        this.currentStackSubscription = stack.getTopStackValueObserver().subscribe(function (dataStackItem) {
            _this.activeTopStackSubject.next(dataStackItem);
        });
        this.activeStackSubject.next(stack);
    };
    SelectedData.prototype.removeStack = function (stack) {
        var index = this._stacks.indexOf(stack, 0);
        if (index > -1) {
            var removedStack = this._stacks[index];
            this._stacks.splice(index, 1);
            if (this.activeStackSubject.getValue() === removedStack) {
                // TODO: set the next one as active.
                this.activeStackSubject.next(this.dataStackFactory.newDataStack());
            }
            return removedStack;
        }
        return null;
    };
    SelectedData.prototype.getActiveData = function () {
        if (this.activeStackSubject.getValue() != null) {
            return this.activeStackSubject.getValue().getData();
        }
        return [];
    };
    SelectedData.prototype.getActiveCurrentOperation = function () {
        if (this.activeStackSubject.getValue() != null) {
            return this.activeStackSubject.getValue().getCurrentOperation();
        }
        return null;
    };
    SelectedData.prototype.getActiveCurrentOperationMetadata = function () {
        var currentOp = this.getActiveCurrentOperation();
        if (currentOp != null && currentOp.mainOperation().data().dataType() != "empty_parameter") {
            var param = currentOp.mainOperation().data();
            return this.deepBlueService.getInfo(param.id());
        }
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].of(null);
    };
    SelectedData.prototype.getStacksTopOperation = function () {
        return this._stacks.map(function (stack) { return stack.getCurrentOperation(); });
    };
    SelectedData.prototype.getStackPosByQueryId = function (query_id) {
        return this.getStacksTopOperation()
            .map(function (stack) { return stack.query_id.id; })
            .indexOf(query_id.id);
    };
    SelectedData.prototype.getStackname = function (pos) {
        return this._stacks[pos].name();
    };
    SelectedData.prototype.saveActiveStack = function () {
        var clone = this.activeStackSubject.getValue().cloneStackItems();
        var stack = this.dataStackFactory.newDataStack();
        stack.setInitialDataArray(clone);
        this.insertStack(1, stack);
    };
    SelectedData.prototype.getStackName = function (pos) {
        if (pos >= this._stacks.length) {
            return 'Invalid Stack';
        }
        return this._stacks[pos].name();
    };
    SelectedData.prototype.getStackColor = function (pos, alpha) {
        if (pos >= this._stacks.length) {
            return '#FFFFFF';
        }
        return this._stacks[pos].getColor(alpha);
    };
    SelectedData = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_4_app_service_datastack__["b" /* DataStackFactory */]])
    ], SelectedData);
    return SelectedData;
}());



/***/ }),

/***/ "../../../../../src/app/service/statistics.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Statistics; });
var Statistics = /** @class */ (function () {
    function Statistics() {
    }
    Statistics.filter = function (arr, dropoff_sds, sort) {
        if (sort) {
            arr.sort(function (a, b) { return a - b; });
        }
        var sum = arr.reduce(function (p, c) { return p + c; }, 0);
        var mean = sum / arr.length;
        var diffs = [];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var v = arr_1[_i];
            diffs.push(Math.pow(v - mean, 2));
        }
        var d = diffs.reduce(function (a, b) { return a + b; }, 0);
        var sd = Math.sqrt(d / (arr.length - 1));
        var min_value = arr[0] + (sd * dropoff_sds);
        var pos = 0;
        for (var _a = 0, arr_2 = arr; _a < arr_2.length; _a++) {
            var n = arr_2[_a];
            if (n > min_value) {
                break;
            }
            pos++;
        }
        return arr.slice(0, pos + 1);
    };
    Statistics.percentile = function (arr, p, sort) {
        if (arr.length === 0) {
            return 0;
        }
        if (sort) {
            arr.sort(function (a, b) { return a - b; });
        }
        if (p <= 0) {
            return arr[0];
        }
        if (p >= 1) {
            return arr[arr.length - 1];
        }
        var index = (arr.length - 1) * p;
        var lower = Math.floor(index);
        var upper = lower + 1;
        var weight = index % 1;
        if (upper >= arr.length) {
            return arr[lower];
        }
        return arr[lower] * (1 - weight) + arr[upper] * weight;
    };
    Statistics.calculateStats = function (results) {
        var high = Number.MIN_SAFE_INTEGER;
        var low = Number.MAX_SAFE_INTEGER;
        var sum = 0;
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var count = results_1[_i];
            if (count < low) {
                low = count;
            }
            if (count > high) {
                high = count;
            }
            sum += count;
        }
        var mean = sum / results.length;
        var q1 = Statistics.percentile(results, 0.25);
        var q3 = Statistics.percentile(results, 0.75);
        var median = Statistics.percentile(results, 0.5);
        return { low: low, q1: q1, median: median, q3: q3, high: high, mean: mean, elements: results.length };
    };
    return Statistics;
}());



/***/ }),

/***/ "../../../../../src/app/service/utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.convert = function (value, column_type) {
        if ((column_type === 'string') || (column_type === 'category')) {
            return value;
        }
        if (column_type === 'double') {
            return Number(value);
        }
        if (column_type === 'integer') {
            return Number(value);
        }
        return value;
    };
    return Utils;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/biosources.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-w-title\">\n    <h1>Select the BioSources that you wish to dive</h1>\n    <p-pickList #picklist\n            [source]=\"sourceBioSources\"\n            [target]=\"targetBioSources\"\n            sourceHeader=\"Available\"\n            targetHeader=\"Selected\"\n            (onMoveToTarget)=\"onMoveToTarget($event)\"\n            (onMoveToSource)=\"onMoveToSource($event)\"\n            [responsive]=\"true\">\n\n        <ng-template let-biosource pTemplate=\"item\">\n            <span>{{biosource.name}}</span>\n        </ng-template>\n\n    </p-pickList>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/component/biosources.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BioSourcesScreenComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BioSourcesScreenComponent = /** @class */ (function () {
    function BioSourcesScreenComponent(deepBlueService) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.sourceBioSources = [];
        this.targetBioSources = [];
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(function (genome) {
            if (genome === null) {
                return;
            }
            _this.deepBlueService.listBioSources().subscribe(function (biosources) {
                _this.sourceBioSources = biosources;
            });
        });
        this.biosourceSubscription = deepBlueService.selectedBioSourcesValue$.subscribe(function (biosources) {
            _this.targetBioSources = biosources;
            var sourceBs = [];
            for (var _i = 0, _a = _this.sourceBioSources; _i < _a.length; _i++) {
                var source = _a[_i];
                var found = false;
                for (var _b = 0, _c = _this.targetBioSources; _b < _c.length; _b++) {
                    var target = _c[_b];
                    if (source.id.id == target.id.id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    sourceBs.push(source);
                }
            }
            _this.sourceBioSources = sourceBs;
            _this.targetBioSources.sort(function (a, b) { return a.name.localeCompare(b.name); });
            _this.sourceBioSources.sort(function (a, b) { return a.name.localeCompare(b.name); });
        });
    }
    BioSourcesScreenComponent.prototype.onMoveToSource = function ($event) {
        var items = $event.items;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            this.deepBlueService.removeSelectedBiosource(item);
        }
    };
    BioSourcesScreenComponent.prototype.onMoveToTarget = function ($event) {
        var items = $event.items;
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            this.deepBlueService.addSelectedBiosource(item);
        }
    };
    BioSourcesScreenComponent.prototype.ngOnDestroy = function () {
        this.genomeSubscription.unsubscribe();
        this.biosourceSubscription.unsubscribe();
    };
    BioSourcesScreenComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-biosources-screen',
            template: __webpack_require__("../../../../../src/app/view/component/biosources.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */]])
    ], BioSourcesScreenComponent);
    return BioSourcesScreenComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/charts/overlappingbar.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverlapsBarChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OverlapsBarChartComponent = /** @class */ (function () {
    function OverlapsBarChartComponent(deepBlueService) {
        this.deepBlueService = deepBlueService;
        this.options = {
            title: {
                text: "Overlapping with " + (deepBlueService.getDivingData() ? deepBlueService.getDivingData().data().name() : "")
            },
            xAxis: {
                categories: []
            },
            credits: {
                enabled: false
            },
            width: null,
            height: null,
            yAxis: {
                min: 0,
                title: {
                    text: 'Overlaped peaks (regions)'
                }
            },
            legend: {
                enabled: false
            },
            /*
            tooltip: {
                formatter: function () {
                    var s;
                    if (this.point.key) {
                        s = "<em>Experiment No " + this.point.key + "</em><br/>";
                    }
                    if (this.point.name) { // the pie chart
                        s = this.point.name + ' ' + this.y + ' fruits';
                    } else {
                        s = this.series.name + ' : ' +
                            this.x + ': ' + this.y;
                    }
                    return s;
                }
            },
            */
            series: []
        };
    }
    OverlapsBarChartComponent.prototype.setNewData = function (categories, series, result_by_dataset_stack) {
        var _this = this;
        this.result_by_dataset_stack = result_by_dataset_stack;
        this.chart['xAxis'][0].setCategories(categories, false);
        var point = {
            events: {
                click: function (click, e) {
                    // dummy function
                }
            }
        };
        var dataLabels = {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}',
            y: 10,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        };
        while (this.chart['series'].length > 0) {
            this.chart['series'][0].remove(false);
        }
        for (var _i = 0, series_1 = series; _i < series_1.length; _i++) {
            var serie = series_1[_i];
            if (serie['type'] === 'column') {
                serie['point'] = point;
                serie['point']['events']['click'] = function (ev) { return _this.clickExperimentBar(ev); };
                serie['dataLabels'] = dataLabels;
                serie['borderWidth'] = 0;
                serie['animation'] = false;
                this.chart['addSeries'](serie, false);
            }
            else if (serie['type'] === 'boxplot') {
                serie['tooltip'] = { headerFormat: '<em>Experiment No {point.key}</em><br/>' };
                serie['backgroundColor'] = 'red';
                serie['animation'] = false;
                this.chart['addSeries'](serie, false);
            }
        }
        this.chart['redraw']();
    };
    OverlapsBarChartComponent.prototype.hasData = function () {
        if (!this.chart) {
            return false;
        }
        return this.chart['series'][0]['data'].length > 0;
    };
    OverlapsBarChartComponent.prototype.saveInstance = function (chartInstance) {
        if (!this.chart) {
            this.chart = chartInstance;
        }
    };
    OverlapsBarChartComponent.prototype.clickExperimentBar = function (click) {
        var _this = this;
        var point = click.point;
        var category = point.category;
        var index = point.series.columnIndex;
        // TODO: create a type to hold this data
        var bar_element = this.result_by_dataset_stack[category][point.series.columnIndex];
        this.deepBlueService.setDataInfoSelected(bar_element);
        setTimeout(function () { return _this.chart['reflow'](); }, 0);
    };
    OverlapsBarChartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'app-overlaps-bar-chart',
            styles: ["\n      chart {\n        display: block;\n      }\n    "],
            template: "\n        <chart [options]=\"options\" (load)=\"saveInstance($event.context)\"></chart>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__service_deepblue__["a" /* DeepBlueService */]])
    ], OverlapsBarChartComponent);
    return OverlapsBarChartComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/charts/similarity.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SimilarityBarChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SimilarityBarChartComponent = /** @class */ (function () {
    function SimilarityBarChartComponent(deepBlueService) {
        this.deepBlueService = deepBlueService;
        this.options = {
            title: {
                text: "Loading Similar Data..."
            },
            xAxis: {
                categories: []
            },
            credits: {
                enabled: false
            },
            width: null,
            height: null,
            yAxis: {
                min: 0,
                title: {
                    text: 'Ranking experiments'
                }
            },
            legend: {
                enabled: false
            },
            series: []
        };
    }
    SimilarityBarChartComponent.prototype.setNewData = function (title, categories, series, _self, callback_function) {
        this._self = _self;
        this.chart['xAxis'][0].setCategories(categories, false);
        var point = {
            events: {
                click: function (click, e) {
                    // dummy function
                }
            }
        };
        var dataLabels = {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}',
            y: 10,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        };
        while (this.chart['series'].length > 0) {
            this.chart['series'][0].remove(false);
        }
        for (var _i = 0, series_1 = series; _i < series_1.length; _i++) {
            var serie = series_1[_i];
            if (serie['type'] === 'column') {
                serie['point'] = point;
                serie['dataLabels'] = dataLabels;
                serie['borderWidth'] = 0;
                serie['animation'] = false;
                serie['point'] = point;
                serie['point']['events']['click'] = function (ev) { return callback_function(ev, _self); };
                this.chart['addSeries'](serie, false);
            }
            else if (serie['type'] === 'boxplot') {
                serie['tooltip'] = { headerFormat: '<em>Experiment No {point.key}</em><br/>' };
                serie['backgroundColor'] = 'red';
                serie['animation'] = false;
                serie['point'] = point;
                serie['point']['events']['click'] = function (ev) { return callback_function(ev, _self); };
                this.chart['addSeries'](serie, false);
            }
        }
        this.chart['setTitle']({ 'text': title });
        this.chart['redraw']();
    };
    SimilarityBarChartComponent.prototype.hasData = function () {
        if (!this.chart) {
            return false;
        }
        return this.chart['series'][0]['data'].length > 0;
    };
    SimilarityBarChartComponent.prototype.saveInstance = function (chartInstance) {
        if (!this.chart) {
            this.chart = chartInstance;
        }
    };
    SimilarityBarChartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'app-similarity-bar-chart',
            styles: ["\n      chart {\n        display: block;\n      }\n    "],
            template: "\n        <chart [options]=\"options\" (load)=\"saveInstance($event.context)\"></chart>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__service_deepblue__["a" /* DeepBlueService */]])
    ], SimilarityBarChartComponent);
    return SimilarityBarChartComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/data-info-box.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataInfoBoxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_domain_operations__ = __webpack_require__("../../../../../src/app/domain/operations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DataInfoBoxComponent = /** @class */ (function () {
    function DataInfoBoxComponent(deepBlueService, selectedData) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.selectedData = selectedData;
        this.biosource = null;
        this.value = null;
        this.results = [];
        this.dataSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.dataSelectedSubscription = deepBlueService.dataInfoSelectedValue$.subscribe(function (data) {
            if (!data) {
                return;
            }
            _this.biosource = data['biosource'];
            _this.value = data['value'];
            _this.results = data['results']
                .sort(function (a, b) { return a.resultAsCount() - b.resultAsCount(); });
        });
    }
    DataInfoBoxComponent.prototype.filterOverlapping = function (result) {
        var filter = result.getFilter();
        if (filter instanceof __WEBPACK_IMPORTED_MODULE_1_app_domain_operations__["h" /* DeepBlueOperation */]) {
            this.selectedData.activeStackSubject.getValue().overlap(filter);
            this.dataSelected.emit(filter);
        }
    };
    DataInfoBoxComponent.prototype.filterNonOverlapping = function (result) {
        var filter = result.getFilter();
        if (filter instanceof __WEBPACK_IMPORTED_MODULE_1_app_domain_operations__["h" /* DeepBlueOperation */]) {
            this.selectedData.activeStackSubject.getValue().non_overlap(filter);
            this.dataSelected.emit(filter);
        }
    };
    DataInfoBoxComponent.prototype.getStackName = function () {
        return this.biosource;
    };
    DataInfoBoxComponent.prototype.ngOnDestroy = function () {
        this.dataSelectedSubscription.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], DataInfoBoxComponent.prototype, "dataSelected", void 0);
    DataInfoBoxComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-data-info-box',
            template: "\n    <h2>Data overlapping with {{ getStackName() }}</h2>\n    <p-scrollPanel [style]=\"{height: '95%', width: '100%'}\">\n      <li *ngFor=\"let result of results\">\n        {{ result.getFilter().name() }} - {{ result.resultAsCount() }}\n        <p><button pButton type=\"button\" (click)=\"filterOverlapping(result)\" label=\"Filter overlapping\"></button>\n        <p><button pButton type=\"button\" (click)=\"filterNonOverlapping(result)\" label=\"Filter not-overlapping\"></button>\n      </li>\n    </p-scrollPanel>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_3_app_service_selecteddata__["a" /* SelectedData */]])
    ], DataInfoBoxComponent);
    return DataInfoBoxComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/data-selection-main.html":
/***/ (function(module, exports) {

module.exports = "<p-tabView>\n    <p-tabPanel header=\"Experiments\">\n        <select-datasets-component [selectMode]=\"'single'\" (queryIdSelected)=\"selectQuery($event)\"></select-datasets-component>\n    </p-tabPanel>\n\n    <p-tabPanel header=\"Annotations\">\n        <select-annotations-component [toCompare]=\"false\" (queryIdSelected)=\"selectQuery($event)\"></select-annotations-component>\n    </p-tabPanel>\n\n    <p-tabPanel header=\"Tiling Regions\">\n        <select-tiling-component (queryIdSelected)=\"selectQuery($event)\"></select-tiling-component>\n    </p-tabPanel>\n\n    <p-tabPanel header=\"Existing Query ID\">\n        <select-query (queryIdSelected)=\"selectQuery($event)\"></select-query>\n    </p-tabPanel>\n\n    <p-tabPanel header=\"Upload File\">\n        <regions-upload (queryIdSelected)=\"selectQuery($event)\"></regions-upload>\n    </p-tabPanel>\n\n    <p-tabPanel header=\"Paste Regions\">\n        <regions-paste (queryIdSelected)=\"selectQuery($event)\"></regions-paste>\n    </p-tabPanel>\n</p-tabView>"

/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/data-selection-main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataSelectionMainComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataSelectionMainComponent = /** @class */ (function () {
    function DataSelectionMainComponent(deepBlueService, router) {
        this.deepBlueService = deepBlueService;
        this.router = router;
        this.visibleSidebar2 = false;
        this.queryIdSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    DataSelectionMainComponent.prototype.selectQuery = function (event) {
        this.queryIdSelected.emit(event);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], DataSelectionMainComponent.prototype, "queryIdSelected", void 0);
    DataSelectionMainComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/component/data-selection/data-selection-main.html"),
            selector: 'data-selection-main',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]])
    ], DataSelectionMainComponent);
    return DataSelectionMainComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/paste-regions.html":
/***/ (function(module, exports) {

module.exports = "<p-dialog header=\"Error during dataset upload\" [(visible)]=\"hasError\" modal=\"modal\" width=\"600\" [responsive]=\"true\" [appendTo]=\"'body'\">\n  <p>{{ errorMessage }}.</p>\n\n  <small>\n    <p> Currently Dive allows only files with CHROMOSOME,START,END columns.</p>\n    <p> Check if the currently selected genome ({{deepBlueService.getGenome()?.name}}) is the right genome assembly</p>\n  </small>\n\n  <p-footer>\n    <button type=\"button\" pButton icon=\"fa-check\" (click)=\"hasError=false\" label=\"Okay\"></button>\n  </p-footer>\n</p-dialog>\n\n\n<div class=\"container\">\n  <div class=\"ui-g\">\n    <div class=\"ui-g-12\">\n      <div class=\"card\">\n        <h1>Paste Regions</h1>\n        <h2>\n          <button type=\"button\" class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left\" [disabled]=\"textAreaContent.trim().length == 0\"\n            (click)=\"onUploadClick()\">\n            <span class=\"ui-button-icon-left fa fa-upload\"></span>\n            <span class=\"ui-button-text ui-c\">Use regions</span>\n          </button>\n        </h2>\n        <textarea [rows]=\"25\" [cols]=\"30\" [(ngModel)]='textAreaContent' pInputTextarea></textarea>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/paste-regions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegionsPaste; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegionsPaste = /** @class */ (function () {
    function RegionsPaste(deepBlueService, progress_element) {
        this.deepBlueService = deepBlueService;
        this.progress_element = progress_element;
        this.hasError = false;
        this.errorMessage = "";
        this.textAreaContent = "";
        this.queryIdSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ;
    RegionsPaste.prototype.onUploadClick = function (event) {
        var _this = this;
        this.deepBlueService.inputRegions(this.textAreaContent.trim(), this.progress_element, -1).subscribe(function (op) {
            if (op.dataType() == "error") {
                _this.hasError = true;
                _this.errorMessage = op.text();
            }
            else {
                _this.queryIdSelected.emit(op);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], RegionsPaste.prototype, "queryIdSelected", void 0);
    RegionsPaste = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/component/data-selection/paste-regions.html"),
            selector: 'regions-paste',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_2_app_service_progresselement__["a" /* ProgressElement */]])
    ], RegionsPaste);
    return RegionsPaste;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-annotations.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g form-group\">\n  <div class=\"ui-g-4 ui-md-2\">\n      <label for=\"input\">Annotation Name</label>\n  </div>\n  <div class=\"ui-g-4 ui-md-2\">\n      <p-dropdown\n          #annotationsDropdown\n          [options]=\"menuAnnotations\"\n          [(ngModel)]=\"selectedAnnotation\"\n          filter=\"filter\"\n          [autoWidth]=\"false\"\n      >\n      </p-dropdown>\n  </div>\n  <div class=\"ui-g-4 ui-md-2\">\n      <button pButton type=\"button\" icon=\"ui-icon-check-circle\"\n          label=\"Select Annotation\"\n          (click)=\"selectAnnotation($event)\">\n      </button>\n  </div>\n  <div class=\"ui-g-4 ui-md-2\" [hidden]=\"!toCompare\">\n      <button pButton type=\"button\" icon=\"ui-icon-check-circle\"\n          label=\"Select Annotation for Comparison\"\n          (click)=\"selectAnnotationForComparison($event)\">\n      </button>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-annotations.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectAnnotationsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SelectAnnotationsComponent = /** @class */ (function () {
    function SelectAnnotationsComponent(deepBlueService, progress_element) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.progress_element = progress_element;
        this.annotationSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.comparedAnnotationSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.queryIdSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(function (genome) {
            if (genome === null) {
                return;
            }
            _this.deepBlueService.getAnnotations(genome).subscribe(function (annotations) {
                if (annotations.length === 0) {
                    return;
                }
                _this.annotations = annotations;
                _this.menuAnnotations = annotations.map(function (annotation) {
                    var l = { label: annotation.name, value: annotation };
                    if (l.label.toLowerCase().startsWith('cpg islands')) {
                        _this.annotationsDropdown.selectItem(null, l);
                    }
                    if (l.label.toLowerCase().startsWith('blueprint')) {
                        _this.annotationsDropdown.selectItem(null, l);
                    }
                    return l;
                });
            }, function (error) { return _this.errorMessage = error; });
        });
    }
    SelectAnnotationsComponent.prototype.selectAnnotation = function (event) {
        var _this = this;
        this.annotationSelected.emit(this.selectedAnnotation);
        this.deepBlueService.selectAnnotation(this.selectedAnnotation, this.progress_element, 0).subscribe(function (operation) {
            _this.queryIdSelected.emit(operation);
        });
    };
    SelectAnnotationsComponent.prototype.selectAnnotationForComparison = function (event) {
        this.comparedAnnotationSelected.emit(this.selectedAnnotation);
    };
    SelectAnnotationsComponent.prototype.ngOnDestroy = function () {
        this.genomeSubscription.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], SelectAnnotationsComponent.prototype, "toCompare", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SelectAnnotationsComponent.prototype, "annotationSelected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SelectAnnotationsComponent.prototype, "comparedAnnotationSelected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SelectAnnotationsComponent.prototype, "queryIdSelected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('annotationsDropdown'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["Dropdown"])
    ], SelectAnnotationsComponent.prototype, "annotationsDropdown", void 0);
    SelectAnnotationsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'select-annotations-component',
            template: __webpack_require__("../../../../../src/app/view/component/data-selection/select-annotations.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_3_app_service_progresselement__["a" /* ProgressElement */]])
    ], SelectAnnotationsComponent);
    return SelectAnnotationsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-databases.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-w-title\">\n  <h1>Select the databases that you wish to use for enrichment</h1>\n  <p-pickList #picklist [source]=\"sourceDatabases\" [target]=\"targetDatabases\" sourceHeader=\"Available\" targetHeader=\"Selected\"\n    [responsive]=\"true\">\n\n    <ng-template let-database pTemplate=\"item\">\n      <span>{{database[0]}} ({{database[1].length}})</span>\n    </ng-template>\n\n  </p-pickList>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-databases.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectDatabasesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SelectDatabasesComponent = /** @class */ (function () {
    function SelectDatabasesComponent(deepBlueService) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.sourceDatabases = [];
        this.targetDatabases = [];
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(function (genome) {
            if (genome === null) {
                return;
            }
            _this.deepBlueService.composedOverlapEnrichmentDatabase(genome).subscribe(function (databases) {
                _this.sourceDatabases = databases;
            });
        });
    }
    SelectDatabasesComponent.prototype.ngOnDestroy = function () {
        this.genomeSubscription.unsubscribe();
    };
    SelectDatabasesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-enrichment-database-component',
            template: __webpack_require__("../../../../../src/app/view/component/data-selection/select-databases.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */]])
    ], SelectDatabasesComponent);
    return SelectDatabasesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-datasets.html":
/***/ (function(module, exports) {

module.exports = "<p-sidebar [(visible)]=\"visibleSidebar\" position=\"right\" [baseZIndex]=\"20000\" styleClass=\"ui-sidebar-md\">\n  <h1 style=\"font-weight:normal\">{{selectedRow?.text()}}</h1>\n  <p-scrollPanel [style]=\"{height: '95%', width: '100%'}\">\n    <button pButton type=\"button\" icon=\"ui-icon-check-circle\" label=\"Select Dataset\" (click)=\"selectDatasets($event)\"></button>\n    <button pButton type=\"button\" (click)=\"visibleSidebar2 = false\" label=\"Cancel\" class=\"ui-button-secondary\"></button>\n\n    <h4>{{ selectedRow?.epigenetic_mark() }}</h4>\n    <h4>{{ selectedRow?.biosource() }}</h4>\n    <h4>{{ selectedRow?.sample_info() | json }}</h4>\n    <h4>{{ selectedRow?.technique() }}</h4>\n    <h4>{{ selectedRow?.project() }}</h4>\n    <h4>{{ selectedRow?.columns() | json }}</h4>\n\n    <query-flow [queryId]=\"clicked_query_id\"></query-flow>\n  </p-scrollPanel>\n</p-sidebar>\n\n<input type='text' style='padding:8px;margin:15px auto;width:30%;' placeholder='Type to filter datasets' [(ngModel)]=\"filterText\" (keyup)='updateFilter($event)' />\n<div class=\"content-section implementation\">\n    <p-treeTable *ngIf=\"datasetTreeNodes.length\" [value]=\"datasetTreeNodes\" selectionMode=\"{{selectMode}}\" [(selection)]=\"selectedDatasets\" (onNodeSelect)=\"nodeSelect($event)\">\n      <p-column field=\"name\" header=\"Name\"></p-column>\n      <p-column field=\"biosource\" header=\"BioSource\"></p-column>\n      <p-column field=\"epigeneticmark\" header=\"Epigenetic Mark\"></p-column>\n      <p-column field=\"project\" header=\"Project\"></p-column>\n  </p-treeTable>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-datasets.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectDatasetsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_domain_deepblue__ = __webpack_require__("../../../../../src/app/domain/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_domain_operations__ = __webpack_require__("../../../../../src/app/domain/operations.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SelectDatasetsComponent = /** @class */ (function () {
    function SelectDatasetsComponent(deepBlueService, progress_element) {
        this.deepBlueService = deepBlueService;
        this.progress_element = progress_element;
        this.datatable_columns = [
            { name: 'name', prop: 'name', column_type: 'string' }
        ];
        this.visibleSidebar = false;
        this.datasetTreeNodes = [];
        this.selectedDatasets = [];
        this.datasets = [];
        this.projects = [];
        this.filterText = "";
        this.selectMode = "checkbox";
        this.queryIdSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.datasetsSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SelectDatasetsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectsSubscription = this.deepBlueService.projectsValue$.subscribe(function (projects) {
            _this.projects = projects;
            if (projects === null) {
                return;
            }
            _this.progress_element.startIndeterminate();
            var genome = _this.deepBlueService.genomeSource.getValue();
            _this.datasetTreeNodes = [];
            _this.datasets = [];
            _this.deepBlueService.getComposedEnrichmentDatabases(genome.name).subscribe(function (datasets) {
                _this.datasets = datasets;
                _this.buildItems();
                _this.progress_element.finishIndeterminate();
            });
        });
    };
    SelectDatasetsComponent.prototype.buildItems = function () {
        var _this = this;
        var projectNames = this.projects.map(function (project) { return project.name; });
        this.datasetTreeNodes = this.datasets.map(function (dataset) { return _this.buildNode(dataset, projectNames); }).filter(function (node) { return node.children.length > 0; });
    };
    SelectDatasetsComponent.prototype.updateFilter = function ($event) {
        this.buildItems();
    };
    SelectDatasetsComponent.prototype.nodeSelect = function (event) {
        var _this = this;
        if (event.node.data.leaf) {
            this.deepBlueService.getInfo(event.node.data.id).subscribe(function (info) {
                _this.selectedRow = info;
                _this.visibleSidebar = true;
                if (event.node.data._query_id) {
                    _this.clicked_query_id = event.node.data._query_id.query_id.id;
                }
                else {
                    _this.clicked_query_id = "";
                }
            });
        }
    };
    SelectDatasetsComponent.prototype.buildNode = function (dataset, projectNames, epigenetic_mark, passFilter) {
        var _this = this;
        if (!epigenetic_mark) {
            epigenetic_mark = dataset[0];
        }
        var name = dataset[0];
        if (this.filterText.toLowerCase().trim().length > 0 && name.indexOf(this.filterText.toLowerCase()) >= 0) {
            passFilter = true;
        }
        return {
            "data": {
                "name": name
            },
            "children": dataset[1].map(function (key) {
                var key_array = key;
                if ('string' == typeof key_array[1]) {
                    if (key_array.length == 2) {
                        return _this.buildLeaf(key_array[0], key_array[1], dataset[0], epigenetic_mark, key_array[2], key_array[3], projectNames, passFilter);
                    }
                    else {
                        return _this.buildLeaf(key_array[0], key_array[1], dataset[0], key_array[2], epigenetic_mark, key_array[3], projectNames, passFilter, key_array[4]);
                    }
                }
                else {
                    return _this.buildNode(key, projectNames, epigenetic_mark, passFilter);
                }
            }).filter(function (value) {
                if (value == null) {
                    return false;
                }
                if (value.children) {
                    return value.children.length != 0;
                }
                return true;
            })
        };
    };
    SelectDatasetsComponent.prototype.buildLeaf = function (id, name, parent_name, biosource, epigenetic_mark, project, projectNames, passFilter, _query_id) {
        if (projectNames.indexOf(project) < 0) {
            return null;
        }
        var o = {
            "data": {
                "id": new __WEBPACK_IMPORTED_MODULE_1_app_domain_deepblue__["k" /* Id */](id),
                "name": name,
                "biosource": biosource,
                "project": project,
                "parent": parent_name,
                "epigeneticmark": epigenetic_mark,
                "leaf": true
            }
        };
        if (!passFilter && this.filterText.trim().length > 0) {
            var found = false;
            for (var _i = 0, _a = Object.keys(o.data); _i < _a.length; _i++) {
                var key = _a[_i];
                var value = o.data[key];
                if (typeof value === 'string') {
                    value = value.trim().toLowerCase();
                    if (value.indexOf(this.filterText.toLowerCase().trim()) >= 0) {
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                return null;
            }
        }
        if (_query_id) {
            var id_name = new __WEBPACK_IMPORTED_MODULE_1_app_domain_deepblue__["l" /* IdName */](new __WEBPACK_IMPORTED_MODULE_1_app_domain_deepblue__["k" /* Id */](id), name);
            var data_parameter = new __WEBPACK_IMPORTED_MODULE_4_app_domain_operations__["a" /* DeepBlueDataParameter */](id_name);
            o.data._query_id = new __WEBPACK_IMPORTED_MODULE_4_app_domain_operations__["h" /* DeepBlueOperation */](data_parameter, new __WEBPACK_IMPORTED_MODULE_1_app_domain_deepblue__["k" /* Id */](_query_id), "filter", -1);
            ;
        }
        return o;
    };
    SelectDatasetsComponent.prototype.selectDatasets = function (event) {
        var _this = this;
        if (Array.isArray(this.selectedDatasets)) {
            /*
            -- We do not allow multiple experiments data selection.
            -- It has the risk of the user select many experiments and too many regions.
            -- I keep the code in case I want to revise this choise in the future.
      
            let selected = this.selectedDatasets.filter((node: TreeNode) => node.data.leaf);
      
            let selected_experiments = selected.filter((node: TreeNode) => !("query_id" in node));
            let selected_queries = selected.filter((node: TreeNode) => "_query_id" in node.data);
      
            let o_exps = null;
            let e_exps = null;
      
            e_exps = this.deepBlueService.mergeQueries(selected_queries, this.progress_element, 0);
            o_exps = this.deepBlueService.selectExperiments(selected_experiments.map((node: TreeNode) => node.data.name), this.progress_element, 0);
      
            if (e_exps && o_exps) {
              Observable.forkJoin([e_exps, o_exps]).subscribe((completion: IOperation[]) => {
                e_exps = this.deepBlueService.mergeQueries(completion, this.progress_element, 0).subscribe((final: IOperation) => {
                  this.queryIdSelected.emit(final);
                })
              });
            } else if (e_exps) {
              e_exps.subscribe((e) => this.queryIdSelected.emit(e));
            } else if (o_exps) {
              // o_exps.subscribe((o) => this.queryIdSelected.emit(o));
            }
            */
        }
        else {
            var selected_node = this.selectedDatasets;
            if (!selected_node.data.leaf) {
                console.warn("selected data isnt leaf");
            }
            if ("_query_id" in selected_node.data) {
                this.queryIdSelected.emit(selected_node.data._query_id);
            }
            else {
                var id_name = new __WEBPACK_IMPORTED_MODULE_1_app_domain_deepblue__["l" /* IdName */](selected_node.data.id, selected_node.data.name);
                this.deepBlueService.selectExperiment(id_name, this.progress_element, 0)
                    .subscribe(function (q) { return _this.queryIdSelected.emit(q); });
            }
        }
        this.buildDatasets();
    };
    SelectDatasetsComponent.prototype.buildDatasets = function () {
        var actual = null;
        var datasets = {};
        for (var _i = 0, _a = this.selectedDatasets; _i < _a.length; _i++) {
            var selected = _a[_i];
            if (selected.data.name == "Chomatin States Segmentation") {
                continue;
            }
            if (selected.data.leaf) {
                if (selected.data._query_id) {
                    actual.data.push([selected.data._query_id.query_id.id, selected.data.name]);
                }
                else {
                    actual.data.push(selected.data.name);
                }
            }
            else {
                if (actual) {
                    datasets[actual.name] = actual.data;
                }
                actual = { name: selected.data.name, data: [] };
            }
        }
        if (actual) {
            datasets[actual.name] = actual.data;
        }
        this.datasetsSelected.emit(datasets);
    };
    SelectDatasetsComponent.prototype.ngOnDestroy = function () {
        this.projectsSubscription.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SelectDatasetsComponent.prototype, "selectMode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SelectDatasetsComponent.prototype, "queryIdSelected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SelectDatasetsComponent.prototype, "datasetsSelected", void 0);
    SelectDatasetsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'select-datasets-component',
            template: __webpack_require__("../../../../../src/app/view/component/data-selection/select-datasets.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_3_app_service_progresselement__["a" /* ProgressElement */]])
    ], SelectDatasetsComponent);
    return SelectDatasetsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-experiments.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-section implementation\">\n\n  <h3 class=\"first\">Epigenetic Marks</h3>\n\n    <ul>\n        <li *ngFor=\"let c of epigenetic_marks\">{{c.name}}</li>\n    </ul>\n\n  <p-autoComplete pInputText placeholder=\"Epigenetic Marks\" [(ngModel)]=\"epigenetic_marks\" [suggestions]=\"epigenetic_marks_suggestions\"\n    [multiple]=\"true\" (completeMethod)=\"search_epigenetic_marks($event)\" [dropdown]=\"true\" (onDropdownClick)=\"handle_dropdown_epigenetic_marks($event)\"\n    [size]=\"30\" delay=\"0\" field=\"name\" (onSelect)=\"content_changed($event)\" (onUnselect)=\"content_changed($event)\"> </p-autoComplete>\n\n  <p-autoComplete pInputText placeholder=\"BioSources\" [(ngModel)]=\"biosources\" [suggestions]=\"biosources_suggestions\" [multiple]=\"true\"\n    (completeMethod)=\"search_biosources($event)\" [dropdown]=\"true\" (onDropdownClick)=\"handle_dropdown_biosources($event)\" [size]=\"30\"\n    delay=\"0\" field=\"name\" (onSelect)=\"content_changed($event)\" (onUnselect)=\"content_changed($event)\">\n  </p-autoComplete>\n\n  <p-autoComplete pInputText placeholder=\"Techniques\" [(ngModel)]=\"techniques\" [suggestions]=\"techniques_suggestions\" [multiple]=\"true\"\n    (completeMethod)=\"search_techniques($event)\" [dropdown]=\"true\" (onDropdownClick)=\"handle_dropdown_techniques($event)\" [size]=\"30\"\n    delay=\"0\" field=\"name\" (onSelect)=\"content_changed($event)\" (onUnselect)=\"content_changed($event)\">\n  </p-autoComplete>\n\n  <p-autoComplete pInputText placeholder=\"Projects\" [(ngModel)]=\"projects\" [suggestions]=\"projects_suggestions\" [multiple]=\"true\"\n    (completeMethod)=\"search_projects($event)\" [dropdown]=\"true\" (onDropdownClick)=\"handle_dropdown_projects($event)\" [size]=\"30\"\n    delay=\"0\" field=\"name\" (onSelect)=\"content_changed($event)\" (onUnselect)=\"content_changed($event)\">\n  </p-autoComplete>\n</div>\n\n<div ngClass=\"ui-g-12\">\n  <div class=\"card card-w-title\">\n    <li *ngFor='let sel of selected_experiment'>\n      {{sel.name}}\n    </li>\n    <button pButton type=\"button\" (click)=\"select_click()\" label=\"Select experiment\"></button>\n    <ngx-datatable class='material' [columns]=\"datatable_columns\" [rows]='experiments' [headerHeight]=\"50\" [footerHeight]=\"50\"\n      [columnMode]=\"'force'\" [rowHeight]=\"'auto'\" [columnMode]=\"'force'\" [limit]=\"25\" [selectionType]=\"'single'\" [selected]=\"selected_experiment\">\n    </ngx-datatable>\n\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-experiments.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectExperimentsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SelectExperimentsComponent = /** @class */ (function () {
    function SelectExperimentsComponent(deepBlueService) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.all_epigenetic_marks = new Array();
        this.epigenetic_marks = new Array();
        this.epigenetic_marks_suggestions = new Array();
        this.all_biosources = new Array();
        this.biosources = new Array();
        this.biosources_suggestions = new Array();
        this.all_techniques = new Array();
        this.techniques = new Array();
        this.techniques_suggestions = new Array();
        this.all_projects = new Array();
        this.projects = new Array();
        this.projects_suggestions = new Array();
        this.queryIdSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.datatable_columns = [
            { name: 'id', prop: 'id', column_type: 'string' },
            { name: 'name', prop: 'name', column_type: 'string' }
        ];
        this.experiments = [];
        this.selected_experiment = [];
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(function (genome) {
            if (genome === null) {
                return;
            }
            _this.deepBlueService.listEpigeneticMarks().subscribe(function (data) { return _this.all_epigenetic_marks = data; });
            _this.deepBlueService.listBioSources().subscribe(function (data) { return _this.all_biosources = data; });
            _this.deepBlueService.listTechniques().subscribe(function (data) { return _this.all_techniques = data; });
            _this.deepBlueService.listProjects().subscribe(function (data) { return _this.all_projects = data; });
        });
    }
    SelectExperimentsComponent.prototype.search_epigenetic_marks = function (event) {
        this.epigenetic_marks_suggestions = this.all_epigenetic_marks.filter(function (em) {
            return em.name.toLowerCase().includes(event.query);
        });
    };
    SelectExperimentsComponent.prototype.search_biosources = function (event) {
        this.biosources_suggestions = this.all_biosources.filter(function (bs) {
            return bs.name.toLowerCase().includes(event.query);
        });
    };
    SelectExperimentsComponent.prototype.search_techniques = function (event) {
        this.techniques_suggestions = this.all_techniques.filter(function (tc) {
            return tc.name.toLowerCase().includes(event.query);
        });
    };
    SelectExperimentsComponent.prototype.search_projects = function (event) {
        this.projects_suggestions = this.all_projects.filter(function (pj) {
            return pj.name.toLowerCase().includes(event.query);
        });
    };
    SelectExperimentsComponent.prototype.handle_dropdown_epigenetic_marks = function (event) {
        this.epigenetic_marks_suggestions = this.all_epigenetic_marks;
    };
    SelectExperimentsComponent.prototype.handle_dropdown_biosources = function (event) {
        this.biosources_suggestions = this.all_biosources;
    };
    SelectExperimentsComponent.prototype.handle_dropdown_techniques = function (event) {
        this.techniques_suggestions = this.all_techniques;
    };
    SelectExperimentsComponent.prototype.handle_dropdown_projects = function (event) {
        this.projects_suggestions = this.all_projects;
    };
    SelectExperimentsComponent.prototype.content_changed = function (event) {
        var _this = this;
        setTimeout(function () {
            return _this.deepBlueService.listExperiments(_this.epigenetic_marks, _this.biosources, _this.techniques, _this.projects).subscribe(function (exps) {
                _this.experiments = exps;
            });
        }, 0);
    };
    SelectExperimentsComponent.prototype.select_click = function () {
        console.debug(this.selected_experiment[0]);
    };
    SelectExperimentsComponent.prototype.ngOnDestroy = function () {
        this.genomeSubscription.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SelectExperimentsComponent.prototype, "queryIdSelected", void 0);
    SelectExperimentsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'select-experiments-component',
            template: __webpack_require__("../../../../../src/app/view/component/data-selection/select-experiments.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */]])
    ], SelectExperimentsComponent);
    return SelectExperimentsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-genes.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-section implementation\">\n\n  <h3 class=\"first\">Select Genes</h3>\n\n  <div class=\"ui-g-12 ui-md-2\">\n    <p-dropdown #geneModelDropdown [options]=\"menuGeneModel\" [(ngModel)]=\"selectedGeneModel\" filter=\"filter\" [autoWidth]=\"false\"\n      (onChange)=\"selectGeneModel($event)\">\n    </p-dropdown>\n  </div>\n\n  <p-autoComplete pInputText placeholder=\"Gene name or ID\" forceSelection=\"true\" [(ngModel)]=\"gene\" [suggestions]=\"genes_suggestions\"\n    (completeMethod)=\"search_genes($event)\" [dropdown]=\"true\" (onDropdownClick)=\"handle_dropdown_genes($event)\" [size]=\"30\"\n    delay=\"0\" field=\"name\" (onSelect)=\"content_changed()\" (onUnselect)=\"content_changed()\"> </p-autoComplete>\n\n  <button pButton type=\"button\" icon=\"ui-icon-check-circle\" label=\"Select Genes\" (click)=\"selectGenes($event)\"></button>\n</div>\n\n<div ngClass=\"ui-g-12\">\n  <div class=\"card card-w-title\">\n    <ngx-datatable class='material' [columns]=\"datatable_columns\" [rows]='selected_genes' [headerHeight]=\"50\" [footerHeight]=\"50\"\n      [columnMode]=\"'force'\" [rowHeight]=\"'auto'\" [columnMode]=\"'force'\" [limit]=\"25\" [selectionType]=\"'single'\" [selected]=\"dt_selected_gene\">\n    </ngx-datatable>\n\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-genes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectGenesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SelectGenesComponent = /** @class */ (function () {
    function SelectGenesComponent(deepBlueService, progress_element) {
        this.deepBlueService = deepBlueService;
        this.progress_element = progress_element;
        this.gene = null;
        this.genes_suggestions = new Array();
        this.selected_genes = [];
        this.dt_selected_gene = [];
        this.queryIdSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.datatable_columns = [
            { name: 'name', prop: 'data.gene_name', column_type: 'string' },
            { name: 'id', prop: 'data.gene_id', column_type: 'string' },
        ];
    }
    SelectGenesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.genomeSubscription = this.deepBlueService.genomeValue$.subscribe(function (genome) {
            if (genome === null) {
                return;
            }
            _this.deepBlueService.getGeneModelsBySelectedGenome().subscribe(function (geneModels) {
                if (geneModels.length === 0) {
                    return;
                }
                _this.geneModels = geneModels;
                _this.menuGeneModel = geneModels.map(function (geneModel) {
                    var l = { label: geneModel.name, value: geneModel };
                    _this.geneModelDropdown.selectItem(null, l);
                    return l;
                });
            }, function (error) { return _this.errorMessage = error; });
        });
    };
    SelectGenesComponent.prototype.selectGeneModel = function (event) {
        this.selectedGeneModel = event.value;
    };
    SelectGenesComponent.prototype.search_genes = function (event) {
        var _this = this;
        var gene_name = event.query;
        if (gene_name.length < 3) {
            return;
        }
        this.deepBlueService.getComposedListGenes(this.selectedGeneModel.name, event.query).subscribe(function (genes) {
            _this.genes_suggestions = genes;
        });
    };
    SelectGenesComponent.prototype.selectGenes = function (event) {
        var _this = this;
        var gene_names = this.selected_genes.map(function (gene) { return gene.name; });
        this.deepBlueService.selectGenes(gene_names, this.selectedGeneModel, this.progress_element, 0).subscribe(function (operation) {
            _this.queryIdSelected.emit(operation);
        });
    };
    SelectGenesComponent.prototype.handle_dropdown_genes = function (event) {
    };
    SelectGenesComponent.prototype.content_changed = function () {
        if (this.selected_genes.indexOf(this.gene) == -1) {
            this.selected_genes.push(this.gene);
        }
    };
    SelectGenesComponent.prototype.select_click = function () {
        console.debug(this.gene);
    };
    SelectGenesComponent.prototype.ngOnDestroy = function () {
        this.genomeSubscription.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('geneModelDropdown'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["Dropdown"])
    ], SelectGenesComponent.prototype, "geneModelDropdown", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SelectGenesComponent.prototype, "queryIdSelected", void 0);
    SelectGenesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'select-genes-component',
            template: __webpack_require__("../../../../../src/app/view/component/data-selection/select-genes.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_3_app_service_progresselement__["a" /* ProgressElement */]])
    ], SelectGenesComponent);
    return SelectGenesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-query.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"ui-g\">\n    <div class=\"ui-g-12\">\n      <div class=\"card\">\n        <h1>Paste Regions</h1>\n        <h2>\n          <div class=\"ui-inputgroup\">\n            <input type=\"text\" pInputText placeholder=\"Query ID\" (keyup.enter)=\"onEnter()\" [(ngModel)]=\"model_query_id\">\n            <button pButton type=\"button\" icon=\"fa-superpowers\" class=\"ui-button-secondary\"></button>\n          </div>\n          <div class=\"Ui-inputgroup\">\n            <p>\n              <button pButton type=\"button\" (click)=\"useQuery()\" label=\"Load Query\"></button>\n          </div>\n        </h2>\n      <query-flow [queryId]=\"query_id\" (queryOp)=\"loadQuery($event)\"></query-flow>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-query.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectQuery; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SelectQuery = /** @class */ (function () {
    function SelectQuery(deepBlueService, progress_element) {
        this.deepBlueService = deepBlueService;
        this.progress_element = progress_element;
        this.model_query_id = null;
        this.query_id = null;
        this.queryIdSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ;
    SelectQuery.prototype.onEnter = function (event) {
        this.query_id = this.model_query_id;
    };
    SelectQuery.prototype.loadQuery = function ($event) {
        this.selected_query = $event;
    };
    SelectQuery.prototype.useQuery = function () {
        this.queryIdSelected.emit(this.selected_query);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SelectQuery.prototype, "queryIdSelected", void 0);
    SelectQuery = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/component/data-selection/select-query.html"),
            selector: 'select-query'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_2_app_service_progresselement__["a" /* ProgressElement */]])
    ], SelectQuery);
    return SelectQuery;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-tiling-regions.html":
/***/ (function(module, exports) {

module.exports = "<button pButton type=\"button\" (click)=\"select_click()\" label=\"Select tiling regions with {{ size }} base pairs\"></button>\n\n<p-inplace #inplace closable=\"closable\" [style]=\"{'min-height':'30px'}\" [active]=\"false\">\n  <span pInplaceDisplay>\n    {{ size?.toLocaleString() }}bp (click to edit)\n  </span>\n  <span pInplaceContent>\n    <input type=\"text\" [ngModel]=\"size\" type=\"number\" (ngModelChange)=\"size = $event\"(keyup.enter)=\"onEnter($event)\"/>\n\n  </span>\n</p-inplace>\n\n\n<p>\n  <p-slider [(ngModel)]=\"size\" [animate]=true [step]=\"500\" [min]=\"min\" [max]=\"max\">\n  </p-slider>\n</p>"

/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/select-tiling-regions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectTilingRegionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_primeng_primeng__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SelectTilingRegionsComponent = /** @class */ (function () {
    function SelectTilingRegionsComponent(deepBlueService, progress_element, cdRef) {
        this.deepBlueService = deepBlueService;
        this.progress_element = progress_element;
        this.cdRef = cdRef;
        this.min = 1000;
        this.max = 1000000;
        this.size = 10000;
        this.queryIdSelected = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    SelectTilingRegionsComponent.prototype.onEnter = function ($event) {
        this.cdRef.detectChanges();
        if (this.size < this.min) {
            this.size = this.min;
        }
        this.inPlace.deactivate($event);
        this.select_click();
    };
    SelectTilingRegionsComponent.prototype.select_click = function () {
        var _this = this;
        this.deepBlueService.tilingRegions(this.size, [], this.progress_element, 0).subscribe(function (tiling) {
            _this.queryIdSelected.emit(tiling);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('inplace'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["Inplace"])
    ], SelectTilingRegionsComponent.prototype, "inPlace", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SelectTilingRegionsComponent.prototype, "queryIdSelected", void 0);
    SelectTilingRegionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'select-tiling-component',
            template: __webpack_require__("../../../../../src/app/view/component/data-selection/select-tiling-regions.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_2_app_service_progresselement__["a" /* ProgressElement */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]])
    ], SelectTilingRegionsComponent);
    return SelectTilingRegionsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/upload-regions.html":
/***/ (function(module, exports) {

module.exports = "<p-dialog header=\"Error during dataset upload\" [(visible)]=\"hasError\" modal=\"modal\" width=\"600\" [responsive]=\"true\" [appendTo]=\"'body'\">\n  <p>{{ errorMessage }}.</p>\n\n  <small>\n  <p> Currently Dive allows only files with CHROMOSOME,START,END columns.</p>\n  <p> Check if the currently selected genome  ({{deepBlueService.getGenome()?.name}}) is the right genome assembly</p>\n  </small>\n\n  <p-footer>\n    <button type=\"button\" pButton icon=\"fa-check\" (click)=\"hasError=false\" label=\"Okay\"></button>\n  </p-footer>\n</p-dialog>\n\n\n<p-sidebar [(visible)]=\"isUploading\" position=\"bottom\" [fullScreen]=\"true\" [appendTo]=\"'body'\">\n  <div style=\" height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\" [ngStyle]=\"{'background-image': 'url(assets/layout/images/diving.gif)', 'background-size':'cover'}\">\n    <h1>Loading, please wait</h1>\n  </div>\n</p-sidebar>\n\n<div class=\"container\">\n  <div class=\"ui-g\">\n    <div class=\"ui-g-12\">\n      <div class=\"card\">\n        <h1>Upload your file</h1>\n        <h3>The file must be composed of tab separated columns the columns: CHROMOSOME,START,END</h3>\n\n        <!-- We send the genome name as the file name -->\n        <p-fileUpload name=\"{{deepBlueService.getGenome()?.name}}\" url=\"api/composed_commands/upload_regions\" (onBeforeUpload)=\"isUploading = true\" (onUpload)=\"onUpload($event)\"\n          accept=\"text/plain,.csv,.bed,.txt\" maxFileSize=\"10000000\" auto=\"true\">\n\n          <ng-template pTemplate=\"content\">\n            <ul *ngIf=\"uploadedFiles.length\">\n              <li *ngFor=\"let file of uploadedFiles\">{{file.name}} - {{file.size}} bytes</li>\n            </ul>\n          </ng-template>\n\n          <ng-template pTemplate=\"content\">\n              <br />\n              <br />\n              <br />\n              <br />\n              <br />\n              <br />\n              <br />\n              <br />\n              <br />\n              <h2 [style.text-align]=\"'center'\">Files can be uploaded by dragging them here.</h2>\n              <br />\n              <br />\n              <br />\n              <br />\n              <br />\n              <br />\n              <br />\n              <br />\n          </ng-template>\n\n        </p-fileUpload>\n\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/component/data-selection/upload-regions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegionsUpload; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_domain_operations__ = __webpack_require__("../../../../../src/app/domain/operations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_domain_deepblue__ = __webpack_require__("../../../../../src/app/domain/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegionsUpload = /** @class */ (function () {
    function RegionsUpload(deepBlueService, progress_element) {
        this.deepBlueService = deepBlueService;
        this.progress_element = progress_element;
        this.uploadedFiles = [];
        this.isUploading = false;
        this.hasError = false;
        this.errorMessage = "";
        this.queryIdSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ;
    RegionsUpload.prototype.onUpload = function (event) {
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.uploadedFiles.push(file);
        }
        this.isUploading = false;
        var response = JSON.parse(event.xhr.response);
        if (response[0] == "error") {
            this.uploadedFiles = [];
            this.hasError = true;
            this.errorMessage = response[1];
        }
        else {
            var query_id = response[1];
            this.queryIdSelected.emit(new __WEBPACK_IMPORTED_MODULE_1_app_domain_operations__["h" /* DeepBlueOperation */](new __WEBPACK_IMPORTED_MODULE_1_app_domain_operations__["b" /* DeepBlueEmptyParameter */](), new __WEBPACK_IMPORTED_MODULE_2_app_domain_deepblue__["k" /* Id */](query_id), 'input_regions', -1));
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], RegionsUpload.prototype, "queryIdSelected", void 0);
    RegionsUpload = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/component/data-selection/upload-regions.html"),
            selector: 'regions-upload',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_4_app_service_progresselement__["a" /* ProgressElement */]])
    ], RegionsUpload);
    return RegionsUpload;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/datastack.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataStackViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataStackViewComponent = /** @class */ (function () {
    function DataStackViewComponent(deepBlueService, selectedData) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.selectedData = selectedData;
        this.showSidebar = false;
        this.preview = "";
        this.subscription = null;
        this.selectedData.activeStackValue$.subscribe(function (active) {
            if (!active) {
                return;
            }
            _this.actualStack = active;
            if (_this.subscription && !_this.subscription.closed) {
                _this.subscription.unsubscribe();
            }
            _this.subscription = _this.actualStack.getStackValueObserver().subscribe(function (dataStackItems) {
                if (dataStackItems != null) {
                    var dataId = _this.actualStack.getInitialOperation().mainOperation().data().id().id;
                    if (dataId && dataId.length > 0 && dataId[0] == 'e') {
                        _this.deepBlueService.previewExperiment(_this.actualStack.getInitialOperation().mainOperation().data().name()).subscribe(function (prv) {
                            _this.preview = prv[1];
                        });
                    }
                    else {
                        _this.preview = "(Selected data is not an experiment, preview is not available)";
                    }
                }
            });
        });
    }
    DataStackViewComponent.prototype.removeData = function (event, data) {
        this.selectedData.activeStackSubject.getValue().remove(data);
    };
    DataStackViewComponent.prototype.saveData = function (event, data) {
        this.selectedData.saveActiveStack();
    };
    DataStackViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-data-stack',
            template: "\n\n    <div class=\"dashboard\">\n\n\n        <div *ngIf=\"selectedData.getActiveData().length > 0\" class=\"ui-g-12 ui-md-12\" style=\"word-wrap: break-word\" [style]=\"{'height':'100%'}\">\n            <div class=\"activity-header dashboard\">\n                <div class=\"ui-g\">\n                    <div class=\"ui-g-2\">\n                        <button type=\"button\" pButton\n                            icon=\"ui-icon-blur-on\"\n                            [style.background]=\"actualStack.getColor()\"\n                            (click)=\"showSidebar = true\">\n                        </button>\n                    </div>\n\n                    <p-sidebar [(visible)]=\"showSidebar\" position=\"top\" [baseZIndex]=\"20000\" styleClass=\"ui-sidebar-md\" [appendTo]=\"'body'\">\n                        <h1>{{ actualStack.getInitialOperation().text() }}<p-colorPicker [(ngModel)]=\"actualStack.color_array\" format=\"rgb\"></p-colorPicker></h1>\n\n\n                        {{ selectedData.getActiveCurrentOperation().data().name() }}\n\n\n                        <pre>{{ preview }}</pre>\n\n                    </p-sidebar>\n\n                    <div class=\"ui-g-8\">\n                        <div style=\"font-weight:bold\" class=\"description\">{{ actualStack.getInitialOperation().text() }}</div>\n                    </div>\n                </div>\n                <p class=\"count\"> {{ selectedData.getActiveData()[0].count }} regions</p>\n            </div>\n\n            <ul class=\"activity-list\">\n                <li *ngFor=\"let data of selectedData.getActiveData() | slice:1\">\n                    <div class=\"ui-g\">\n                        <div class=\"ui-g-6\">\n                            <div class=\"description\">{{ data.op.text() }}</div>\n                            <p class=\"count\"> {{data.count}} regions <p>\n                        </div>\n\n                        <div class=\"ui-g-2 button-change\">\n                            <button class=\"red-btn\" type=\"button\" icon=\"ui-icon-remove\" pButton (click)=\"removeData($event, data)\"></button>\n                        </div>\n\n                        <div class=\"ui-g-2 button-change\">\n                            <button class=\"red-btn\" type=\"button\" icon=\"ui-icon-bookmark-border\" pButton\n                                (click)=\"saveData($event, data)\"></button>\n                        </div>\n                    </div>\n\n                </li>\n            </ul>\n        </div>\n    </div>\n"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__["a" /* SelectedData */]])
    ], DataStackViewComponent);
    return DataStackViewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/deepblue.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectedDataButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SelectedDataView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_datastack__ = __webpack_require__("../../../../../src/app/service/datastack.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SelectedDataButton = /** @class */ (function () {
    function SelectedDataButton(selectedData) {
        this.selectedData = selectedData;
    }
    SelectedDataButton.prototype.ngOnInit = function () {
        var _this = this;
        this.items = [
            {
                label: 'Use as main data', command: function () { return _this.moveToMain(); }
            },
            {
                label: 'Remove', command: function () { return _this.remove(); }
            },
            {
                label: 'Rename', command: function () { return _this.rename(); }
            }
        ];
    };
    SelectedDataButton.prototype.remove = function () {
        this.selectedData.removeStack(this.dataStack);
    };
    SelectedDataButton.prototype.rename = function () {
        console.info('save this stack');
    };
    SelectedDataButton.prototype.moveToMain = function () {
        this.selectedData.setActiveStack(this.dataStack);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_app_service_datastack__["a" /* DataStack */])
    ], SelectedDataButton.prototype, "dataStack", void 0);
    SelectedDataButton = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'selected-data-button',
            template: "\n    <p-overlayPanel #op [dismissable]=\"true\" [showCloseIcon]=\"true\" appendTo=\"body\">\n        <p-panel>\n            <p-header>\n                <div class=\"ui-helper-clearfix\">\n                    <span class=\"ui-panel-title\" style=\"font-size:16px;display:inline-block;margin-top:2px\">{{ dataStack.name() }}</span>\n                    <p-splitButton [style]=\"{'float':'right'}\" label=\"Use as main data\" (onClick)=\"moveToMain()\" [model]=\"items\"></p-splitButton>\n\n                    <p-colorPicker [(ngModel)]=\"dataStack.color_array\" format=\"rgb\"></p-colorPicker>\n                </div>\n            </p-header>\n\n            <div class=\"dashboard\">\n                <ul class=\"activity-list\">\n                    <query-flow [queryId]=\"dataStack._data[0]?.op.id().id\"></query-flow>\n                </ul>\n            </div>\n        </p-panel>\n    </p-overlayPanel>\n\n    <button #bt pButton type=\"button\" [style.background]=\"dataStack.getColor()\" icon=\"ui-icon-dehaze\"\n            label=\"{{ dataStack.name() }}\"\n            (click)=\"op.toggle($event)\">\n    </button>\n\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__["a" /* SelectedData */]])
    ], SelectedDataButton);
    return SelectedDataButton;
}());

var SelectedDataView = /** @class */ (function () {
    function SelectedDataView(selectedData) {
        this.selectedData = selectedData;
    }
    SelectedDataView = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'selected-data',
            template: "\n                <p-toolbar>\n                    <div class=\"ui-toolbar-group-left\">\n                        <selected-data-button\n                            *ngFor=\"let ds of selectedData._stacks | slice:1\"\n                            [dataStack]=\"ds\">\n                        </selected-data-button>\n                    </div>\n                </p-toolbar>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__["a" /* SelectedData */]])
    ], SelectedDataView);
    return SelectedDataView;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/menu/columns-filtering.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColumnsMenuFilterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_service_menu__ = __webpack_require__("../../../../../src/app/service/menu.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ColumnsMenuFilterComponent = /** @class */ (function () {
    function ColumnsMenuFilterComponent(deepBlueService, fb, selectedData, diveMenuService) {
        this.deepBlueService = deepBlueService;
        this.fb = fb;
        this.selectedData = selectedData;
        this.diveMenuService = diveMenuService;
    }
    ColumnsMenuFilterComponent_1 = ColumnsMenuFilterComponent;
    ColumnsMenuFilterComponent.prototype.apply_filter = function (column, type, form_content) {
        event.preventDefault();
        this.selectedData.activeStackSubject.getValue().filter_regions(column, form_content['operation'], form_content['value'], type);
    };
    ColumnsMenuFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedData.activeTopStackValue$.subscribe(function (data) {
            if (data === null) {
                return;
            }
            _this.selectedData.getActiveCurrentOperationMetadata().subscribe(function (metadata) {
                if (metadata == null) {
                    return;
                }
                var columns = metadata.columns();
                if (!columns) {
                    // TODO: Include hardcoded CHROMSOME,START,END
                    _this.diveMenuService.remove('columns');
                    return;
                }
                _this.diveMenuService.clean('columns');
                var _loop_1 = function (column) {
                    var formGroup = _this.fb.group({
                        value: '',
                        operation: '=='
                    });
                    var filter_options = column.column_type == "string" ? ColumnsMenuFilterComponent_1.STRING_OPTIONS : ColumnsMenuFilterComponent_1.NUMBER_OPTIONS;
                    var filter_column_type = column.column_type == "string" ? "string" : "number";
                    _this.diveMenuService.includeObject('columns', {
                        value_control_name: 'value',
                        operation_control_name: 'operation',
                        label: column.name,
                        type: 'filter_by',
                        group: formGroup,
                        options: filter_options,
                        submit: function (event) { _this.apply_filter(column.name, filter_column_type, formGroup.value); }
                    });
                };
                for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                    var column = columns_1[_i];
                    _loop_1(column);
                }
            });
        });
    };
    ColumnsMenuFilterComponent.STRING_OPTIONS = [
        { label: '==', value: '==' },
        { label: '!=', value: '!=' }
    ];
    ColumnsMenuFilterComponent.NUMBER_OPTIONS = [
        { label: '==', value: '==' },
        { label: '!=', value: '!=' },
        { label: '>', value: '>' },
        { label: '>=', value: '>=' },
        { label: '<', value: '<' },
        { label: '<=', value: '<=' }
    ];
    ColumnsMenuFilterComponent = ColumnsMenuFilterComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'columns-filtering',
            template: '<p></p>'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__["a" /* SelectedData */], __WEBPACK_IMPORTED_MODULE_4_app_service_menu__["a" /* DiveMenuService */]])
    ], ColumnsMenuFilterComponent);
    return ColumnsMenuFilterComponent;
    var ColumnsMenuFilterComponent_1;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/menu/dna-pattern-filtering.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DnaPatternMenuFilterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_service_menu__ = __webpack_require__("../../../../../src/app/service/menu.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DnaPatternMenuFilterComponent = /** @class */ (function () {
    function DnaPatternMenuFilterComponent(deepBlueService, fb, selectedData, diveMenuService) {
        this.deepBlueService = deepBlueService;
        this.fb = fb;
        this.selectedData = selectedData;
        this.diveMenuService = diveMenuService;
    }
    DnaPatternMenuFilterComponent.prototype.validateDNAPattern = function (c) {
        var regexp = new RegExp('^[a-zA-Z][a-zA-Z]+$');
        var x = regexp.test(c.value) ? null : { valid: false };
        return x;
    };
    ;
    DnaPatternMenuFilterComponent.prototype.save_dna_pattern_filter = function (form_content) {
        event.preventDefault();
        this.selectedData.activeStackSubject.getValue().filter_by_dna_motif(form_content['dna_pattern']);
    };
    DnaPatternMenuFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.deepBlueService.dataToDiveValue$.subscribe(function (data) {
            if (data === null) {
                return;
            }
            _this.pattern_form = _this.fb.group({
                dna_pattern: ["", [_this.validateDNAPattern]]
            });
            _this.diveMenuService.includeObject('filtering', {
                label: 'DNA Pattern', type: 'string', group: _this.pattern_form, control_name: 'dna_pattern',
                submit: function (event) { _this.save_dna_pattern_filter(_this.pattern_form.value); }
            });
        });
    };
    DnaPatternMenuFilterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'dna-pattern-filtering',
            template: '<p></p>'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__["a" /* SelectedData */], __WEBPACK_IMPORTED_MODULE_4_app_service_menu__["a" /* DiveMenuService */]])
    ], DnaPatternMenuFilterComponent);
    return DnaPatternMenuFilterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/menu/length-filtering.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LengthMenuFilterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_service_menu__ = __webpack_require__("../../../../../src/app/service/menu.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LengthMenuFilterComponent = /** @class */ (function () {
    function LengthMenuFilterComponent(deepBlueService, fb, selectedData, diveMenuService) {
        this.deepBlueService = deepBlueService;
        this.fb = fb;
        this.selectedData = selectedData;
        this.diveMenuService = diveMenuService;
    }
    LengthMenuFilterComponent.prototype.validateMinNumber = function (c) {
        return c.value < 1 ? null : { valid: false };
    };
    ;
    LengthMenuFilterComponent.prototype.save_min_length = function (form_content) {
        event.preventDefault();
        this.selectedData.activeStackSubject.getValue().filter_regions('@LENGTH', '>=', form_content['min_length'], 'number');
    };
    LengthMenuFilterComponent.prototype.save_max_length = function (form_content) {
        event.preventDefault();
        this.selectedData.activeStackSubject.getValue().filter_regions('@LENGTH', '<=', form_content['max_length'], 'number');
    };
    LengthMenuFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.min_length_form = this.fb.group({
            min_length: [0, [this.validateMinNumber]]
        });
        this.max_length_form = this.fb.group({
            max_length: [0, []]
        });
        this.deepBlueService.dataToDiveValue$.subscribe(function (data) {
            if (data === null) {
                return;
            }
            _this.diveMenuService.includeObject('filtering', {
                label: 'Mininum region length', type: 'number', group: _this.min_length_form, control_name: 'min_length',
                submit: function (event) { _this.save_min_length(_this.min_length_form.value); }
            });
            _this.diveMenuService.includeObject('filtering', {
                label: 'Maximum region length', type: 'number', group: _this.max_length_form, control_name: 'max_length',
                submit: function (event) { _this.save_max_length(_this.max_length_form.value); }
            });
        });
    };
    LengthMenuFilterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'length-filtering',
            template: '<p></p>'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__["a" /* SelectedData */], __WEBPACK_IMPORTED_MODULE_4_app_service_menu__["a" /* DiveMenuService */]])
    ], LengthMenuFilterComponent);
    return LengthMenuFilterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/progressbar.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataLoadProgressBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataLoadProgressBar = /** @class */ (function () {
    function DataLoadProgressBar(progresseelement) {
        var _this = this;
        this.progresseelement = progresseelement;
        this.progress_value = -1;
        this.mode = "indeterminate";
        this.progresseelement.progressValueValue$.subscribe(function (actualValue) {
            _this.progress_value = actualValue;
        });
        this.progresseelement.progressModeValue$.subscribe(function (mode) {
            _this.mode = mode;
        });
    }
    DataLoadProgressBar = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'data-load-progress-bar',
            template: "\n        <div *ngIf=\"mode == 'determinate'\">\n            <p-progressBar *ngIf=\"progress_value >= 0 && progress_value < 100\" [mode]=\"mode\" [value]=\"progress_value\" [showValue]=\"true\"></p-progressBar>\n        </div>\n        <div *ngIf=\"mode == 'indeterminate'\" class=\"splash-loader-container\" >\n            <svg class=\"splash-loader\" width=\"65px\" height=\"65px\" viewBox=\"0 0 66 66\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle class=\"splash-path\" fill=\"none\" stroke-width=\"6\" stroke-linecap=\"round\" cx=\"33\" cy=\"33\" r=\"30\"></circle>\n            </svg>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_app_service_progresselement__["a" /* ProgressElement */]])
    ], DataLoadProgressBar);
    return DataLoadProgressBar;
}());



/***/ }),

/***/ "../../../../../src/app/view/component/query-flow.html":
/***/ (function(module, exports) {

module.exports = "<p-organizationChart [value]=\"data\" selectionMode=\"single\" styleClass=\"company\">\n  <ng-template let-node pTemplate=\"person\">\n    <div class=\"node-header ui-corner-top\"> {{node.label}} </div>\n    <div class=\"node-content\">\n      <div *ngFor=\"let parameter of node.data.parameters\">{{parameter}}</div>\n    </div>\n  </ng-template>\n  <ng-template let-node pTemplate=\"department\">\n    {{ node.label }}\n  </ng-template>\n</p-organizationChart>"

/***/ }),

/***/ "../../../../../src/app/view/component/query-flow.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryFlow; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_domain_deepblue__ = __webpack_require__("../../../../../src/app/domain/deepblue.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var QueryFlow = /** @class */ (function () {
    function QueryFlow(deepBlueService, progress_element) {
        this.deepBlueService = deepBlueService;
        this.progress_element = progress_element;
        this.queryOp = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ;
    QueryFlow.prototype.ngOnInit = function () {
        this.data = [];
    };
    Object.defineProperty(QueryFlow.prototype, "queryId", {
        set: function (queryId) {
            var _this = this;
            var _queryId = (queryId && queryId.trim()) || null;
            this.data = [];
            if (!_queryId) {
                return;
            }
            this.deepBlueService.getQueryInfo(new __WEBPACK_IMPORTED_MODULE_3_app_domain_deepblue__["k" /* Id */](_queryId)).subscribe(function (op) {
                setTimeout(function () {
                    _this.data = [_this.build_tree(op)];
                    _this.queryOp.emit(op);
                }, 0);
            });
        },
        enumerable: true,
        configurable: true
    });
    QueryFlow.prototype.build_data_operation_node = function (o) {
        var node = {};
        node.label = o.command + " (" + o.query_id.id + ")";
        node.type = 'person';
        node.data = {};
        node.data.parameters = [];
        this.deepBlueService.countRegionsRequest(o, this.progress_element, 0).subscribe(function (result) {
            node.data.parameters.unshift("Total Regions: " + result.resultAsCount());
        });
        if (o._params) {
            node.data = { parameters: Object.keys(o._params).map(function (k) { return k + ": " + o._params[k]; }) };
        }
        node.styleClass = 'ui-person';
        node.expanded = true;
        var lookup_keys = [];
        var children = [];
        if (o.command == "intersection") {
            lookup_keys.push("_subject");
            lookup_keys.push("_filter");
        }
        else if (o.command == "aggregate") {
            lookup_keys.push("_subject");
            lookup_keys.push("_ranges");
            node.data.parameters.push("field: " + o.field);
        }
        else if (o._data._data_type == "operation_args") {
            delete o._data.args['cache'];
            node.data = { parameters: Object.keys(o._data.args).map(function (k) { return k + ": " + o._data.args[k]; }) };
        }
        else {
            lookup_keys.push("_data");
        }
        for (var _i = 0, lookup_keys_1 = lookup_keys; _i < lookup_keys_1.length; _i++) {
            var key = lookup_keys_1[_i];
            if (o[key]) {
                var c = this.build_tree(o[key]);
                children.push(c);
            }
        }
        if (children.length > 0) {
            node.children = children;
        }
        return node;
    };
    QueryFlow.prototype.build_tiling_node = function (o) {
        var node = {};
        node.label = "tiling_regions (" + o.query_id.id + ")";
        node.type = 'person';
        node.data = {};
        node.data.parameters = [];
        this.deepBlueService.countRegionsRequest(o, this.progress_element, 0).subscribe(function (result) {
            node.data.parameters.unshift("Total Regions: " + result.resultAsCount());
        });
        if (o.genome) {
            node.data.parameters.push("genome: " + o.genome);
        }
        if (o.chromosomes) {
            node.data.parameters.push("chromosomes: " + o.chromosomes.join(","));
        }
        if (o.size) {
            node.data.parameters.push("size: " + o.size);
        }
        return node;
    };
    QueryFlow.prototype.build_tree = function (o) {
        if (!o) {
            return null;
        }
        switch (o._data_type) {
            case 'data_operation': return this.build_data_operation_node(o);
            case 'tiling': return this.build_tiling_node(o);
            default: {
                console.error("unknow:", o);
                return null;
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], QueryFlow.prototype, "queryOp", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], QueryFlow.prototype, "queryId", null);
    QueryFlow = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/component/query-flow.html"),
            selector: 'query-flow',
            styles: ["\n\n.ui-organizationchart-node-content.department-cfo {\n                      background-color: #7247bc;\n                      color: #ffffff;\n}\n\n.ui-organizationchart-node-content.department-coo {\n  background-color: #a534b6\n  color: #ffffff;\n}\n\n.ui-organizationchart-node-content.department-cto {\n  background-color: #e9286f;\n                    color: #ffffff;\n}\n\n.company.ui-organizationchart .ui-organizationchart-node-content.ui-person {\n    padding: 0;\n    border: 0 none;\n}\n\nbody .ui-organizationchart .ui-organizationchart-line-down{\n      background-color: #bcbcbc;\n}\n\nbody .ui-organizationchart .ui-organizationchart-line-left{\n  border-right: 1px solid #bcbcbc;\n}\n\nbody .ui-organizationchart .ui-organizationchart-line-top{\n  border-top: 1px solid #bcbcbc;\n}\n\nbody .ui-organizationchart .ui-organizationchart-node-content{\n  border-color: #bcbcbc;\n}\n\nbody .ui-organizationchart .ui-organizationchart-node-content .ui-node-toggler{\n  color: #bcbcbc;\n}\n\n.node-header,.node-content {\n    padding: .5em .7em;\n}\n\n.node-header {\n    background-color: #495ebb;\n    color: #ffffff;\n}\n\n.node-content {\n    text-align: left;\n    border: 1px solid #495ebb;\n}\n\n.node-content img {\n    border-radius: 50%;\n}\n\n.department-cfo {\n    background-color: #7247bc;\n    color: #ffffff;\n}\n\n.department-coo {\n    background-color: #a534b6;\n    color: #ffffff;\n}\n\n.department-cto {\n    background-color: #e9286f;\n    color: #ffffff;\n}\n\n.ui-person .ui-node-toggler {\n    color: #495ebb !important;\n}\n\n.department-cto .ui-node-toggler {\n    color: #8a0a39 !important;\n}\n"],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_2_app_service_progresselement__["a" /* ProgressElement */]])
    ], QueryFlow);
    return QueryFlow;
}());



/***/ }),

/***/ "../../../../../src/app/view/screen/chromatin_states.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g ui-fluid\">\n    <div [ngClass]=\"{'ui-g-12': true}\">\n        <div class=\"card card-w-title\">\n            <h1>{{ deepBlueService.getDivingData().data().name() }} overlapping with Chromatin State {{ this.deepBlueService.epigeneticMarkSource.getValue().name\n                }} </h1>\n            <p-multiSelect #multiselect [defaultLabel]=\"defaultSelectBiosourcesLabel\" [options]=\"biosourcesItems\" [(ngModel)]=\"selectedMultiSelectBiosources\"\n                (onChange)=\"selectBiosources($event)\">\n            </p-multiSelect>\n            <app-overlaps-bar-chart #overlapbarchart> </app-overlaps-bar-chart>\n        </div>\n    </div>\n</div>\n\n<p-sidebar [(visible)]=\"hasDataDetail\" position=\"right\" [baseZIndex]=\"10000\" styleClass=\"ui-sidebar-md\">\n    <app-data-info-box (dataSelected)=\"dataSelected()\"></app-data-info-box>\n</p-sidebar>"

/***/ }),

/***/ "../../../../../src/app/view/screen/chromatin_states.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChromatinStatesScreenComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_charts_overlappingbar__ = __webpack_require__("../../../../../src/app/view/component/charts/overlappingbar.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_domain_operations__ = __webpack_require__("../../../../../src/app/domain/operations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_service_statistics__ = __webpack_require__("../../../../../src/app/service/statistics.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_service_requests_manager__ = __webpack_require__("../../../../../src/app/service/requests-manager.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ChromatinStatesScreenComponent = /** @class */ (function () {
    function ChromatinStatesScreenComponent(deepBlueService, requestManager, progress_element, selectedData) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.requestManager = requestManager;
        this.progress_element = progress_element;
        this.selectedData = selectedData;
        this.biosourcesItems = [];
        this.selectedMultiSelectBiosources = [];
        this.defaultSelectBiosourcesLabel = 'Select the BioSource';
        this.selectedExperimentsSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.selectedExperimentsValue$ = this.selectedExperimentsSource.asObservable();
        this.selectedBioSourcesSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.selectedBioSourcesValue$ = this.selectedBioSourcesSource.asObservable();
        this.currentlyProcessing = [];
        this.current_request = 0;
        this.hasDataDetail = false;
        this.epigeneticMarkSubscription = deepBlueService.epigeneticMarkValue$.subscribe(function (css) {
            _this.deepBlueService.getExperiments(deepBlueService.getGenome(), "Chromatin State Segmentation").subscribe(function (experiments_ids) {
                var ids = experiments_ids.map(function (e) { return e.id.id; });
                _this.deepBlueService.getExperimentsInfos(ids).subscribe(function (full_info) {
                    _this.experiments = full_info;
                    _this.segregated_data = _this.segregate(full_info);
                });
            }, function (error) { return _this.errorMessage = error; });
        });
    }
    ChromatinStatesScreenComponent.prototype.segregate = function (experiments) {
        var biosources = {};
        var samples = {};
        var epigenetic_marks = {};
        var techniques = {};
        var projects = {};
        var event_items = [];
        var pre_selected_biosources = this.deepBlueService.selectedBioSources.getValue().map(function (x) { return x.name; });
        this.biosourcesItems = [];
        this.selectedMultiSelectBiosources = [];
        for (var _i = 0, experiments_1 = experiments; _i < experiments_1.length; _i++) {
            var experiment = experiments_1[_i];
            var experiment_biosource = experiment.sample_info()['biosource_name'];
            var experiment_sample_id = experiment.sample_id();
            var experiment_epigenetic_mark = experiment.epigenetic_mark();
            var experiment_technique = experiment.technique();
            var experiment_project = experiment.project();
            if (!(experiment_biosource in biosources)) {
                biosources[experiment_biosource] = [];
                var l = {
                    label: experiment_biosource,
                    norm_label: experiment_biosource.toLowerCase().replace(/[\W_]+/g, ""),
                    value: { name: experiment_biosource, experiments: biosources[experiment_biosource] }
                };
                this.biosourcesItems.push(l);
                if (pre_selected_biosources.map(function (bs) { return bs.toLowerCase().replace(/[\W_]+/g, ""); }).indexOf(l.norm_label) > -1) {
                    event_items.push(l.value);
                    this.selectedMultiSelectBiosources.push(l.value);
                }
            }
            if (!(experiment_sample_id in samples)) {
                samples[experiment_sample_id] = [];
            }
            if (!(experiment_epigenetic_mark in epigenetic_marks)) {
                epigenetic_marks[experiment_epigenetic_mark] = [];
            }
            if (!(experiment_technique in techniques)) {
                techniques[experiment_technique] = [];
            }
            if (!(experiment_project in projects)) {
                projects[experiment_project] = [];
            }
            biosources[experiment_biosource].push(experiment);
            samples[experiment_sample_id].push(experiment);
            epigenetic_marks[experiment_epigenetic_mark].push(experiment);
            techniques[experiment_technique].push(experiment);
            projects[experiment_project].push(experiment);
        }
        this.selectBiosources({ value: event_items });
        return {
            'biosources': biosources,
            'samples': samples,
            'epigenetic_marks': epigenetic_marks,
            'techniques': techniques,
            'projects': projects
        };
    };
    ChromatinStatesScreenComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.deepBlueService.dataInfoSelectedValue$.subscribe(function (s) { if (s) {
            _this.hasDataDetail = true;
        } });
        this.selectedExperimentsValue$.debounceTime(250).subscribe(function () { return _this.processOverlaps(); });
        this.selectedData.activeTopStackValue$.subscribe(function (dataStackItem) { return _this.processOverlaps(); });
    };
    ChromatinStatesScreenComponent.prototype.selectBiosources = function (event) {
        var experiments = [];
        var selected_data = event.value;
        var biosources = event.value.map(function (x) { return x.name; });
        var exp_arrays = event.value.map(function (x) { return x.experiments; });
        experiments = experiments.concat.apply([], exp_arrays);
        this.selectedExperimentsSource.next(experiments);
        this.selectedBioSourcesSource.next(biosources);
    };
    ChromatinStatesScreenComponent.prototype.processOverlaps = function () {
        var _this = this;
        var experiments = this.selectedExperimentsSource.getValue();
        if (experiments.length === 0) {
            this.reloadPlot(this, []);
            return;
        }
        if (experiments !== this.selectedExperimentsSource.getValue()) {
            this.reloadPlot(this, []);
            return;
        }
        if (experiments === this.currentlyProcessing) {
            return;
        }
        this.current_request++;
        // Each experiment is started, selected, overlaped, count, get request data (4 times each)
        this.progress_element.reset(experiments.length * this.selectedData.getStacksTopOperation().length * 5, this.current_request);
        this.currentlyProcessing = experiments;
        var start = new Date().getTime();
        var current = this.selectedData.getStacksTopOperation();
        var state = this.deepBlueService.epigeneticMarkSource.getValue();
        var filter = new __WEBPACK_IMPORTED_MODULE_4_app_domain_operations__["c" /* DeepBlueFilterParameters */]("NAME", "==", state.name, "string");
        this.deepBlueService.composedCountOverlaps(current, experiments, [filter]).subscribe(function (request) {
            _this.requestManager.enqueueRequest(request);
            _this.deepBlueService.getComposedResultIterator(request, _this.progress_element, 'overlaps', _this.reloadPlot, _this)
                .subscribe(function (result) {
                _this.currentlyProcessing = [];
                _this.reloadPlot(_this, result);
            });
        });
    };
    ChromatinStatesScreenComponent.prototype.reloadPlot = function (_self, datum) {
        var categories = [];
        var value_by_stack_biosource = [];
        var result_by_dataset_stack = {};
        var _loop_1 = function (result) {
            var stack_number = _self.selectedData.getStackPosByQueryId(result.getData().id());
            var experiment = _self.experiments.find(function (se) {
                if (se.name === result.getFilter().name()) {
                    return true;
                }
                return false;
            });
            var biosource = experiment.biosource();
            if (!(stack_number in value_by_stack_biosource)) {
                value_by_stack_biosource[stack_number] = {};
            }
            if (!(biosource in value_by_stack_biosource[stack_number])) {
                if (categories.indexOf(biosource) === -1) {
                    categories.push(biosource);
                }
                value_by_stack_biosource[stack_number][biosource] = [];
            }
            value_by_stack_biosource[stack_number][biosource].push(result);
            result_by_dataset_stack[biosource] = {};
        };
        for (var _i = 0, datum_1 = datum; _i < datum_1.length; _i++) {
            var result = datum_1[_i];
            _loop_1(result);
        }
        categories.sort(function (a, b) {
            return a.localeCompare(b);
        });
        var value_by_stack = [];
        for (var stack_pos = 0; stack_pos < value_by_stack_biosource.length; stack_pos++) {
            if (!(stack_pos in value_by_stack)) {
                value_by_stack[stack_pos] = [];
            }
            for (var biosource in value_by_stack_biosource[stack_pos]) {
                if (value_by_stack_biosource[stack_pos].hasOwnProperty(biosource)) {
                    var results = value_by_stack_biosource[stack_pos][biosource];
                    var high = Number.MIN_SAFE_INTEGER;
                    var low = Number.MAX_SAFE_INTEGER;
                    var sum = 0;
                    var values = [];
                    for (var _a = 0, results_1 = results; _a < results_1.length; _a++) {
                        var result = results_1[_a];
                        var count = result.resultAsCount();
                        if (count < low) {
                            low = count;
                        }
                        if (count > high) {
                            high = count;
                        }
                        sum += count;
                        values.push(count);
                    }
                    values.sort(function (a, b) { return a - b; });
                    var mean = sum / values.length;
                    var q1 = __WEBPACK_IMPORTED_MODULE_8_app_service_statistics__["a" /* Statistics */].percentile(values, 0.25);
                    var q3 = __WEBPACK_IMPORTED_MODULE_8_app_service_statistics__["a" /* Statistics */].percentile(values, 0.75);
                    var median = __WEBPACK_IMPORTED_MODULE_8_app_service_statistics__["a" /* Statistics */].percentile(values, 0.5);
                    var aggr = { low: low, q1: q1, median: median, q3: q3, high: high, mean: mean, elements: values.length };
                    value_by_stack[stack_pos].push({ biosource: biosource, value: aggr, results: results });
                }
            }
        }
        var series = [];
        for (var stack_pos = 0; stack_pos < value_by_stack.length; stack_pos++) {
            var stack_values = value_by_stack[stack_pos];
            var stack_values_result = [];
            var stack_values_result_boxplot = [];
            stack_values.sort(function (a, b) {
                return a['biosource'].localeCompare(b['biosource']);
            });
            for (var i = 0; i < stack_values.length; i++) {
                var stack_value = stack_values[i];
                stack_values_result.push(stack_value['value']['mean']);
                stack_values_result_boxplot.push([
                    stack_value['value']['low'],
                    stack_value['value']['q1'],
                    stack_value['value']['median'],
                    stack_value['value']['q3'],
                    stack_value['value']['high']
                ]);
                result_by_dataset_stack[stack_value['biosource']][stack_pos] = stack_value;
            }
            series.push({
                type: 'boxplot',
                name: _self.selectedData.getStackname(stack_pos),
                data: stack_values_result_boxplot,
                color: _self.selectedData.getStackColor(stack_pos, '1')
            });
            series.push({
                type: 'column',
                name: _self.selectedData.getStackname(stack_pos),
                data: stack_values_result,
                color: _self.selectedData.getStackColor(stack_pos, '0.3')
            });
        }
        _self.overlapbarchart.setNewData(categories, series, result_by_dataset_stack);
    };
    ChromatinStatesScreenComponent.prototype.dataSelected = function () {
        this.hasDataDetail = false;
    };
    ChromatinStatesScreenComponent.prototype.ngOnDestroy = function () {
        this.epigeneticMarkSubscription.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('overlapbarchart'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__component_charts_overlappingbar__["a" /* OverlapsBarChartComponent */])
    ], ChromatinStatesScreenComponent.prototype, "overlapbarchart", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('multiselect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["MultiSelect"])
    ], ChromatinStatesScreenComponent.prototype, "multiselect", void 0);
    ChromatinStatesScreenComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/screen/chromatin_states.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_9_app_service_requests_manager__["a" /* RequestManager */],
            __WEBPACK_IMPORTED_MODULE_7_app_service_progresselement__["a" /* ProgressElement */], __WEBPACK_IMPORTED_MODULE_6_app_service_selecteddata__["a" /* SelectedData */]])
    ], ChromatinStatesScreenComponent);
    return ChromatinStatesScreenComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/screen/comparison-selection.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\n  <div class=\"ui-g\">\n      <div class=\"ui-g-12\">\n          <div class=\"card card-w-title\">\n              <h1>Select the data to DIVE</h1>\n              <data-selection-main (queryIdSelected)=\"selectQuery($event)\"></data-selection-main>\n          </div>\n      </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/screen/comparison-selection.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComparisonSelectionScreen; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ComparisonSelectionScreen = /** @class */ (function () {
    function ComparisonSelectionScreen(selectedData) {
        this.selectedData = selectedData;
        this.visibleSidebar2 = false;
    }
    ComparisonSelectionScreen.prototype.selectQuery = function (event) {
        this.selectedData.insertForComparison(event);
    };
    ComparisonSelectionScreen = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/screen/comparison-selection.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__["a" /* SelectedData */]])
    ], ComparisonSelectionScreen);
    return ComparisonSelectionScreen;
}());



/***/ }),

/***/ "../../../../../src/app/view/screen/data-selection.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\n    <div class=\"ui-g\">\n        <div class=\"ui-g-12\">\n            <div class=\"card card-w-title\">\n                <h1>Select the data to DIVE</h1>\n                <data-selection-main (queryIdSelected)=\"selectQuery($event)\"></data-selection-main>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/screen/data-selection.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataSelectionScreen; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataSelectionScreen = /** @class */ (function () {
    function DataSelectionScreen(deepBlueService, router) {
        this.deepBlueService = deepBlueService;
        this.router = router;
        this.visibleSidebar2 = false;
    }
    DataSelectionScreen.prototype.selectQuery = function (event) {
        this.deepBlueService.setDataToDive(event);
        this.router.navigate(['/similarfinder']);
    };
    DataSelectionScreen = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/screen/data-selection.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]])
    ], DataSelectionScreen);
    return DataSelectionScreen;
}());



/***/ }),

/***/ "../../../../../src/app/view/screen/genes.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\n    <div [ngClass]=\"{'ui-g-12': true, 'ui-lg-10': (hasDataDetail()), 'ui-lg-12': (hasDataDetail() == false) }\">\n        <div class=\"card card-w-title\">\n            <h1>Overlaping Genes with {{ deepBlueService.getDivingData().data().name() }}</h1>\n\n            <div class=\"ui-g form-group\">\n                <div class=\"ui-g-12 ui-md-2\">\n                    <label for=\"input\">Annotation Name</label>\n                </div>\n                <div class=\"ui-g-12 ui-md-2\">\n                    <p><button pButton type=\"button\" (click)=\"includeBar()\" label=\"Filter overlapping\"></button>\n                </div>\n                <div class=\"ui-g-12 ui-md-4\">\n                    <p-dropdown #geneModelDropdown [options]=\"menuGeneModel\" [(ngModel)]=\"selectedGeneModel\" filter=\"filter\" [autoWidth]=\"false\"\n                        (onChange)=\"selectGeneModel($event)\">\n                    </p-dropdown>\n                </div>\n            </div>\n            <app-overlaps-bar-chart #overlapbarchart> </app-overlaps-bar-chart>\n        </div>\n    </div>\n    <div *ngIf=\"hasDataDetail()\" class=\"ui-g-12 ui-lg-2\">\n        <app-data-info-box></app-data-info-box>\n    </div>\n</div>\n\n\n<p-dialog header=\"Upload your own dataset\" [(visible)]=\"showIncludeBar\" [width]=\"800\" [height]=\"1200\">\n    <p-tabView>\n      <p-tabPanel header=\"Extend\">\n            Direction: <p-dropdown [options]=\"directions\" [(ngModel)]=\"selectedDirection\" optionLabel=\"name\" [filter]=\"true\" filterBy=\"label,value.name\"></p-dropdown>\n            Length:\n      </p-tabPanel>\n      <p-tabPanel header=\"Paste Regions\">\n            cu\n      </p-tabPanel>\n  </p-tabView>\n  </p-dialog>\n"

/***/ }),

/***/ "../../../../../src/app/view/screen/genes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenesScreen; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_view_component_charts_overlappingbar__ = __webpack_require__("../../../../../src/app/view/component/charts/overlappingbar.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_service_requests_manager__ = __webpack_require__("../../../../../src/app/service/requests-manager.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var GenesScreen = /** @class */ (function () {
    function GenesScreen(deepBlueService, requestManager, progress_element, selectedData) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.requestManager = requestManager;
        this.progress_element = progress_element;
        this.selectedData = selectedData;
        this.selectedGeneModelSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.selectedGeneModelValue$ = this.selectedGeneModelSource.asObservable();
        this.currentlyProcessing = null;
        this.current_request = 0;
        this.hasData = false;
        this.directions = [
            { name: 'Backward', code: 'BACKWARD' },
            { name: 'Forward', code: 'FORWARD' },
            { name: 'Both', code: 'BOTH' },
        ];
        this.selectedDirection = null;
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(function (genome) {
            if (genome === null) {
                return;
            }
            _this.deepBlueService.getGeneModelsBySelectedGenome().subscribe(function (geneModels) {
                if (geneModels.length === 0) {
                    return;
                }
                _this.geneModels = geneModels;
                _this.menuGeneModel = geneModels.map(function (geneModel) {
                    var l = { label: geneModel.name, value: geneModel };
                    // Always select the last gene model
                    _this.geneModelDropdown.selectItem(null, l);
                    return l;
                });
            }, function (error) { return _this.errorMessage = error; });
        });
    }
    GenesScreen.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.selectedGeneModelValue$.debounceTime(250).subscribe(function () { return _this.processOverlaps(); });
        this.selectedData.activeTopStackValue$.subscribe(function (dataStackItem) { return _this.processOverlaps(); });
    };
    GenesScreen.prototype.selectGeneModel = function (event) {
        this.selectedGeneModelSource.next(event.value);
    };
    GenesScreen.prototype.processOverlaps = function () {
        var _this = this;
        this.progress_element.reset(3, this.current_request);
        var gene_model = this.selectedGeneModelSource.getValue();
        if (gene_model == null) {
            this.reloadPlot([]);
            return;
        }
        if (gene_model !== this.selectedGeneModelSource.getValue()) {
            this.reloadPlot([]);
            return;
        }
        this.current_request++;
        // Each experiment is started, selected, overlaped, count, get request data (4 times each)
        this.progress_element.reset(0, this.current_request);
        this.currentlyProcessing = gene_model;
        var start = new Date().getTime();
        var current = this.selectedData.getStacksTopOperation();
        this.deepBlueService.composedCountGenesOverlaps(current, gene_model).subscribe(function (request) {
            _this.requestManager.enqueueRequest(request);
            _this.deepBlueService.getComposedResultIterator(request, _this.progress_element, 'overlaps')
                .subscribe(function (result) {
                var end = new Date().getTime();
                // Now calculate and output the difference
                _this.currentlyProcessing = null;
                _this.reloadPlot(result);
            });
        });
        if (gene_model === this.currentlyProcessing) {
            return;
        }
        this.current_request++;
        this.currentlyProcessing = gene_model;
    };
    GenesScreen.prototype.reloadPlot = function (datum) {
        var _this = this;
        var series = [];
        datum.forEach(function (result, index) {
            series.push({
                type: 'column',
                name: _this.selectedData.getStackname(index),
                data: [result.resultAsCount()],
                color: _this.selectedData.getStackColor(index, '0.3')
            });
        });
        var categories = datum.map(function (r) { return r.getFilter().name(); });
        this.overlapbarchart.setNewData(categories, series, null);
    };
    GenesScreen.prototype.hasDataDetail = function () {
        return this.deepBlueService.getDataInfoSelected() != null;
    };
    GenesScreen.prototype.ngOnDestroy = function () {
        this.genomeSubscription.unsubscribe();
    };
    GenesScreen.prototype.includeBar = function () {
        this.showIncludeBar = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('overlapbarchart'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6_app_view_component_charts_overlappingbar__["a" /* OverlapsBarChartComponent */])
    ], GenesScreen.prototype, "overlapbarchart", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('geneModelDropdown'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["Dropdown"])
    ], GenesScreen.prototype, "geneModelDropdown", void 0);
    GenesScreen = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/screen/genes.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_7_app_service_requests_manager__["a" /* RequestManager */],
            __WEBPACK_IMPORTED_MODULE_5_app_service_progresselement__["a" /* ProgressElement */], __WEBPACK_IMPORTED_MODULE_4_app_service_selecteddata__["a" /* SelectedData */]])
    ], GenesScreen);
    return GenesScreen;
}());



/***/ }),

/***/ "../../../../../src/app/view/screen/go-enrichment.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\n    <div [ngClass]=\"{'ui-g-12': true, 'ui-lg-10': (hasDataDetail()), 'ui-lg-12': (hasDataDetail() == false) }\">\n        <div class=\"card card-w-title\">\n            <h1>GO enrichment</h1>\n\n            <div class=\"ui-g form-group\">\n                <div class=\"ui-g-12 ui-md-3\">\n                    <label for=\"input\">Annotation Name</label>\n                </div>\n                <div class=\"ui-g-12 ui-md-2\">\n                    <p-dropdown #geneModelDropdown [options]=\"menuGeneModel\" [(ngModel)]=\"selectedGeneModel\" filter=\"filter\" [autoWidth]=\"false\"\n                        (onChange)=\"selectGeneModel($event)\">\n                    </p-dropdown>\n                </div>\n            </div>\n\n            <div class=\"ui-g form-group\">\n                <div class=\"ui-g-12 ui-md-3\">\n                    <label for=\"input\">Mimimum number of co-located GO terms</label>\n                </div>\n                <div class=\"ui-g-12 ui-md-2\">\n                    <input type=\"text\" pInputText [(ngModel)]=\"filter_go_overlap\" placeholder=\"Mimimum number of GO term overlaps\" (ngModelChange)=\"filter_enrichment_data($event)\"\n                    />\n                </div>\n            </div>\n\n            <div class=\"ui-g form-group\">\n                <div class=\"ui-g-12 ui-md-3\">\n                    <label for=\"input\">Minimum ratio</label>\n                </div>\n                <div class=\"ui-g-12 ui-md-2\">\n                    <input type=\"text\" pInputText [(ngModel)]=\"filter_ratio\" placeholder=\"Mimimum ratio\" (ngModelChange)=\"filter_enrichment_data($event)\"\n                    />\n                </div>\n            </div>\n\n            <app-overlaps-bar-chart #overlapbarchart> </app-overlaps-bar-chart>\n\n            <div class=\"ui-g\">\n                <div *ngFor=\"let data of enrichment_data; let i = index\">\n                    <h2> {{ selectedData.getStackname(i) }} </h2>\n                    <ngx-datatable class='material' [columns]=\"columns\" [rows]='data' [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n                        [rowHeight]=\"'auto'\" [limit]=\"10\">\n                    </ngx-datatable>\n                </div>\n            </div>\n\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/screen/go-enrichment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoEnrichmentScreenComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_charts_overlappingbar__ = __webpack_require__("../../../../../src/app/view/component/charts/overlappingbar.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_service_utils__ = __webpack_require__("../../../../../src/app/service/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_service_requests_manager__ = __webpack_require__("../../../../../src/app/service/requests-manager.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var GoEnrichmentScreenComponent = /** @class */ (function () {
    function GoEnrichmentScreenComponent(deepBlueService, requestManager, progress_element, selectedData) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.requestManager = requestManager;
        this.progress_element = progress_element;
        this.selectedData = selectedData;
        this.enrichment_data = new Array();
        this.enrichment_data_from_server = new Array();
        this.filter_go_overlap = '0';
        this.filter_ratio = '0';
        this.columns = [
            { name: 'id', prop: 'id', column_type: 'string' },
            { name: 'name', prop: 'name', column_type: 'string' },
            { name: 'go_overlap', prop: 'gooverlap', column_type: 'integer' },
            { name: 'ratio', prop: 'ratio', column_type: 'double' }
        ];
        this.selectedGeneModelSource = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.selectedGeneModelValue$ = this.selectedGeneModelSource.asObservable();
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(function (genome) {
            if (genome === null) {
                return;
            }
            _this.deepBlueService.getGeneModelsBySelectedGenome().subscribe(function (geneModels) {
                if (geneModels.length === 0) {
                    return;
                }
                _this.geneModels = geneModels;
                _this.menuGeneModel = geneModels.map(function (geneModel) {
                    var l = { label: geneModel.name, value: geneModel };
                    _this.geneModelDropdown.selectItem(null, l);
                    return l;
                });
            }, function (error) { return _this.errorMessage = error; });
        });
    }
    GoEnrichmentScreenComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.selectedGeneModelValue$.debounceTime(250).subscribe(function () { return _this.processEnrichment(); });
        this.selectedData.activeTopStackValue$.subscribe(function (dataStackItem) { return _this.processEnrichment(); });
    };
    GoEnrichmentScreenComponent.prototype.filter_enrichment_data = function ($event) {
        var newResults = [];
        for (var idx = 0; idx < this.enrichment_data_from_server.length; idx++) {
            var x = this.filter_enrichment_datei(this.enrichment_data_from_server[idx]);
            newResults.push(x);
        }
        this.enrichment_data = newResults;
        this.plotBar();
    };
    GoEnrichmentScreenComponent.prototype.filter_enrichment_datei = function (value) {
        var go_overlap = Number.MIN_SAFE_INTEGER;
        if (this.filter_go_overlap) {
            go_overlap = Number(this.filter_go_overlap);
        }
        var ratio = Number.MIN_SAFE_INTEGER;
        if (this.filter_ratio) {
            ratio = Number(this.filter_ratio);
        }
        var filtered_data = [];
        for (var idx = 0; idx < value.length; idx++) {
            var row = value[idx];
            if ((row['gooverlap'] >= go_overlap) &&
                (row['ratio'] >= ratio)) {
                filtered_data.push(row);
            }
        }
        return filtered_data.sort(function (a, b) { return b['gooverlap'] - a['gooverlap']; });
    };
    GoEnrichmentScreenComponent.prototype.selectGeneModel = function (event) {
        this.selectedGeneModelSource.next(event.value);
    };
    GoEnrichmentScreenComponent.prototype.processEnrichment = function () {
        var _this = this;
        var gene_model = this.selectedGeneModelSource.getValue();
        if (!gene_model) {
            return;
        }
        // Each experiment is started, selected, overlaped, count, get request data (4 times each)
        var start = new Date().getTime();
        var current = this.selectedData.getStacksTopOperation();
        this.deepBlueService.composedCalculateGenesEnrichment(current, gene_model).subscribe(function (request) {
            _this.requestManager.enqueueRequest(request);
            _this.deepBlueService.getComposedResultIterator(request, _this.progress_element, 'go_enrichment')
                .subscribe(function (result) {
                var end = new Date().getTime();
                _this.prepare_data(result);
            });
        });
    };
    GoEnrichmentScreenComponent.prototype.prepare_data = function (datum) {
        var _this = this;
        this.enrichment_data_from_server = [];
        for (var pos = 0; pos < datum.length; pos++) {
            var data = datum[pos];
            var rows = data.getResults()['enrichment']['go_terms'].filter(function (x) {
                return x['go_overlap'] !== 0;
            }).map(function (x) {
                var row = {};
                for (var idx = 0; idx < _this.columns.length; idx++) {
                    var column_name = _this.columns[idx]['name'];
                    var v = x[column_name];
                    row[column_name.toLowerCase().replace('_', '')] = __WEBPACK_IMPORTED_MODULE_7_app_service_utils__["a" /* Utils */].convert(v, _this.columns[idx]['column_type']);
                }
                return row;
            });
            rows.sort(function (a, b) { return b['go_overlap'] - a['go_overlap']; });
            this.enrichment_data_from_server.push(rows);
        }
        this.filter_enrichment_data(null);
    };
    GoEnrichmentScreenComponent.prototype.plotBar = function () {
        var categories = [];
        var categories_value = new Array();
        for (var stack = 0; stack < this.enrichment_data.length; stack++) {
            var data = this.enrichment_data[stack];
            var values_by_category = {};
            for (var term_pos = 0; term_pos < data.length; term_pos++) {
                var term = data[term_pos];
                var id = term['id'];
                var name_1 = term['name'];
                var go_overlap = term['gooverlap'];
                var category = name_1 + ' (' + id + ')';
                // If it is one of top 100 elements of the main stack
                // or if its values was found in the top 100 elements of the main stack
                if (stack === 0 && term_pos < 50) {
                    categories.push(category);
                    values_by_category[category] = go_overlap;
                }
                else if (stack > 0 && categories.indexOf(category) !== -1) {
                    values_by_category[category] = go_overlap;
                }
            }
            categories_value.push(values_by_category);
        }
        var series = [];
        for (var stack_pos = 0; stack_pos < categories_value.length; stack_pos++) {
            var stack_values_result = [];
            var stack_categories_values = categories_value[stack_pos];
            for (var cat_pos = 0; cat_pos < categories.length; cat_pos++) {
                var category = categories[cat_pos];
                if (stack_categories_values[category]) {
                    stack_values_result.push(stack_categories_values[category]);
                }
                else {
                    stack_values_result.push(0);
                }
            }
            series.push({
                type: 'column',
                name: this.selectedData.getStackname(stack_pos),
                data: stack_values_result,
                color: this.selectedData.getStackColor(stack_pos, '0.3')
            });
        }
        this.overlapbarchart.setNewData(categories, series, categories_value);
    };
    GoEnrichmentScreenComponent.prototype.hasDataDetail = function () {
        return this.deepBlueService.getDataInfoSelected() != null;
    };
    GoEnrichmentScreenComponent.prototype.ngOnDestroy = function () {
        this.genomeSubscription.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('geneModelDropdown'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["Dropdown"])
    ], GoEnrichmentScreenComponent.prototype, "geneModelDropdown", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('overlapbarchart'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__component_charts_overlappingbar__["a" /* OverlapsBarChartComponent */])
    ], GoEnrichmentScreenComponent.prototype, "overlapbarchart", void 0);
    GoEnrichmentScreenComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            changeDetection: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectionStrategy"].OnPush,
            template: __webpack_require__("../../../../../src/app/view/screen/go-enrichment.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_8_app_service_requests_manager__["a" /* RequestManager */],
            __WEBPACK_IMPORTED_MODULE_6_app_service_progresselement__["a" /* ProgressElement */], __WEBPACK_IMPORTED_MODULE_5_app_service_selecteddata__["a" /* SelectedData */]])
    ], GoEnrichmentScreenComponent);
    return GoEnrichmentScreenComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/screen/initial.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-fluid\">\n  <div class=\"ui-g\">\n    <div class=\"ui-g-12\">\n      <div class=\"card card-w-title\">\n        <h1>Welcome to Dive</h1>\n        <h2>Please, select what you desire to perform</h2>\n\n        <div class=\"ui-g\">\n\n          <div class=\"ui-g-4\">\n            <button pButton type=\"button\" (click)=\"showDemoDialog()\" label=\"Use demonstration Dataset (CpG Islands)\" style=\"height: 80px\"></button>\n          </div>\n\n          <div class=\"ui-g-4\">\n            <button pButton type=\"button\" (click)=\"showExistingDataset()\" label=\"Use a dataset from DeepBlue\" style=\"height: 80px\"></button>\n          </div>\n\n          <div class=\"ui-g-4\">\n            <button type=\"text\" (click)=\"showUploadDialog()\" pButton icon=\"fa-external-link-square\" label=\"Upload your dataset\" style=\"height: 80px\"></button>\n          </div>\n\n        </div>\n\n      </div>\n    </div>\n  </div>\n</div>\n\n<p-dialog header=\"Upload your own dataset\" [(visible)]=\"showUpload\" [width]=\"800\" [height]=\"1200\">\n  <p-tabView>\n    <p-tabPanel header=\"Upload File\">\n        <regions-upload (queryIdSelected)=\"selectQuery($event)\"></regions-upload>\n    </p-tabPanel>\n    <p-tabPanel header=\"Paste Regions\">\n        <regions-paste (queryIdSelected)=\"selectQuery($event)\"></regions-paste>\n    </p-tabPanel>\n</p-tabView>\n</p-dialog>\n"

/***/ }),

/***/ "../../../../../src/app/view/screen/initial.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitialScreenComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InitialScreenComponent = /** @class */ (function () {
    function InitialScreenComponent(deepBlueService, progress_element, router) {
        this.deepBlueService = deepBlueService;
        this.progress_element = progress_element;
        this.router = router;
        this.showDemo = false;
        this.showUpload = false;
    }
    InitialScreenComponent.prototype.showDemoDialog = function () {
        var _this = this;
        this.deepBlueService.genomeValue$.subscribe(function (genome) {
            if (genome === null) {
                return;
            }
            _this.deepBlueService.getAnnotations(genome).subscribe(function (annotations) {
                for (var _i = 0, annotations_1 = annotations; _i < annotations_1.length; _i++) {
                    var annotation = annotations_1[_i];
                    if (annotation.name.toLowerCase().startsWith('cpg islands')) {
                        _this.deepBlueService.selectAnnotation(annotation, _this.progress_element, 0).subscribe(function (operation) {
                            _this.deepBlueService.setDataToDive(operation);
                            _this.router.navigate(['/similarfinder']);
                        });
                    }
                }
            });
        });
        this.showDemo = true;
    };
    InitialScreenComponent.prototype.showExistingDataset = function () {
        this.router.navigate(['/dataselection']);
    };
    InitialScreenComponent.prototype.showUploadDialog = function () {
        this.showUpload = true;
    };
    InitialScreenComponent.prototype.selectQuery = function (event) {
        this.deepBlueService.setDataToDive(event);
        this.router.navigate(['/similarfinder']);
    };
    InitialScreenComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/screen/initial.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_3_app_service_progresselement__["a" /* ProgressElement */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]])
    ], InitialScreenComponent);
    return InitialScreenComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/screen/overlap-enrichment.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-w-title\">\n  <h1>Select the universe</h1>\n\n  <h1>{{ selected_data?.text() }} </h1>\n\n  <data-selection-main (queryIdSelected)=\"selectQuery($event)\"></data-selection-main>\n\n  <div class=\"card card-w-title\">\n    <h1>Select the datasets to be compared agains</h1>\n\n    <h1>{{ selected_data?.text() }} </h1>\n    <select-datasets-component (datasetsSelected)=\"selectDatasets($event)\"></select-datasets-component>\n\n    <button pButton type=\"button\" icon=\"ui-icon-check-circle\" label=\"Enrich the data selection\" (click)=\"process($event)\"></button>\n  </div>\n\n  <div class=\"card card-w-title\">\n    <h1>Results</h1>\n    <div *ngFor=\"let data of enrichment_data; let i = index\">\n      <h2> {{ selectedData.getStackname(i) }} </h2>\n      <ngx-datatable class='material' [columns]=\"columns\" [rows]='data' [columnMode]=\"'force'\" [limit]=\"50\"></ngx-datatable>\n    </div>\n  </div>"

/***/ }),

/***/ "../../../../../src/app/view/screen/overlap-enrichment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverlapEnrichmentScreenComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_domain_operations__ = __webpack_require__("../../../../../src/app/domain/operations.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_service_utils__ = __webpack_require__("../../../../../src/app/service/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_service_requests_manager__ = __webpack_require__("../../../../../src/app/service/requests-manager.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OverlapEnrichmentScreenComponent = /** @class */ (function () {
    function OverlapEnrichmentScreenComponent(deepBlueService, requestManager, progress_element, selectedData) {
        this.deepBlueService = deepBlueService;
        this.requestManager = requestManager;
        this.progress_element = progress_element;
        this.selectedData = selectedData;
        this.enrichment_data = new Array();
        this.enrichment_data_from_server = new Array();
        this.columns = __WEBPACK_IMPORTED_MODULE_4_app_domain_operations__["f" /* DeepBlueMiddlewareOverlapEnrichtmentResultItem */].asColumns();
    }
    OverlapEnrichmentScreenComponent.prototype.selectQuery = function (event) {
        this.selected_data = event;
    };
    OverlapEnrichmentScreenComponent.prototype.selectDatasets = function (event) {
        this.selected_datasets = event;
    };
    OverlapEnrichmentScreenComponent.prototype.process = function () {
        var _this = this;
        var current = this.selectedData.getStacksTopOperation();
        this.deepBlueService.composedCalculateOverlapsEnrichment(current, this.selected_data.id(), this.selected_datasets)
            .subscribe(function (request) {
            _this.requestManager.enqueueRequest(request);
            _this.deepBlueService.getComposedResultIterator(request, _this.progress_element, 'overlaps_enrichment')
                .subscribe(function (result) {
                _this.prepare_data(result);
            });
        });
    };
    OverlapEnrichmentScreenComponent.prototype.prepare_data = function (datum) {
        var _this = this;
        this.enrichment_data_from_server = [];
        for (var pos = 0; pos < datum.length; pos++) {
            var data = datum[pos];
            var rows = data.getResults().map(function (x) {
                var row = {};
                for (var idx = 0; idx < _this.columns.length; idx++) {
                    var column_name = _this.columns[idx].name;
                    var v = x.data[column_name];
                    row[column_name.toLowerCase().replace(/_/g, '')] = __WEBPACK_IMPORTED_MODULE_5_app_service_utils__["a" /* Utils */].convert(v, _this.columns[idx]['column_type']);
                }
                return row;
            });
            rows.sort(function (a, b) { return a['meanrank'] - b['meanrank']; });
            this.enrichment_data_from_server.push(rows);
        }
        this.filter_enrichment_data(null);
    };
    OverlapEnrichmentScreenComponent.prototype.filter_enrichment_data = function ($event) {
        var newResults = [];
        for (var idx = 0; idx < this.enrichment_data_from_server.length; idx++) {
            //const x = this.filter_enrichment_datei(this.enrichment_data_from_server[idx]);
            var x = this.enrichment_data_from_server[idx];
            newResults.push(x);
        }
        this.enrichment_data = newResults;
        //this.plotBar();
    };
    OverlapEnrichmentScreenComponent.prototype.ngOnDestroy = function () { };
    OverlapEnrichmentScreenComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/screen/overlap-enrichment.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_6_app_service_requests_manager__["a" /* RequestManager */],
            __WEBPACK_IMPORTED_MODULE_3_app_service_progresselement__["a" /* ProgressElement */], __WEBPACK_IMPORTED_MODULE_2_app_service_selecteddata__["a" /* SelectedData */]])
    ], OverlapEnrichmentScreenComponent);
    return OverlapEnrichmentScreenComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/screen/peaks-overlap.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g ui-fluid\">\n    <div [ngClass]=\"{'ui-g-12': true}\">\n        <div class=\"card card-w-title\">\n            <h1>Overlaping {{ deepBlueService.getSelectedEpigeneticMark().name }} with {{ deepBlueService.getDivingData().data().name()\n                }}</h1>\n            <p-multiSelect #multiselect [defaultLabel]=\"defaultSelectBiosourcesLabel\" [options]=\"biosourcesItems\" [(ngModel)]=\"selectedMultiSelectBiosources\"\n                (onChange)=\"selectBiosources($event)\">\n            </p-multiSelect>\n            <app-overlaps-bar-chart #overlapbarchart> </app-overlaps-bar-chart>\n        </div>\n    </div>\n</div>\n\n\n<p-sidebar [(visible)]=\"hasDataDetail\" position=\"right\" [baseZIndex]=\"10000\" styleClass=\"ui-sidebar-md\">\n    <app-data-info-box (dataSelected)=\"dataSelected()\"></app-data-info-box>\n</p-sidebar>\n"

/***/ }),

/***/ "../../../../../src/app/view/screen/peaks-overlap.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeaksOverlapScreenComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_charts_overlappingbar__ = __webpack_require__("../../../../../src/app/view/component/charts/overlappingbar.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_service_statistics__ = __webpack_require__("../../../../../src/app/service/statistics.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_service_requests_manager__ = __webpack_require__("../../../../../src/app/service/requests-manager.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PeaksOverlapScreenComponent = /** @class */ (function () {
    function PeaksOverlapScreenComponent(deepBlueService, requestManager, progress_element, selectedData) {
        this.deepBlueService = deepBlueService;
        this.requestManager = requestManager;
        this.progress_element = progress_element;
        this.selectedData = selectedData;
        this.biosourcesItems = [];
        this.selectedMultiSelectBiosources = [];
        this.defaultSelectBiosourcesLabel = 'Select the BioSource';
        this.selectedExperimentsSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.selectedExperimentsValue$ = this.selectedExperimentsSource.asObservable();
        this.selectedBioSourcesSource = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.selectedBioSourcesValue$ = this.selectedBioSourcesSource.asObservable();
        this.currentlyProcessing = [];
        this.current_request = 0;
        this.hasDataDetail = false;
        this.loadExperiments();
    }
    PeaksOverlapScreenComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.deepBlueService.dataInfoSelectedValue$.subscribe(function (s) { if (s) {
            _this.hasDataDetail = true;
        } });
        this.selectedExperimentsValue$.debounceTime(250).subscribe(function () { return _this.processOverlaps(); });
        this.selectedData.activeTopStackValue$.subscribe(function (dataStackItem) { return _this.processOverlaps(); });
        this.deepBlueService.projectsValue$.subscribe(function () { return _this.loadExperiments(); });
    };
    PeaksOverlapScreenComponent.prototype.ngOnDestroy = function () {
        this.epigeneticMarkSubscription.unsubscribe();
    };
    PeaksOverlapScreenComponent.prototype.loadExperiments = function () {
        var _this = this;
        if (this.epigeneticMarkSubscription && !this.epigeneticMarkSubscription.closed) {
            this.epigeneticMarkSubscription.unsubscribe();
        }
        this.epigeneticMarkSubscription = this.deepBlueService.epigeneticMarkValue$.subscribe(function (selected_epigenetic_mark) {
            _this.deepBlueService.getExperiments(_this.deepBlueService.getGenome(), selected_epigenetic_mark).subscribe(function (experiments_ids) {
                var ids = experiments_ids.map(function (e) { return e.id.id; });
                _this.deepBlueService.getExperimentsInfos(ids).subscribe(function (full_info) {
                    _this.experiments = full_info;
                    _this.segregated_data = _this.segregate(full_info);
                });
            }, function (error) { return _this.errorMessage = error; });
        });
    };
    PeaksOverlapScreenComponent.prototype.dataSelected = function () {
        this.hasDataDetail = false;
    };
    PeaksOverlapScreenComponent.prototype.segregate = function (experiments) {
        var projectNames = this.deepBlueService.projectsSource.getValue().map(function (project) { return project.name; });
        var biosources = {};
        var samples = {};
        var epigenetic_marks = {};
        var techniques = {};
        var projects = {};
        var event_items = [];
        var pre_selected_biosources = this.deepBlueService.selectedBioSources.getValue().map(function (x) { return x.name; });
        this.biosourcesItems = [];
        this.selectedMultiSelectBiosources = [];
        for (var _i = 0, experiments_1 = experiments; _i < experiments_1.length; _i++) {
            var experiment = experiments_1[_i];
            var experiment_biosource = experiment.sample_info()['biosource_name'];
            var experiment_sample_id = experiment.sample_id();
            var experiment_epigenetic_mark = experiment.epigenetic_mark();
            var experiment_technique = experiment.technique();
            var experiment_project = experiment.project();
            if (projectNames.indexOf(experiment_project) < 0) {
                continue;
            }
            if (!(experiment_biosource in biosources)) {
                biosources[experiment_biosource] = [];
                var l = {
                    label: experiment_biosource,
                    norm_label: experiment_biosource.toLowerCase().replace(/[\W_]+/g, ""),
                    value: { name: experiment_biosource, experiments: biosources[experiment_biosource] }
                };
                this.biosourcesItems.push(l);
                if (pre_selected_biosources.map(function (bs) { return bs.toLowerCase().replace(/[\W_]+/g, ""); }).indexOf(l.norm_label) > -1) {
                    event_items.push(l.value);
                    this.selectedMultiSelectBiosources.push(l.value);
                }
            }
            if (!(experiment_sample_id in samples)) {
                samples[experiment_sample_id] = [];
            }
            if (!(experiment_epigenetic_mark in epigenetic_marks)) {
                epigenetic_marks[experiment_epigenetic_mark] = [];
            }
            if (!(experiment_technique in techniques)) {
                techniques[experiment_technique] = [];
            }
            if (!(experiment_project in projects)) {
                projects[experiment_project] = [];
            }
            biosources[experiment_biosource].push(experiment);
            samples[experiment_sample_id].push(experiment);
            epigenetic_marks[experiment_epigenetic_mark].push(experiment);
            techniques[experiment_technique].push(experiment);
            projects[experiment_project].push(experiment);
        }
        this.selectBiosources({ value: event_items });
        return {
            'biosources': biosources,
            'samples': samples,
            'epigenetic_marks': epigenetic_marks,
            'techniques': techniques,
            'projects': projects
        };
    };
    PeaksOverlapScreenComponent.prototype.selectBiosources = function (event) {
        this.requestManager.cancelAllRequest();
        var experiments = [];
        var selected_data = event.value;
        var biosources = event.value.map(function (x) { return x.name; });
        var exp_arrays = event.value.map(function (x) { return x.experiments; });
        experiments = experiments.concat.apply([], exp_arrays);
        this.selectedExperimentsSource.next(experiments);
        this.selectedBioSourcesSource.next(biosources);
    };
    PeaksOverlapScreenComponent.prototype.processOverlaps = function () {
        var _this = this;
        var experiments = this.selectedExperimentsSource.getValue();
        if (experiments.length === 0) {
            this.reloadPlot(this, []);
            return;
        }
        if (experiments !== this.selectedExperimentsSource.getValue()) {
            this.reloadPlot(this, []);
            return;
        }
        if (experiments === this.currentlyProcessing) {
            return;
        }
        this.current_request++;
        // Each experiment is started, selected, overlaped, count, get request data (4 times each)
        this.progress_element.reset(experiments.length * this.selectedData.getStacksTopOperation().length * 5, this.current_request);
        this.currentlyProcessing = experiments;
        var start = new Date().getTime();
        var current = this.selectedData.getStacksTopOperation();
        this.deepBlueService.composedCountOverlaps(current, experiments).subscribe(function (request) {
            _this.requestManager.enqueueRequest(request);
            _this.deepBlueService.getComposedResultIterator(request, _this.progress_element, 'overlaps', _this.reloadPlot, _this)
                .subscribe(function (result) {
                var end = new Date().getTime();
                _this.currentlyProcessing = [];
                _this.reloadPlot(_this, result);
            });
        });
    };
    PeaksOverlapScreenComponent.prototype.reloadPlot = function (_self, datum) {
        if (!datum) {
            return;
        }
        var categories = [];
        var value_by_stack_biosource = [];
        var result_by_dataset_stack = {};
        var _loop_1 = function (result) {
            var stack_number = _self.selectedData.getStackPosByQueryId(result.getData().id());
            var experiment = _self.experiments.find(function (se) {
                if (se.name === result.getFilter().name()) {
                    return true;
                }
                return false;
            });
            var biosource = experiment.biosource();
            if (!(stack_number in value_by_stack_biosource)) {
                value_by_stack_biosource[stack_number] = {};
            }
            if (!(biosource in value_by_stack_biosource[stack_number])) {
                if (categories.indexOf(biosource) === -1) {
                    categories.push(biosource);
                }
                value_by_stack_biosource[stack_number][biosource] = [];
            }
            value_by_stack_biosource[stack_number][biosource].push(result);
            result_by_dataset_stack[biosource] = {};
        };
        for (var _i = 0, datum_1 = datum; _i < datum_1.length; _i++) {
            var result = datum_1[_i];
            _loop_1(result);
        }
        categories.sort(function (a, b) {
            return a.localeCompare(b);
        });
        var value_by_stack = [];
        for (var stack_pos = 0; stack_pos < value_by_stack_biosource.length; stack_pos++) {
            if (!(stack_pos in value_by_stack)) {
                value_by_stack[stack_pos] = [];
            }
            for (var biosource in value_by_stack_biosource[stack_pos]) {
                if (value_by_stack_biosource[stack_pos].hasOwnProperty(biosource)) {
                    var results = value_by_stack_biosource[stack_pos][biosource];
                    var high = Number.MIN_SAFE_INTEGER;
                    var low = Number.MAX_SAFE_INTEGER;
                    var sum = 0;
                    var values = [];
                    for (var _a = 0, results_1 = results; _a < results_1.length; _a++) {
                        var result = results_1[_a];
                        var count = result.resultAsCount();
                        if (count < low) {
                            low = count;
                        }
                        if (count > high) {
                            high = count;
                        }
                        sum += count;
                        values.push(count);
                    }
                    values.sort(function (a, b) { return a - b; });
                    var mean = sum / values.length;
                    var q1 = __WEBPACK_IMPORTED_MODULE_7_app_service_statistics__["a" /* Statistics */].percentile(values, 0.25);
                    var q3 = __WEBPACK_IMPORTED_MODULE_7_app_service_statistics__["a" /* Statistics */].percentile(values, 0.75);
                    var median = __WEBPACK_IMPORTED_MODULE_7_app_service_statistics__["a" /* Statistics */].percentile(values, 0.5);
                    var aggr = { low: low, q1: q1, median: median, q3: q3, high: high, mean: mean, elements: values.length };
                    value_by_stack[stack_pos].push({ biosource: biosource, value: aggr, results: results });
                }
            }
        }
        var series = [];
        for (var stack_pos = 0; stack_pos < value_by_stack.length; stack_pos++) {
            var stack_values = value_by_stack[stack_pos];
            var stack_values_result = [];
            var stack_values_result_boxplot = [];
            stack_values.sort(function (a, b) {
                return a['biosource'].localeCompare(b['biosource']);
            });
            for (var i = 0; i < stack_values.length; i++) {
                var stack_value = stack_values[i];
                stack_values_result.push(stack_value['value']['mean']);
                stack_values_result_boxplot.push([
                    stack_value['value']['low'],
                    stack_value['value']['q1'],
                    stack_value['value']['median'],
                    stack_value['value']['q3'],
                    stack_value['value']['high']
                ]);
                result_by_dataset_stack[stack_value['biosource']][stack_pos] = stack_value;
            }
            series.push({
                type: 'boxplot',
                name: _self.selectedData.getStackname(stack_pos),
                data: stack_values_result_boxplot,
                color: _self.selectedData.getStackColor(stack_pos, '1')
            });
            series.push({
                type: 'column',
                name: _self.selectedData.getStackname(stack_pos),
                data: stack_values_result,
                color: _self.selectedData.getStackColor(stack_pos, '0.3')
            });
        }
        _self.overlapbarchart.setNewData(categories, series, result_by_dataset_stack);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('overlapbarchart'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__component_charts_overlappingbar__["a" /* OverlapsBarChartComponent */])
    ], PeaksOverlapScreenComponent.prototype, "overlapbarchart", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('multiselect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_primeng_primeng__["MultiSelect"])
    ], PeaksOverlapScreenComponent.prototype, "multiselect", void 0);
    PeaksOverlapScreenComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/screen/peaks-overlap.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_8_app_service_requests_manager__["a" /* RequestManager */],
            __WEBPACK_IMPORTED_MODULE_6_app_service_progresselement__["a" /* ProgressElement */], __WEBPACK_IMPORTED_MODULE_5_app_service_selecteddata__["a" /* SelectedData */]])
    ], PeaksOverlapScreenComponent);
    return PeaksOverlapScreenComponent;
}());



/***/ }),

/***/ "../../../../../src/app/view/screen/regions.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui-g ui-fluid\">\n    <div ngClass=\"ui-g-12\">\n        <div class=\"card card-w-title\">\n            <h1>Selected regions</h1>\n\n                <ngx-datatable\n                  class='material'\n                  [rows]='rows'\n                  [columns]=\"columns\"\n                  [columnMode]=\"'force'\"\n                  [headerHeight]=\"50\"\n                  [footerHeight]=\"50\"\n                  [rowHeight]=\"'auto'\"\n                    [limit]=\"10\">\n                </ngx-datatable>\n\n                <p><a [hidden]=\"!request_id\" href=\"{{ generateUCSCExportLine() }}\" target=\"_blank\">Export to genome browser</a></p>\n                <p><a [hidden]=\"!request_id\" href=\"{{ generateDownloadLink() }}\" target=\"_blank\">Download regions</a></p>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/screen/regions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegionsScreen; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegionsScreen = /** @class */ (function () {
    function RegionsScreen(deepBlueService, progress_element, selectedData) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.progress_element = progress_element;
        this.selectedData = selectedData;
        this.columns = [];
        this.rows = [];
        this.request_id = null;
        this.topStackSubscription = this.selectedData.activeTopStackValue$.subscribe(function (dataStackItem) { return _this.processRegions(); });
        this.processRegions();
    }
    RegionsScreen.prototype.isInteger = function (column_name) {
        if (column_name === 'CHROMOSOME') {
            return false;
        }
        if (column_name === 'START') {
            return true;
        }
        if (column_name === 'END') {
            return true;
        }
        return false;
    };
    RegionsScreen.prototype.convert = function (value, column_type) {
        if ((column_type === 'string') || (column_type === 'category')) {
            return value;
        }
        if (column_type === 'double') {
            return parseFloat(value);
        }
        if (column_type === 'integer') {
            return parseInt(value);
        }
        return value;
    };
    RegionsScreen.prototype.generateUCSCExportLine = function () {
        if (!this.request_id) {
            return "";
        }
        var genome_name = this.deepBlueService.getGenome().name;
        var actualData = this.selectedData.getActiveCurrentOperation();
        var actual_request_id = this.request_id.id;
        var url = "http://deepblue.mpi-inf.mpg.de/api/composed_commands/generate_track_file?genome=" + genome_name + "&request_id=" + actual_request_id;
        console.debug("Download URL", url);
        var encodedUrl = encodeURIComponent(url);
        var ucscLink = "http://genome.ucsc.edu/cgi-bin/hgTracks?";
        ucscLink = ucscLink + "db=" + genome_name;
        ucscLink = ucscLink + "&hgt.customText=" + encodedUrl;
        return ucscLink;
    };
    RegionsScreen.prototype.generateDownloadLink = function () {
        if (!this.request_id) {
            return "";
        }
        var actual_request_id = this.request_id.id;
        // TODO: Get user key
        var url = "http://deepblue.mpi-inf.mpg.de/xmlrpc/download/?r=" + actual_request_id + "&key=anonymous_key";
        return url;
    };
    RegionsScreen.prototype.processRegions = function () {
        var _this = this;
        var actualData = this.selectedData.getActiveCurrentOperation();
        if (actualData == null) {
            return;
        }
        this.deepBlueService.getInfo(actualData.data().id()).subscribe(function (info) {
            _this.progress_element.reset(4, 0);
            var format = info.format();
            var columns_types = info.columns();
            _this.deepBlueService.getRegions(actualData, format, _this.progress_element, 0).subscribe(function (regions) {
                _this.request_id = regions.getRequestId();
                _this.progress_element.increment(0);
                _this.columns = format.split(",").map(function (c) {
                    return { 'name': c, 'prop': c.toLowerCase().replace('_', '') };
                });
                _this.rows = regions.resultAsString().split('\n').map(function (x) {
                    var row_values = x.split('\t');
                    var row = {};
                    for (var idx = 0; idx < columns_types.length; idx++) {
                        var column_name = columns_types[idx]['name'];
                        var v = row_values[idx];
                        row[column_name.toLowerCase().replace('_', '')] = _this.convert(v, columns_types[idx]['column_type']);
                    }
                    return row;
                });
                _this.progress_element.increment(0);
            });
        });
    };
    RegionsScreen.prototype.ngOnDestroy = function () {
        this.topStackSubscription.unsubscribe();
        this.columns = [];
        this.rows = [];
    };
    RegionsScreen = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'regions-screen',
            template: __webpack_require__("../../../../../src/app/view/screen/regions.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_service_deepblue__["a" /* DeepBlueService */],
            __WEBPACK_IMPORTED_MODULE_2_app_service_progresselement__["a" /* ProgressElement */], __WEBPACK_IMPORTED_MODULE_1_app_service_selecteddata__["a" /* SelectedData */]])
    ], RegionsScreen);
    return RegionsScreen;
}());



/***/ }),

/***/ "../../../../../src/app/view/screen/similar-finder.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Also include these similar biosources?\" icon=\"fa fa-question-circle\" width=\"425\"></p-confirmDialog>\n\n\n<p-sidebar [(visible)]=\"visibleSidebar2\" position=\"right\" [baseZIndex]=\"10000\">\n    <h1 style=\"font-weight:normal\">Right Sidebar</h1>\n    <button pButton type=\"button\" (click)=\"visibleSidebar2 = false\" label=\"Save\" class=\"ui-button-success\"></button>\n    <button pButton type=\"button\" (click)=\"visibleSidebar2 = false\" label=\"Cancel\" class=\"ui-button-secondary\"></button>\n</p-sidebar>\n\n<div class=\"ui-fluid\">\n    <div class=\"ui-g\">\n        <div class=\"ui-g-12\">\n            <div class=\"card card-w-title\">\n                Select data by similarity\n                <p-tabView>\n                    <p-tabPanel header=\"Epigenetic Marks\">\n                        <app-similarity-bar-chart #emssimilaritybarchart> </app-similarity-bar-chart>\n                    </p-tabPanel>\n                    <p-tabPanel header=\"Biosources\">\n                        <app-similarity-bar-chart #biosourcessimilaritybarchart> </app-similarity-bar-chart>\n                    </p-tabPanel>\n                </p-tabView>\n            </div>\n            <div class=\"ui-g\">\n                <div class=\"ui-g-1\">\n                    <label>Cut-off</label>\n                </div>\n                <div class=\"ui-g-2\">\n                    <p-dropdown [options]=\"cutoffOptions\" [(ngModel)]=\"cutoffValue\" [style]=\"{'width':'150px'}\" (onChange)=reloadData()></p-dropdown>\n                </div>\n                <div class=\"ui-g-1\"> </div>\n                <div class=\"ui-g-1\">\n                    <label>Order</label>\n                </div>\n                <div class=\"ui-g-2\">\n                    <p-dropdown [options]=\"orderOptions\" [(ngModel)]=\"orderFunction\" [style]=\"{'width':'150px'}\" (onChange)=reloadData()></p-dropdown>\n                </div>\n            </div>\n\n\n            <app-biosources-screen></app-biosources-screen>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/view/screen/similar-finder.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SimilarFinder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__ = __webpack_require__("../../../../../src/app/service/deepblue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_service_selecteddata__ = __webpack_require__("../../../../../src/app/service/selecteddata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_service_progresselement__ = __webpack_require__("../../../../../src/app/service/progresselement.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_view_component_charts_similarity__ = __webpack_require__("../../../../../src/app/view/component/charts/similarity.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_service_statistics__ = __webpack_require__("../../../../../src/app/service/statistics.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_service_requests_manager__ = __webpack_require__("../../../../../src/app/service/requests-manager.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SimilarFinder = /** @class */ (function () {
    function SimilarFinder(confirmationService, deepBlueService, requestManager, progress_element, selectedData) {
        var _this = this;
        this.confirmationService = confirmationService;
        this.deepBlueService = deepBlueService;
        this.requestManager = requestManager;
        this.progress_element = progress_element;
        this.selectedData = selectedData;
        this.visibleSidebar2 = false;
        this.cutoffOptions = [
            { label: '1%', value: 1 },
            { label: '5%', value: 5 },
            { label: '10%', value: 10 },
            { label: '20%', value: 20 },
            { label: '35%', value: 35 },
            { label: '50%', value: 50 },
            { label: '65%', value: 65 },
            { label: '100%', value: 100 }
        ];
        this.cutoffValue = 20;
        this.orderOptions = [
            { label: 'Most similar', value: this.desc_func },
            { label: 'Most dissimilar', value: this.asc_func }
        ];
        this.orderFunction = this.desc_func;
        this.prevDatum = null;
        this.stackSubscriber = this.selectedData.activeTopStackValue$.subscribe(function (dataStackItem) {
            if (dataStackItem) {
                _this.processSimilar(dataStackItem.op);
            }
        });
    }
    SimilarFinder.prototype.ngOnDestroy = function () {
        this.stackSubscriber.unsubscribe();
    };
    SimilarFinder.prototype.processSimilar = function (data) {
        var _this = this;
        this.deepBlueService.composedCalculateFastsEnrichment(data).subscribe(function (request) {
            _this.requestManager.enqueueRequest(request);
            _this.deepBlueService.getComposedResultIterator(request, _this.progress_element, 'overlaps_enrichment_fast', _this.reloadData, _this)
                .subscribe(function (result) {
                _this.reloadData(_this, result);
            });
        });
    };
    SimilarFinder.prototype.desc_func = function (a, b, column) {
        return b[column] - a[column];
    };
    SimilarFinder.prototype.asc_func = function (a, b, column) {
        return a[column] - b[column];
    };
    SimilarFinder.prototype.reloadData = function (_self, datum) {
        if (!_self) {
            _self = this;
        }
        if (!datum) {
            datum = this.prevDatum;
        }
        else {
            _self.prevDatum = datum;
        }
        if ((!datum) || (datum.length == 0)) {
            return;
        }
        datum.sort(function (a, b) { return _self.orderFunction(a, b, 'p_value_log'); });
        var position = 0;
        var value = datum[0].p_value_log;
        for (var i = 0; i < datum.length; i++) {
            if (datum[i].p_value_log != value) {
                position = i;
                value = datum[i].p_value_log;
            }
            datum[i].log_rank = position + 1;
        }
        datum.sort(function (a, b) { return _self.orderFunction(a, b, 'odds_ratio'); });
        position = 0;
        value = datum[0].odds_ratio;
        for (var i = 0; i < datum.length; i++) {
            if (datum[i].odds_ratio != value) {
                position = i;
                value = datum[i].odds_ratio;
            }
            datum[i].odd_rank = position + 1;
        }
        datum.sort(function (a, b) { return _self.orderFunction(a, b, 'support'); });
        position = 0;
        value = datum[0].support;
        for (var i = 0; i < datum.length; i++) {
            if (datum[i].support != value) {
                position = i;
                value = datum[i].support;
            }
            datum[i].support_rank = position + 1;
        }
        for (var _i = 0, datum_1 = datum; _i < datum_1.length; _i++) {
            var ds = datum_1[_i];
            ds.mean_rank = (ds.log_rank + ds.odd_rank + ds.support_rank) / 3;
            ds.max_rank = Math.max(ds.log_rank, ds.odd_rank, ds.support_rank);
        }
        datum.sort(function (a, b) { return a.mean_rank - b.mean_rank; });
        var cutoff = __WEBPACK_IMPORTED_MODULE_6_app_service_statistics__["a" /* Statistics */].percentile(datum.map(function (o) { return o.mean_rank; }), (_self.cutoffValue / 100));
        var filtered_data = [];
        for (var _a = 0, datum_2 = datum; _a < datum_2.length; _a++) {
            var d = datum_2[_a];
            if (d["mean_rank"] <= cutoff) {
                filtered_data.push(d);
            }
        }
        var biosources = {};
        var ems = {};
        for (var _b = 0, filtered_data_1 = filtered_data; _b < filtered_data_1.length; _b++) {
            var ds = filtered_data_1[_b];
            var biosource = ds.biosource;
            var em = ds.epigenetic_mark;
            var rank = ds.mean_rank;
            if (!(biosource in biosources)) {
                biosources[biosource] = [];
            }
            biosources[biosource].push(rank);
            if (!(em in ems)) {
                ems[em] = [];
            }
            ems[em].push(rank);
        }
        var biosources_stats = {};
        var ems_stats = {};
        for (var bs in biosources) {
            var results = biosources[bs];
            biosources_stats[bs] = __WEBPACK_IMPORTED_MODULE_6_app_service_statistics__["a" /* Statistics */].calculateStats(biosources[bs]);
        }
        for (var em in ems) {
            var results = ems[em];
            ems_stats[em] = __WEBPACK_IMPORTED_MODULE_6_app_service_statistics__["a" /* Statistics */].calculateStats(ems[em]);
        }
        var biosources_data = Object.keys(biosources_stats).map(function (biosource) { return [biosource, biosources_stats[biosource]]; }).sort(function (a, b) { return a[1].mean - b[1].mean; });
        _self.plot("Similar BioSources", biosources_data, _self.biosourcessimilaritybarchart, _self.biosourceElementClick);
        var ems_data = Object.keys(ems_stats).map(function (em) { return [em, ems_stats[em]]; }).sort(function (a, b) { return a[1].mean - b[1].mean; });
        _self.plot("Similar Epigenetic Marks", ems_data, _self.emssimilaritybarchart, _self.epigeneticMarkElementClick);
    };
    SimilarFinder.prototype.plot = function (title, datum, chart, clickCallback) {
        if (!datum) {
            return;
        }
        var categories = datum.map(function (o) { return o[0]; });
        var series = [];
        var stack_values_result_boxplot = [];
        for (var _i = 0, datum_3 = datum; _i < datum_3.length; _i++) {
            var data = datum_3[_i];
            stack_values_result_boxplot.push([
                data[1]['low'],
                data[1]['q1'],
                data[1]['median'],
                data[1]['q3'],
                data[1]['high']
            ]);
        }
        series.push({
            type: 'boxplot',
            name: "Similar",
            data: stack_values_result_boxplot,
        });
        chart.setNewData(title, categories, series, this, clickCallback);
    };
    SimilarFinder.prototype.biosourceElementClick = function (click, _self) {
        var point = click.point;
        var category = point.category.trim();
        var bs = _self.deepBlueService.getBioSourceByName(category);
        _self.deepBlueService.addSelectedBiosource(bs);
        _self.deepBlueService.getRelatedBioSources(bs).subscribe(function (bss) {
            if (bss[1].length > 1) {
                var s = bss[1];
                console.log(s);
                var text = "<ul>" + s.map(function (ss) { return "<li>" + ss + "</li>"; }).join("") + "</ul>";
                console.log(text);
                _self.confirmationService.confirm({
                    message: text,
                    accept: function () {
                        for (var _i = 0, _a = bss[1]; _i < _a.length; _i++) {
                            var similar = _a[_i];
                            var bs_1 = _self.deepBlueService.getBioSourceByName(similar);
                            _self.deepBlueService.addSelectedBiosource(bs_1);
                        }
                    }
                });
            }
        });
    };
    SimilarFinder.prototype.epigeneticMarkElementClick = function (click, _self) {
        var point = click.point;
        var category = point.category;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('biosourcessimilaritybarchart'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_app_view_component_charts_similarity__["a" /* SimilarityBarChartComponent */])
    ], SimilarFinder.prototype, "biosourcessimilaritybarchart", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('emssimilaritybarchart'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_app_view_component_charts_similarity__["a" /* SimilarityBarChartComponent */])
    ], SimilarFinder.prototype, "emssimilaritybarchart", void 0);
    SimilarFinder = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/view/screen/similar-finder.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["ConfirmationService"],
            __WEBPACK_IMPORTED_MODULE_2_app_service_deepblue__["a" /* DeepBlueService */], __WEBPACK_IMPORTED_MODULE_7_app_service_requests_manager__["a" /* RequestManager */],
            __WEBPACK_IMPORTED_MODULE_4_app_service_progresselement__["a" /* ProgressElement */], __WEBPACK_IMPORTED_MODULE_3_app_service_selecteddata__["a" /* SelectedData */]])
    ], SimilarFinder);
    return SimilarFinder;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map