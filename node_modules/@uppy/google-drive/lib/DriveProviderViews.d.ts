import type { Body, Meta, PartialTreeFile, PartialTreeFolderNode } from '@uppy/core';
import { ProviderViews } from '@uppy/provider-views';
export default class DriveProviderViews<M extends Meta, B extends Body> extends ProviderViews<M, B> {
    toggleCheckbox(item: PartialTreeFolderNode | PartialTreeFile, isShiftKeyPressed: boolean): void;
}
//# sourceMappingURL=DriveProviderViews.d.ts.map