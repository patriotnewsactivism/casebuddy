import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { h } from 'preact';
export default function RenderMetaFields(props) {
    const { computedMetaFields, requiredMetaFields, updateMeta, form, formState, } = props;
    const fieldCSSClasses = {
        text: 'uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input',
    };
    return computedMetaFields.map((field) => {
        const id = `uppy-Dashboard-FileCard-input-${field.id}`;
        const required = requiredMetaFields.includes(field.id);
        return (_jsxs("fieldset", { className: "uppy-Dashboard-FileCard-fieldset", children: [_jsx("label", { className: "uppy-Dashboard-FileCard-label", htmlFor: id, children: field.name }), field.render !== undefined ? (field.render({
                    value: formState[field.id],
                    onChange: (newVal) => updateMeta(newVal, field.id),
                    fieldCSSClasses,
                    required,
                    form: form.id,
                }, h)) : (_jsx("input", { className: fieldCSSClasses.text, id: id, form: form.id, type: field.type || 'text', required: required, value: formState[field.id], placeholder: field.placeholder, onInput: (ev) => updateMeta(ev.target.value, field.id), "data-uppy-super-focusable": true }))] }, field.id));
    });
}
