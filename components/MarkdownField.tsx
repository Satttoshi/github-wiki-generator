import {useRef, useState} from 'react';

interface MarkdownFieldProps {
    markdownContent: string;
}

export default function MarkdownField({ markdownContent }: MarkdownFieldProps) {
    const [content, setContent] = useState<string>(markdownContent);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const copyToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();
        if (textAreaRef.current) {
            textAreaRef.current.select();
            document.execCommand('copy');
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    return (
        <div>
            <textarea ref={textAreaRef} value={content} onChange={handleContentChange} />
            <button onClick={copyToClipboard}>Copy to clipboard</button>
        </div>
    );
};
