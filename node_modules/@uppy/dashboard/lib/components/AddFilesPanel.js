import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import classNames from 'classnames';
import AddFiles from './AddFiles.js';
const AddFilesPanel = (props) => {
    return (_jsxs("div", { className: classNames('uppy-Dashboard-AddFilesPanel', props.className), "data-uppy-panelType": "AddFiles", "aria-hidden": !props.showAddFilesPanel, children: [_jsxs("div", { className: "uppy-DashboardContent-bar", children: [_jsx("div", { className: "uppy-DashboardContent-title", 
                        // biome-ignore lint/a11y/useSemanticElements: ...
                        role: "heading", "aria-level": 1, children: props.i18n('addingMoreFiles') }), _jsx("button", { className: "uppy-DashboardContent-back", type: "button", onClick: () => props.toggleAddFilesPanel(false), children: props.i18n('back') })] }), _jsx(AddFiles, { ...props })] }));
};
export default AddFilesPanel;
