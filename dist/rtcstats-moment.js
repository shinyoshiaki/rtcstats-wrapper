"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTCStatsMoment = void 0;
var standardize_support_js_1 = require("./standardize-support.js");
var constatnts_js_1 = require("./shared/constatnts.js");
function getVideoSenderStats(last, prev) {
    var stats = {};
    if (last.has(constatnts_js_1.RTCStatsReferences.RTCRemoteInboundRtpVideoStreams.key)) {
        // While we only support single-track stream, this method only care about 1 transceiver.
        var RTCRemoteInboundRtpVideoStreamStats = last.get(constatnts_js_1.RTCStatsReferences.RTCRemoteInboundRtpVideoStreams.key)[0];
        stats.jitter = RTCRemoteInboundRtpVideoStreamStats.jitter;
        stats.rtt = RTCRemoteInboundRtpVideoStreamStats.roundTripTime;
    }
    if (last.has(constatnts_js_1.RTCStatsReferences.RTCOutboundRtpVideoStreams.key) &&
        prev.has(constatnts_js_1.RTCStatsReferences.RTCOutboundRtpVideoStreams.key)) {
        // While we only support single-track stream, this method only care about 1 transceiver.
        var RTCOutboundRtpVideoStreamStats = last.get(constatnts_js_1.RTCStatsReferences.RTCOutboundRtpVideoStreams.key)[0];
        var previous = {
            RTCOutboundRtpVideoStreamStats: prev.get(constatnts_js_1.RTCStatsReferences.RTCOutboundRtpVideoStreams.key)[0]
        };
        // calculate averageEncodeTime
        if (RTCOutboundRtpVideoStreamStats.totalEncodeTime !== null &&
            RTCOutboundRtpVideoStreamStats.framesEncoded !== null) {
            var encodeTimeDelta = RTCOutboundRtpVideoStreamStats.totalEncodeTime -
                previous.RTCOutboundRtpVideoStreamStats.totalEncodeTime;
            var framesEncodedDelta = RTCOutboundRtpVideoStreamStats.framesEncoded -
                previous.RTCOutboundRtpVideoStreamStats.framesEncoded;
            stats.averageEncodeTime = encodeTimeDelta / framesEncodedDelta;
        }
        // calculate QP value
        if (RTCOutboundRtpVideoStreamStats.qpSum !== null &&
            RTCOutboundRtpVideoStreamStats.framesEncoded !== null) {
            var qpSumDelta = RTCOutboundRtpVideoStreamStats.qpSum -
                previous.RTCOutboundRtpVideoStreamStats.qpSum;
            var framesEncodedDelta = RTCOutboundRtpVideoStreamStats.framesEncoded -
                previous.RTCOutboundRtpVideoStreamStats.framesEncoded;
            stats.qpValue = qpSumDelta / framesEncodedDelta;
        }
        // calculate bitrate with previous value
        if (RTCOutboundRtpVideoStreamStats.bytesSent !== null) {
            var bytesSentDelta = RTCOutboundRtpVideoStreamStats.bytesSent -
                previous.RTCOutboundRtpVideoStreamStats.bytesSent;
            var timeDelta = RTCOutboundRtpVideoStreamStats.timestamp -
                previous.RTCOutboundRtpVideoStreamStats.timestamp;
            // convert bytes/ms to bit/sec
            var bytesPerMs = bytesSentDelta / timeDelta;
            stats.bitrate = bytesPerMs * 8 * 1000;
        }
    }
    return stats;
}
function getAudioSenderStats(last, prev) {
    var stats = {};
    if (last.has(constatnts_js_1.RTCStatsReferences.RTCAudioSenders.key)) {
        // While we only support single-track stream, this method only care about 1 transceiver.
        var RTCAudioSenderStats = last.get(constatnts_js_1.RTCStatsReferences.RTCAudioSenders.key)[0];
        stats.audioLevel = RTCAudioSenderStats.audioLevel;
    }
    if (last.has(constatnts_js_1.RTCStatsReferences.RTCRemoteInboundRtpAudioStreams.key)) {
        // While we only support single-track stream, this method only care about 1 transceiver.
        var RTCRemoteInboundRtpAudioStreamStats = last.get(constatnts_js_1.RTCStatsReferences.RTCRemoteInboundRtpAudioStreams.key)[0];
        stats.jitter = RTCRemoteInboundRtpAudioStreamStats.jitter;
        stats.rtt = RTCRemoteInboundRtpAudioStreamStats.roundTripTime;
    }
    if (last.has(constatnts_js_1.RTCStatsReferences.RTCOutboundRtpAudioStreams.key) &&
        prev.has(constatnts_js_1.RTCStatsReferences.RTCOutboundRtpAudioStreams.key)) {
        // While we only support single-track stream, this method only care about 1 transceiver.
        var RTCOutboundRtpAudioStreamStats = last.get(constatnts_js_1.RTCStatsReferences.RTCOutboundRtpAudioStreams.key)[0];
        var previous = {
            RTCOutboundRtpAudioStreamStats: prev.get(constatnts_js_1.RTCStatsReferences.RTCOutboundRtpAudioStreams.key)[0]
        };
        // calculate bitrate with previous value
        if (RTCOutboundRtpAudioStreamStats.bytesSent !== null) {
            var bytesSentDelta = RTCOutboundRtpAudioStreamStats.bytesSent -
                previous.RTCOutboundRtpAudioStreamStats.bytesSent;
            var timeDelta = RTCOutboundRtpAudioStreamStats.timestamp -
                previous.RTCOutboundRtpAudioStreamStats.timestamp;
            // convert bytes/ms to bit/sec
            var bytesPerMs = bytesSentDelta / timeDelta;
            stats.bitrate = bytesPerMs * 8 * 1000;
        }
    }
    return stats;
}
function getVideoReceiverStats(last, prev) {
    var stats = {};
    if (last.has(constatnts_js_1.RTCStatsReferences.RTCVideoReceivers.key) &&
        prev.has(constatnts_js_1.RTCStatsReferences.RTCVideoReceivers.key)) {
        // While we only support single-track stream, this method only care about 1 transceiver.
        var RTCVideoReceiverStats = last.get(constatnts_js_1.RTCStatsReferences.RTCVideoReceivers.key)[0];
        if (prev.has(constatnts_js_1.RTCStatsReferences.RTCVideoReceivers.key)) {
            var previous = {
                RTCVideoReceiverStats: prev.get(constatnts_js_1.RTCStatsReferences.RTCVideoReceivers.key)[0]
            };
            if (RTCVideoReceiverStats.jitterBufferDelay !== null &&
                RTCVideoReceiverStats.jitterBufferEmittedCount !== null) {
                var jitterBufferDelayDelta = RTCVideoReceiverStats.jitterBufferDelay -
                    previous.RTCVideoReceiverStats.jitterBufferDelay;
                var jBDEmittedDelta = RTCVideoReceiverStats.jitterBufferEmittedCount -
                    previous.RTCVideoReceiverStats.jitterBufferEmittedCount;
                stats.jitterBufferDelay = jitterBufferDelayDelta / jBDEmittedDelta;
            }
        }
    }
    if (last.has(constatnts_js_1.RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
        // While we only support single-track stream, this method only care about 1 transceiver.
        var RTCInboundRtpVideoStreamStats = last.get(constatnts_js_1.RTCStatsReferences.RTCInboundRtpVideoStreams.key)[0];
        // calculate fractionLost
        if (RTCInboundRtpVideoStreamStats.packetsLost !== null &&
            RTCInboundRtpVideoStreamStats.packetsReceived !== null) {
            stats.fractionLost =
                RTCInboundRtpVideoStreamStats.packetsLost /
                    RTCInboundRtpVideoStreamStats.packetsReceived;
        }
        if (prev.has(constatnts_js_1.RTCStatsReferences.RTCInboundRtpVideoStreams.key)) {
            var previous = {
                RTCInboundRtpVideoStreamStats: prev.get(constatnts_js_1.RTCStatsReferences.RTCInboundRtpVideoStreams.key)[0]
            };
            // calculate QP value
            if (RTCInboundRtpVideoStreamStats.qpSum !== null &&
                RTCInboundRtpVideoStreamStats.framesDecoded !== null) {
                var qpSumDelta = RTCInboundRtpVideoStreamStats.qpSum -
                    previous.RTCInboundRtpVideoStreamStats.qpSum;
                var framesDecodedDelta = RTCInboundRtpVideoStreamStats.framesDecoded -
                    previous.RTCInboundRtpVideoStreamStats.framesDecoded;
                stats.qpValue = qpSumDelta / framesDecodedDelta;
            }
            // calculate bitrate with previous value
            if (RTCInboundRtpVideoStreamStats.bytesReceived !== null) {
                var bytesReceivedDelta = RTCInboundRtpVideoStreamStats.bytesReceived -
                    previous.RTCInboundRtpVideoStreamStats.bytesReceived;
                var timeDelta = RTCInboundRtpVideoStreamStats.timestamp -
                    previous.RTCInboundRtpVideoStreamStats.timestamp;
                // convert bytes/ms to bit/sec
                var bytestPerMs = bytesReceivedDelta / timeDelta;
                stats.bitrate = bytestPerMs * 8 * 1000;
            }
        }
    }
    return stats;
}
function getAudioReceiverStats(last, prev) {
    var stats = {};
    if (last.has(constatnts_js_1.RTCStatsReferences.RTCAudioReceivers.key)) {
        // While we only support single-track stream, this method only care about 1 transceiver.
        var RTCAudioReceiverStats = last.get(constatnts_js_1.RTCStatsReferences.RTCAudioReceivers.key)[0];
        stats.audioLevel = RTCAudioReceiverStats.audioLevel;
        if (prev.has(constatnts_js_1.RTCStatsReferences.RTCAudioReceivers.key)) {
            // While we only support single-track stream, this method only care about 1 transceiver.
            var RTCAudioReceiverStats_1 = last.get(constatnts_js_1.RTCStatsReferences.RTCAudioReceivers.key)[0];
            if (prev.has(constatnts_js_1.RTCStatsReferences.RTCAudioReceivers.key)) {
                var previous = {
                    RTCAudioReceiverStats: prev.get(constatnts_js_1.RTCStatsReferences.RTCAudioReceivers.key)[0]
                };
                if (RTCAudioReceiverStats_1.jitterBufferDelay !== null &&
                    RTCAudioReceiverStats_1.jitterBufferEmittedCount !== null) {
                    var jitterBufferDelayDelta = RTCAudioReceiverStats_1.jitterBufferDelay -
                        previous.RTCAudioReceiverStats.jitterBufferDelay;
                    var jBDEmittedDelta = RTCAudioReceiverStats_1.jitterBufferEmittedCount -
                        previous.RTCAudioReceiverStats.jitterBufferEmittedCount;
                    stats.jitterBufferDelay = jitterBufferDelayDelta / jBDEmittedDelta;
                }
            }
        }
    }
    if (last.has(constatnts_js_1.RTCStatsReferences.RTCInboundRtpAudioStreams.key)) {
        // While we only support single-track stream, this method only care about 1 transceiver.
        var RTCInboundRtpAudioStreamStats = last.get(constatnts_js_1.RTCStatsReferences.RTCInboundRtpAudioStreams.key)[0];
        // calculate fractionLost
        if (RTCInboundRtpAudioStreamStats.packetsLost !== null &&
            RTCInboundRtpAudioStreamStats.packetsReceived !== null) {
            stats.fractionLost =
                RTCInboundRtpAudioStreamStats.packetsLost /
                    RTCInboundRtpAudioStreamStats.packetsReceived;
        }
        if (prev.has(constatnts_js_1.RTCStatsReferences.RTCInboundRtpAudioStreams.key)) {
            var previous = {
                RTCInboundRtpAudioStreamStats: prev.get(constatnts_js_1.RTCStatsReferences.RTCInboundRtpAudioStreams.key)[0]
            };
            // calculate bitrate with previous value
            if (RTCInboundRtpAudioStreamStats.bytesReceived !== null) {
                var bytesReceivedDelta = RTCInboundRtpAudioStreamStats.bytesReceived -
                    previous.RTCInboundRtpAudioStreamStats.bytesReceived;
                var timeDelta = RTCInboundRtpAudioStreamStats.timestamp -
                    previous.RTCInboundRtpAudioStreamStats.timestamp;
                // convert bytes/ms to bit/sec
                var bytestPerMs = bytesReceivedDelta / timeDelta;
                stats.bitrate = bytestPerMs * 8 * 1000;
            }
        }
    }
    return stats;
}
function getCandidatePairStats(last, prev) {
    var stats = {};
    if (last.has(constatnts_js_1.RTCStatsReferences.RTCIceCandidatePairs.key) &&
        last
            .get(constatnts_js_1.RTCStatsReferences.RTCIceCandidatePairs.key)
            .some(function (stat) { return stat.nominated; })) {
        var RTCIceCandidatePairStats = last
            .get(constatnts_js_1.RTCStatsReferences.RTCIceCandidatePairs.key)
            .find(function (stat) { return stat.nominated; });
        // assign rtt directly
        stats.rtt = RTCIceCandidatePairStats.currentRoundTripTime;
        // check if previous stats also has nominated candidate-pair
        if (prev.has(constatnts_js_1.RTCStatsReferences.RTCIceCandidatePairs.key) &&
            prev
                .get(constatnts_js_1.RTCStatsReferences.RTCIceCandidatePairs.key)
                .some(function (stat) { return stat.nominated; })) {
            var previous = {
                RTCIceCandidatePairStats: prev
                    .get(constatnts_js_1.RTCStatsReferences.RTCIceCandidatePairs.key)
                    .find(function (stat) { return stat.nominated; })
            };
            // calculate sending bitrate with previous value
            if (RTCIceCandidatePairStats.bytesSent !== null) {
                var bytesSentDelta = RTCIceCandidatePairStats.bytesSent -
                    previous.RTCIceCandidatePairStats.bytesSent;
                var timeDelta = RTCIceCandidatePairStats.timestamp -
                    previous.RTCIceCandidatePairStats.timestamp;
                // convert bytes/ms to bit/sec
                var bytestPerMs = bytesSentDelta / timeDelta;
                stats.upstreamBitrate = bytestPerMs * 8 * 1000;
            }
            // calculate receiving bitrate with previous value
            if (RTCIceCandidatePairStats.bytesReceived !== null) {
                var bytesReceivedDelta = RTCIceCandidatePairStats.bytesReceived -
                    previous.RTCIceCandidatePairStats.bytesReceived;
                var timeDelta = RTCIceCandidatePairStats.timestamp -
                    previous.RTCIceCandidatePairStats.timestamp;
                // convert bytes/ms to bit/sec
                var bytestPerMs = bytesReceivedDelta / timeDelta;
                stats.downstreamBitrate = bytestPerMs * 8 * 1000;
            }
        }
    }
    return stats;
}
/**
 * @typedef MomentaryReport
 * @property {Number} send.video.jitter - A jitter in seconds given in RR.
 * @property {Number} send.video.rtt - An rtt in seconds given in RR.
 * @property {Number} send.video.averageEncodeTime - Estimated average encode time in milliseconds.
 * @property {Number} send.video.qpValue - Estimated QP(quantize parameter) value.
 * @property {Number} send.video.bitrate - Estimated bit/sec about sending video.
 * @property {Number} send.audio.jitter - A jitter in seconds given in RR.
 * @property {Number} send.audio.rtt - An rtt in seconds given in RR.
 * @property {Number} send.audio.bitrate - Estimated bit/sec about sending audio.
 * @property {Number} receive.video.jitterBufferDelay - Estimated delay from jitter buffer, measured in seconds.
 * @property {Number} receive.video.fractionLost - Estimated Rate of packet loss.
 * @property {Number} receive.video.qpValue - Estimated QP(quantize parameter) value.
 * @property {Number} receive.video.bitrate - Estimated bit/sec about receiving video.
 * @property {Number} receive.audio.audioLevel - The audio level of the receiving track.
 * @property {Number} receive.audio.jitterBufferDelay - Estimated delay from jitter buffer, measured in seconds.
 * @property {Number} receive.audio.fractionLost - Estimated Rate of packet loss.
 * @property {Number} receive.audio.bitrate - Estimated bit/sec about receiving audio.
 * @property {Number} candidatePair.rtt - An round-trip time in seconds computed from STUN connectivity checks.
 * @property {Number} candidatePair.downstreamBitrate - Estimated bit/sec about receiving data.
 * @property {Number} candidatePair.upstreamBitrate - Estimated bit/sec about sending data.
 * @example
 * {
 *   send: {
 *     video: {
 *       jitter: 0.008,
 *       rtt: 0.002,
 *       averageEncodeTime: 0.0026,
 *       qpValue: 5.5,
 *       bitrate: 550092.0485312309
 *     },
 *     audio: {
 *       jitter: 0.0078,
 *       rtt: 0.001,
 *       bitrate: 37708.31230270733
 *     }
 *   },
 *   receive: {
 *     video: {
 *       jitterBufferDelay: 0.12,
 *       fractionLost: 0,
 *       qpValue: 19.8,
 *       bitrate: 814766.8777838446
 *     },
 *     audio: {
 *       audioLevel: 0.0096,
 *       jitterBufferDelay: 0.11183673469387359,
 *       fractionLost: 0,
 *       bitrate: 37136.608229785656
 *     }
 *   },
 *   candidatePair: {
 *     rtt: 0.002,
 *     upstreamBitrate: 606239.8302281727,
 *     downstreamBitrate: 872903.5454809506
 *   }
 * }
 */
/**
 * Class to get the momentary metrics based on the RTCStats.
 *
 * @see example application {@link https://github.com/skyway-lab/connection-status-viewer-example}
 * @example
 * import { RTCStatsMoment } from 'rtcstats-wrapper';
 *
 * const moment = new RTCStatsMoment();
 *
 * const report = await pc.getStats();
 * moment.update(report);
 * moment.report();
 * //=> {
 * //    "send": {
 * //        "video": { ... },
 * //        "audio": { ... },
 * //    },
 * //    "receive": {
 * //        "video": { ... },
 * //        "audio": { ... },
 * //    },
 * //    "candidatePair": { ... }
 * //}
 */
var RTCStatsMoment = /** @class */ (function () {
    /**
     * Create a RTCStatsMoment.
     *
     * @constructs
     */
    function RTCStatsMoment() {
        this.standardizer = standardize_support_js_1.getStandardizer();
        this._report = {
            prev: new Map(),
            last: new Map()
        };
    }
    /**
     * Update the report.
     *
     * @param {RTCStatsReport} report - original stats report from `(pc|sender|receiver).getStats()`.
     * @example
     * import { RTCStatsMoment } from 'rtcstats-wrapper';
     *
     * const moment = new RTCStatsMoment();
     *
     * const id = setInterval(() => {
     *   const report = await pc.getStats();
     *   moment.update(report);
     * }, INTERVAL);
     */
    RTCStatsMoment.prototype.update = function (report) {
        this._report.prev = this._report.last;
        this._report.last = new this.standardizer(report);
    };
    /**
     * Calculate the momentary value based on the updated value.
     * MomentaryReport does not have attribute that can not be obtained.
     *
     * @return {MomentaryReport}
     * @example
     * import { RTCStatsMoment } from 'rtcstats-wrapper';
     *
     * const moment = new RTCStatsMoment();
     *
     * const receiver = pc.getReceivers().find(sender => sender.kind === "video");
     * const report = receiver.getStats();
     * moment.update(report);
     * moment.report();
     * //=> {
     * //    "send": {
     * //        "video": { ... },
     * //    }
     * //}
     */
    RTCStatsMoment.prototype.report = function () {
        var _a = this._report, last = _a.last, prev = _a.prev;
        return {
            send: {
                video: getVideoSenderStats(last, prev),
                audio: getAudioSenderStats(last, prev)
            },
            receive: {
                video: getVideoReceiverStats(last, prev),
                audio: getAudioReceiverStats(last, prev)
            },
            candidatePair: getCandidatePairStats(last, prev)
        };
    };
    return RTCStatsMoment;
}());
exports.RTCStatsMoment = RTCStatsMoment;
