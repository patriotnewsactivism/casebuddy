import type { UppyFile } from '@uppy/core';
import type { I18n } from '@uppy/utils';
import type { DashboardState } from '../../../Dashboard.js';
type FileInfoProps = {
    file: UppyFile<any, any>;
    containerWidth: number;
    containerHeight: number;
    i18n: I18n;
    toggleAddFilesPanel: (show: boolean) => void;
    toggleFileCard: (show: boolean, fileId: string) => void;
    metaFields: DashboardState<any, any>['metaFields'];
    isSingleFile: boolean;
};
export default function FileInfo(props: FileInfoProps): import("preact").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map