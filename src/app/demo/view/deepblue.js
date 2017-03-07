"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var deepblue_1 = require('../service/deepblue');
var DataStackView = (function () {
    function DataStackView(deepBlueService) {
        this.deepBlueService = deepBlueService;
        this.dataStack = deepBlueService.getDataStack();
    }
    DataStackView.prototype.removeData = function (event, data) {
        console.log(event, data);
    };
    DataStackView = __decorate([
        core_1.Component({
            selector: 'data-stack',
            template: "\n\n    <ul role=\"menu\">\n        <li *ngFor=\"let data of dataStack.getData() \" (click)=\"removeData($event, data)\">        \n            <a href=\"#\" class=\"ripplelink\">\n                <i class=\"material-icons\">check circle</i><span> {{ data.idName.name }}</span>\n            </a>\n        </li>            \n    </ul>\n    \n    "
        }), 
        __metadata('design:paramtypes', [deepblue_1.DeepBlueService])
    ], DataStackView);
    return DataStackView;
}());
exports.DataStackView = DataStackView;
var DiveStatus = (function () {
    function DiveStatus(deepBlueService) {
        this.deepBlueService = deepBlueService;
    }
    DiveStatus = __decorate([
        core_1.Component({
            selector: 'dive-status',
            template: "\n            <data-stack></data-stack>\n            <genome-selector></genome-selector>\n            {{ deepBlueService.getTotalSelectedRegtions() }}\n            <li role=\"menuitem\">\n                <a [routerLink]=\"['/']\">x\n                    <i class=\"material-icons\">dashboard</i>\n                    <span>{{ deepBlueService.getAnnotation()?.name }}</span>\n                </a>                \n            </li>                \n            <histone-mark-selector></histone-mark-selector>\n            "
        }), 
        __metadata('design:paramtypes', [deepblue_1.DeepBlueService])
    ], DiveStatus);
    return DiveStatus;
}());
exports.DiveStatus = DiveStatus;
var AnnotationListComponent = (function () {
    function AnnotationListComponent(deepBlueService) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(function (genome) {
            _this.deepBlueService.getAnnotations(genome).subscribe(function (annotations) {
                _this.annotations = annotations;
                _this.menuAnnotations = annotations.map(function (annotation) {
                    return { label: annotation.name, value: annotation };
                });
            }, function (error) { return _this.errorMessage = error; });
        });
    }
    AnnotationListComponent.prototype.selectAnnotation = function (event) {
        this.deepBlueService.setAnnotation(event.value);
    };
    AnnotationListComponent.prototype.ngOnDestroy = function () {
        this.genomeSubscription.unsubscribe();
    };
    AnnotationListComponent = __decorate([
        core_1.Component({
            selector: 'list-annotations',
            template: "   \n                <div class=\"ui-g form-group\">\n                    <div class=\"ui-g-12 ui-md-2\">\n                        <label for=\"input\">Annotation Name</label>\n                    </div>\n                    <div class=\"ui-g-12 ui-md-4\">\n                        <p-dropdown \n                            id=\"dropdown\" \n                            [options]=\"menuAnnotations\" \n                            [(ngModel)]=\"selectedAnnotation\" \n                            filter=\"filter\" \n                            [autoWidth]=\"false\"\n                            (onChange)=\"selectAnnotation($event)\"\n                        >\n                        </p-dropdown>\n                    </div>\n                </div>\n        "
        }), 
        __metadata('design:paramtypes', [deepblue_1.DeepBlueService])
    ], AnnotationListComponent);
    return AnnotationListComponent;
}());
exports.AnnotationListComponent = AnnotationListComponent;
//
var HistoneExperimentsMenu = (function () {
    function HistoneExperimentsMenu(deepBlueService) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(function (genome) {
            _this.deepBlueService.getHistones().subscribe(function (histones) {
                _this.selectHistones = histones;
            }, function (error) { return _this.errorMessage = error; });
        });
    }
    HistoneExperimentsMenu.prototype.changeHistone = function (event, histone) {
        this.deepBlueService.setEpigeneticMark(histone);
    };
    HistoneExperimentsMenu.prototype.getStyle = function (histone) {
        if (histone.id == this.deepBlueService.getEpigeneticMark().id) {
            return "check circle";
        }
        else {
            return "alarm on";
        }
    };
    HistoneExperimentsMenu.prototype.ngOnDestroy = function () {
        this.genomeSubscription.unsubscribe();
    };
    HistoneExperimentsMenu = __decorate([
        core_1.Component({
            selector: 'histone-mark-selector',
            templateUrl: 'app/demo/view/histones.selector.html'
        }), 
        __metadata('design:paramtypes', [deepblue_1.DeepBlueService])
    ], HistoneExperimentsMenu);
    return HistoneExperimentsMenu;
}());
exports.HistoneExperimentsMenu = HistoneExperimentsMenu;
// Building Menu Items with Genome names
var GenomeSelectorComponent = (function () {
    function GenomeSelectorComponent(deepBlueService) {
        this.deepBlueService = deepBlueService;
    }
    GenomeSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.deepBlueService.getGenomes()
            .subscribe(function (genomes) {
            _this.selectGenomes = genomes;
            _this.deepBlueService.setGenome(genomes[0]);
        }, function (error) { return _this.errorMessage = error; });
    };
    GenomeSelectorComponent.prototype.changeGenome = function (event, genome) {
        this.deepBlueService.setGenome(genome);
    };
    GenomeSelectorComponent.prototype.getStyle = function (genome) {
        if (genome.id == this.deepBlueService.getGenome().id) {
            return "check circle";
        }
        else {
            return "alarm on";
        }
    };
    GenomeSelectorComponent = __decorate([
        core_1.Component({
            selector: 'genome-selector',
            templateUrl: 'app/demo/view/genome.selector.html'
        }), 
        __metadata('design:paramtypes', [deepblue_1.DeepBlueService])
    ], GenomeSelectorComponent);
    return GenomeSelectorComponent;
}());
exports.GenomeSelectorComponent = GenomeSelectorComponent;
//# sourceMappingURL=deepblue.js.map