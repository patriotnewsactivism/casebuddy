import type { Body, Meta, PartialTree } from '@uppy/core';
import type { I18n } from '@uppy/utils';
import type ProviderView from './ProviderView/ProviderView.js';
export default function FooterActions<M extends Meta, B extends Body>({ cancelSelection, donePicking, i18n, partialTree, validateAggregateRestrictions, }: {
    cancelSelection: ProviderView<M, B>['cancelSelection'];
    donePicking: ProviderView<M, B>['donePicking'];
    i18n: I18n;
    partialTree: PartialTree;
    validateAggregateRestrictions: ProviderView<M, B>['validateAggregateRestrictions'];
}): import("preact").JSX.Element | null;
//# sourceMappingURL=FooterActions.d.ts.map