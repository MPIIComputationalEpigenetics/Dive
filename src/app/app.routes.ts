import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SummaryScreen} from './dive/view/summary.screen';
import {RegionsScreen} from './dive/view/regions.screen' ;
import {HistonesScreen} from './dive/view/histones.screen';

export const routes: Routes = [
    {path: '', component: SummaryScreen},
    {path: 'regions', component: RegionsScreen},
    {path: 'histonemark', component: HistonesScreen}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
