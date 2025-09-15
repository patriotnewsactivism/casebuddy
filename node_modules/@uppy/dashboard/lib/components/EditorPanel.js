import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import classNames from 'classnames';
function EditorPanel(props) {
    const file = props.files[props.fileCardFor];
    const handleCancel = () => {
        props.uppy.emit('file-editor:cancel', file);
        props.closeFileEditor();
    };
    return (_jsxs("div", { className: classNames('uppy-DashboardContent-panel', props.className), role: "tabpanel", "data-uppy-panelType": "FileEditor", id: "uppy-DashboardContent-panel--editor", children: [_jsxs("div", { className: "uppy-DashboardContent-bar", children: [_jsx("div", { className: "uppy-DashboardContent-title", 
                        // biome-ignore lint/a11y/useSemanticElements: ...
                        role: "heading", "aria-level": 1, children: props.i18nArray('editing', {
                            file: (_jsx("span", { className: "uppy-DashboardContent-titleFile", children: file.meta ? file.meta.name : file.name })),
                        }) }), _jsx("button", { className: "uppy-DashboardContent-back", type: "button", onClick: handleCancel, children: props.i18n('cancel') }), _jsx("button", { className: "uppy-DashboardContent-save", type: "button", onClick: props.saveFileEditor, children: props.i18n('save') })] }), _jsx("div", { className: "uppy-DashboardContent-panelBody", children: props.editors.map((target) => {
                    return props.uppy.getPlugin(target.id).render(props.state);
                }) })] }));
}
export default EditorPanel;
