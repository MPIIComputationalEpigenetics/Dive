import 'rxjs/Rx';

import { AppFooter } from './app.footer.component';
import { AppMenuComponent, AppSubMenu } from './app.menu.component';
import { AppRoutes } from './app.routes';
import { AppTopBar } from './app.topbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'angular2-highcharts';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DataLoadProgressBar } from 'app/view/component/progressbar';
import { DataSelectionScreen } from 'app/view/screen/data-selection';
import { DataStackViewComponent } from 'app/view/component/data-stack';
import { DeepBlueService } from 'app/service/deepblue';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GenesScreen } from 'app/view/screen/genes';
import { GoEnrichmentScreenComponent } from 'app/view/screen/go-enrichment';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OverlapEnrichmentScreenComponent } from 'app/view/screen/overlap-enrichment';
import { OverlapsBarChartComponent } from 'app/view/component/charts/overlappingbar';
import { ProgressElement } from 'app/service/progresselement';
import { RegionsScreen } from 'app/view/screen/regions';
import { SelectedData } from 'app/service/selected-data';
import { SimilarFinder } from 'app/view/screen/similar-finder';
import { SimilarityBarChartComponent } from 'app/view/component/charts/similarity';

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
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { BreadcrumbModule } from 'primeng/components/breadcrumb/breadcrumb';
import { ButtonModule } from 'primeng/components/button/button';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CarouselModule } from 'primeng/components/carousel/carousel';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { ChipsModule } from 'primeng/components/chips/chips';
import { CodeHighlighterModule } from 'primeng/components/codehighlighter/codehighlighter';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { SharedModule } from 'primeng/components/common/shared';
import { OrganizationChartModule } from 'primeng/components/organizationchart/organizationchart';
import { ContextMenuModule } from 'primeng/components/contextmenu/contextmenu';
import { DataScrollerModule } from 'primeng/components/datascroller/datascroller';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { DragDropModule } from 'primeng/components/dragdrop/dragdrop';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { ToolbarModule } from 'primeng/components/toolbar/toolbar';
import { ToggleButtonModule } from 'primeng/components/togglebutton/togglebutton';
import { TieredMenuModule } from 'primeng/components/tieredmenu/tieredmenu';
import { TerminalModule } from 'primeng/components/terminal/terminal';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { TabMenuModule } from 'primeng/components/tabmenu/tabmenu';
import { StepsModule } from 'primeng/components/steps/steps';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { GrowlModule } from 'primeng/components/growl/growl';
import { InplaceModule } from 'primeng/components/inplace/inplace';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { InputSwitchModule } from 'primeng/components/inputswitch/inputswitch';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { LightboxModule } from 'primeng/components/lightbox/lightbox';
import { ListboxModule } from 'primeng/components/listbox/listbox';
import { MegaMenuModule } from 'primeng/components/megamenu/megamenu';
import { MenuModule } from 'primeng/components/menu/menu';
import { MenubarModule } from 'primeng/components/menubar/menubar';
import { MessagesModule } from 'primeng/components/messages/messages';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { OrderListModule } from 'primeng/components/orderlist/orderlist';
import { OverlayPanelModule } from 'primeng/components/overlaypanel/overlaypanel';
import { PaginatorModule } from 'primeng/components/paginator/paginator';
import { PanelModule } from 'primeng/components/panel/panel';
import { PanelMenuModule } from 'primeng/components/panelmenu/panelmenu';
import { PasswordModule } from 'primeng/components/password/password';
import { ProgressBarModule } from 'primeng/components/progressbar/progressbar';
import { PickListModule } from 'primeng/components/picklist/picklist';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { RatingModule } from 'primeng/components/rating/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScheduleModule } from 'primeng/components/schedule/schedule';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { SidebarModule } from 'primeng/components/sidebar/sidebar';
import { SlideMenuModule } from 'primeng/components/slidemenu/slidemenu';
import { SliderModule } from 'primeng/components/slider/slider';
import { SpinnerModule } from 'primeng/components/spinner/spinner';
import { SplitButtonModule } from 'primeng/components/splitbutton/splitbutton';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { TreeTableModule } from 'primeng/components/treetable/treetable';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';

@NgModule({
    imports: [
        AutoCompleteModule,
        ArchwizardModule,
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        AccordionModule,
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
        DataScrollerModule,
        DialogModule,
        DragDropModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
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
        TreeTableModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
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
