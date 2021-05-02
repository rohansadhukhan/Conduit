import { Route, Switch } from "react-router-dom"
import Home from "./pages/Home/home"
import Login from "./pages/Login/login"
import Register from "./pages/Register/register"
import CreateNewArticle from "./pages/CreateNewArticle/CreateNewArticle"



function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/register' render={() => <Register />} />
        <Route exact path='/articles' render={() => <CreateNewArticle />} />
      </Switch>
    </>
  );
}

export default App;