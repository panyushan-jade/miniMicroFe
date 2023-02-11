import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start } from 'qiankun';
// import { registerMicroApps, start } from './micro-fe';
const root = ReactDOM.createRoot(document.getElementById('root'));

registerMicroApps([
  {
    name: 'reactApp', // app name registered
    entry: '//localhost:3001',
    container: '#microContainer',
    activeRule: '/react_app',
  },
  {
    name: 'vue2App',
    entry: '//localhost:8080',
    container: '#microContainer',
    activeRule: '/vue2_app',
  },
  {
    name: 'vue3App',
    entry: '//localhost:8081',
    container: '#microContainer',
    activeRule: '/vue3_app',
  },
]);

start({
  sandbox:{
    strictStyleIsolation: true
  }
});

root.render(<App />);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
