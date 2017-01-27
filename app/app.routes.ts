import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SummaryScreen} from './demo/view/summary';
import {BioSourcesScreen} from './demo/view/biosources.screen';
import {HistonesScreen} from './demo/view/histones.screen';

export const routes: Routes = [
    {path: '', component: SummaryScreen},
    {path: 'histonemark', component: HistonesScreen},
    {path: 'biosources', component: BioSourcesScreen},
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

