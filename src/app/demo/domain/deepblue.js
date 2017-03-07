"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IdName = (function () {
    function IdName(id, name) {
        this.id = id;
        this.name = name;
    }
    return IdName;
}());
exports.IdName = IdName;
var IdNameCount = (function (_super) {
    __extends(IdNameCount, _super);
    function IdNameCount(data) {
        _super.call(this, data[0], data[1]);
        this.count = parseInt(data[2]);
    }
    return IdNameCount;
}(IdName));
exports.IdNameCount = IdNameCount;
var EpigeneticMark = (function (_super) {
    __extends(EpigeneticMark, _super);
    function EpigeneticMark(data) {
        _super.call(this, data[0], data[1]);
    }
    return EpigeneticMark;
}(IdName));
exports.EpigeneticMark = EpigeneticMark;
var Annotation = (function (_super) {
    __extends(Annotation, _super);
    function Annotation(data) {
        _super.call(this, data[0], data[1]);
    }
    return Annotation;
}(IdName));
exports.Annotation = Annotation;
var Experiment = (function (_super) {
    __extends(Experiment, _super);
    function Experiment(data) {
        _super.call(this, data[0], data[1]);
    }
    return Experiment;
}(IdName));
exports.Experiment = Experiment;
var Genome = (function (_super) {
    __extends(Genome, _super);
    function Genome(data) {
        _super.call(this, data[0], data[1]);
    }
    return Genome;
}(IdName));
exports.Genome = Genome;
//# sourceMappingURL=deepblue.js.map