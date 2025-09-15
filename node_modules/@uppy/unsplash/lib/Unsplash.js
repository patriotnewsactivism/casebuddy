import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { getAllowedHosts, SearchProvider, tokenStorage, } from '@uppy/companion-client';
import { UIPlugin } from '@uppy/core';
import { SearchProviderViews } from '@uppy/provider-views';
// biome-ignore lint/style/useImportType: h is not a type
import { h } from 'preact';
import packageJson from '../package.json' with { type: 'json' };
import locale from './locale.js';
export default class Unsplash extends UIPlugin {
    static VERSION = packageJson.version;
    icon;
    provider;
    view;
    storage;
    files;
    hostname;
    constructor(uppy, opts) {
        super(uppy, opts);
        this.type = 'acquirer';
        this.files = [];
        this.storage = this.opts.storage || tokenStorage;
        this.id = this.opts.id || 'Unsplash';
        this.defaultLocale = locale;
        this.i18nInit();
        this.title = this.i18n('pluginNameUnsplash');
        this.icon = () => (_jsx("svg", { className: "uppy-DashboardTab-iconUnsplash", viewBox: "0 0 32 32", height: "32", width: "32", "aria-hidden": "true", children: _jsxs("g", { fill: "currentcolor", children: [_jsx("path", { d: "M46.575 10.883v-9h12v9zm12 5h10v18h-32v-18h10v9h12z" }), _jsx("path", { d: "M13 12.5V8h6v4.5zm6 2.5h5v9H8v-9h5v4.5h6z" })] }) }));
        if (!this.opts.companionUrl) {
            throw new Error('Companion hostname is required, please consult https://uppy.io/docs/companion');
        }
        this.hostname = this.opts.companionUrl;
        this.opts.companionAllowedHosts = getAllowedHosts(this.opts.companionAllowedHosts, this.opts.companionUrl);
        this.provider = new SearchProvider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: 'unsplash',
            pluginId: this.id,
        });
    }
    install() {
        this.view = new SearchProviderViews(this, {
            provider: this.provider,
            viewType: 'unsplash',
            showFilter: true,
            utmSource: this.opts.utmSource,
        });
        const { target } = this.opts;
        if (target) {
            this.mount(target, this);
        }
    }
    render(state) {
        return this.view.render(state);
    }
    uninstall() {
        this.unmount();
    }
}
