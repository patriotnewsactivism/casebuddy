import type { Body, DefinePluginOpts, Meta, PartialTree, PartialTreeFile, PartialTreeFolderNode, UnknownSearchProviderPlugin } from '@uppy/core';
import type { CompanionFile } from '@uppy/utils';
import type { h } from 'preact';
interface Opts<M extends Meta, B extends Body> {
    provider: UnknownSearchProviderPlugin<M, B>['provider'];
    viewType?: 'list' | 'grid' | 'unsplash';
    showTitles?: boolean;
    showFilter?: boolean;
    utmSource?: string;
}
type RenderOpts<M extends Meta, B extends Body> = Omit<Opts<M, B>, 'provider'>;
declare const defaultOptions: {
    viewType: "grid";
    showTitles: boolean;
    showFilter: boolean;
    utmSource: string;
};
/**
 * SearchProviderView, used for Unsplash and future image search providers.
 * Extends generic View, shared with regular providers like Google Drive and Instagram.
 */
export default class SearchProviderView<M extends Meta, B extends Body> {
    static VERSION: string;
    plugin: UnknownSearchProviderPlugin<M, B>;
    provider: UnknownSearchProviderPlugin<M, B>['provider'];
    opts: DefinePluginOpts<Opts<M, B>, keyof typeof defaultOptions>;
    isHandlingScroll: boolean;
    lastCheckbox: string | null;
    constructor(plugin: UnknownSearchProviderPlugin<M, B>, opts: Opts<M, B>);
    tearDown(): void;
    setLoading(loading: boolean | string): void;
    resetPluginState(): void;
    cancelSelection(): void;
    search(): Promise<void>;
    handleScroll(event: Event): Promise<void>;
    donePicking(): Promise<void>;
    toggleCheckbox(ourItem: PartialTreeFolderNode | PartialTreeFile, isShiftKeyPressed: boolean): void;
    validateSingleFile: (file: CompanionFile) => string | null;
    getDisplayedPartialTree: () => (PartialTreeFile | PartialTreeFolderNode)[];
    setSearchString: (searchString: string) => void;
    validateAggregateRestrictions: (partialTree: PartialTree) => string | null;
    render(state: unknown, viewOptions?: RenderOpts<M, B>): h.JSX.Element;
}
export {};
//# sourceMappingURL=SearchProviderView.d.ts.map