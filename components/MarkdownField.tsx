import React, { useRef, useState } from 'react';
import styled from 'styled-components';


interface MarkdownFieldProps {
    markdownContent: string;
}

export default function MarkdownField({ markdownContent }: MarkdownFieldProps) {
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
            <StyledTextArea ref={textAreaRef} value={content} onChange={handleContentChange} />
            <button onClick={copyToClipboard}>Copy to clipboard</button>
        </div>
    );
}

const StyledTextArea = styled.textarea`
    width: 600px;
    height: 300px;
`;


