import type { Body, Meta } from '@uppy/core';
import { Component, type ComponentChild } from 'preact';
import type ScreenCapture from './ScreenCapture.js';
import type { ScreenCaptureState } from './ScreenCapture.js';
type RecorderScreenProps<M extends Meta, B extends Body> = {
    onStartRecording: ScreenCapture<M, B>['startRecording'];
    onStopRecording: ScreenCapture<M, B>['stopRecording'];
    onStop: ScreenCapture<M, B>['stop'];
    onSubmit: ScreenCapture<M, B>['submit'];
    i18n: ScreenCapture<M, B>['i18n'];
    stream: ScreenCapture<M, B>['videoStream'];
    onScreenshot: ScreenCapture<M, B>['captureScreenshot'];
    enableScreenshots: boolean;
    capturedScreenshotUrl: ScreenCaptureState['capturedScreenshotUrl'];
    onDiscard: ScreenCapture<M, B>['discardRecordedMedia'];
} & ScreenCaptureState;
declare class RecorderScreen<M extends Meta, B extends Body> extends Component<RecorderScreenProps<M, B>> {
    videoElement: HTMLVideoElement | null;
    componentWillUnmount(): void;
    render(): ComponentChild;
}
export default RecorderScreen;
//# sourceMappingURL=RecorderScreen.d.ts.map