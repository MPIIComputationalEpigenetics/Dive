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
var HistonesScreen = (function () {
    function HistonesScreen(deepBlueService) {
        var _this = this;
        this.deepBlueService = deepBlueService;
        this.biosourcesItems = [];
        this.selectedMultiSelectBiosources = [];
        this.defaultSelectBiosourcesLabel = "Select the Biosource";
        this.selectedExperiments = [];
        this.epigeneticMarkSubscription = deepBlueService.epigeneticMarkValue$.subscribe(function (selected_epigenetic_mark) {
            _this.deepBlueService.getExperiments(deepBlueService.getGenome(), selected_epigenetic_mark).subscribe(function (experiments_ids) {
                var ids = experiments_ids.map(function (e) { return e.id; });
                _this.deepBlueService.getInfos(ids).subscribe(function (full_info) {
                    _this.experiments = full_info;
                    _this.segregated_data = _this.segregate(full_info);
                });
            }, function (error) { return _this.errorMessage = error; });
        });
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
    }
    HistonesScreen.prototype.segregate = function (experiments) {
        var biosources = {};
        var samples = {};
        var epigenetic_marks = {};
        var techniques = {};
        var projects = {};
        for (var _i = 0, experiments_1 = experiments; _i < experiments_1.length; _i++) {
            var experiment = experiments_1[_i];
            var experiment_biosource = experiment['sample_info']['biosource_name'];
            var experiment_sample_id = experiment['sample_id'];
            var experiment_epigenetic_mark = experiment['epigenetic_mark'];
            var experiment_technique = experiment['technique'];
            var experiment_project = experiment['project'];
            experiments;
            if (!(experiment_biosource in biosources)) {
                biosources[experiment_biosource] = [];
                this.biosourcesItems.push({ label: experiment_biosource, value: biosources[experiment_biosource] });
            }
            if (!(experiment_sample_id in samples)) {
                samples[experiment_sample_id] = [];
            }
            if (!(experiment_epigenetic_mark in epigenetic_marks)) {
                epigenetic_marks[experiment_epigenetic_mark] = [];
            }
            if (!(experiment_technique in techniques)) {
                techniques[experiment_technique] = [];
            }
            if (!(experiment_project in projects)) {
                projects[experiment_project] = [];
            }
            biosources[experiment_biosource].push(experiment);
            samples[experiment_sample_id].push(experiment);
            epigenetic_marks[experiment_epigenetic_mark].push(experiment);
            techniques[experiment_technique].push(experiment);
            projects[experiment_project].push(experiment);
        }
        return {
            "biosources": biosources,
            "samples": samples,
            "epigenetic_marks": epigenetic_marks,
            "techniques": techniques,
            "projects": projects };
    };
    HistonesScreen.prototype.selectBiosources = function (event) {
        var _this = this;
        debugger;
        var experiments = [];
        experiments = experiments.concat.apply([], event.value);
        console.log(experiments);
        this.deepBlueService.selectMultipleExperiments(experiments).subscribe(function (query_ids) {
            debugger;
            console.log(query_ids);
            _this.deepBlueService.overlapWithSelected(query_ids).subscribe(function (request_ids) {
            });
        });
    };
    HistonesScreen.prototype.reloadPlot = function () {
    };
    HistonesScreen.prototype.ngOnDestroy = function () {
        this.epigeneticMarkSubscription.unsubscribe();
    };
    HistonesScreen = __decorate([
        core_1.Component({
            selector: 'histones-summary',
            templateUrl: 'app/demo/view/histones.screen.html'
        }), 
        __metadata('design:paramtypes', [deepblue_1.DeepBlueService])
    ], HistonesScreen);
    return HistonesScreen;
}());
exports.HistonesScreen = HistonesScreen;
//# sourceMappingURL=histones.screen.js.map