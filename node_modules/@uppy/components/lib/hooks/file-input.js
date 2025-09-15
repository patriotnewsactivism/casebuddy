const fileInputId = 'uppy-file-input';
// Use a more generic constraint that works with both DOM Events and React/Vue Events
export function createFileInput(ctx, props = {}) {
    const handleClick = () => {
        const input = document.getElementById(fileInputId);
        input?.click();
    };
    const handleFileInputChange = (event) => {
        const input = event.target;
        const files = Array.from(input.files || []);
        if (!files.length)
            return;
        ctx.uppy.addFiles(files.map((file) => ({
            name: file.name,
            type: file.type,
            data: file,
        })));
        // Reset the input value so the same file can be selected again
        input.value = '';
    };
    return {
        getInputProps: () => ({
            id: fileInputId,
            type: 'file',
            multiple: props.multiple ?? true,
            accept: props.accept,
            onChange: handleFileInputChange,
        }),
        getButtonProps: () => ({
            type: 'button',
            onClick: handleClick,
        }),
    };
}
