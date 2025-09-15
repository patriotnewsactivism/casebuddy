import type { Body, Meta, Uppy } from '@uppy/core';
import type { DashboardOptions } from '@uppy/dashboard';
import type React from 'react';
import { Component } from 'react';
type DashboardInlineOptions<M extends Meta, B extends Body> = Omit<DashboardOptions<M, B> & {
    inline: true;
}, 'inline'> & React.BaseHTMLAttributes<HTMLDivElement>;
export interface DashboardProps<M extends Meta, B extends Body> extends DashboardInlineOptions<M, B> {
    uppy: Uppy<M, B>;
}
/**
 * React Component that renders a Dashboard for an Uppy instance. This component
 * renders the Dashboard inline, so you can put it anywhere you want.
 */
declare class Dashboard<M extends Meta, B extends Body> extends Component<DashboardProps<M, B>> {
    private container;
    private plugin;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Dashboard<M, B>['props']): void;
    componentWillUnmount(): void;
    installPlugin(): void;
    uninstallPlugin(props?: Readonly<DashboardProps<M, B>>): void;
    render(): React.DetailedReactHTMLElement<{
        className: string;
        ref: (container: HTMLElement) => void;
    }, HTMLElement>;
}
export default Dashboard;
//# sourceMappingURL=Dashboard.d.ts.map