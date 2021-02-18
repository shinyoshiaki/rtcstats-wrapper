import { BaseRTCStatsReport } from "./base";
import { RTCStatsReferences } from "../shared/constatnts";

/**
 * Wrapped RTCStatsReport class for Google Chrome.
 *
 * @extends BaseRTCStatsReport
 */
export class ChromeRTCStatsReport extends BaseRTCStatsReport {
  _getRTCStatsReference(stats: any) {
    switch (stats.type) {
      case "track":
        if (stats.remoteSource && stats.kind === "video") {
          return RTCStatsReferences.RTCVideoReceivers.key;
        } else if (stats.remoteSource && stats.kind === "audio") {
          return RTCStatsReferences.RTCAudioReceivers.key;
        } else if (stats.kind === "video") {
          return RTCStatsReferences.RTCVideoSenders.key;
        } else if (stats.kind === "audio") {
          return RTCStatsReferences.RTCAudioSenders.key;
        }
    }
    return super._getRTCStatsReference(stats);
  }
}
