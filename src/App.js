import React from "react";
import BlogAppListView from "./components/BlogAppListView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import BlogPostView from "./components/BlogPostView";
import BlogPostDetailView from "./components/BlogPostDetailView";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={BlogAppListView} />
          <Route path="/posts/:id" exact component={BlogPostView} />
          <Route path="/user/posts/:id" exact component={BlogPostDetailView} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
