export default function supportsMediaRecorder() {
    return (typeof MediaRecorder === 'function' &&
        typeof MediaRecorder.prototype?.start === 'function');
}
