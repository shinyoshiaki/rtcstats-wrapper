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
exports.SafariRTCStatsReport = void 0;
var base_js_1 = require("./base.js");
var constatnts_js_1 = require("../shared/constatnts.js");
/**
 * Wrapped RTCStatsReport class for Safari.
 *
 * @extends BaseRTCStatsReport
 */
var SafariRTCStatsReport = /** @class */ (function (_super) {
    __extends(SafariRTCStatsReport, _super);
    function SafariRTCStatsReport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafariRTCStatsReport.prototype._getRTCStatsReference = function (stats) {
        switch (stats.type) {
            case "track":
                if (stats.remoteSource && stats.hasOwnProperty("frameHeight")) {
                    return constatnts_js_1.RTCStatsReferences.RTCVideoReceivers.key;
                }
                else if (stats.remoteSource && stats.hasOwnProperty("audioLevel")) {
                    return constatnts_js_1.RTCStatsReferences.RTCAudioReceivers.key;
                }
                else if (stats.hasOwnProperty("frameHeight")) {
                    return constatnts_js_1.RTCStatsReferences.RTCVideoSenders.key;
                }
                else if (stats.hasOwnProperty("audioLevel")) {
                    return constatnts_js_1.RTCStatsReferences.RTCAudioSenders.key;
                }
                break;
            case "inbound-rtp":
                if (stats.mediaType === "video") {
                    return constatnts_js_1.RTCStatsReferences.RTCInboundRtpVideoStreams.key;
                }
                else if (stats.mediaType === "audio") {
                    return constatnts_js_1.RTCStatsReferences.RTCInboundRtpAudioStreams.key;
                }
                break;
            case "outbound-rtp":
                if (stats.mediaType === "video") {
                    return constatnts_js_1.RTCStatsReferences.RTCOutboundRtpVideoStreams.key;
                }
                else if (stats.mediaType === "audio") {
                    return constatnts_js_1.RTCStatsReferences.RTCOutboundRtpAudioStreams.key;
                }
                break;
        }
        return _super.prototype._getRTCStatsReference.call(this, stats);
    };
    return SafariRTCStatsReport;
}(base_js_1.BaseRTCStatsReport));
exports.SafariRTCStatsReport = SafariRTCStatsReport;
