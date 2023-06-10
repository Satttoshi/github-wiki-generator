import { useRef } from "react";
import styled from "styled-components";
import useStore from "../zustand/store";
import * as React from "react";
import { Button } from "@mui/material";

export default function MarkdownField() {
  const content = useStore((state) => state.message);
  const setContent = useStore((state) => state.setMessage);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const isFetching = useStore((state) => state.isFetching);

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
      {isFetching ? (
        <Button
          variant="contained"
          style={{ background: "var(--3)", fontFamily: "var(--font1)" }}
          onClick={copyToClipboard}
          disabled
        >
          Generating wiki article, please wait ...
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{ background: "var(--3)", fontFamily: "var(--font1)" }}
          onClick={copyToClipboard}
        >
          Copy to clipboard
        </Button>
      )}

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
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled.textarea`
  height: 100vh;
  background-color: var(--2);
`;
