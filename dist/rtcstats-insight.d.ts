/// <reference types="node" />
import { EventEmitter } from "events";
/**
 * Enum for event references of RTCStatsInsight
 *
 * @readonly
 * @property {EnumItem} audio-rtt - RTT of sending audio.
 * @property {EnumItem} video-rtt - RTT of sending audio.
 * @property {EnumItem} audio-jitter - Jitter about sending audio.
 * @property {EnumItem} video-jitter - Jitter about sending video.
 * @property {EnumItem} audio-fractionLost - Packet loss rate of receiving audio stream.
 * @property {EnumItem} video-fractionLost - Packet loss rate of receiving video stream.
 * @property {EnumItem} audio-jitterBufferDelay - Local jitter buffer delay about receiving audio.
 * @property {EnumItem} video-jitterBufferDelay - Local jitter buffer delay about receiving video.
 * @property {EnumItem} rtt - Current RTT for ICE transport.
 * @example
 * import {
 *   RTCStatsInsightEvents,
 *   RTCStatsInsight
 * } from 'rtcstats-wrapper';
 *
 * const insight = new RTCStatsInsight(sender);
 *
 * insight.on(RTCStatsInsightEvents["audio-rtt"].key, event => {
 *   console.log(event.level);
 * });
 *
 * insight.watch()
 */
export declare const RTCStatsInsightEvents: any;
/**
 * Enum for levels of RTCStatsInsightEvents.
 *
 * @readonly
 * @property {EnumItem} stable - The call is stable.
 * @property {EnumItem} unstable - The call is unstable and may communicated in low quality.
 * @property {EnumItem} critical - Highly affected on call quality.
 * @property {EnumItem} unknown - This level is for unmonitored metrics.
 * @example
 * import {
 *   StatusLevels,
 *   RTCStatsInsightEvents,
 *   RTCStatsInsight
 * } from 'rtcstats-wrapper';
 *
 * const insight = new RTCStatsInsight(sender);
 *
 * insight.on(RTCStatsInsightEvents["audio-rtt"].key, event => {
 *   if (event.level === StatusLevels.stable.key) {
 *     console.log("Now back to stable!");
 *   }
 * });
 *
 * insight.watch()
 */
export declare const StatusLevels: any;
/**
 * EventEmitter class that polls getStats() to monitor connection status.
 *
 * @example
 * import {
 *   StatusLevels,
 *   RTCStatsInsightEvents,
 *   RTCStatsInsight
 * } from 'rtcstats-wrapper';
 *
 * const options = {
 *   interval: 3000,
 *   thresholds: {
 *     "audio-rtt": {
 *       unstable: 0.1
 *     },
 *     "audio-fractionLost": {
 *       unstable: 0.03,
 *       critical: 0.08,
 *     },
 *   },
 *   triggerCondition: {
 *     failCount: 2,
 *     within: 3
 *   }
 * }
 *
 * const insight = new RTCStatsInsight(sender, options);
 *
 * insight.on(RTCStatsInsightEvents["audio-rtt"].key, event => {
 *   if (event.level === StatusLevels.stable.key) {
 *     console.log("Now back to stable!");
 *   }
 * });
 *
 * insight.watch()
 */
export declare class RTCStatsInsight extends EventEmitter {
    _interval: any;
    _intervalID: any;
    _moment: any;
    _statsSrc: any;
    _status: any;
    _thresholds: any;
    /**
     * Create a RTCStatsInsight.
     *
     * @constructs
     * @param {RTCPeerConnection|RTCRtpReceiver|RTCRtpSender} statsSrc - getStats() method of this object is called in RTCStatsInsight.
     * @param {Object} options
     * @param {Number} options.interval - The polling interval in milliseconds. default 1000ms.
     * @param {Thresholds} options.thresholds - A set of thresholds for emitting each events.
     * @param {Object} options.triggerCondition - The trigger condition which defines how much failures makes this to fire an event. `${triggerCondition.failCount}` failures within `${triggerCondition.within}` attemption causes trigger of events.
     */
    constructor(statsSrc: any, options: any);
    /**
     * Start polling getStats().
     *
     * @fires RTCStatsInsight#audio-rtt
     * @fires RTCStatsInsight#video-rtt
     * @fires RTCStatsInsight#audio-jitter
     * @fires RTCStatsInsight#video-jitter
     * @fires RTCStatsInsight#audio-fractionLost
     * @fires RTCStatsInsight#video-fractionLost
     * @fires RTCStatsInsight#audio-jitterBufferDelay
     * @fires RTCStatsInsight#video-jitterBufferDelay
     * @fires RTCStatsInsight#rtt
     * @see {RTCStatsInsightEvents}
     */
    watch(): void;
    /**
     * Stop polling getStats().
     */
    stop(): void;
    get status(): any;
    _checkStatus(moment: any): void;
}
