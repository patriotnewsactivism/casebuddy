import { jsx as _jsx } from "preact/jsx-runtime";
import classNames from 'classnames';
import GridItem from './components/GridItem.js';
import ListItem from './components/ListItem.js';
export default function Item(props) {
    const { viewType, toggleCheckbox, showTitles, i18n, openFolder, file, utmSource, } = props;
    const restrictionError = file.type === 'folder' ? null : file.restrictionError;
    const isDisabled = !!restrictionError && file.status !== 'checked';
    const ourProps = {
        file,
        openFolder,
        toggleCheckbox,
        utmSource,
        i18n,
        viewType,
        showTitles,
        className: classNames('uppy-ProviderBrowserItem', { 'uppy-ProviderBrowserItem--disabled': isDisabled }, { 'uppy-ProviderBrowserItem--noPreview': file.data.icon === 'video' }, { 'uppy-ProviderBrowserItem--is-checked': file.status === 'checked' }, { 'uppy-ProviderBrowserItem--is-partial': file.status === 'partial' }),
        isDisabled,
        restrictionError,
    };
    switch (viewType) {
        case 'grid':
            return _jsx(GridItem, { ...ourProps });
        case 'list':
            return _jsx(ListItem, { ...ourProps });
        case 'unsplash':
            return (_jsx(GridItem, { ...ourProps, children: _jsx("a", { href: `${file.data.author.url}?utm_source=${utmSource}&utm_medium=referral`, target: "_blank", rel: "noopener noreferrer", className: "uppy-ProviderBrowserItem-author", tabIndex: -1, children: file.data.author.name }) }));
        default:
            throw new Error(`There is no such type ${viewType}`);
    }
}
