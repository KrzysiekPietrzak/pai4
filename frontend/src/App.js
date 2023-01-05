import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import Login from './login/Login';
import Register from './register/Register';
import Nav from './nav/Nav';
import PostsList from './postList/PostsList';
import DetailsPost from './detailsPost/DetailsPost';
import NotFound from './notFound/NotFound';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import Add from './add/Add';
import AddComment from './addComment/AddComment';



function App() {
  const [isLogged, setIsLogged] = useState(false);
  let render;

  useEffect(() => {
    function checkLoginStatus() {
      let ls = localStorage.getItem('id');
      if(ls != null) setIsLogged(true);
    }
    checkLoginStatus();
  }, [])


  let loggedContent = () => {return (<div className="wrapper">
                                        <div className="content">
                                          <Nav setIsLogged={setIsLogged} />
                                          <Switch>
                                              <Route exact path='/' element={<PostsList />} />
                                              <Route exact path='/details/:id' element={<DetailsPost />} />
                                              <Route exact path='/add' element={<Add />} />
                                              <Route exact path='/comment/:id' element={<AddComment />} />
                                              <Route path='*' element={<NotFound/>} />
                                          </Switch>
                                        </div>
                                      </div>)};

  let notLoggedContent = () => {return (<div className="wrapper">
                                          <Switch>
                                              <Route exact path='/' element={<Login setIsLogged={setIsLogged}/>}/>
                                              <Route exact path='/register' element={<Register />}/>
                                              <Route path='*' element={<NotFound/>} />
                                          </Switch>
                                        </div>)};
  if(!isLogged) {
    render = notLoggedContent();
  } else {
    render = loggedContent();
  }



  return (
    <Router>
      { render }
    </Router>
  );
}

export default App;
