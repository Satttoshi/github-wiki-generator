import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Form() {
  const [buzzwords, setBuzzwords] = useState<string[]>([]);
  const [promptStyle, setPromptStyle] = useState<string | null>("josh01");
  const createWikiEntry = useFetch((state) => state.fetch);
  const { isLoading } = useFetch((state) => state.wikiEntry);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    createWikiEntry("wikiEntry", { ...data, buzzwords, promptStyle });
  }

  function handlePromptStyleChange(event: any) {
    setPromptStyle(event.target.value);
  }

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
        <FormControl fullWidth>
          <InputLabel htmlFor="prompt-style-switch">Prompt Style</InputLabel>
          <Select
            labelId="prompt-style-switch"
            id="prompt-style-switch"
            value={promptStyle}
            label="Prompt Style"
            onChange={handlePromptStyleChange}
          >
            <MenuItem value={"josh01"}>Josh - German Short Article</MenuItem>
            <MenuItem value={"doemser01"}>
              Doemser - English Detailed Article
            </MenuItem>
          </Select>
        </FormControl>
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
