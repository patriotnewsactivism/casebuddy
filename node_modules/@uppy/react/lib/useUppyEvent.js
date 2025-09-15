import { useEffect, useState } from 'react';
export default function useUppyEvent(uppy, event, callback) {
    const [result, setResult] = useState([]);
    const clear = () => setResult([]);
    useEffect(() => {
        const handler = ((...args) => {
            setResult(args);
            callback?.(...args);
        });
        uppy.on(event, handler);
        return function cleanup() {
            uppy.off(event, handler);
        };
    }, [uppy, event, callback]);
    return [result, clear];
}
