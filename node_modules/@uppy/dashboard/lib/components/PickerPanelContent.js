import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import classNames from 'classnames';
import { useRef } from 'preact/hooks';
import ignoreEvent from '../utils/ignoreEvent.js';
function PickerPanelContent({ activePickerPanel, className, hideAllPanels, i18n, state, uppy, }) {
    const ref = useRef(null);
    return (_jsxs("div", { className: classNames('uppy-DashboardContent-panel', className), role: "tabpanel", "data-uppy-panelType": "PickerPanel", id: `uppy-DashboardContent-panel--${activePickerPanel.id}`, onDragOver: ignoreEvent, onDragLeave: ignoreEvent, onDrop: ignoreEvent, onPaste: ignoreEvent, children: [_jsxs("div", { className: "uppy-DashboardContent-bar", children: [_jsx("div", { className: "uppy-DashboardContent-title", 
                        // biome-ignore lint/a11y/useSemanticElements: ...
                        role: "heading", "aria-level": 1, children: i18n('importFrom', { name: activePickerPanel.name }) }), _jsx("button", { className: "uppy-DashboardContent-back", type: "button", onClick: hideAllPanels, children: i18n('cancel') })] }), _jsx("div", { ref: ref, className: "uppy-DashboardContent-panelBody", children: uppy.getPlugin(activePickerPanel.id).render(state, ref.current) })] }));
}
export default PickerPanelContent;
