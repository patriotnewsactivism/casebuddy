import type { Body, Meta, Uppy, UppyEventMap } from '@uppy/core';
type EventResults<M extends Meta, B extends Body, K extends keyof UppyEventMap<M, B>> = Parameters<UppyEventMap<M, B>[K]>;
export default function useUppyEvent<M extends Meta, B extends Body, K extends keyof UppyEventMap<M, B>>(uppy: Uppy<M, B>, event: K, callback?: (...args: EventResults<M, B, K>) => void): [EventResults<M, B, K> | [], () => void];
export {};
//# sourceMappingURL=useUppyEvent.d.ts.map