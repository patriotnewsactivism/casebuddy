import { useCallback, useMemo } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector.js';
export default function useUppyState(uppy, selector) {
    const subscribe = useMemo(() => uppy.store.subscribe.bind(uppy.store), [uppy.store]);
    const getSnapshot = useCallback(() => uppy.store.getState(), [uppy.store]);
    return useSyncExternalStoreWithSelector(subscribe, getSnapshot, // client
    getSnapshot, // server
    selector);
}
