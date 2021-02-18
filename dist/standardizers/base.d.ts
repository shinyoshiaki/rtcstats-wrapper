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
export declare class BaseRTCStatsReport {
    _report: any;
    /**
     * Create a BaseRTCStatsReport.
     *
     * @constructs
     * @param {RTCStatsReport} originalReport - original stats report from `(pc|sender|receiver).getStats()`.
     */
    constructor(originalReport: any);
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
    get(key: any): any;
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
    has(key: any): any;
    _getRTCStatsReference(stats: any): any;
}
