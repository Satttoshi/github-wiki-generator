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
        <Styledh1>Github Wiki Generator</Styledh1>
        <Form />
        <MarkdownField />
      </StyledMain>
    </>
  );
};

const Styledh1 = styled.h1`
  margin-bottom: 0;
`;

const StyledMain = styled.main`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export default Home;
