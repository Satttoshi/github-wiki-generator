import styled from "styled-components";
import useStore from "../zustand/store";
import * as React from "react";
import { Button, Input } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function Form() {
  const setMessage = useStore((state) => state.setMessage);
  const isFetching = useStore((state) => state.isFetching);
  const setIsFetching = useStore((state) => state.setIsFetching);

  async function fetchGenerator(thema: any, subThema: any) {
    setIsFetching(true);
    const response = await fetch("/api/generator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ thema: thema, subThema: subThema }),
    });
    setIsFetching(false);
    return await response.json();
  }

  // @ts-ignore
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const message = await fetchGenerator(data.thema, data.subThema);
    setMessage(message.result);
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit} aria-label="Form Input">
        <StyledFieldset>
          <label htmlFor="maintopic">Haupt Thema:</label>
          <Input
            id="input"
            style={{ background: "var(--2)" }}
            name="thema"
            type="text"
            defaultValue="Java Programmierung"
          />
          <label htmlFor="subtopic">Thema:</label>
          <Input
            id="input"
            style={{ background: "var(--2)" }}
            name="subThema"
            type="text"
            defaultValue="Interfaces"
          />
        </StyledFieldset>
        <Button
          variant="contained"
          style={{ background: "var(--3)", fontFamily: "var(--font1)" }}
          type="submit"
          disabled={isFetching}
        >
          Submit
        </Button>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 300px;
  border: 2px solid var(--3);
  border-radius: 5px;
  margin: 0;
`;
