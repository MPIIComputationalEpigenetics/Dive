import { Routes, RouterModule, Router } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DataSelectionScreen } from 'app/view/screen/data-selection';
import { RegionsScreen } from 'app/view/screen/regions';
import { ChromatinStatesScreenComponent } from 'app/view/screen/chromatin_states';
import { GenesScreen } from 'app/view/screen/genes';
import { OverlapEnrichmentScreenComponent } from "app/view/screen/overlap-enrichment";
import { GoEnrichmentScreenComponent } from 'app/view/screen/go-enrichment';
import { PeaksOverlapScreenComponent } from 'app/view/screen/peaks-overlap';
import { SimilarFinder } from 'app/view/screen/similar-finder';
import { RouterGuard } from 'app/service/router-guard';
import { ComparisonSelectionScreen } from 'app/view/screen/comparison-selection';
import { StackRegionsTransformScreen } from 'app/view/screen/stack-regions-transform';
import { OverlapEnrichmentWizard } from './view/wizards/overlap-enrichment-wizard';
import { DataSelectionWizard } from './view/wizards/data-selection-wizard';

export const routes: Routes = [
    { path: '', component: DataSelectionWizard },
    { path: 'dataselection', component: DataSelectionScreen, canActivate: [RouterGuard] },
    { path: 'comparisonselection', component: ComparisonSelectionScreen, canActivate: [RouterGuard] },
    { path: 'similarfinder', component: SimilarFinder, canActivate: [RouterGuard] },
    { path: 'transform', component: StackRegionsTransformScreen, canActivate: [RouterGuard] },
    { path: 'regions', component: RegionsScreen, canActivate: [RouterGuard] },
    { path: 'genes', component: GenesScreen, canActivate: [RouterGuard] },
    { path: 'go_enrichment', component: GoEnrichmentScreenComponent, canActivate: [RouterGuard] },
    { path: 'chromatin_states', component: ChromatinStatesScreenComponent, canActivate: [RouterGuard] },
    { path: 'overlap_enrichment', component: OverlapEnrichmentWizard, canActivate: [RouterGuard] },
    { path: 'peaks_overlap', component: PeaksOverlapScreenComponent, canActivate: [RouterGuard] }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
