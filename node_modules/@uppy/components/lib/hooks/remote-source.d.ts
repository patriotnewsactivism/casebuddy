import type Uppy from '@uppy/core';
import type { PartialTreeFolder, UnknownProviderPluginState } from '@uppy/core';
import type { ProviderViews } from '@uppy/provider-views';
import type { AvailablePluginsKeys } from '@uppy/remote-sources';
export type { AvailablePluginsKeys as RemoteSourceKeys };
export type RemoteSourceSnapshot = {
    state: UnknownProviderPluginState & {
        breadcrumbs: PartialTreeFolder[];
        selectedAmount: number;
        error: string | null;
    };
    login: ProviderViews<any, any>['handleAuth'];
    logout: ProviderViews<any, any>['logout'];
    open: ProviderViews<any, any>['openFolder'];
    checkbox: ProviderViews<any, any>['toggleCheckbox'];
    done: ProviderViews<any, any>['donePicking'];
    cancel: ProviderViews<any, any>['cancelSelection'];
};
export type RemoteSourceStore = {
    subscribe: (listener: () => void) => () => void;
    getSnapshot: () => RemoteSourceSnapshot;
    mount: () => void;
    unmount: () => void;
};
export declare function createRemoteSourceController(uppy: Uppy, sourceId: AvailablePluginsKeys): RemoteSourceStore;
//# sourceMappingURL=remote-source.d.ts.map