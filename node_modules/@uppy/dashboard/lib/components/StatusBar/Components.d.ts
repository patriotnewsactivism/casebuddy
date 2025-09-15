import type { Body, Meta, State, Uppy } from '@uppy/core';
import type { FileProcessingInfo, I18n } from '@uppy/utils';
interface UploadBtnProps<M extends Meta, B extends Body> {
    newFiles: number;
    isUploadStarted: boolean;
    recoveredState: State<M, B>['recoveredState'];
    i18n: I18n;
    uploadState: string;
    isSomeGhost: boolean;
    startUpload: () => void;
}
declare function UploadBtn<M extends Meta, B extends Body>(props: UploadBtnProps<M, B>): import("preact").JSX.Element;
interface RetryBtnProps<M extends Meta, B extends Body> {
    i18n: I18n;
    uppy: Uppy<M, B>;
}
declare function RetryBtn<M extends Meta, B extends Body>(props: RetryBtnProps<M, B>): import("preact").JSX.Element;
interface CancelBtnProps<M extends Meta, B extends Body> {
    i18n: I18n;
    uppy: Uppy<M, B>;
}
declare function CancelBtn<M extends Meta, B extends Body>(props: CancelBtnProps<M, B>): import("preact").JSX.Element;
interface PauseResumeButtonProps<M extends Meta, B extends Body> {
    i18n: I18n;
    uppy: Uppy<M, B>;
    isAllPaused: boolean;
    isAllComplete: boolean;
    resumableUploads: boolean;
}
declare function PauseResumeButton<M extends Meta, B extends Body>(props: PauseResumeButtonProps<M, B>): import("preact").JSX.Element;
interface DoneBtnProps {
    i18n: I18n;
    doneButtonHandler: (() => void) | undefined;
}
declare function DoneBtn(props: DoneBtnProps): import("preact").JSX.Element;
declare function LoadingSpinner(): import("preact").JSX.Element;
interface ProgressBarProcessingProps {
    progress: FileProcessingInfo;
}
declare function ProgressBarProcessing(props: ProgressBarProcessingProps): import("preact").JSX.Element;
interface ProgressDetailsProps {
    i18n: I18n;
    numUploads: number;
    complete: number;
    totalUploadedSize: number;
    totalSize: number | null;
    totalETA: number | null;
}
declare function ProgressDetails(props: ProgressDetailsProps): import("preact").JSX.Element;
interface ProgressBarUploadingProps {
    i18n: I18n;
    supportsUploadProgress: boolean;
    totalProgress: number;
    hideProgressDetails: boolean | undefined;
    isUploadStarted: boolean;
    isAllComplete: boolean;
    isAllPaused: boolean;
    newFiles: number;
    numUploads: number;
    complete: number;
    totalUploadedSize: number;
    totalSize: number | null;
    totalETA: number | null;
    startUpload: () => void;
}
declare function ProgressBarUploading(props: ProgressBarUploadingProps): import("preact").JSX.Element | null;
interface ProgressBarCompleteProps {
    i18n: I18n;
}
declare function ProgressBarComplete(props: ProgressBarCompleteProps): import("preact").JSX.Element;
interface ProgressBarErrorProps {
    i18n: I18n;
    error: any;
    complete: number;
    numUploads: number;
}
declare function ProgressBarError(props: ProgressBarErrorProps): import("preact").JSX.Element;
export { UploadBtn, RetryBtn, CancelBtn, PauseResumeButton, DoneBtn, LoadingSpinner, ProgressDetails, ProgressBarProcessing, ProgressBarError, ProgressBarUploading, ProgressBarComplete, };
//# sourceMappingURL=Components.d.ts.map