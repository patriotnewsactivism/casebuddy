import DashboardPlugin, {} from '@uppy/dashboard';
import { Component, createElement as h } from 'react';
import getHTMLProps from './getHTMLProps.js';
import nonHtmlPropsHaveChanged from './nonHtmlPropsHaveChanged.js';
/**
 * React Component that renders a Dashboard for an Uppy instance in a Modal
 * dialog. Visibility of the Modal is toggled using the `open` prop.
 */
class DashboardModal extends Component {
    static defaultProps = {
        open: undefined,
        onRequestClose: undefined,
    };
    container;
    plugin;
    componentDidMount() {
        this.installPlugin();
    }
    componentDidUpdate(prevProps) {
        const { uppy, open, onRequestClose } = this.props;
        if (prevProps.uppy !== uppy) {
            this.uninstallPlugin(prevProps);
            this.installPlugin();
        }
        else if (nonHtmlPropsHaveChanged(this.props, prevProps)) {
            const { uppy, ...options } = {
                ...this.props,
                inline: false,
                onRequestCloseModal: onRequestClose,
            };
            this.plugin.setOptions(options);
        }
        if (prevProps.open && !open) {
            this.plugin.closeModal();
        }
        else if (!prevProps.open && open) {
            this.plugin.openModal();
        }
    }
    componentWillUnmount() {
        this.uninstallPlugin();
    }
    installPlugin() {
        const { target = this.container, open, onRequestClose, uppy, ...rest } = this.props;
        const options = {
            id: 'DashboardModal',
            ...rest,
            inline: false,
            target,
            open,
            onRequestCloseModal: onRequestClose,
        };
        uppy.use((DashboardPlugin), options);
        this.plugin = uppy.getPlugin(options.id);
        if (open) {
            this.plugin.openModal();
        }
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
export default DashboardModal;
