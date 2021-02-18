"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTCStatsInsight = exports.StatusLevels = exports.RTCStatsInsightEvents = void 0;
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enum... Remove this comment to see the full error message
var enum_1 = __importDefault(require("enum"));
var rtcstats_moment_1 = require("../src/rtcstats-moment");
var events_1 = require("events");
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
exports.RTCStatsInsightEvents = new enum_1.default([
    "audio-rtt",
    "video-rtt",
    "audio-jitter",
    "video-jitter",
    "audio-fractionLost",
    "video-fractionLost",
    "audio-jitterBufferDelay",
    "video-jitterBufferDelay",
    "rtt"
]);
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
exports.StatusLevels = new enum_1.default([
    "stable",
    "unstable",
    "critical",
    "unknown"
]);
/**
 * A set of thresholds for emitting each events used in the constructor of RTCStatsInsight.
 * Use the event name for the thresholds object's key and use this object for the value.
 * Please see example for usage.
 *
 * @typedef {Object} Thresholds
 * @property {Number} unstable - When the value used in thresholds object's key goes greater than this value, the `unstable` level event is fired.
 * @property {Number} critical - When the value used in thresholds object's key goes greater than this value, the `critical` level event is fired.
 * @example
 * const thresholds = {
 *     "audio-rtt": {
 *       unstable: 0.1
 *     },
 *     "audio-fractionLost": {
 *       unstable: 0.03,
 *       critical: 0.08,
 *     }
 *   }
 * }
 *
 * const insight = new RTCStatsInsight(pc, { thresholds });
 * insight.on(RTCStatsInsightEvents["audio-fractionLost"].key, events => {
 *   // fired when `fractionLost` of receiving audio goes up to 0.03
 *   // ...
 * }
 */
