import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useFetch } from "../hooks/useFetch";
import dynamic from "next/dynamic";
import copyToClipBoard from "../services/clipboard";
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function MarkDownOutput() {
  const { data } = useFetch((state) => state.wikiEntry);
  const alterWikiEntry = useFetch((state) => state.alterWikiEntry);

  console.log(data);
  return (
    <>
      <Stack
        sx={{
          minWidth: {
            xs: "400px",
            sm: "600px",
            md: "900px",
          },
        }}
      >
        <MonacoEditor
          theme="vs-dark"
          height="500px"
          language="markdown"
          value={data ? data.result : "## Hello World"}
          options={{
            fontSize: 14,
          }}
          onChange={async (value) => {
            console.log(value);
            alterWikiEntry(value);
          }}
        />
      </Stack>
      <Button
        startIcon={<ContentCopyIcon />}
        onClick={() => copyToClipBoard(data.result)}
      >
        Copy to Clipboard
      </Button>
    </>
  );
}
