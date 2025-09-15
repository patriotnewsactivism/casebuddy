import type { UIPluginOptions, Uppy } from '@uppy/core';
import { Component, type ComponentChild } from 'preact';
export type InformerOptions = UIPluginOptions;
/**
 * Informer
 * Shows rad message bubbles
 * used like this: `uppy.info('hello world', 'info', 5000)`
 * or for errors: `uppy.info('Error uploading img.jpg', 'error', 5000)`
 *
 */
type InformerProps = {
    uppy: Uppy<any, any>;
};
export default class Informer extends Component<InformerProps> {
    render(): ComponentChild;
}
export {};
//# sourceMappingURL=Informer.d.ts.map