import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import getFileTypeIcon from '../utils/getFileTypeIcon.js';
export default function FilePreview(props) {
    const { file } = props;
    if (file.preview) {
        return (_jsx("img", { draggable: false, className: "uppy-Dashboard-Item-previewImg", alt: file.name, src: file.preview }));
    }
    const { color, icon } = getFileTypeIcon(file.type);
    return (_jsxs("div", { className: "uppy-Dashboard-Item-previewIconWrap", children: [_jsx("span", { className: "uppy-Dashboard-Item-previewIcon", style: { color }, children: icon }), _jsx("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-Dashboard-Item-previewIconBg", width: "58", height: "76", viewBox: "0 0 58 76", children: _jsx("rect", { fill: "#FFF", width: "58", height: "76", rx: "3", fillRule: "evenodd" }) })] }));
}
