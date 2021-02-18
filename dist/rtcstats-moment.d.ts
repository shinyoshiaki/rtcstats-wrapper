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
export declare class RTCStatsMoment {
    _report: any;
    standardizer: any;
    /**
     * Create a RTCStatsMoment.
     *
     * @constructs
     */
    constructor();
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
    update(report: any): void;
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
    report(): {
        send: {
            video: {};
            audio: {};
        };
        receive: {
            video: {};
            audio: {};
        };
        candidatePair: {};
    };
}
