import React  from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import './animation.css';

//const Home = React.lazy(() => import("./Pages/Home"));
import Home from "./Pages/Home";

/*function App() {

    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </Suspense>
        </Router>
    )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);*/

ReactDOM.render(
    <React.StrictMode>
        <Home />
    </React.StrictMode>,
    document.getElementById('root')
);
