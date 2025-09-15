import { type NonNullableUppyContext, type UploadStatus } from '@uppy/components';
import type Uppy from '@uppy/core';
import type React from 'react';
interface UppyContextValue {
    uppy: Uppy | undefined;
    status: UploadStatus;
    progress: number;
}
export declare const UppyContext: React.Context<UppyContextValue>;
interface Props {
    uppy: Uppy;
    children: React.ReactNode;
}
export declare function UppyContextProvider({ uppy, children }: Props): import("react/jsx-runtime").JSX.Element;
export default UppyContextProvider;
export declare function useUppyContext(): NonNullableUppyContext;
//# sourceMappingURL=UppyContextProvider.d.ts.map