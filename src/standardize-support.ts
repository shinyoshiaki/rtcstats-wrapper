import { detect } from "detect-browser";
import { ChromeRTCStatsReport } from "./standardizers/chrome.js";
import { FirefoxRTCStatsReport } from "./standardizers/firefox.js";
import { SafariRTCStatsReport } from "./standardizers/safari.js";
import { BaseRTCStatsReport } from "./standardizers/base.js";

export function getStandardizer() {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'BrowserInf... Remove this comment to see the full error message
  const { name, version } = detect();
  const [major, minor, patch] = version.split(".").map((n: any) => parseInt(n));
  const browser = { name, major, minor, patch };

  switch (browser.name) {
    case "chrome":
      return ChromeRTCStatsReport;
    case "firefox":
      return FirefoxRTCStatsReport;
    case "safari":
      return SafariRTCStatsReport;
    default:
      return BaseRTCStatsReport;
  }
}

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
export function standardizeReport(report: any) {
  const standardizer = getStandardizer();
  return new standardizer(report);
}
