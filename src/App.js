import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Row, Col, Card} from 'antd';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import WeatherOverview from './components/WeatherOverview/WeatherOverview';
import './App.css';
import 'antd/dist/antd.css';

const tabList = [
    {
      key: 'login',
      tab: 'login',
    },
    {
      key: 'register',
      tab: 'register',
    },
  ];
  
  const contentList = {
    login: <Login />,
    register: <Register />
  };
  
function App() {
    const [tab, setTab] = useState("login");
    const token = useSelector(
        state => state.authReducer.token
    );  
    return (
        <div className="app">
            {token ? <WeatherOverview/> : (
            <Row style={{marginTop: 50}}>
                <Col span={12} offset={6}>
                    <Card
                        style={{ width: '100%' }}
                        title="Weather App"
                        tabList={tabList}
                        activeTabKey={tab}
                        onTabChange={key => {
                            setTab(key);
                        }}
                    >
                        {contentList[tab]}
                    </Card>
                </Col>
            </Row>
            
            )}
            
        </div>
    );
}

export default App;