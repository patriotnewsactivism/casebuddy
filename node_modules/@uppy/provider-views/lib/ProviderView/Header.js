import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import classNames from 'classnames';
import Breadcrumbs from '../Breadcrumbs.js';
import User from './User.js';
export default function Header(props) {
    return (_jsx("div", { className: "uppy-ProviderBrowser-header", children: _jsxs("div", { className: classNames('uppy-ProviderBrowser-headerBar', !props.showBreadcrumbs && 'uppy-ProviderBrowser-headerBar--simple'), children: [props.showBreadcrumbs && (_jsx(Breadcrumbs, { openFolder: props.openFolder, breadcrumbs: props.breadcrumbs, breadcrumbsIcon: props.pluginIcon?.(), title: props.title, i18n: props.i18n })), _jsx(User, { logout: props.logout, username: props.username, i18n: props.i18n })] }) }));
}
