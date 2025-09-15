import type { Body, Meta, UppyFile } from '@uppy/core';
import type { RateLimitedQueue } from '@uppy/utils';
import type { AwsS3MultipartOptions } from './index.js';
import { type Chunk } from './MultipartUploader.js';
import type { UploadPartBytesResult, UploadResult } from './utils.js';
export declare class HTTPCommunicationQueue<M extends Meta, B extends Body> {
    #private;
    constructor(requests: RateLimitedQueue, options: AwsS3MultipartOptions<M, B>, setS3MultipartState: (file: UppyFile<M, B>, result: UploadResult) => void, getFile: (file: UppyFile<M, B>) => UppyFile<M, B>);
    setOptions(options: Partial<AwsS3MultipartOptions<M, B>>): void;
    getUploadId(file: UppyFile<M, B>, signal: AbortSignal): Promise<UploadResult>;
    abortFileUpload(file: UppyFile<M, B>): Promise<void>;
    uploadFile(file: UppyFile<M, B>, chunks: Chunk[], signal: AbortSignal): Promise<B & Partial<UploadPartBytesResult>>;
    restoreUploadFile(file: UppyFile<M, B>, uploadIdAndKey: UploadResult): void;
    resumeUploadFile(file: UppyFile<M, B>, chunks: Array<Chunk | null>, signal: AbortSignal): Promise<B>;
    uploadChunk(file: UppyFile<M, B>, partNumber: number, chunk: Chunk, signal: AbortSignal): Promise<UploadPartBytesResult & {
        PartNumber: number;
    }>;
}
//# sourceMappingURL=HTTPCommunicationQueue.d.ts.map