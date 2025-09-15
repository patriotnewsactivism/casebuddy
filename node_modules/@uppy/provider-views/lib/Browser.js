import { jsx as _jsx } from "preact/jsx-runtime";
import { VirtualList } from '@uppy/utils';
import { useEffect, useState } from 'preact/hooks';
import Item from './Item/index.js';
function Browser(props) {
    const { displayedPartialTree, viewType, toggleCheckbox, handleScroll, showTitles, i18n, isLoading, openFolder, noResultsLabel, virtualList, utmSource, } = props;
    const [isShiftKeyPressed, setIsShiftKeyPressed] = useState(false);
    // This records whether the user is holding the SHIFT key this very moment.
    // Typically, this is implemented using `onClick((e) => e.shiftKey)` -
    // however we can't use that, because for accessibility reasons
    // we're using html tags that don't support `e.shiftKey` property (see #3768).
    useEffect(() => {
        const handleKeyUp = (e) => {
            if (e.key === 'Shift')
                setIsShiftKeyPressed(false);
        };
        const handleKeyDown = (e) => {
            if (e.key === 'Shift')
                setIsShiftKeyPressed(true);
        };
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    if (isLoading) {
        return (_jsx("div", { className: "uppy-Provider-loading", children: typeof isLoading === 'string' ? isLoading : i18n('loading') }));
    }
    if (displayedPartialTree.length === 0) {
        return _jsx("div", { className: "uppy-Provider-empty", children: noResultsLabel });
    }
    const renderItem = (item) => (_jsx(Item, { viewType: viewType, toggleCheckbox: (event) => {
            event.stopPropagation();
            event.preventDefault();
            // Prevent shift-clicking from highlighting file names
            // (https://stackoverflow.com/a/1527797/3192470)
            document.getSelection()?.removeAllRanges();
            toggleCheckbox(item, isShiftKeyPressed);
        }, showTitles: showTitles, i18n: i18n, openFolder: openFolder, file: item, utmSource: utmSource }, item.id));
    // todo remove virtuallist option and always use virtual list
    if (virtualList) {
        return (_jsx("div", { className: "uppy-ProviderBrowser-body", children: _jsx(VirtualList, { className: "uppy-ProviderBrowser-list", data: displayedPartialTree, renderRow: renderItem, rowHeight: 35.5 }) }));
    }
    return (_jsx("div", { className: "uppy-ProviderBrowser-body", children: _jsx("ul", { className: "uppy-ProviderBrowser-list", onScroll: handleScroll, 
            // making <ul> not focusable for firefox
            tabIndex: -1, children: displayedPartialTree.map(renderItem) }) }));
}
export default Browser;
