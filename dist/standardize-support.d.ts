import { BaseRTCStatsReport } from "./standardizers/base.js";
export declare function getStandardizer(): typeof BaseRTCStatsReport;
/**
 * A function that ditects the browser and returns an instance of this library's
 * standardized RTCStatsReport.
 *
 * @param {RTCStatsReport} report - original stats report from `(pc|sender|receiver).getStats()`.
 * @return {RTCStatsReport} A standardized RTCStatsReport. See example to get how to use.
 * @example
 * import {
 *   standardizeReport,
 *   RTCStatsReferences
 * } from 'rtcstats-wrapper';
 *
 * const report = standardizeReport(await pc.getStats());
 * const receiverStats = report.get(RTCStatsReferences.RTCVideoReceivers.key);
 * const framesDecoded = receiverStats[0].framesDecoded;
 */
export declare function standardizeReport(report: any): BaseRTCStatsReport;
