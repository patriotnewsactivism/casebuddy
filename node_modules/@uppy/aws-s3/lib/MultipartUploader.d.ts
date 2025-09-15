import type { Uppy } from '@uppy/core';
import type { Body, Meta, UppyFile } from '@uppy/utils';
import type { HTTPCommunicationQueue } from './HTTPCommunicationQueue.js';
interface MultipartUploaderOptions<M extends Meta, B extends Body> {
    getChunkSize?: (file: {
        size: number;
    }) => number;
    onProgress?: (bytesUploaded: number, bytesTotal: number) => void;
    onPartComplete?: (part: {
        PartNumber: number;
        ETag: string;
    }) => void;
    shouldUseMultipart?: boolean | ((file: UppyFile<M, B>) => boolean);
    onSuccess?: (result: B) => void;
    onError?: (err: unknown) => void;
    companionComm: HTTPCommunicationQueue<M, B>;
    file: UppyFile<M, B>;
    log: Uppy<M, B>['log'];
    uploadId?: string;
    key: string;
}
declare const defaultOptions: {
    getChunkSize(file: {
        size: number;
    }): number;
    onProgress(): void;
    onPartComplete(): void;
    onSuccess(): void;
    onError(err: unknown): never;
};
export interface Chunk {
    getData: () => Blob;
    onProgress: (ev: ProgressEvent) => void;
    onComplete: (etag: string) => void;
    shouldUseMultipart: boolean;
    setAsUploaded?: () => void;
}
export declare const pausingUploadReason: unique symbol;
/**
 * A MultipartUploader instance is used per file upload to determine whether a
 * upload should be done as multipart or as a regular S3 upload
 * (based on the user-provided `shouldUseMultipart` option value) and to manage
 * the chunk splitting.
 */
declare class MultipartUploader<M extends Meta, B extends Body> {
    #private;
    options: MultipartUploaderOptions<M, B> & Required<Pick<MultipartUploaderOptions<M, B>, keyof typeof defaultOptions>>;
    constructor(data: Blob, options: MultipartUploaderOptions<M, B>);
    start(): void;
    pause(): void;
    abort(opts?: {
        really?: boolean;
    }): void;
}
export default MultipartUploader;
//# sourceMappingURL=MultipartUploader.d.ts.map