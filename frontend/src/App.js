import { Route, Switch } from "react-router-dom"
import Home from "./pages/Home/home"
import CreateNewArticle from "./pages/CreateNewArticle/CreateNewArticle"



function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/articles' render={() => <CreateNewArticle />} />
      </Switch>
    </>
  );
}

export default App;