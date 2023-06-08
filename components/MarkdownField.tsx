import React, { useRef, useState } from 'react';


interface MarkdownFieldProps {
    markdownContent: string;
}

function MarkdownField({ markdownContent }: MarkdownFieldProps) {
    const [content, setContent] = useState<string>(markdownContent);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    async function copyToClipboard(e: React.MouseEvent) {
        e.preventDefault();
        if (textAreaRef.current) {
            try {
                await navigator.clipboard.writeText(content);
                console.log('Copied to clipboard');
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    }

    function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(e.target.value);
    }

    return (
        <div>
            <textarea ref={textAreaRef} value={content} onChange={handleContentChange} />
            <button onClick={copyToClipboard}>Copy to clipboard</button>
        </div>
    );
}

export default MarkdownField;
