import type { PartialTreeFile, PartialTreeFolderNode, PartialTreeId } from '@uppy/core';
import type { I18n } from '@uppy/utils';
import type { h } from 'preact';
type ItemProps = {
    file: PartialTreeFile | PartialTreeFolderNode;
    openFolder: (folderId: PartialTreeId) => void;
    toggleCheckbox: (event: Event) => void;
    viewType: string;
    showTitles: boolean;
    i18n: I18n;
    utmSource: string;
};
export default function Item(props: ItemProps): h.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map