var DEFAULT_THRESHOLDS = {
    "audio-rtt": { unstable: 0.4, critical: 0.8 },
    "video-rtt": { unstable: 0.4, critical: 0.8 },
    "audio-jitter": { unstable: 0.05, critical: 0.1 },
    "video-jitter": { unstable: 0.03, critical: 0.1 },
    "audio-fractionLost": { unstable: 0.08, critical: 0.15 },
    "video-fractionLost": { unstable: 0.08, critical: 0.15 },
    "audio-jitterBufferDelay": { unstable: 0.5, critical: 1 },
    "video-jitterBufferDelay": { unstable: 0.05, critical: 0.1 },
    rtt: { unstable: 0.5, critical: 1 }
};
var ConnectionStatus = /** @class */ (function () {
    function ConnectionStatus(options) {
        options = options || {};
        this._options = __assign({ failCount: 3, within: 5 }, options);
        this._store = {
            unstable: new Array(this._options.within).fill(null),
            critical: new Array(this._options.within).fill(null)
        };
        this._level = exports.StatusLevels.unknown.key;
    }
    Object.defineProperty(ConnectionStatus.prototype, "level", {
        get: function () {
            if (this._store.critical.some(function (x) { return x === null; })) {
                return exports.StatusLevels.unknown.key;
            }
            var criticalCount = this._store.critical.filter(Boolean).length;
            if (criticalCount > this._options.failCount) {
                return exports.StatusLevels.critical.key;
            }
            var unstableCount = this._store.critical.filter(Boolean).length;
            if (unstableCount > this._options.failCount) {
                return exports.StatusLevels.unstable.key;
            }
            return exports.StatusLevels.stable.key;
        },
        enumerable: false,
        configurable: true
    });
    ConnectionStatus.prototype.check = function (value, threshold) {
        this._store.critical.unshift(value > threshold.critical);
        this._store.critical.pop();
        this._store.unstable.unshift(value > threshold.unstable);
        this._store.unstable.pop();
    };
    return ConnectionStatus;
}());
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
var RTCStatsInsight = /** @class */ (function (_super) {
    __extends(RTCStatsInsight, _super);
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
    function RTCStatsInsight(statsSrc, options) {
        var _this = _super.call(this) || this;
        options = options || {};
        _this._statsSrc = statsSrc;
        _this._interval = options.interval || 1000;
        _this._thresholds = __assign(__assign({}, DEFAULT_THRESHOLDS), options.thresholds);
        _this._moment = new rtcstats_moment_1.RTCStatsMoment();
        _this._status = exports.RTCStatsInsightEvents.enums.reduce(function (acc, cur) {
            var _a;
            return Object.assign(acc, (_a = {},
                _a[cur] = new ConnectionStatus(options.triggerCondition),
                _a));
        }, {});
        return _this;
    }
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
    RTCStatsInsight.prototype.watch = function () {
        /**
         * Fires when an RTT of sending audio stream has been changed.
         * By default, `unstable` fires on RTT > 400ms and `critical` fires on RTT > 800ms.
         *
         * @event RTCStatsInsight#audio-rtt
         * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
         * @property {string} threshold - Threshold for this event to fire.
         * @property {string} value - Last measured value when this event fires.
         */
        var _this = this;
        /**
         * Fires when an RTT of sending video stream has been changed.
         * By default, `unstable` fires on RTT > 400ms and `critical` fires on RTT > 800ms.
         *
         * @event RTCStatsInsight#video-rtt
         * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
         * @property {string} threshold - Threshold for this event to fire.
         * @property {string} value - Last measured value when this event fires.
         */
        /**
         * Fires when a jitter of sending audio stream has been changed.
         * By default, `unstable` fires on jitter > 50ms and `critical` fires on jitter > 100ms.
         *
         * @event RTCStatsInsight#audio-jitter
         * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
         * @property {string} threshold - Threshold for this event to fire.
         * @property {string} value - Last measured value when this event fires.
         */
        /**
         * Fires when a jitter of sending video stream has been changed.
         * By default, `unstable` fires on jitter > 30ms and `critical` fires on jitter > 100ms.
         *
         * @event RTCStatsInsight#video-jitter
         * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
         * @property {string} threshold - Threshold for this event to fire.
         * @property {string} value - Last measured value when this event fires.
         */
        /**
         * Fires when the packet loss rate of receiving audio stream has been changed.
         * By default, `unstable` fires on packet loss rate > 8% and `critical` fires on packet loss rate > 15%.
         *
         * @event RTCStatsInsight#audio-fractionLost
         * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
         * @property {string} threshold - Threshold for this event to fire.
         * @property {string} value - Last measured value when this event fires.
         */
        /**
         * Fires when the packet loss rate of receiving video stream has been changed.
         * By default, `unstable` fires on packet loss rate > 8% and `critical` fires on packet loss rate > 15%.
         *
         * @event RTCStatsInsight#video-fractionLost
         * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
         * @property {string} threshold - Threshold for this event to fire.
         * @property {string} value - Last measured value when this event fires.
         */
        /**
         * Fires when the jitter buffer delay of receiving audio stream has been changed.
         * By default, `unstable` fires on jitter buffer delay > 500ms and `critical` fires on jitter buffer delay > 1000ms.
         *
         * @event RTCStatsInsight#audio-jitterBufferDelay
         * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
         * @property {string} threshold - Threshold for this event to fire.
         * @property {string} value - Last measured value when this event fires.
         */
        /**
         * Fires when the jitter buffer delay of receiving video stream has been changed.
         * By default, `unstable` fires on jitter buffer delay > 50ms and `critical` fires on jitter buffer delay > 100ms.
         *
         * @event RTCStatsInsight#video-jitterBufferDelay
         * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
         * @property {string} threshold - Threshold for this event to fire.
         * @property {string} value - Last measured value when this event fires.
         */
        /**
         * Fires when the rtt of ICE connection has been changed.
         * The difference with media RTT is that media RTT uses the value of RTCP packet, and this RTT uses ICE connectivity checks timestamp.
         * By default, `unstable` fires on rtt > 500ms and `critical` fires on rtt > 1000ms.
         *
         * @event RTCStatsInsight#rtt
         * @property {string} level - Warning level. This will be "stable" or "unstable" or "critical".
         * @property {string} threshold - Threshold for this event to fire.
         * @property {string} value - Last measured value when this event fires.
         */
        this._intervalID = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            var report, momentum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._statsSrc.getStats()];
                    case 1:
                        report = _a.sent();
                        this._moment.update(report);
                        momentum = this._moment.report();
                        this._checkStatus(momentum);
                        return [2 /*return*/];
                }
            });
        }); }, this._interval);
    };
    /**
     * Stop polling getStats().
     */
    RTCStatsInsight.prototype.stop = function () {
        clearInterval(this._intervalID);
    };
    Object.defineProperty(RTCStatsInsight.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    RTCStatsInsight.prototype._checkStatus = function (moment) {
        var metrics = [
            { direction: "send", kind: "audio", key: "rtt" },
            { direction: "send", kind: "video", key: "rtt" },
            { direction: "send", kind: "audio", key: "jitter" },
            { direction: "send", kind: "video", key: "jitter" },
            { direction: "receive", kind: "audio", key: "fractionLost" },
            { direction: "receive", kind: "video", key: "fractionLost" },
            { direction: "receive", kind: "audio", key: "jitterBufferDelay" },
            { direction: "receive", kind: "video", key: "jitterBufferDelay" },
            { direction: "candidatePair", key: "rtt" }
        ];
        for (var _i = 0, metrics_1 = metrics; _i < metrics_1.length; _i++) {
            var _a = metrics_1[_i], direction = _a.direction, kind = _a.kind, key = _a.key;
            var stats = direction === "candidatePair"
                ? moment[direction]
                : // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
                    moment[direction][kind];
            var eventKey = direction === "candidatePair" ? key : kind + "-" + key;
            if (stats.hasOwnProperty(key)) {
                // Update the value and emit when the the level has been changed.
                var currentLevel = this._status[eventKey].level;
                this._status[eventKey].check(stats[key], this._thresholds[eventKey]);
                var updatedLevel = this._status[eventKey].level;
                if (updatedLevel !== currentLevel) {
                    if (currentLevel === "unknown" && updatedLevel === "stable")
                        continue;
                    this.emit(eventKey, {
                        level: updatedLevel,
                        event: eventKey,
                        threshold: this._thresholds[eventKey][updatedLevel],
                        value: stats[key]
                    });
                }
            }
        }
    };
    return RTCStatsInsight;
}(events_1.EventEmitter));
exports.RTCStatsInsight = RTCStatsInsight;
