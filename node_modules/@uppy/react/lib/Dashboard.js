import DashboardPlugin from '@uppy/dashboard';
import { Component, createElement as h } from 'react';
import getHTMLProps from './getHTMLProps.js';
import nonHtmlPropsHaveChanged from './nonHtmlPropsHaveChanged.js';
/**
 * React Component that renders a Dashboard for an Uppy instance. This component
 * renders the Dashboard inline, so you can put it anywhere you want.
 */
class Dashboard extends Component {
    container;
    plugin;
    componentDidMount() {
        this.installPlugin();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.uppy !== this.props.uppy) {
            this.uninstallPlugin(prevProps);
            this.installPlugin();
        }
        else if (nonHtmlPropsHaveChanged(this.props, prevProps)) {
            const { uppy, ...options } = { ...this.props, target: this.container };
            this.plugin.setOptions(options);
        }
    }
    componentWillUnmount() {
        this.uninstallPlugin();
    }
    installPlugin() {
        const { uppy, ...options } = {
            id: 'Dashboard',
            ...this.props,
            inline: true,
            target: this.container,
        };
        uppy.use((DashboardPlugin), options);
        this.plugin = uppy.getPlugin(options.id);
    }
    uninstallPlugin(props = this.props) {
        const { uppy } = props;
        uppy.removePlugin(this.plugin);
    }
    render() {
        return h('div', {
            className: 'uppy-Container',
            ref: (container) => {
                this.container = container;
            },
            ...getHTMLProps(this.props),
        });
    }
}
export default Dashboard;
