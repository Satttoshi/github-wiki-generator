import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function Form() {
  const [buzzwords, setBuzzwords] = useState<string[]>([]);
  const [language, setLanguage] = useState<string | null>("english");
  const createWikiEntry = useFetch((state) => state.fetch);
  const { isLoading } = useFetch((state) => state.wikiEntry);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    createWikiEntry("wikiEntry", { ...data, buzzwords, language });
  }

  const handleLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string | null
  ) => {
    setLanguage(newLanguage);
  };

  return (
    <>
      <Stack component="form" m={4} spacing={2} onSubmit={handleSubmit}>
        <Typography variant="h6" component="h2">
          <LibraryBooksIcon /> Which kind of Wiki Page you need?
        </Typography>

        <TextField
          id="topicInput"
          name="topic"
          label="Main Topic"
          defaultValue="Java Programming"
        />
        <TextField
          id="subTopicInput"
          name="subTopic"
          label="Sub Topic"
          defaultValue="Interfaces"
        />

        <Autocomplete
          multiple
          id="tags-filled"
          options={buzzwords}
          freeSolo
          value={buzzwords}
          onChange={(_, buzzwords) => {
            setBuzzwords(buzzwords);
          }}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => {
              const tagProps = getTagProps({ index });
              return (
                <Chip
                  variant="outlined"
                  label={option}
                  // @ts-ignore
                  key={tagProps.key}
                  {...tagProps}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="Buzzwords" />
          )}
        />
        <ToggleButtonGroup value={language} exclusive onChange={handleLanguage}>
          <ToggleButton value="english">English</ToggleButton>
          <ToggleButton value="german">German</ToggleButton>
        </ToggleButtonGroup>
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
