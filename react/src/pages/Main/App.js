import React, { Component } from 'react'

import {Typography, Button, Tabs } from 'antd';
import './App.css';

const { Title } = Typography;
const { TabPane } = Tabs;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="profile-bar">
          <div>
            <Title level={2}>Hey Johnson,</Title>
            <Title style={{color: "#8592A6"}} level={3}>What shall we do?</Title>
          </div>
          <div className="profile-pic"></div>
        </div>

        <div className="shelf"></div>
        <div className="btns-container">
          <Button onClick={() => {this.props.history.push('/week')} }>view my<br/>timetable</Button>
          <Button>schedule<br/>meets</Button>
          <Button>group<br/>schedules</Button>

        </div>

        <div className="actions-hub">
          <Tabs
            defaultActiveKey="1"
            tabBarGutter={0}
          >
            <TabPane tab="Upcoming" key="1">
              <br/><br/>
              Hmm... Nothing here.
            </TabPane>
            <TabPane tab="Notifications" key="2">
              <br/><br/>
              Hmm... Nothing here.
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
