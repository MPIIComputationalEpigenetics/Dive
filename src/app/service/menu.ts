import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MenuService {
  model = [
    {
      label: 'Dashboard', icon: 'dashboard', routerLink: ['/']
    },
    {
      name: 'genomes', label: 'Genomes', icon: 'lens',
      items: []
    },
    {
      label: 'Get regions', icon: 'dehaze', routerLink: ['/regions']
    },
    {
      name: 'filtering', label: 'Filtering', icon: 'filter_list',
      items: []
    },
    {
      name: 'histones', label: 'Histone Modification ', icon: 'change_history',
      items: []
    },
    {
      name: 'genes', label: 'Genes', icon: 'lens', routerLink: ['/genes']
    }
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

  clean(parentName) {
    let subMenu = this.findMenu(parentName);
    if (!subMenu) {
      console.error("Sub Menu " + parentName + " not found");
      return;
    }
    subMenu['items'] = [];
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