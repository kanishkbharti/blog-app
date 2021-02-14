import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { Box, TextField } from "@material-ui/core";
import parse from "html-react-parser";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20,
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
    height: 400,
    overflow: "hidden",
  },
  media: {
    height: 200,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },

  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
  link: {
    marginTop: 5,
  },
  empty: {
    color: "blue",
  },
}));

function BlogPostView(props) {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const classes = useStyles();
  const [filteredposts, setFilteredPosts] = useState([]);

  const { id } = props.match.params;

  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      console.log(data);
      const items_data = data.filter((d) => d.userId === Number(id));
      console.log(id, items_data);
      setPosts(items_data);
    } catch (err) {
      console.log(err);
    }
  };

  const truncate = (text) => {
    if (text.length > 90) {
      return `${text.slice(0, 90)}...`;
    }
    return text;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (text.length === 0) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (p) => p.title.includes(text) || p.body.includes(text)
      );
      const filtered2 = filtered.map((d) => ({
        id,
        title: `<Fragment>${d.title.replace(
          new RegExp(text, "g"),
          text.fontcolor("red")
        )}</Fragment>`,
        body: `<Fragment>${d.body.replace(
          new RegExp(text, "g"),
          text.fontcolor("red")
        )}</Fragment>`,
      }));
      console.log(filtered2);
      setFilteredPosts(filtered2);
    }
  }, [id, posts, text]);

  return (
    <div className="App">
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            value={text}
            variant="outlined"
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        <Grid container spacing={3}>
          {filteredposts.length === 0 && (
            <Box className={classes.empty}>
              <Box>No items Configured</Box>
            </Box>
          )}
          {filteredposts.map((p) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {parse(p.title)}
                        <Typography className={classes.link}>
                          <Link
                            to={{
                              pathname: `/user/posts/${id}`,
                              state: {
                                id: p.id,
                                title: p.title,
                                body: p.body,
                                userId: id,
                              },
                            }}
                          >
                            <LinkIcon />
                          </Link>
                        </Typography>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {parse(truncate(p.body))}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default BlogPostView;
