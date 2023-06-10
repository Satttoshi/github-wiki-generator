import type { NextPage } from "next";
import Form from "../components/Form";
// @ts-ignore
import MarkdownField from "../components/MarkdownField";
import useStore from "../zustand/store";
import styled from "styled-components";

const Home: NextPage = () => {
  return (
    <>
      <StyledMain>
        <h1>Wiki Page Generator</h1>
        <Form />
        <MarkdownField />
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export default Home;
