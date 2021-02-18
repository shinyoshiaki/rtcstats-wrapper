import { BaseRTCStatsReport } from "./base.js";
/**
 * Wrapped RTCStatsReport class for Google Chrome.
 *
 * @extends BaseRTCStatsReport
 */
export declare class ChromeRTCStatsReport extends BaseRTCStatsReport {
    _getRTCStatsReference(stats: any): any;
}
