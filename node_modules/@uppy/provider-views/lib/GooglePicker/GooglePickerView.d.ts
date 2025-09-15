import type { AsyncStore, Uppy } from '@uppy/core';
import type { I18n } from '@uppy/utils';
import { type PickedItem } from './googlePicker.js';
export type GooglePickerViewProps = {
    uppy: Uppy<any, any>;
    i18n: I18n;
    clientId: string;
    onFilesPicked: (files: PickedItem[], accessToken: string) => void;
    storage: AsyncStore;
} & ({
    pickerType: 'drive';
    apiKey: string;
    appId: string;
} | {
    pickerType: 'photos';
    apiKey?: undefined;
    appId?: undefined;
});
export default function GooglePickerView({ uppy, i18n, clientId, onFilesPicked, pickerType, apiKey, appId, storage, }: GooglePickerViewProps): import("preact").JSX.Element;
//# sourceMappingURL=GooglePickerView.d.ts.map