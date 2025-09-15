import { createFileInput } from '@uppy/components';
import { useMemo } from 'react';
import { useUppyContext } from './headless/UppyContextProvider.js';
export function useFileInput(props) {
    const ctx = useUppyContext();
    const fileInput = useMemo(() => createFileInput(ctx, props), 
    // We need every value on props to be memoized to avoid re-creating the file input on every render
    [ctx, props?.accept, props?.multiple, props]);
    return fileInput;
}
