import React from 'react';
import {Layout} from "antd";
import "antd/dist/antd.css";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Header} from "antd/es/layout/layout";
import HomePage from "./components/HomePage";
import My404Component from "./components/My404Component";




class App extends React.Component{

  render() {
    return (
        <div className='App'>
          <Layout>
            <Header className="topBar">
              <div className="title"><strong>Stock Advisor</strong></div>
            </Header>
            <Layout style={{ padding: '24px'}}>
              <Router>
                <Routes>
                  <Route path='/' element={<HomePage />}/>
                  <Route path='*' element={<My404Component />}/>
                </Routes>
              </Router>
            </Layout>
          </Layout>

        </div>

    )

  }
}

export default App;
