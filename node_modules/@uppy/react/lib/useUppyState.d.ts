import type { Body, Meta, State, Uppy } from '@uppy/core';
export default function useUppyState<M extends Meta = Meta, B extends Body = Body, T = any>(uppy: Uppy<M, B>, selector: (state: State<M, B>) => T): T;
//# sourceMappingURL=useUppyState.d.ts.map