import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Fragment } from 'preact';
export default function User({ i18n, logout, username }) {
    return (_jsxs(Fragment, { children: [username && (_jsx("span", { className: "uppy-ProviderBrowser-user", children: username }, "username")), _jsx("button", { type: "button", onClick: logout, className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-userLogout", children: i18n('logOut') }, "logout")] }));
}
