import { Route, Switch } from "react-router-dom"
import Home from "./pages/Home/home"
import Post from "./pages/Post/post"



function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/articles' render={() => <Post />} />
      </Switch>
    </>
  );
}

export default App;