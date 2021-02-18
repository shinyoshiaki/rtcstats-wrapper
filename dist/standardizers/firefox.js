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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirefoxRTCStatsReport = void 0;
var base_1 = require("./base");
var constatnts_1 = require("../shared/constatnts");
/**
 * Get "<in|out>bound-rtp" stats since Firefox under v69 does not use stats-type
 * "track" but "<in|out>bound-rtp" stats includes the values that can be
 * considered as "track".
 *
 * @private
 */
function getTrackStatsOfFirefox(stats) {
    switch (stats.type) {
        case "inbound-rtp":
            if (stats.kind === "video") {
                return constatnts_1.RTCStatsReferences.RTCVideoReceivers.key;
            }
            else if (stats.kind === "audio") {
                return constatnts_1.RTCStatsReferences.RTCAudioReceivers.key;
            }
            break;
        case "outbound-rtp":
            if (stats.kind === "video") {
                return constatnts_1.RTCStatsReferences.RTCVideoSenders.key;
            }
            else if (stats.kind === "audio") {
                return constatnts_1.RTCStatsReferences.RTCAudioSenders.key;
            }
            break;
        default:
            throw new Error("Received an unknown stats-type string: " + stats.type + ".");
    }
}
/**
 * Wrapped RTCStatsReport class for Firefox.
 *
 * @extends BaseRTCStatsReport
 */
var FirefoxRTCStatsReport = /** @class */ (function (_super) {
    __extends(FirefoxRTCStatsReport, _super);
    function FirefoxRTCStatsReport(originalReport) {
        var _this = _super.call(this, originalReport) || this;
        // retrieve receiver/sender stats
        var statsRefs = __spreadArrays(originalReport.keys());
        var rtpRefs = statsRefs.filter(function (ref) { return /(in|out)bound_rtp_.*/.test(ref); });
        for (var _i = 0, rtpRefs_1 = rtpRefs; _i < rtpRefs_1.length; _i++) {
            var originalRef = rtpRefs_1[_i];
            var originalStats = originalReport.get(originalRef);
            var ref = getTrackStatsOfFirefox(originalStats);
            var stats = {};
            // get the preferred value from original stats.
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            for (var _a = 0, _b = constatnts_1.RTCStatsReferenceMap.get(ref); _a < _b.length; _a++) {
                var attr = _b[_a];
                if (originalStats[attr] !== undefined) {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    stats[attr] = originalStats[attr];
                }
            }
            // update the stats object
            if (_this._report.has(ref)) {
                var statsArray = _this._report.get(ref);
                statsArray.push(stats);
                _this._report.set(ref, statsArray);
            }
            else {
                _this._report.set(ref, [stats]);
            }
        }
        return _this;
    }
    return FirefoxRTCStatsReport;
}(base_1.BaseRTCStatsReport));
exports.FirefoxRTCStatsReport = FirefoxRTCStatsReport;
