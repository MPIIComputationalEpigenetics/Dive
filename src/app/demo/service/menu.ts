import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class MenuService {
  model = [
    { label: 'Dashboard', icon: 'dashboard', routerLink: ['/'] },
    {
      name: 'genomes', label: 'Genomes: ', icon: 'lens',
      items: [ ]
    },
    { label: 'Get regions', icon: 'dehaze', routerLink: ['/regions'] },

    { name: 'filtering', label: 'Filtering', icon: 'filter_list',
      items: [  ]
    },
    {
      label: 'Template Pages', icon: 'get_app',
      items: [
        { label: 'Empty Page', icon: 'hourglass_empty', routerLink: ['/empty'] },
        { label: 'Landing Page', icon: 'flight_land', url: 'landing.html' },
        { label: 'Login Page', icon: 'verified_user', url: 'login.html' },
        { label: 'Error Page', icon: 'error', url: 'error.html' },
        { label: '404 Page', icon: 'error_outline', url: '404.html' },
        { label: 'Access Denied Page', icon: 'security', url: 'access.html' }
      ]
    },
    {
      label: 'Menu Hierarchy', icon: 'menu',
      items: [
        {
          label: 'Submenu 1', icon: 'subject',
          items: [
            {
              label: 'Submenu 1.1', icon: 'subject',
              items: [
                { label: 'Submenu 1.1.1', icon: 'subject' },
                { label: 'Submenu 1.1.2', icon: 'subject' },
                { label: 'Submenu 1.1.3', icon: 'subject' },
              ]
            },
            {
              label: 'Submenu 1.2', icon: 'subject',
              items: [
                { label: 'Submenu 1.2.1', icon: 'subject' },
                { label: 'Submenu 1.2.2', icon: 'subject' }
              ]
            },
          ]
        },
        {
          label: 'Submenu 2', icon: 'subject',
          items: [
            {
              label: 'Submenu 2.1', icon: 'subject',
              items: [
                { label: 'Submenu 2.1.1', icon: 'subject' },
                { label: 'Submenu 2.1.2', icon: 'subject' },
                { label: 'Submenu 2.1.3', icon: 'subject' },
              ]
            },
            {
              label: 'Submenu 2.2', icon: 'subject',
              items: [
                { label: 'Submenu 2.2.1', icon: 'subject' },
                { label: 'Submenu 2.2.2', icon: 'subject' }
              ]
            },
          ]
        }
      ]
    },
    { label: 'Utils', icon: 'build', routerLink: ['/utils'] },
    { label: 'Documentation', icon: 'find_in_page', routerLink: ['/documentation'] }
  ];

  public menuItems = new BehaviorSubject<Object[]>(this.model);
  genomeValue$: Observable<Object[]> = this.menuItems.asObservable();

  findMenu(parentName: string): {} {
    for (let subMenu of this.model) {
      if (subMenu['name'] == parentName) {
        return subMenu;
      }
    }
    return null;
  }

  pushItem(subMenu, item) {
    if ('items' in subMenu) {
      subMenu['items'].push(item);
    } else {
      subMenu['items'] = [item];
    }
  }

  includeItem(parentName: string, label: string, icon: string, command, routerLink, url) {
    let subMenu = this.findMenu(parentName);
    if (!subMenu) {
      console.error("Sub Menu " + parentName + " not found");
      return;
    }

    let item = { 'label': label };
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
  }



  includeObject(parentName: string, item: Object) {
    let subMenu = this.findMenu(parentName);
    if (!subMenu) {
      console.error("Sub Menu " + parentName + " not found");
      return;
    }
    this.pushItem(subMenu, item);
  }


}