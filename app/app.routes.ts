import { GenomeSelectorComponent } from './demo/view/deepblue';
import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SummaryScreen} from './demo/view/summary.screen';
import {BioSourcesScreen} from './demo/view/biosources.screen';
import {HistonesScreen} from './demo/view/histones.screen';


export const routes: Routes = [
    {path: '', component: SummaryScreen},
    {path: 'histonemark', component: HistonesScreen}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

