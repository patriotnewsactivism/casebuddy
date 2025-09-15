import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import classNames from 'classnames';
import { useMemo } from 'preact/hooks';
import getNumberOfSelectedFiles from './utils/PartialTreeUtils/getNumberOfSelectedFiles.js';
export default function FooterActions({ cancelSelection, donePicking, i18n, partialTree, validateAggregateRestrictions, }) {
    const aggregateRestrictionError = useMemo(() => {
        return validateAggregateRestrictions(partialTree);
    }, [partialTree, validateAggregateRestrictions]);
    const nOfSelectedFiles = useMemo(() => {
        return getNumberOfSelectedFiles(partialTree);
    }, [partialTree]);
    if (nOfSelectedFiles === 0) {
        return null;
    }
    return (_jsxs("div", { className: "uppy-ProviderBrowser-footer", children: [_jsxs("div", { className: "uppy-ProviderBrowser-footer-buttons", children: [_jsx("button", { className: classNames('uppy-u-reset uppy-c-btn uppy-c-btn-primary', {
                            'uppy-c-btn--disabled': aggregateRestrictionError,
                        }), disabled: !!aggregateRestrictionError, onClick: donePicking, type: "button", children: i18n('selectX', {
                            smart_count: nOfSelectedFiles,
                        }) }), _jsx("button", { className: "uppy-u-reset uppy-c-btn uppy-c-btn-link", onClick: cancelSelection, type: "button", children: i18n('cancel') })] }), aggregateRestrictionError && (_jsx("div", { className: "uppy-ProviderBrowser-footer-error", children: aggregateRestrictionError }))] }));
}
