import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MenuService {
  model: any[] = [
    {
      label: 'Data Selection', icon: 'dashboard', routerLink: ['/dataselection']
    },
    {
      label: 'Similar Data', icon: 'compare_arrows', routerLink: ['/similarfinder']
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
      name: 'genes', label: 'Genes', icon: 'lens', routerLink: ['/genes']
    },
    {
      name: 'go_enrichment', label: 'Gene Ontology', icon: 'view_quilt', routerLink: ['/go_enrichment']
    },
    {
      name: 'overlap_enrichment', label: 'Overlap Enrichment', icon: 'view_quilt', routerLink: ['/overlap_enrichment']
    }
  ];

  public menuItems = new BehaviorSubject<Object[]>(this.model);
  menuValue$: Observable<Object[]> = this.menuItems.asObservable();

  findMenu(parentName: string): any {
    return this.model.find(m => m.name == parentName);
  }

  findMenuPos(parentName: string): number {
    return this.model.findIndex(m => m.name == parentName);
  }

  pushItem(subMenu: any, item: any) {
    if ('items' in subMenu) {
      subMenu['items'].push(item);
    } else {
      subMenu['items'] = [item];
    }
  }

  add(parentName: string, label?: string, icon?: string) {
    let item = {
      name: parentName,
      label: parentName,
      icon: 'change_history',
      items: new Array<Object>()
    };

    if (label) {
      item.label = label;
    }

    if (icon) {
      item.icon = icon
    }

    this.model.push(item);
  }

  remove(parentName: string) {
    let pos = this.findMenuPos(parentName);
    if (pos > -1) {
      this.model.splice(pos, 1);
    }
  }

  clean(parentName: string) {
    const subMenu = this.findMenu(parentName);
    if (!subMenu) {
      console.error('Sub Menu ' + parentName + ' not found');
      return;
    }
    subMenu['items'] = [];
  }

  includeItem(parentName: string, label: string, icon: string, command: any, routerLink: any, url: any) {
    const subMenu = this.findMenu(parentName);
    if (!subMenu) {
      console.error('Sub Menu ' + parentName + ' not found');
      return;
    }

    const item: any = { 'label': label };
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
    const subMenu = this.findMenu(parentName);
    if (!subMenu) {
      console.error('Sub Menu ' + parentName + ' not found');
      return;
    }
    this.pushItem(subMenu, item);
  }


}