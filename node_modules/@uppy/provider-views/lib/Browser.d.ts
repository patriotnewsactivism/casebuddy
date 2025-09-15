import type { Body, Meta, PartialTreeFile, PartialTreeFolderNode } from '@uppy/core';
import type { I18n } from '@uppy/utils';
import type ProviderView from './ProviderView/ProviderView.js';
type BrowserProps<M extends Meta, B extends Body> = {
    displayedPartialTree: (PartialTreeFile | PartialTreeFolderNode)[];
    viewType: string;
    toggleCheckbox: ProviderView<M, B>['toggleCheckbox'];
    handleScroll: ProviderView<M, B>['handleScroll'];
    showTitles: boolean;
    i18n: I18n;
    isLoading: boolean | string;
    openFolder: ProviderView<M, B>['openFolder'];
    noResultsLabel: string;
    virtualList: boolean;
    utmSource: string;
};
declare function Browser<M extends Meta, B extends Body>(props: BrowserProps<M, B>): import("preact").JSX.Element;
export default Browser;
//# sourceMappingURL=Browser.d.ts.map