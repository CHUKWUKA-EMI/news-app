import React, { useEffect, useState } from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getStories, Story } from "../utils/fetchNews";
import NewsItem from "./NewsItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: "7em",
    paddingLeft: "20%",
  },
  title: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    cursor: "pointer",
  },
  headline: {
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "left",
    marginBottom: "0.5rem",
    paddingLeft: "0.5rem",
  },

  link: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

type Stories = Story[];

const NewsList: React.FC = () => {
  const classes = useStyles();
  const [stories, setStories] = useState<any>();

  useEffect(() => {
    (async () => {
      const storiesData: any = await getStories();
      setStories(storiesData);
    })();
  }, []);

  return stories && stories.length > 0 ? (
    <Grid justifyContent="center" className={classes.root} container>
      <Grid style={{ width: "100%" }} item xs={10} sm={10}>
        <Typography color="primary" variant="h4" className={classes.headline}>
          Stories Headlines
          <Divider
            style={{
              fontWeight: "bold",
              width: "30%",
              height: "3px",
              color: "#32506D",
              backgroundColor: "#32506D",
            }}
          />
        </Typography>
      </Grid>

      {stories.map((story: Story, index: number) => {
        return (
          <Grid style={{ width: "100%" }} key={index} item xs={10} sm={10}>
            <NewsItem
              id={story.id}
              by={story.by}
              score={story.score}
              time={story.time}
              kids={story.kids}
              url={story.url}
              title={story.title}
            />
          </Grid>
        );
      })}
    </Grid>
  ) : (
    <div style={{ width: "100%", paddingTop: "7em" }}>
      <LinearProgress style={{ marginTop: "2em" }} color="secondary" />
      <LinearProgress style={{ marginTop: "2em" }} color="secondary" />
      <LinearProgress style={{ marginTop: "2em" }} color="secondary" />
    </div>
  );
};

export default NewsList;
