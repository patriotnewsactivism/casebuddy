import { type DropzoneOptions, type DropzoneReturn } from '@uppy/components';
import type { ChangeEvent as ReactChangeEvent, DragEvent as ReactDragEvent } from 'react';
type TDragEvent = DragEvent & ReactDragEvent<HTMLDivElement>;
type TChangeEvent = Event & ReactChangeEvent<HTMLInputElement>;
export declare function useDropzone(options?: DropzoneOptions): DropzoneReturn<TDragEvent, TChangeEvent>;
export {};
//# sourceMappingURL=useDropzone.d.ts.map