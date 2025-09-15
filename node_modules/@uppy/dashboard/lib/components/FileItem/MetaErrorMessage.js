import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
const metaFieldIdToName = (metaFieldId, metaFields) => {
    const fields = typeof metaFields === 'function' ? metaFields() : metaFields;
    const field = fields.filter((f) => f.id === metaFieldId);
    return field[0].name;
};
export default function MetaErrorMessage(props) {
    const { file, toggleFileCard, i18n, metaFields } = props;
    const { missingRequiredMetaFields } = file;
    if (!missingRequiredMetaFields?.length) {
        return null;
    }
    const metaFieldsString = missingRequiredMetaFields
        .map((missingMetaField) => metaFieldIdToName(missingMetaField, metaFields))
        .join(', ');
    return (_jsxs("div", { className: "uppy-Dashboard-Item-errorMessage", children: [i18n('missingRequiredMetaFields', {
                smart_count: missingRequiredMetaFields.length,
                fields: metaFieldsString,
            }), ' ', _jsx("button", { type: "button", class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn", onClick: () => toggleFileCard(true, file.id), children: i18n('editFile') })] }));
}
