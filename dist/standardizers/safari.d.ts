import { BaseRTCStatsReport } from "./base";
/**
 * Wrapped RTCStatsReport class for Safari.
 *
 * @extends BaseRTCStatsReport
 */
export declare class SafariRTCStatsReport extends BaseRTCStatsReport {
    _getRTCStatsReference(stats: any): any;
}
