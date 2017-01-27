import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemo} from './demo/view/dashboarddemo';
import {SampleDemo} from './demo/view/sampledemo';
import {FormsDemo} from './demo/view/formsdemo';
import {DataDemo} from './demo/view/datademo';
import {PanelsDemo} from './demo/view/panelsdemo';
import {OverlaysDemo} from './demo/view/overlaysdemo';
import {MessagesDemo} from './demo/view/messagesdemo';
import {MiscDemo} from './demo/view/miscdemo';
import {EmptyDemo} from './demo/view/emptydemo';
import {FileDemo} from './demo/view/filedemo';
import {UtilsDemo} from './demo/view/utilsdemo';
import {SummaryScreen} from './demo/view/summary';
import {Documentation} from './demo/view/documentation';
import {BioSourcesScreen} from './demo/view/biosources.screen';
import {HistonesScreen} from './demo/view/histones.screen';

export const routes: Routes = [
    {path: '', component: SummaryScreen},
    {path: 'histonemark', component: HistonesScreen},
    {path: 'sample', component: SampleDemo},
    {path: 'forms', component: FormsDemo},
    {path: 'data', component: DataDemo},
    {path: 'panels', component: PanelsDemo},
    {path: 'overlays', component: OverlaysDemo},
    {path: 'biosources', component: BioSourcesScreen},
    {path: 'messages', component: MessagesDemo},
    {path: 'misc', component: MiscDemo},
    {path: 'empty', component: EmptyDemo},
    {path: 'file', component: FileDemo},
    {path: 'utils', component: UtilsDemo},
    {path: 'documentation', component: Documentation}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

