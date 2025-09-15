import { createAbortError } from '@uppy/utils';
export function throwIfAborted(signal) {
    if (signal?.aborted) {
        throw createAbortError('The operation was aborted', {
            cause: signal.reason,
        });
    }
}
