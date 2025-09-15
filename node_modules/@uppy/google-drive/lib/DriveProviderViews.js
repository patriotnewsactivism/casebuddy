import { ProviderViews } from '@uppy/provider-views';
export default class DriveProviderViews extends ProviderViews {
    toggleCheckbox(item, isShiftKeyPressed) {
        // We don't allow to check team drives; but we leave the checkboxes visible to show the 'partial' state
        // (For a full explanation, see https://github.com/transloadit/uppy/issues/5232)
        if (!item.data.custom?.isSharedDrive) {
            super.toggleCheckbox(item, isShiftKeyPressed);
        }
    }
}
