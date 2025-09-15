import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Component } from 'preact';
import FadeIn from './FadeIn.js';
import TransitionGroup from './TransitionGroup.js';
export default class Informer extends Component {
    render() {
        // Get info from the uppy instance passed in props
        const { info } = this.props.uppy.getState();
        return (_jsx("div", { className: "uppy uppy-Informer", children: _jsx(TransitionGroup, { children: info.map((info) => (_jsx(FadeIn, { children: _jsxs("p", { role: "alert", children: [info.message, ' ', info.details && (
                            // biome-ignore lint/a11y/useKeyWithClickEvents: don't think it's needed
                            _jsx("span", { "aria-label": info.details, "data-microtip-position": "top-left", "data-microtip-size": "medium", role: "tooltip", onClick: () => alert(`${info.message} \n\n ${info.details}`), children: "?" }))] }) }, info.message))) }) }));
    }
}
