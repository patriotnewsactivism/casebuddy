import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import getFileTypeIcon from '../../../utils/getFileTypeIcon.js';
import FilePreview from '../../FilePreview.js';
import MetaErrorMessage from '../MetaErrorMessage.js';
export default function FilePreviewAndLink(props) {
    const { file, i18n, toggleFileCard, metaFields, showLinkToFileUploadResult } = props;
    const white = 'rgba(255, 255, 255, 0.5)';
    const previewBackgroundColor = file.preview
        ? white
        : getFileTypeIcon(file.type).color;
    return (_jsxs("div", { className: "uppy-Dashboard-Item-previewInnerWrap", style: { backgroundColor: previewBackgroundColor }, children: [showLinkToFileUploadResult && file.uploadURL && (_jsx("a", { className: "uppy-Dashboard-Item-previewLink", href: file.uploadURL, rel: "noreferrer noopener", target: "_blank", "aria-label": file.meta.name, children: _jsx("span", { hidden: true, children: file.meta.name }) })), _jsx(FilePreview, { file: file }), _jsx(MetaErrorMessage, { file: file, i18n: i18n, toggleFileCard: toggleFileCard, metaFields: metaFields })] }));
}
