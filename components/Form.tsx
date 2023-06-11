import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFetch } from "../hooks/useFetch";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
export default function Form() {
  const createWikiEntry = useFetch((state) => state.fetch);
  const { isLoading } = useFetch((state) => state.wikiEntry);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    createWikiEntry("wikiEntry", data);
  }

  return (
    <>
      <Stack component="form" m={4} spacing={2} onSubmit={handleSubmit}>
        <Typography variant="h6" component="h2">
          <LibraryBooksIcon /> Which kind of Wiki Page you need?
        </Typography>
        <TextField
          id="input"
          name="thema"
          label="Main Topic"
          defaultValue="Java Programmierung"
        />
        <TextField
          id="input"
          name="subThema"
          label="Sub Topic"
          defaultValue="Interfaces"
        />

        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          disabled={isLoading}
          startIcon={<PrecisionManufacturingIcon />}
        >
          Generate Wiki Page
        </LoadingButton>
      </Stack>
    </>
  );
}
