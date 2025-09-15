import type { Body, Meta, PartialTreeFolder } from '@uppy/core';
import { type h } from 'preact';
import type ProviderView from './ProviderView/index.js';
type BreadcrumbsProps<M extends Meta, B extends Body> = {
    openFolder: ProviderView<M, B>['openFolder'];
    title: string;
    breadcrumbsIcon: h.JSX.Element;
    breadcrumbs: PartialTreeFolder[];
    i18n: any;
};
export default function Breadcrumbs<M extends Meta, B extends Body>(props: BreadcrumbsProps<M, B>): h.JSX.Element;
export {};
//# sourceMappingURL=Breadcrumbs.d.ts.map