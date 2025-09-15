import { jsx as _jsx } from "react/jsx-runtime";
import { createUppyEventAdapter, } from '@uppy/components';
import { createContext, useContext, useEffect, useState } from 'react';
export const UppyContext = createContext({
    uppy: undefined,
    status: 'init',
    progress: 0,
});
export function UppyContextProvider({ uppy, children }) {
    const [status, setStatus] = useState('init');
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (!uppy) {
            throw new Error('UppyContextProvider: passing `uppy` as a prop is required');
        }
        const uppyEventAdapter = createUppyEventAdapter({
            uppy,
            onStatusChange: (newStatus) => {
                setStatus(newStatus);
            },
            onProgressChange: (newProgress) => {
                setProgress(newProgress);
            },
        });
        return () => uppyEventAdapter.cleanup();
    }, [uppy]);
    return (_jsx(UppyContext.Provider, { value: {
            uppy,
            status,
            progress,
        }, children: children }));
}
export default UppyContextProvider;
export function useUppyContext() {
    const ctx = useContext(UppyContext);
    if (!ctx.uppy) {
        throw new Error('Uppy hooks must be called within a UppyContextProvider');
    }
    return ctx; // covered by the if statement above
}
