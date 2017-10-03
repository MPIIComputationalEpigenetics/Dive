import { HistonesScreenComponent } from './view/screen/histones';
import { DataStackViewComponent } from 'app/view/component/datastack';
import { DataStackFactory } from 'app/service/datastack';
import { SelectedData } from 'app/service/selecteddata';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routes';

import 'rxjs/Rx';

import { AccordionModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { CarouselModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataScrollerModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GalleriaModule } from 'primeng/primeng';
import { GMapModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { LightboxModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { MenuModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { ProgressBarModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';
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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMenuComponent, AppSubMenu } from './app.menu.component';
import { AppTopBar } from './app.topbar.component';
import { AppFooter } from './app.footer.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MenuService } from 'app/service/menu';
import { DeepBlueService } from 'app/service/deepblue';
import { ProgressElement } from 'app/service/progresselement';

import { OverlapsBarChartComponent } from 'app/view/component/charts/overlappingbar';

import { FilteringComponent } from 'app/view/component/filtering';

import { SummaryScreen } from 'app/view/screen/summary';
import { RegionsScreen } from 'app/view/screen/regions';
import { GenesScreen } from 'app/view/screen/genes';
import { GoEnrichmentScreenComponent } from 'app/view/screen/go_enrichment';
import { OverlapEnrichmentScreenComponent } from 'app/view/screen/overlap_enrichment';


import { DiveStatus, HistoneExperimentsMenu, CSSExperimentsMenu, SelectedDataView, SelectedDataButton } from 'app/view/component/deepblue';

import { DataLoadProgressBar } from 'app/view/component/progressbar';

import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule } from 'angular2-highcharts';

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
import { SelectDatabasesComponent } from 'app/view/component/data-selection/select-databases';
import { DataInfoBoxComponent } from 'app/view/component/data-info-box';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpModule,
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
        ScheduleModule,
        SelectButtonModule,
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
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenu,
        AppTopBar,
        AppFooter,
        DiveStatus,
        DataStackViewComponent,
        DataLoadProgressBar,
        OverlapsBarChartComponent,
        FilteringComponent,
        SelectAnnotationsComponent,
        SelectDatasetsComponent,
        SelectExperimentsComponent,
        SelectTilingRegionsComponent,
        SelectGenesComponent,
        SelectDatabasesComponent,
        SummaryScreen,
        RegionsScreen,
        BioSourcesScreenComponent,
        HistonesScreenComponent,
        ChromatinStatesScreenComponent,
        GenesScreen,
        GoEnrichmentScreenComponent,
        OverlapEnrichmentScreenComponent,
        SelectedDataView,
        SelectedDataButton,
        DataInfoBoxComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        },
        MenuService,
        DeepBlueService,
        ProgressElement,
        DataStackFactory,
        SelectedData
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
