import React, { useState } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Bar from './components/Bar'
import Books from './components/Books'
import History from './components/History'
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';



function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message, type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
    return (
      <>
      <NoteState>
      <Router>
      <Bar/>
      <Alert alert={alert}/>
      <div className="container">
        <Switch>
          <Route path="/books">
            <Books showAlert={showAlert} />
          </Route>
          <Route path="/History">
            <History />
          </Route>
          
          <Route path="/login">
            <Login showAlert={showAlert} />
          </Route>
          <Route path="/signup">
            <Signup showAlert={showAlert} />
          </Route>
          <Route path="/">
            <Books />
          </Route>
        </Switch>
        </div>
        </Router>
        </NoteState>
  </>
);
  
}
export default App;



