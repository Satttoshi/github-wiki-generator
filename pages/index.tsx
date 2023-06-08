import type { NextPage } from 'next'
import Form from '../components/Form'
import MarkdownField from "../components/MarkdownField";

const Home: NextPage = () => {
  return (
    <>
      <h1>Wiki Page Generator</h1>
        <Form/>
        <MarkdownField markdownContent="Hello Worldddd"/>
    </>
  )
}

export default Home