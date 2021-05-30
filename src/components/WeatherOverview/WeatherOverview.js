import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getInfos,logoutUser } from "../../actions/auth/actions";
import { getWeather, getWeatherAll, createBookmark, deleteBookmark, shareWeather } from "../../actions/weather-actions/actions";
import { Row, Col, Card, Button, Modal, Form, Input } from 'antd';
import { ShareAltOutlined, StarOutlined, StarFilled } from '@ant-design/icons';

export default function WeatherOverview() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ToSahre, setToSahre] = useState("");
    const [share] = Form.useForm();
    const dispatch = useDispatch();
    
    const user = useSelector(
      state => state.authReducer.user
    );

    const weather_city = useSelector(
      state => state.weatherReducer.weather
    );
    const weather_all = useSelector(
      state => state.weatherReducer.weather_all
    );

    const bookmarkCity = (cityName,i) => {
      let body = `{"city_name": "${cityName}"}`;
      dispatch(createBookmark(JSON.parse(body)));
      dispatch(getWeatherAll());
    }
    
    const unbookmarkCity = (cityName,i) => {
      let body = `{"city_name": "${cityName}"}`;
      dispatch(deleteBookmark(JSON.parse(body)));
      dispatch(getWeatherAll());
    }

    const showModal = (cityName) => {
      setToSahre(cityName);
      setIsModalVisible(true);
    };

    const handleOk = (data) => {
      data.city_name = ToSahre;
      console.log(data);
      dispatch(shareWeather(data));
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    useEffect(() => {
        let isCancelled = false; 
        if (!isCancelled) {
          dispatch(getInfos());
          dispatch(getWeather());
          dispatch(getWeatherAll());
        }
        return () => isCancelled = true;
      }, []);
    return (
      <div className="main_wrapper">
        <Row>
          <Col span={18}>Hello, {user? user.name: "loading..."}!</Col>
          <Col span={6} style={{textAlign: 'right'}}>
            <Button type="primary" onClick={()=>dispatch(logoutUser())}>LOG OUT</Button>
          </Col>
        </Row>
        {weather_city ?
          <Row>
          <Col span={24}>
            <Card
              title={`You're from ${weather_city.name}, today's weather overview:`}
              style={{ width: '100%', marginBottom: 15, marginTop: 15 }}
            >
              <p>{weather_city.weather[0].main}</p>
              <p>{weather_city.main.temp}</p>
            </Card>
          </Col>
        </Row> : (<div>Loading city data</div>)}

        <Row>
        {weather_all.map((e,i)=>{
          return(
            <Col span={8}>
              <Card
                title={e.name}
                actions={e.bookmarked?[
                  <StarFilled key="favorite" onClick={()=>{
                    unbookmarkCity(e.name);
                  }} />,
                  <ShareAltOutlined key="share" onClick={()=>{
                    showModal();
                  }} />,
                ]:[
                  <StarOutlined key="favorite" onClick={()=>{
                    bookmarkCity(e.name);
                  }} />,
                  <ShareAltOutlined key="share" onClick={()=>{
                    showModal(e.name);
                  }} />,
                ]}
                style={{ width: '95%', marginBottom: 15 }}
              >
              
                <p>{e.weather[0].main}</p>
                <p>{e.main.temp}</p>
              </Card>
            </Col>
          )
        })}
        </Row>
        <Modal title="Share via email" visible={isModalVisible} onOk={()=>{share.submit();}} onCancel={handleCancel}>
          <p>Share infos regarding the weather in {ToSahre} via email.</p>
          <Form
            form={share}
            onFinish={handleOk}
          >
            <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, message: 'Please input email for sharing!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div> 
    )
}
