import type { Body, Meta, Uppy } from '@uppy/core';
import { type DashboardOptions } from '@uppy/dashboard';
import type React from 'react';
import { Component } from 'react';
type DashboardInlineOptions<M extends Meta, B extends Body> = Omit<DashboardOptions<M, B> & {
    inline: false;
}, 'inline' | 'onRequestCloseModal'> & React.BaseHTMLAttributes<HTMLDivElement>;
export interface DashboardModalProps<M extends Meta, B extends Body> extends DashboardInlineOptions<M, B> {
    uppy: Uppy<M, B>;
    onRequestClose?: () => void;
    open?: boolean;
}
/**
 * React Component that renders a Dashboard for an Uppy instance in a Modal
 * dialog. Visibility of the Modal is toggled using the `open` prop.
 */
declare class DashboardModal<M extends Meta, B extends Body> extends Component<DashboardModalProps<M, B>> {
    static defaultProps: {
        open: undefined;
        onRequestClose: undefined;
    };
    private container;
    private plugin;
    componentDidMount(): void;
    componentDidUpdate(prevProps: DashboardModal<M, B>['props']): void;
    componentWillUnmount(): void;
    installPlugin(): void;
    uninstallPlugin(props?: Readonly<DashboardModalProps<M, B>>): void;
    render(): React.DetailedReactHTMLElement<{
        className: string;
        ref: (container: HTMLElement) => void;
    }, HTMLElement>;
}
export default DashboardModal;
//# sourceMappingURL=DashboardModal.d.ts.map