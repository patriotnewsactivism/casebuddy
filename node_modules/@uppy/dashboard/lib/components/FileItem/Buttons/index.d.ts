import type Uppy from '@uppy/core';
import type { Body, Meta, UppyFile } from '@uppy/core';
import type { I18n } from '@uppy/utils';
import type { DashboardState } from '../../../Dashboard.js';
type ButtonsProps<M extends Meta, B extends Body> = {
    uppy: Uppy<M, B>;
    file: UppyFile<M, B>;
    i18n: I18n;
    uploadInProgressOrComplete: boolean;
    canEditFile: (file: UppyFile<M, B>) => boolean;
    metaFields: DashboardState<M, B>['metaFields'];
    showLinkToFileUploadResult: boolean;
    showRemoveButton: boolean;
    toggleFileCard: (show: boolean, fileId: string) => void;
    openFileEditor: (file: UppyFile<M, B>) => void;
};
export default function Buttons<M extends Meta, B extends Body>(props: ButtonsProps<M, B>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map