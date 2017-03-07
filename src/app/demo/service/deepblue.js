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
var http_1 = require('@angular/http');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var deepblue_1 = require('../domain/deepblue');
var SelectedData = (function () {
    function SelectedData(idName, query_id) {
        this.idName = idName;
        this.query_id = query_id;
    }
    return SelectedData;
}());
exports.SelectedData = SelectedData;
var DataStack = (function () {
    function DataStack() {
        this._data = [];
    }
    DataStack.prototype.insert = function (data) {
        this._data.push(data);
    };
    DataStack.prototype.remove = function (data) {
        // TODO :)
    };
    DataStack.prototype.getData = function () {
        return this._data;
    };
    return DataStack;
}());
exports.DataStack = DataStack;
var DeepBlueService = (function () {
    // 
    function DeepBlueService(http) {
        this.http = http;
        this.deepBlueUrl = 'api';
        // Observable string sources
        this.genomeSource = new BehaviorSubject_1.BehaviorSubject({ id: "-", name: "-", extra_metadata: null });
        this.annotationSource = new BehaviorSubject_1.BehaviorSubject({ id: "-", name: "-", extra_metadata: null });
        this.epigeneticMarkSource = new BehaviorSubject_1.BehaviorSubject({ id: "-", name: "-", extra_metadata: null });
        this.totalSelectedRegtions = 0;
        // Observable string streams
        this.genomeValue$ = this.genomeSource.asObservable();
        this.annotationValue$ = this.annotationSource.asObservable();
        this.epigeneticMarkValue$ = this.epigeneticMarkSource.asObservable();
        this.dataStack = new DataStack();
    }
    DeepBlueService.prototype.getDataStack = function () {
        return this.dataStack;
    };
    DeepBlueService.prototype.getTotalSelectedRegtions = function () {
        return this.totalSelectedRegtions;
    };
    // Service messages
    DeepBlueService.prototype.setGenome = function (genome) {
        this.genomeSource.next(genome);
    };
    DeepBlueService.prototype.setAnnotation = function (annotation) {
        var _this = this;
        this.annotationSource.next(annotation);
        this.selectAnnotation(annotation).subscribe(function (ann_query_id) {
            _this.cacheQuery(ann_query_id).subscribe(function (query_id) {
                var sd = new SelectedData(annotation, query_id);
                _this.dataStack.insert(sd);
                _this.countRegionsRequest(query_id).subscribe(function (total) {
                    return _this.totalSelectedRegtions = total["count"];
                });
            });
        });
    };
    DeepBlueService.prototype.setEpigeneticMark = function (epigeneticMark) {
        this.epigeneticMarkSource.next(epigeneticMark);
    };
    DeepBlueService.prototype.getGenome = function () {
        return this.genomeSource.getValue();
    };
    DeepBlueService.prototype.getAnnotation = function () {
        return this.annotationSource.getValue();
    };
    DeepBlueService.prototype.getEpigeneticMark = function () {
        return this.epigeneticMarkSource.getValue();
    };
    // Functions to select data from the Server
    DeepBlueService.prototype.getHistones = function () {
        if (!this.getGenome()) {
            return Observable_1.Observable.empty();
        }
        var params = new http_1.URLSearchParams();
        params.set('genome', this.getGenome().name);
        params.set('controlled_vocabulary', "epigenetic_marks");
        params.set('type', "peaks");
        return this.http.get(this.deepBlueUrl + "/collection_experiments_count", { "search": params })
            .map(this.extractHistone)
            .catch(this.handleError);
    };
    DeepBlueService.prototype.extractHistone = function (res) {
        var body = res.json();
        var data = body[1] || [];
        var regexp = new RegExp("h([134]|2[ab])([a-z])([0-9]+)(.*)");
        data = data.filter(function (em) {
            // em[1] is where the name is
            return regexp.test(em[1].toLowerCase());
        }).sort(function (em1, em2) {
            return em1[1].localeCompare(em2[1]);
        });
        ;
        return data.map(function (value) {
            return (new deepblue_1.EpigeneticMark(value));
        });
    };
    DeepBlueService.prototype.getGenomes = function () {
        return this.http.get(this.deepBlueUrl + "/list_genomes")
            .map(this.extractGenomes)
            .catch(this.handleError);
    };
    DeepBlueService.prototype.extractGenomes = function (res) {
        var body = res.json();
        var data = body[1] || [];
        return data.map(function (value) {
            return new deepblue_1.Genome(value);
        });
    };
    DeepBlueService.prototype.getAnnotations = function (genome) {
        if (!genome) {
            return Observable_1.Observable.empty();
        }
        var params = new http_1.URLSearchParams();
        params.set('genome', genome.name);
        return this.http.get(this.deepBlueUrl + "/list_annotations", { "search": params })
            .map(this.extractAnnotation)
            .catch(this.handleError);
    };
    DeepBlueService.prototype.extractAnnotation = function (res) {
        var body = res.json();
        var data = body[1] || [];
        return data.map(function (value) {
            return new deepblue_1.Annotation(value);
        });
    };
    DeepBlueService.prototype.getExperiments = function (genome, epigenetic_mark) {
        if (!genome) {
            return Observable_1.Observable.empty();
        }
        if (!epigenetic_mark) {
            return Observable_1.Observable.empty();
        }
        var params = new http_1.URLSearchParams();
        params.set('genome', genome.name);
        params.set('type', "peaks");
        params.set('epigenetic_mark', epigenetic_mark.name);
        return this.http.get(this.deepBlueUrl + "/list_experiments", { "search": params })
            .map(function (res) {
            var body = res.json();
            var data = body[1] || [];
            return data.map(function (value) {
                return new deepblue_1.Experiment(value);
            });
        })
            .catch(this.handleError);
    };
    DeepBlueService.prototype.selectAnnotation = function (annotation) {
        if (!annotation) {
            return Observable_1.Observable.empty();
        }
        var params = new http_1.URLSearchParams();
        params.set("annotation_name", annotation.name);
        params.set("genome", this.getGenome().name);
        return this.http.get(this.deepBlueUrl + "/select_annotations", { "search": params })
            .map(this.extractId)
            .catch(this.handleError);
    };
    DeepBlueService.prototype.selectExperiment = function (experiment) {
        if (!experiment) {
            return Observable_1.Observable.empty();
        }
        var params = new http_1.URLSearchParams();
        params.set("experiment_name", experiment.name);
        params.set("genome", this.getGenome().name);
        return this.http.get(this.deepBlueUrl + "/select_experiments", { "search": params })
            .map(this.extractId)
            .catch(this.handleError);
    };
    DeepBlueService.prototype.selectMultipleExperiments = function (experiments) {
        var _this = this;
        var observableBatch = [];
        experiments.forEach(function (experiment, key) {
            observableBatch.push(_this.selectExperiment(experiment));
        });
        return Observable_1.Observable.forkJoin(observableBatch);
    };
    DeepBlueService.prototype.overlapWithSelected = function (query_ids) {
        var _this = this;
        var observableBatch = [];
        query_ids.forEach(function (id, key) {
            var params = new http_1.URLSearchParams();
            params.set("query_data_id", query_id);
            params.set("query_filter_id", "true");
            Observable_1.Observable < string > ;
            _this.http.get(_this.deepBlueUrl + "/intersection", { "search": params })
                .map(_this.extractId)
                .catch(_this.handleError);
            observableBatch.push();
        });
        return Observable_1.Observable.forkJoin(observableBatch);
    };
    DeepBlueService.prototype.cacheQuery = function (query_id) {
        if (!query_id) {
            return Observable_1.Observable.empty();
        }
        var params = new http_1.URLSearchParams();
        params.set("query_id", query_id);
        params.set("cache", "true");
        return this.http.get(this.deepBlueUrl + "/query_cache", { "search": params })
            .map(this.extractId)
            .catch(this.handleError);
    };
    DeepBlueService.prototype.getResult = function (request_id) {
        var params = new http_1.URLSearchParams();
        params.set("request_id", request_id);
        var pollSubject = new Subject_1.Subject();
        var pollData = this.http.get(this.deepBlueUrl + "/get_request_data", { "search": params })
            .map(function (res) {
            var body = res.json();
            var status = body[0] || "error";
            if (status == "okay") {
                expand.unsubscribe();
                pollSubject.next(body[1]);
            }
        });
        var expand = pollData.expand(function () { return Observable_1.Observable.timer(500).concatMap(function () { return pollData; }); }).subscribe();
        return pollSubject.asObservable();
    };
    DeepBlueService.prototype.countRegionsRequest = function (query_id) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set("query_id", query_id);
        var request = this.http.get(this.deepBlueUrl + "/count_regions", { "search": params })
            .map(this.extractId)
            .flatMap(function (request_id) {
            return _this.getResult(request_id);
        });
        return request;
    };
    DeepBlueService.prototype.extractId = function (res) {
        var body = res.json();
        return body[1] || "";
    };
    DeepBlueService.prototype.getInfos = function (ids) {
        var params = new http_1.URLSearchParams();
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            params.append('id', id);
        }
        return this.http.get(this.deepBlueUrl + "/info", { "search": params })
            .map(this.extractExperiment)
            .catch(this.handleError);
    };
    DeepBlueService.prototype.extractExperiment = function (res) {
        var body = res.json();
        var data = body[1] || [];
        return data;
    };
    DeepBlueService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = err.status + " - " + (err.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    DeepBlueService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DeepBlueService);
    return DeepBlueService;
}());
exports.DeepBlueService = DeepBlueService;
//# sourceMappingURL=deepblue.js.map