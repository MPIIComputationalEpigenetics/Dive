import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SummaryScreen} from './demo/view/summary.screen';
import {RegionsScreen} from './demo/view/regions.screen' ;
import {HistonesScreen} from './demo/view/histones.screen';

export const routes: Routes = [
    {path: '', component: SummaryScreen},
    {path: 'regions', component: RegionsScreen},
    {path: 'histonemark', component: HistonesScreen}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
