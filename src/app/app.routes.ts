import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SummaryScreen } from 'app/view/screen/summary';
import { RegionsScreen } from 'app/view/screen/regions';
import { HistonesScreenComponent } from 'app/view/screen/histones';
import { GenesScreen } from 'app/view/screen/genes';

export const routes: Routes = [
    { path: '', component: SummaryScreen },
    { path: 'regions', component: RegionsScreen },
    { path: 'histonemark', component: HistonesScreenComponent },
    { path: 'genes', component: GenesScreen }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
