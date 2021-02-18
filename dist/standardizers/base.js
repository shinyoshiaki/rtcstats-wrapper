"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRTCStatsReport = void 0;
var constatnts_1 = require("../shared/constatnts");
/**
 * Base class of browser-independent RTCStatsReport.
 * This class provides to get an array of specific type of RTCStats with {@link RTCStatsReferences}.
 * See the example below.
 *
 * @throws - When given stats has undefined type or kind.
 * @example
 * import {
 *   BaseRTCStatsReport,
 *   RTCStatsReferences
 * } from 'rtcstats-wrapper';
 *
 * const report = new BaseRTCStatsReport(await pc.getStats());
 *
 * // get stats of incoming RTP stream
 * const recvVideoStats = report.get(RTCStatsReferences.RTCInboundRtpVideoStreams.key);
 * // get each log of inbound-rtp
 * for (const stats of recvVideoStats) {
 *   logger.info(`ts:${stats.timestamp} id:${stats.trackId} recv:${stats.bytesReceived}`);
 * }
 */
var BaseRTCStatsReport = /** @class */ (function () {
    /**
     * Create a BaseRTCStatsReport.
     *
     * @constructs
     * @param {RTCStatsReport} originalReport - original stats report from `(pc|sender|receiver).getStats()`.
     */
    function BaseRTCStatsReport(originalReport) {
        var report = new Map();
        for (var _i = 0, _a = originalReport.values(); _i < _a.length; _i++) {
            var originalStats = _a[_i];
            var ref = this._getRTCStatsReference(originalStats);
            var stats = {};
            // get the preferred value from original stats.
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            for (var _b = 0, _c = constatnts_1.RTCStatsReferenceMap.get(ref); _b < _c.length; _b++) {
                var attr = _c[_b];
                if (originalStats[attr] !== undefined) {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    stats[attr] = originalStats[attr];
                }
            }
            // update the stats object
            if (report.has(ref)) {
                var statsArray = report.get(ref);
                statsArray.push(stats);
                report.set(ref, statsArray);
            }
            else {
                report.set(ref, [stats]);
            }
        }
        this._report = report;
    }
    /**
     * Get the array of type of stats referred by `key`.
     *
     * @param {string} key - A stats object reference defined in {@link RTCStatsReferences} enum.
     * @return {Array<RTCStats>} An array of stats referred by `key`.
     * @example
     * const report = new BaseRTCStatsReport(await pc.getStats());
     *
     * if (report.get(RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
     * const stats = report.get(
     *   RTCStatsReferences.RTCInboundRtpVideoStreams.key
     * )[0];
     * logger.info(`ts:${stats.timestamp} id:${stats.trackId} recv:${stats.bytesReceived}`);
     */
    BaseRTCStatsReport.prototype.get = function (key) {
        return this._report.get(key);
    };
    /**
     * Check if the instance has the type of stats referred by `key`.
     *
     * @param {string} key - A stats object reference defined in {@link RTCStatsReferences} enum.
     * @return {bool} True if the referred stats exists.
     * @example
     * const report = new BaseRTCStatsReport(await pc.getStats());
     *
     * if (report.has(RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
     *   logger.info("receiving video.");
     * } else {
     *   logger.info("no video streams receiving.");
     * }
     */
    BaseRTCStatsReport.prototype.has = function (key) {
        return this._report.has(key);
    };
    BaseRTCStatsReport.prototype._getRTCStatsReference = function (stats) {
        switch (stats.type) {
            case "codec":
                return constatnts_1.RTCStatsReferences.RTCCodecs.key;
            case "inbound-rtp":
                if (stats.kind === "video") {
                    return constatnts_1.RTCStatsReferences.RTCInboundRtpVideoStreams.key;
                }
                else if (stats.kind === "audio") {
                    return constatnts_1.RTCStatsReferences.RTCInboundRtpAudioStreams.key;
                }
                break;
            case "outbound-rtp":
                if (stats.kind === "video") {
                    return constatnts_1.RTCStatsReferences.RTCOutboundRtpVideoStreams.key;
                }
                else if (stats.kind === "audio") {
                    return constatnts_1.RTCStatsReferences.RTCOutboundRtpAudioStreams.key;
                }
                break;
            case "remote-inbound-rtp":
                if (stats.kind === "video") {
                    return constatnts_1.RTCStatsReferences.RTCRemoteInboundRtpVideoStreams.key;
                }
                else if (stats.kind === "audio") {
                    return constatnts_1.RTCStatsReferences.RTCRemoteInboundRtpAudioStreams.key;
                }
                break;
            case "remote-outbound-rtp":
                if (stats.kind === "video") {
                    return constatnts_1.RTCStatsReferences.RTCRemoteOutboundRtpVideoStreams.key;
                }
                else if (stats.kind === "audio") {
                    return constatnts_1.RTCStatsReferences.RTCRemoteOutboundRtpAudioStreams.key;
                }
                break;
            case "media-source":
                if (stats.kind === "video") {
                    return constatnts_1.RTCStatsReferences.RTCVideoSources.key;
                }
                else if (stats.kind === "audio") {
                    return constatnts_1.RTCStatsReferences.RTCAudioSources.key;
                }
                break;
            case "csrc":
                return constatnts_1.RTCStatsReferences.RTCRtpContributingSources.key;
            case "peer-connection":
                return constatnts_1.RTCStatsReferences.RTCPeerConnection.key;
            case "data-channel":
                return constatnts_1.RTCStatsReferences.RTCDataChannels.key;
            case "stream":
                return constatnts_1.RTCStatsReferences.RTCMediaStreams.key;
            case "sender":
                if (stats.kind === "video") {
                    return constatnts_1.RTCStatsReferences.RTCVideoSenders.key;
                }
                else if (stats.kind === "audio") {
                    return constatnts_1.RTCStatsReferences.RTCAudioSenders.key;
                }
                break;
            case "receiver":
                if (stats.kind === "video") {
                    return constatnts_1.RTCStatsReferences.RTCVideoReceivers.key;
                }
                else if (stats.kind === "audio") {
                    return constatnts_1.RTCStatsReferences.RTCAudioReceivers.key;
                }
                break;
            case "transport":
                return constatnts_1.RTCStatsReferences.RTCTransports.key;
            case "candidate-pair":
                return constatnts_1.RTCStatsReferences.RTCIceCandidatePairs.key;
            case "local-candidate":
                return constatnts_1.RTCStatsReferences.RTCLocalIceCandidates.key;
            case "remote-candidate":
                return constatnts_1.RTCStatsReferences.RTCRemoteIceCandidates.key;
            case "certificate":
                return constatnts_1.RTCStatsReferences.RTCCertificates.key;
            case "stunserverconnection":
                return constatnts_1.RTCStatsReferences.RTCStunServerConnections.key;
            default:
                throw new Error("Received an unknown stats-type string: " + stats.type + ".");
        }
        throw new Error("Received an unknown kind of " + stats.type + ": " + stats.kind + ".");
    };
    return BaseRTCStatsReport;
}());
exports.BaseRTCStatsReport = BaseRTCStatsReport;
