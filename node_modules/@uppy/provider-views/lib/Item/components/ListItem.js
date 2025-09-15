import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import ItemIcon from './ItemIcon.js';
export default function ListItem({ file, openFolder, className, isDisabled, restrictionError, toggleCheckbox, showTitles, i18n, }) {
    return (_jsxs("li", { className: className, title: file.status !== 'checked' && restrictionError
            ? restrictionError
            : undefined, children: [_jsx("input", { type: "checkbox", className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox", onChange: toggleCheckbox, 
                // for the <label/>
                name: "listitem", id: file.id, checked: file.status === 'checked', "aria-label": file.data.isFolder
                    ? i18n('allFilesFromFolderNamed', {
                        name: file.data.name ?? i18n('unnamed'),
                    })
                    : null, disabled: isDisabled, "data-uppy-super-focusable": true }), file.data.isFolder ? (
            // button to open a folder
            _jsxs("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner", onClick: () => openFolder(file.id), "aria-label": i18n('openFolderNamed', {
                    name: file.data.name ?? i18n('unnamed'),
                }), children: [_jsx("div", { className: "uppy-ProviderBrowserItem-iconWrap", children: _jsx(ItemIcon, { itemIconString: file.data.icon }) }), showTitles && file.data.name ? (_jsx("span", { children: file.data.name })) : (i18n('unnamed'))] })) : (
            // label for a checkbox
            _jsxs("label", { htmlFor: file.id, className: "uppy-u-reset uppy-ProviderBrowserItem-inner", children: [_jsx("div", { className: "uppy-ProviderBrowserItem-iconWrap", children: _jsx(ItemIcon, { itemIconString: file.data.icon }) }), showTitles && (file.data.name ?? i18n('unnamed'))] }))] }));
}
