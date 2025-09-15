import type { Body, Meta, State, Uppy, UppyFile } from '@uppy/core';
import type { I18n } from '@uppy/utils';
interface Props<M extends Meta, B extends Body> {
    uppy: Uppy<M, B>;
    file: UppyFile<M, B>;
    isUploaded: boolean;
    error: string | false;
    recoveredState: State<M, B>['recoveredState'];
    hideRetryButton: boolean;
    hidePauseResumeButton: boolean;
    hideCancelButton: boolean;
    resumableUploads: boolean;
    individualCancellation: boolean;
    i18n: I18n;
}
export default function FileProgress<M extends Meta, B extends Body>(props: Props<M, B>): import("preact").JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map