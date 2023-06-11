import type { NextPage } from "next";
import Form from "../components/Form";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MarkDownOutput from "../components/MarkdownOutput";
import WikiUpdater from "../components/WikiUpdater";

const Home: NextPage = () => {
  return (
    <Grid container p={6}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" my={2} align="center">
          Github Wiki Generator
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Form />
      </Grid>
      <Grid item xs={12} lg={6}>
        <WikiUpdater />
      </Grid>
      <Grid item xs={12}>
        <MarkDownOutput />
      </Grid>
    </Grid>
  );
};

export default Home;
