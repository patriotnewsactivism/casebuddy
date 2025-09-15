import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { getAllowedHosts, Provider, tokenStorage, } from '@uppy/companion-client';
import { UIPlugin } from '@uppy/core';
import { ProviderViews } from '@uppy/provider-views';
// biome-ignore lint/style/useImportType: h is not a type
import { h } from 'preact';
import packageJson from '../package.json' with { type: 'json' };
import locale from './locale.js';
export default class Facebook extends UIPlugin {
    static VERSION = packageJson.version;
    icon;
    provider;
    view;
    storage;
    files;
    rootFolderId = null;
    constructor(uppy, opts) {
        super(uppy, opts);
        this.id = this.opts.id || 'Facebook';
        this.type = 'acquirer';
        this.storage = this.opts.storage || tokenStorage;
        this.files = [];
        this.icon = () => (_jsx("svg", { "aria-hidden": "true", focusable: "false", width: "32", height: "32", viewBox: "0 0 32 32", children: _jsxs("g", { fill: "none", fillRule: "evenodd", children: [_jsx("path", { d: "M27 16c0-6.075-4.925-11-11-11S5 9.925 5 16c0 5.49 4.023 10.041 9.281 10.866V19.18h-2.793V16h2.793v-2.423c0-2.757 1.642-4.28 4.155-4.28 1.204 0 2.462.215 2.462.215v2.707h-1.387c-1.366 0-1.792.848-1.792 1.718V16h3.05l-.487 3.18h-2.563v7.686C22.977 26.041 27 21.49 27 16", fill: "#1777F2" }), _jsx("path", { d: "M20.282 19.18L20.77 16h-3.051v-2.063c0-.87.426-1.718 1.792-1.718h1.387V9.512s-1.258-.215-2.462-.215c-2.513 0-4.155 1.523-4.155 4.28V16h-2.793v3.18h2.793v7.686a11.082 11.082 0 003.438 0V19.18h2.563", fill: "#FFFFFE" })] }) }));
        this.opts.companionAllowedHosts = getAllowedHosts(this.opts.companionAllowedHosts, this.opts.companionUrl);
        this.provider = new Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: 'facebook',
            pluginId: this.id,
            supportsRefreshToken: false,
        });
        this.defaultLocale = locale;
        this.i18nInit();
        this.title = this.i18n('pluginNameFacebook');
        this.render = this.render.bind(this);
    }
    install() {
        this.view = new ProviderViews(this, {
            provider: this.provider,
        });
        const { target } = this.opts;
        if (target) {
            this.mount(target, this);
        }
    }
    uninstall() {
        this.view.tearDown();
        this.unmount();
    }
    render(state) {
        const { partialTree, currentFolderId } = this.getPluginState();
        const foldersInThisFolder = partialTree.filter((i) => i.type === 'folder' && i.parentId === currentFolderId);
        if (foldersInThisFolder.length === 0) {
            return this.view.render(state, {
                viewType: 'grid',
                showFilter: false,
                showTitles: false,
            });
        }
        return this.view.render(state);
    }
}
