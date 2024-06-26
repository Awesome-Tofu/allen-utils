import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Alert from './components/Alert';
import Subjects from './components/Subjects';
import Topics from './components/Topics';
import Subtopics from './components/Subtopics';
import Recordedclass from './components/Recordedclass';
import ApiState from './context/api/Apistate';
import Profile from './components/Profile';
import Login from './components/Login';


function App() {
  const [alert, setAlert] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      setIsAuthenticated(true);
    }
  }, []);

  const showAlert = (msg, type = "s") => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  const auth_token = localStorage.getItem('auth_token');


  return (
    <ApiState>
      <Router>
        <div className="App dark">
          {alert && <Alert text={alert.msg} type={alert.type} />}
          {isAuthenticated ? (<>
            <Profile alert={showAlert} />
            <Routes>
              <Route exact path="/:subject/:id/:topic/:topicid/class/:classid/:typeid" element={<Recordedclass alert={showAlert} />} />
              <Route exact path="/:subject/:id/:topic/:topicid" element={<Subtopics />} />
              <Route exact path="/:subject/:id" element={<Topics />} />
              {auth_token && <Route exact path="/" element={<Subjects />} />}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>) : (
            <Routes>
              <Route path="/login" element={<Login alert={showAlert} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </div>
      </Router>
    </ApiState>
  )
}

export default App;