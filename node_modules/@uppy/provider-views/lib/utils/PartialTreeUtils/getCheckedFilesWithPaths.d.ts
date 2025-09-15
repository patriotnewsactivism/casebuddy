import type { PartialTree, PartialTreeFile, PartialTreeFolderNode } from '@uppy/core';
import type { CompanionFile } from '@uppy/utils';
export interface Cache {
    [key: string]: (PartialTreeFile | PartialTreeFolderNode)[];
}
declare const getCheckedFilesWithPaths: (partialTree: PartialTree) => CompanionFile[];
export default getCheckedFilesWithPaths;
//# sourceMappingURL=getCheckedFilesWithPaths.d.ts.map