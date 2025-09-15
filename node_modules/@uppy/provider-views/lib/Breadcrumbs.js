import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Fragment } from 'preact';
export default function Breadcrumbs(props) {
    const { openFolder, title, breadcrumbsIcon, breadcrumbs, i18n } = props;
    return (_jsxs("div", { className: "uppy-Provider-breadcrumbs", children: [_jsx("div", { className: "uppy-Provider-breadcrumbsIcon", children: breadcrumbsIcon }), breadcrumbs.map((folder, index) => (_jsxs(Fragment, { children: [_jsx("button", { type: "button", className: "uppy-u-reset uppy-c-btn", onClick: () => openFolder(folder.id), children: folder.type === 'root'
                            ? title
                            : (folder.data.name ?? i18n('unnamed')) }, folder.id), breadcrumbs.length === index + 1 ? '' : ' / '] })))] }));
}
