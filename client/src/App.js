import './App.css';
import Login from './auth/login'
import SignUp from './auth/signUp'
import Home from './HomePage/index'
import NavBar from './HomePage/NavBar'
import Student from './student/index'
import SuperAdmin from './admin/index'
import {Switch,Route,useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Menu from './admin/menu'
function App() {
  let history = useHistory();
  const student = useSelector(state => state.students)
  const user = JSON.parse(localStorage.getItem('student'));
  
  if(user === null) {  
    history.push('/')  
  }
  return ( 
    <div className="App"> 
      <NavBar student={user ? user : student} />
        {user?.roles[0] == 'ROLE_ADMIN' || user?.roles[0] == 'ROLE_GESTIONAIRE' || user?.roles[0] == 'ROLE_TEACHER' ?  <Menu /> : ''}
      <Switch> 
        <Route exact path="/" component={Home} /> 
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/student" component={Student} /> 
        <Route path="/admin" component={SuperAdmin} />      
      </Switch>
    </div>
  );
}
 
export default App;
