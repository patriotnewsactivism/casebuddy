import { createDropzone, } from '@uppy/components';
import { useMemo } from 'react';
import { useUppyContext } from './headless/UppyContextProvider.js';
export function useDropzone(options) {
    const ctx = useUppyContext();
    const dropzone = useMemo(() => createDropzone(ctx, options), 
    // We need every value on options to be memoized to avoid re-creating the dropzone on every render
    [
        ctx,
        options?.noClick,
        options?.onDragOver,
        options?.onDragEnter,
        options?.onDragLeave,
        options?.onDrop,
        options?.onFileInputChange,
        options,
    ]);
    return dropzone;
}
