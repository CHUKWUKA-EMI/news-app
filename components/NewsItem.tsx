import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

interface Props {
  id: number;
  by: string;
  score: number;
  title: string;
  kids?: number[];
  time: number;
  url: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    width: "100%",
  },
  title: {
    textDecoration: "none",
    color: "darkslategray",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "18px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const NewsItem: React.FC<Props> = ({
  id,
  by,
  score,
  time,
  kids,
  url,
  title,
}) => {
  const classes = useStyles();

  const today = new Date().toLocaleString();
  const date = new Date(time * 1000).toLocaleString();
  const timeDiff = new Date(today).getTime() - new Date(date).getTime();
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));

  return (
    <Box justifyContent="center" className={classes.root}>
      <Typography>
        <Link href={url ? url : "/"}>
          <a className={classes.title}>{title}</a>
        </Link>
      </Typography>
      <div>
        <Typography
          style={{ fontSize: "15px", color: "GrayText", fontWeight: 500 }}
          variant="body1"
        >
          {score} points by{" "}
          <Link href={`https://news.ycombinator.com/user?id=${by}`}>
            <a className={classes.link}>{by}</a>
          </Link>{" "}
          {hours > 0
            ? hours >= 24
              ? `${Math.floor(hours / 24)} day(s) ago`
              : `${hours} hours ago`
            : date}{" "}
          |{" "}
          {kids ? (
            <Link href={`https://news.ycombinator.com/item?id=${id}`}>
              <a className={classes.link}>
                {kids.length} {kids.length === 1 ? "comment" : "comments"}
              </a>
            </Link>
          ) : (
            ""
          )}
        </Typography>
      </div>
    </Box>
  );
};

export default NewsItem;
