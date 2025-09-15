import type { Body, Meta } from '@uppy/core';
import type { I18n } from '@uppy/utils';
import type { h } from 'preact';
import type ProviderViews from './ProviderView.js';
import type { Opts } from './ProviderView.js';
type AuthViewProps<M extends Meta, B extends Body> = {
    loading: boolean | string;
    pluginName: string;
    pluginIcon: () => h.JSX.Element;
    i18n: I18n;
    handleAuth: ProviderViews<M, B>['handleAuth'];
    renderForm?: Opts<M, B>['renderAuthForm'];
};
export default function AuthView<M extends Meta, B extends Body>({ loading, pluginName, pluginIcon, i18n, handleAuth, renderForm, }: AuthViewProps<M, B>): h.JSX.Element;
export {};
//# sourceMappingURL=AuthView.d.ts.map