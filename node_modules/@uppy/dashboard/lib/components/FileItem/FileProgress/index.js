import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
function onPauseResumeCancelRetry(props) {
    if (props.isUploaded)
        return;
    if (props.error && !props.hideRetryButton) {
        props.uppy.retryUpload(props.file.id);
        return;
    }
    if (props.resumableUploads && !props.hidePauseResumeButton) {
        props.uppy.pauseResume(props.file.id);
    }
    else if (props.individualCancellation && !props.hideCancelButton) {
        props.uppy.removeFile(props.file.id);
    }
}
function progressIndicatorTitle(props) {
    if (props.isUploaded) {
        return props.i18n('uploadComplete');
    }
    if (props.error) {
        return props.i18n('retryUpload');
    }
    if (props.resumableUploads) {
        if (props.file.isPaused) {
            return props.i18n('resumeUpload');
        }
        return props.i18n('pauseUpload');
    }
    if (props.individualCancellation) {
        return props.i18n('cancelUpload');
    }
    return '';
}
function ProgressIndicatorButton(props) {
    return (_jsx("div", { className: "uppy-Dashboard-Item-progress", children: _jsx("button", { className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-progressIndicator", type: "button", "aria-label": progressIndicatorTitle(props), title: progressIndicatorTitle(props), onClick: () => onPauseResumeCancelRetry(props), children: props.children }) }));
}
function ProgressCircleContainer({ children }) {
    return (_jsx("svg", { "aria-hidden": "true", focusable: "false", width: "70", height: "70", viewBox: "0 0 36 36", className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle", children: children }));
}
function ProgressCircle({ progress }) {
    // circle length equals 2 * PI * R
    const circleLength = 2 * Math.PI * 15;
    return (_jsxs("g", { children: [_jsx("circle", { className: "uppy-Dashboard-Item-progressIcon--bg", r: "15", cx: "18", cy: "18", "stroke-width": "2", fill: "none" }), _jsx("circle", { className: "uppy-Dashboard-Item-progressIcon--progress", r: "15", cx: "18", cy: "18", transform: "rotate(-90, 18, 18)", fill: "none", "stroke-width": "2", "stroke-dasharray": circleLength, "stroke-dashoffset": circleLength - (circleLength / 100) * progress })] }));
}
export default function FileProgress(props) {
    // Nothing if upload has not started
    if (!props.file.progress.uploadStarted) {
        return null;
    }
    if (props.file.progress.percentage === undefined) {
        return null;
    }
    // Green checkmark when complete
    if (props.isUploaded) {
        return (_jsx("div", { className: "uppy-Dashboard-Item-progress", children: _jsx("div", { className: "uppy-Dashboard-Item-progressIndicator", children: _jsxs(ProgressCircleContainer, { children: [_jsx("circle", { r: "15", cx: "18", cy: "18", fill: "#1bb240" }), _jsx("polygon", { className: "uppy-Dashboard-Item-progressIcon--check", transform: "translate(2, 3)", points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634" })] }) }) }));
    }
    if (props.recoveredState) {
        return null;
    }
    // Retry button for error
    if (props.error && !props.hideRetryButton) {
        return (_jsx(ProgressIndicatorButton, { ...props, children: _jsxs("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry", width: "28", height: "31", viewBox: "0 0 16 19", children: [_jsx("path", { d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z" }), _jsx("path", { d: "M7.9 3H10v2H7.9z" }), _jsx("path", { d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z" }), _jsx("path", { d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z" })] }) }));
    }
    // Pause/resume button for resumable uploads
    if (props.resumableUploads && !props.hidePauseResumeButton) {
        return (_jsx(ProgressIndicatorButton, { ...props, children: _jsxs(ProgressCircleContainer, { children: [_jsx(ProgressCircle, { progress: props.file.progress.percentage }), props.file.isPaused ? (_jsx("polygon", { className: "uppy-Dashboard-Item-progressIcon--play", transform: "translate(3, 3)", points: "12 20 12 10 20 15" })) : (_jsxs("g", { className: "uppy-Dashboard-Item-progressIcon--pause", transform: "translate(14.5, 13)", children: [_jsx("rect", { x: "0", y: "0", width: "2", height: "10", rx: "0" }), _jsx("rect", { x: "5", y: "0", width: "2", height: "10", rx: "0" })] }))] }) }));
    }
    // Cancel button for non-resumable uploads if individualCancellation is supported (not bundled)
    if (!props.resumableUploads &&
        props.individualCancellation &&
        !props.hideCancelButton) {
        return (_jsx(ProgressIndicatorButton, { ...props, children: _jsxs(ProgressCircleContainer, { children: [_jsx(ProgressCircle, { progress: props.file.progress.percentage }), _jsx("polygon", { className: "cancel", transform: "translate(2, 2)", points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12" })] }) }));
    }
    // Just progress when buttons are disabled
    return (_jsx("div", { className: "uppy-Dashboard-Item-progress", children: _jsx("div", { className: "uppy-Dashboard-Item-progressIndicator", children: _jsx(ProgressCircleContainer, { children: _jsx(ProgressCircle, { progress: props.file.progress.percentage }) }) }) }));
}
