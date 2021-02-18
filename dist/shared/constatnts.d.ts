/**
 * Represents an Item of an Enum.
 * @typedef EnumItem
 * @property {String} key   The Enum key.
 * @property {Number} value The Enum value.
 * @see {@link https://github.com/adrai/enum}
 */
/**
 * Enum for stats object references
 *
 * @readonly
 * @property {EnumItem} RTCCodecs - Reference for stats of the codecs.
 * @property {EnumItem} RTCInboundRtpVideoStreams - Reference for stats represents the incoming RTP video streams.
 * In general, there is one `RTCInboundRtpVideoStreams` corresponding to one MediaStream that receives video tracks.
 * @property {EnumItem} RTCInboundRtpAudioStreams - Reference for stats represents the incoming RTP audio streams.
 * @property {EnumItem} RTCOutboundRtpVideoStreams - Reference for stats represents the outgoing RTP video streams.
 * @property {EnumItem} RTCOutboundRtpAudioStreams - Reference for stats represents the outgoing RTP audio streams.
 * @property {EnumItem} RTCRemoteInboundRtpVideoStreams - Reference for stats represents the metrics reported in RR or XR corresponding to sending video streams.
 * @property {EnumItem} RTCRemoteInboundRtpAudioStreams - Reference for stats represents the metrics reported in RR or XR corresponding to sending audio streams.
 * @property {EnumItem} RTCRemoteOutboundRtpVideoStreams - Reference for stats represents the metrics reported in SR corresponding to receiving video streams.
 * @property {EnumItem} RTCRemoteOutboundRtpAudioStreams - Reference for stats represents the metrics reported in SR corresponding to receiving audio streams.
 * @property {EnumItem} RTCVideoSources - Reference for stats represents video tracks which are attached to one or more sender.
 * @property {EnumItem} RTCAudioSources - Reference for stats represents audio tracks which are attached to one or more sender.
 * @property {EnumItem} RTCRtpContributingSources - Reference for stats represents CSRCs contributing to an incoming RTP stream.
 * @property {EnumItem} RTCPeerConnection - Reference for stats which have the record of datachannels establishment.
 * @property {EnumItem} RTCDataChannels - Reference for stats of the data channels.
 * @property {EnumItem} RTCMediaStreams - Reference for stats of the media streams.
 * @property {EnumItem} RTCVideoSenders - Reference for stats represents the sender of one video track.
 * @property {EnumItem} RTCAudioSenders - Reference for stats represents the sender of one audio track.
 * @property {EnumItem} RTCVideoReceivers - Reference for stats represents the receiver of one video track.
 * @property {EnumItem} RTCAudioReceivers - Reference for stats represents the receiver of one audio track.
 * @property {EnumItem} RTCTransports - Reference for stats represents ICE and DTLS transport.
 * @property {EnumItem} RTCIceCandidatePairs - Reference for stats represents ICE candidate pairs, includes deleted or unnominate pairs.
 * @property {EnumItem} RTCLocalIceCandidates - Reference for stats represents local ICE candidates.
 * @property {EnumItem} RTCRemoteIceCandidates - Reference for stats represents remote ICE candidates.
 * @property {EnumItem} RTCCertificates - Reference for stats of certificates used by an ICE transports.
 * @property {EnumItem} RTCStunServerConnections - Reference for stats of transports between STUN and TURN servers.
 * @example
 * import {
 *   ChromeRTCStatsReport,
 *   RTCStatsReferences
 * } from 'rtcstats-wrapper';
 *
 * const report = new BaseRTCStatsReport(await pc.getStats());
 *
 * // get stats of incoming RTP stream
 * const recvVideoStats = report.get(RTCStatsReferences.RTCInboundRtpVideoStreams.key)
 *
 * // get each log of inbound-rtp
 * for (const stats of recvVideoStats) {
 *   logger.info(JSON.stringify(stats));
 * }
 */
export declare const RTCStatsReferences: any;
export declare const RTCStatsReferenceMap: Map<any, string[]>;
