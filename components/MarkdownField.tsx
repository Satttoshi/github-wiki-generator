import React, { useRef, useState } from "react";
import styled from "styled-components";
import useStore from "../zustand/store";

interface MarkdownFieldProps {
  markdownContent: string;
}

export default function MarkdownField({ markdownContent }: MarkdownFieldProps) {
  const content = useStore((state) => state.message);
  const setContent = useStore((state) => state.setMessage);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  async function copyToClipboard(e: React.MouseEvent) {
    e.preventDefault();
    if (textAreaRef.current) {
      try {
        await navigator.clipboard.writeText(content);
        console.log("Copied to clipboard");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  return (
    <StyledMarkdownField>
      <button onClick={copyToClipboard}>Copy to clipboard</button>
      <StyledTextArea
        ref={textAreaRef}
        value={content}
        onChange={handleContentChange}
      />
    </StyledMarkdownField>
  );
}

const StyledMarkdownField = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled.textarea`
  height: 100%;
`;
