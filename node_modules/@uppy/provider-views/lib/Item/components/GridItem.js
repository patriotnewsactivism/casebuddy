import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import ItemIcon from './ItemIcon.js';
function GridItem({ file, toggleCheckbox, className, isDisabled, restrictionError, showTitles, children = null, i18n, }) {
    return (_jsxs("li", { className: className, title: isDisabled && restrictionError ? restrictionError : undefined, children: [_jsx("input", { type: "checkbox", className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox uppy-ProviderBrowserItem-checkbox--grid", onChange: toggleCheckbox, name: "listitem", id: file.id, checked: file.status === 'checked', disabled: isDisabled, "data-uppy-super-focusable": true }), _jsxs("label", { htmlFor: file.id, "aria-label": file.data.name ?? i18n('unnamed'), className: "uppy-u-reset uppy-ProviderBrowserItem-inner", children: [_jsx(ItemIcon, { itemIconString: file.data.thumbnail || file.data.icon }), showTitles && (file.data.name ?? i18n('unnamed')), children] })] }));
}
export default GridItem;
