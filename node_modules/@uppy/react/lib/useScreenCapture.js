import { createScreenCaptureController, } from '@uppy/components';
import { useMemo } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim/index.js';
import { useUppyContext } from './headless/UppyContextProvider.js';
export function useScreenCapture({ onSubmit, }) {
    const { uppy } = useUppyContext();
    const controller = useMemo(() => createScreenCaptureController(uppy, onSubmit), [uppy, onSubmit]);
    const store = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot);
    return store;
}
