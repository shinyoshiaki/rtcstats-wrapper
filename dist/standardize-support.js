"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizeReport = exports.getStandardizer = void 0;
var detect_browser_1 = require("detect-browser");
var chrome_1 = require("./standardizers/chrome");
var firefox_1 = require("./standardizers/firefox");
var safari_1 = require("./standardizers/safari");
var base_1 = require("./standardizers/base");
function getStandardizer() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'BrowserInf... Remove this comment to see the full error message
    var _a = detect_browser_1.detect(), name = _a.name, version = _a.version;
    var _b = version.split(".").map(function (n) { return parseInt(n); }), major = _b[0], minor = _b[1], patch = _b[2];
    var browser = { name: name, major: major, minor: minor, patch: patch };
    switch (browser.name) {
        case "chrome":
            return chrome_1.ChromeRTCStatsReport;
        case "firefox":
            return firefox_1.FirefoxRTCStatsReport;
        case "safari":
            return safari_1.SafariRTCStatsReport;
        default:
            return base_1.BaseRTCStatsReport;
    }
}
exports.getStandardizer = getStandardizer;
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
function standardizeReport(report) {
    var standardizer = getStandardizer();
    return new standardizer(report);
}
exports.standardizeReport = standardizeReport;
