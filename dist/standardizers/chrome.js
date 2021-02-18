"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromeRTCStatsReport = void 0;
var base_1 = require("./base");
var constatnts_1 = require("../shared/constatnts");
/**
 * Wrapped RTCStatsReport class for Google Chrome.
 *
 * @extends BaseRTCStatsReport
 */
var ChromeRTCStatsReport = /** @class */ (function (_super) {
    __extends(ChromeRTCStatsReport, _super);
    function ChromeRTCStatsReport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChromeRTCStatsReport.prototype._getRTCStatsReference = function (stats) {
        switch (stats.type) {
            case "track":
                if (stats.remoteSource && stats.kind === "video") {
                    return constatnts_1.RTCStatsReferences.RTCVideoReceivers.key;
                }
                else if (stats.remoteSource && stats.kind === "audio") {
                    return constatnts_1.RTCStatsReferences.RTCAudioReceivers.key;
                }
                else if (stats.kind === "video") {
                    return constatnts_1.RTCStatsReferences.RTCVideoSenders.key;
                }
                else if (stats.kind === "audio") {
                    return constatnts_1.RTCStatsReferences.RTCAudioSenders.key;
                }
        }
        return _super.prototype._getRTCStatsReference.call(this, stats);
    };
    return ChromeRTCStatsReport;
}(base_1.BaseRTCStatsReport));
exports.ChromeRTCStatsReport = ChromeRTCStatsReport;
