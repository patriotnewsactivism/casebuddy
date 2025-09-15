import Box from '@uppy/box';
import type { CompanionPluginOptions } from '@uppy/companion-client';
import type { Body, DefinePluginOpts, Meta, Uppy } from '@uppy/core';
import { BasePlugin } from '@uppy/core';
import Dropbox from '@uppy/dropbox';
import Facebook from '@uppy/facebook';
import GoogleDrive from '@uppy/google-drive';
import Instagram from '@uppy/instagram';
import OneDrive from '@uppy/onedrive';
import Unsplash from '@uppy/unsplash';
import Url from '@uppy/url';
import Zoom from '@uppy/zoom';
export declare const availablePlugins: {
    __proto__: null;
    Box: typeof Box;
    Dropbox: typeof Dropbox;
    Facebook: typeof Facebook;
    GoogleDrive: typeof GoogleDrive;
    Instagram: typeof Instagram;
    OneDrive: typeof OneDrive;
    Unsplash: typeof Unsplash;
    Url: typeof Url;
    Zoom: typeof Zoom;
};
export type AvailablePluginsKeys = 'Box' | 'Dropbox' | 'Facebook' | 'GoogleDrive' | 'Instagram' | 'OneDrive' | 'Unsplash' | 'Url' | 'Zoom';
type NestedCompanionKeysParams = {
    [key in AvailablePluginsKeys]?: CompanionPluginOptions['companionKeysParams'];
};
export interface RemoteSourcesOptions extends Omit<CompanionPluginOptions, 'companionKeysParams'> {
    sources?: Array<AvailablePluginsKeys>;
    companionKeysParams?: NestedCompanionKeysParams;
}
declare const defaultOptions: {
    sources: Array<AvailablePluginsKeys>;
};
type Opts = DefinePluginOpts<RemoteSourcesOptions, keyof typeof defaultOptions>;
export default class RemoteSources<M extends Meta, B extends Body> extends BasePlugin<Opts, M, B> {
    #private;
    static VERSION: string;
    constructor(uppy: Uppy<M, B>, opts: RemoteSourcesOptions);
    setOptions(newOpts: Partial<Opts>): void;
    install(): void;
    uninstall(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map