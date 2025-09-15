import type { Body } from '@uppy/utils';
import type { AwsS3Part } from './index.js';
export declare function throwIfAborted(signal?: AbortSignal | null): void;
export type UploadResult = {
    key: string;
    uploadId?: string;
    bucket?: string;
};
export type UploadResultWithSignal = UploadResult & {
    signal?: AbortSignal;
};
export type MultipartUploadResult = UploadResult & {
    parts: AwsS3Part[];
};
export type MultipartUploadResultWithSignal = MultipartUploadResult & {
    signal?: AbortSignal;
};
export type UploadPartBytesResult = {
    ETag: string;
    location?: string;
};
export interface AwsBody extends Body {
    location: string;
    key: string;
    bucket: string;
}
//# sourceMappingURL=utils.d.ts.map