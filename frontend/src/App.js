import { Route, Switch } from "react-router-dom"
import Home from "./pages/Home/home"
import Post from "./pages/Post/post"
import Profile from "./pages/Profile/profile"
import './App.css'


function App() {
	return (
		<>
			<Switch>
				<Route exact path='/' render={() => <Home />} />
				<Route exact path='/post' render={() => <Post />} />
				<Route exact path='/profile' render={() => <Profile />} />
			</Switch>
		</>
	);
}

export default App;