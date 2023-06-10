import type { NextPage } from "next";
import Form from "../components/Form";
// @ts-ignore
import MarkdownField from "../components/MarkdownField";
import useStore from "../zustand/store";
import styled from "styled-components";

const Home: NextPage = () => {
  const isFetching = useStore((state) => state.isFetching);
  return (
    <>
      <h1>Wiki Page Generator</h1>
      <StyledMain>
        <Form />
        {isFetching && <p>Loading...</p>}
        <MarkdownField markdownContent="Hello Worldddd" />
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  width: 400px;
  height: 600px;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Home;
