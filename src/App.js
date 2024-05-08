import './App.css';
import NavBar from './components/navbar';
import { Fragment, useEffect } from 'react';
import ContentRoutes from './components/Routes';
import {BrowserRouter} from 'react-router-dom'
import Login from './components/login';
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <NavBar/>
        <div className='' style={{backgroundColor:'lightslategray'}}>
        <ContentRoutes/>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
