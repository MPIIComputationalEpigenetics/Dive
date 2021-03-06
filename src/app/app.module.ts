import 'rxjs/Rx';

import { AccordionModule } from 'primeng/primeng';
import { AppFooter } from './app.footer.component';
import { AppMenuComponent, AppSubMenu } from './app.menu.component';
import { AppRoutes } from './app.routes';
import { AppTopBar } from './app.topbar.component';
import { AutoCompleteModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/primeng';
import { ChartModule } from 'angular2-highcharts';
import { CheckboxModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/primeng';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataLoadProgressBar } from 'app/view/component/progressbar';
import { DataScrollerModule } from 'primeng/primeng';
import { DataSelectionScreen } from 'app/view/screen/data-selection';
import { DataStackViewComponent } from 'app/view/component/data-stack';
import { DataTableModule } from 'primeng/primeng';
import { DeepBlueService } from 'app/service/deepblue';
import { DialogModule } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/primeng';
import { GenesScreen } from 'app/view/screen/genes';
import { GMapModule } from 'primeng/primeng';
import { GoEnrichmentScreenComponent } from 'app/view/screen/go-enrichment';
import { GrowlModule } from 'primeng/primeng';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { HttpClientModule } from '@angular/common/http';
import { InplaceModule, ConfirmationService, ScrollPanelModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { LightboxModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MegaMenuModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { MenuModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OrderListModule } from 'primeng/primeng';
import { OrganizationChartModule } from 'primeng/primeng';
import { OverlapEnrichmentScreenComponent } from 'app/view/screen/overlap-enrichment';
import { OverlapsBarChartComponent } from 'app/view/component/charts/overlappingbar';
import { OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { ProgressBarModule } from 'primeng/primeng';
import { ProgressElement } from 'app/service/progresselement';
import { RadioButtonModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { RegionsScreen } from 'app/view/screen/regions';
import { ScheduleModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';
import { SelectedData } from 'app/service/selected-data';
import { SharedModule } from 'primeng/primeng';
import { SidebarModule } from 'primeng/primeng';
import { SimilarFinder } from 'app/view/screen/similar-finder';
import { SimilarityBarChartComponent } from 'app/view/component/charts/similarity';
import { SlideMenuModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { StepsModule } from 'primeng/primeng';
import { TabMenuModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { TerminalModule } from 'primeng/primeng';
import { TieredMenuModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';

export function highchartsFactory() {
    return require('highcharts');
}

import { AppComponent } from './app.component';
import { ChromatinStatesScreenComponent } from "app/view/screen/chromatin_states";
import { BioSourcesScreenComponent } from "app/view/component/biosources";
import { SelectTilingRegionsComponent } from "app/view/component/data-selection/select-tiling-regions";
import { SelectExperimentsComponent } from "app/view/component/data-selection/select-experiments";
import { SelectAnnotationsComponent } from "app/view/component/data-selection/select-annotations";
import { SelectGenesComponent } from 'app/view/component/data-selection/select-genes';
import { SelectDatasetsComponent } from 'app/view/component/data-selection/select-datasets';
import { DataInfoBoxComponent } from 'app/view/component/data-info-box';
import { SelectedDataView, SelectedDataButton } from 'app/view/component/deepblue';
import { LengthMenuFilterComponent } from 'app/view/component/menu/length-filtering';
import { DnaPatternMenuFilterComponent } from 'app/view/component/menu/dna-pattern-filtering';
import { ColumnsMenuFilterComponent } from 'app/view/component/menu/columns-filtering';
import { RegionsUpload } from 'app/view/component/data-selection/upload-regions';
import { RegionsPaste } from 'app/view/component/data-selection/paste-regions';
import { SelectQuery } from 'app/view/component/data-selection/select-query';
import { PeaksOverlapScreenComponent } from 'app/view/screen/peaks-overlap';
import { RequestManager } from 'app/service/requests-manager';
import { DataSelectionMainComponent } from 'app/view/component/data-selection/data-selection-main';
import { QueryFlow } from 'app/view/component/query-flow';
import { DiveMenuService } from 'app/service/menu';
import { RouterGuard } from 'app/service/router-guard';
import { ComparisonSelectionScreen } from 'app/view/screen/comparison-selection';

import { DataSelectionWizard, NavegationMenu } from 'app/view/wizards/data-selection-wizard';
import { OverlapEnrichmentWizard } from 'app/view/wizards/overlap-enrichment-wizard';

//import { Angulartics2Module } from 'angulartics2';
//import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { MiddlewareProxy } from './service/middleware-proxy';
import { SelectMotif } from 'app/view/component/data-selection/dna-motif';

import { RegionsTransformComponent } from 'app/view/screen/regions-transform'
import { StackRegionsTransformScreen } from 'app/view/screen/stack-regions-transform'
import { DefaultData } from 'app/service/defaultdata';
import { DataStackFactory } from 'app/service/data-stack-factory';
import { LoadQueriesScreen } from 'app/view/screen/load-queries';
import { CopyComponent } from 'app/view/component/copy';

import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
    imports: [
        ArchwizardModule,
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        SharedModule,
        ContextMenuModule,
        DataGridModule,
        DataListModule,
        DataScrollerModule,
        DataTableModule,
        DialogModule,
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessagesModule,
        MultiSelectModule,
        NgxDatatableModule,
        OrderListModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ReactiveFormsModule,
        ScrollPanelModule,
        ScheduleModule,
        SelectButtonModule,
        SidebarModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        ChartModule,
        BrowserAnimationsModule,
        OrganizationChartModule,
        CardModule,
        ColorPickerModule,
        //Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenu,
        AppTopBar,
        AppFooter,
        DataStackViewComponent,
        DataLoadProgressBar,
        DataSelectionMainComponent,
        OverlapsBarChartComponent,
        SimilarityBarChartComponent,
        SelectAnnotationsComponent,
        SelectDatasetsComponent,
        SelectExperimentsComponent,
        SelectTilingRegionsComponent,
        CopyComponent,
        SelectGenesComponent,
        DataSelectionScreen,
        LoadQueriesScreen,
        ComparisonSelectionScreen,
        RegionsScreen,
        SimilarFinder,
        BioSourcesScreenComponent,
        ChromatinStatesScreenComponent,
        GenesScreen,
        GoEnrichmentScreenComponent,
        OverlapEnrichmentScreenComponent,
        PeaksOverlapScreenComponent,
        SelectedDataView,
        SelectedDataButton,
        DataInfoBoxComponent,
        LengthMenuFilterComponent,
        DnaPatternMenuFilterComponent,
        ColumnsMenuFilterComponent,
        StackRegionsTransformScreen,
        RegionsTransformComponent,
        RegionsUpload,
        RegionsPaste,
        SelectMotif,
        QueryFlow,
        SelectQuery,
        NavegationMenu,
        DataSelectionWizard,
        OverlapEnrichmentWizard
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        },
        DiveMenuService,
        ConfirmationService,
        MiddlewareProxy,
        DeepBlueService,
        DefaultData,
        RouterGuard,
        ProgressElement,
        DataStackFactory,
        SelectedData,
        RequestManager
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
