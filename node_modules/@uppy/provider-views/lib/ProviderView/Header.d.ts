import type { Body, Meta, PartialTreeFolder } from '@uppy/core';
import type { I18n } from '@uppy/utils';
import type { h } from 'preact';
import type ProviderView from './ProviderView.js';
type HeaderProps<M extends Meta, B extends Body> = {
    showBreadcrumbs: boolean;
    openFolder: ProviderView<M, B>['openFolder'];
    breadcrumbs: PartialTreeFolder[];
    pluginIcon: () => h.JSX.Element;
    title: string;
    logout: () => void;
    username: string | null;
    i18n: I18n;
};
export default function Header<M extends Meta, B extends Body>(props: HeaderProps<M, B>): h.JSX.Element;
export {};
//# sourceMappingURL=Header.d.ts.map