import type { NextPage } from 'next'
import Form from '../components/Form'
// @ts-ignore
import MarkdownField from "../components/MarkdownField";
import useStore from '../zustand/store';

const Home: NextPage = () => {
  const isFetching = useStore(state => state.isFetching);
  return (
    <>
      <h1>Wiki Page Generator</h1>
        <Form/>
        {isFetching && <p>Loading...</p>}
        <MarkdownField markdownContent="Hello Worldddd"/>
    </>
  )
}

export default Home