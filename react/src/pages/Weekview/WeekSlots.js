import React, { Component } from 'react'

import { Button, Icon, Typography, Drawer, TimePicker } from 'antd';
import './weekSlots.css';

const { Title } = Typography;

export class WeekSlots extends Component {
  state = {
    module: "MODULE",
    moduleDrawer: false
  };

  showDrawer = () => {
    this.setState({
      moduleDrawer: true,
    });
  };

  onClose = () => {
    this.setState({
      moduleDrawer: false,
    });
  };

  render() {
    return (
      <div className="week-page">
        <div className="title-bar">
        <Button type="link" onClick={() => { this.props.history.push("/app") }}>
          <Icon type="left" /> home
        </Button>
        <Title level={3}>Book mentor</Title>
        </div>
        <div className="module">
          <Button type="link" onClick={this.showDrawer}>
            {this.state.module}
            <Icon type="pic-center" style={{color: "#8592A6"}}/>
          </Button>
          <Drawer
            title="Module you need help with?"
            placement="top"
            closable={false}
            onClose={this.onClose}
            visible={this.state.moduleDrawer}
          >
            <Button onClick={()=> { this.setState({moduleDrawer: false, module: "CZ2006"})}}>CZ2006</Button>
            <Button onClick={()=> { this.setState({moduleDrawer: false, module: "EE8084"})}}>EE8084</Button>
            <Button onClick={()=> { this.setState({moduleDrawer: false, module: "MA2005"})}}>MA2005</Button>
          </Drawer>
        </div>
        <div className="week">
          <Button className="week-l"><Icon type="left"/></Button>
          <Button className="week-r"><Icon type="right"/></Button>
          <div className="week-slots">
            <div><small>20 SEP</small><p>MON</p></div>
            <div><small>21 SEP</small><p>TUE</p></div>
            <div><small>22 SEP</small><p>WED</p></div>
            <div><small>23 SEP</small><p>THU</p></div>
            <div><small>24 SEP</small><p>FRI</p></div>
            <div><small>25 SEP</small><p>SAT</p></div>
            <div><small>26 SEP</small><p>SUN</p></div>
            <Button className="clash">08:30</Button><Button className="clash"/><Button className="clash"/><Button className="avail"/><Button className="avail"/><Button/><Button/>
            <Button className="avail">09:30</Button><Button className="avail"/><Button className="avail"/><Button className="clash"/><Button className="avail"/><Button className="avail"/><Button className="avail"/>
            <Button className="avail">10:30</Button><Button className="clash"/><Button className="clash"/><Button className="avail"/><Button className="avail"/><Button/><Button className="avail"/>
            <Button className="clash">11:30</Button><Button className="clash"/><Button className="clash"/><Button className="clash"/><Button className="avail"/><Button className="avail"/><Button/>
          </div>
        </div>
        <div className="legend">
          <div className="color"/>
          <div className="legee">Mentor Available</div>
          <div className="color"/>
          <div className="legee">No Mentor Signed Up</div>
          <div className="color"/>
          <div className="legee">Booked</div>
          <div className="color"/>
          <div className="legee">Clash with timetable</div>
        </div>
        <div className="book-time">
          <div className="time-container">
            <TimePicker placeholder="From"
              use12Hours
              format="h:mm a"
              minuteStep={30}
              inputReadOnly={true}
            />
            <Icon type="arrow-right" />
            <TimePicker placeholder="To"
             use12Hours
             format="h:mm a"
             minuteStep={30}
             inputReadOnly={true}
           />
            <br/>
            <Button className="select-mentor" type="link">Select specific mentor</Button>
          </div>
          <Button className="book-btn" type="primary">BOOK</Button>
        </div>
      </div>
    )
  }
}

export default WeekSlots
