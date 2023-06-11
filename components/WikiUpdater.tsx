import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFetch } from "../hooks/useFetch";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import GitHubIcon from "@mui/icons-material/GitHub";
import Alert from "@mui/material/Alert";

export default function WikiUpdater() {
  const updateWiki = useFetch((state) => state.fetch);
  const { data: wikiEntry } = useFetch((state) => state.wikiEntry);
  const { isLoading, data } = useFetch((state) => state.updateWiki);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { pageTitle } = Object.fromEntries(formData);
    updateWiki("updateWiki", {
      wikiPage: pageTitle,
      wikiContent: wikiEntry.result,
    });
  }

  return (
    <Stack m={6} my={4} spacing={2} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" component="h2">
        <GitHubIcon /> Create/Update Wiki Page on Github
      </Typography>
      <TextField
        required
        id="page-title"
        name="pageTitle"
        label="Page Title"
        variant="outlined"
      />
      <Button
        variant="outlined"
        type="submit"
        disabled={!wikiEntry}
        startIcon={<UpgradeIcon />}
        endIcon={isLoading && <CircularProgress size={20} />}
      >
        Update Wiki
      </Button>
      {data && <Alert severity="success">{data.message}</Alert>}
    </Stack>
  );
}
