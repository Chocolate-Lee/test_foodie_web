import React, { Component, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import LOADING_SVG from './resources/loading-spin.svg';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { isDevicePC } from './classes/utils/helper/device-helper';


const AppController = React.lazy(() => import('./classes/page/web/index/index'));

function App() {
  
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  return (
    
       <Router>
        <Suspense fallback={
          <div style={{ width: windowWidth, height: windowHeight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img style={{ width: 60, height: 60 }} src={LOADING_SVG} />
            <p style={{ fontSize: 12, color: '666', marginTop: 10 }}>加载中...</p>
          </div>}
        >


          <Switch>
            
            <Route path='/' component={AppController} />
          </Switch>

        </Suspense>
      </Router> 
  );
}

export default App;

