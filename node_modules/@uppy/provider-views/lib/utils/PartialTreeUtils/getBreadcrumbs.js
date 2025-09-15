const getBreadcrumbs = (partialTree, currentFolderId) => {
    let folder = partialTree.find((f) => f.id === currentFolderId);
    let breadcrumbs = [];
    while (true) {
        breadcrumbs = [folder, ...breadcrumbs];
        if (folder.type === 'root')
            break;
        const currentParentId = folder.parentId;
        folder = partialTree.find((f) => f.id === currentParentId);
    }
    return breadcrumbs;
};
export default getBreadcrumbs;
