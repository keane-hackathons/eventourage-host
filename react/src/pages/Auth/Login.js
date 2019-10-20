import React, { Component } from 'react'
import ReactDOM from 'react-dom';

//OTHER PACKAGES
import axios from 'axios';

//UI STUFF
import {Typography, Form, Input, Icon, Button } from 'antd';
import "./Login.css";
import { ReactComponent as Backdrop } from "./decor.svg";

const { Title } = Typography;

class Login extends Component {
  state = {
    loading: false,
    errors: {}
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, formValues) => {
      if (!err) {
        this.setState({ loading: true }, () => {
          axios
          .post('/login', formValues)
          .then(res => {
            this.setState({loading: false});
            this.props.history.push('/upload');
          })
          .catch(err => {
            this.setState({
              errors: err.response.data,
              loading: false
            })
          })
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errors } = this.state;
    return (
      <>
        <Backdrop className="backdrop"/>
        <Form onSubmit={this.handleSubmit} className="login-form">

          <div className="fields-box">
            <Title level={1}>Login</Title>
            <Form.Item>
              {getFieldDecorator("email", { rules: [
                { required: true, message: "Please input your E-mail!" },
                { type: 'email', message: "The input is not valid E-mail" },
              ] })(
                <Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="School e-mail"/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", { rules: [{ required: true, message: "Please input your Password!" }] })(
                <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password" placeholder="Password"/>
              )}
            </Form.Item>

            <Button type="link">Forgot Password?</Button>
          </div>

          { errors.general ?
              (<p style={{ color: "red"}}>
                {errors.general}
              </p>)
              :
              (<p style={{ color: "#BECFFF"}}>
                Testing out? Try: <br /> c181234@mail.com or p181234@mail.com | password
              </p>)
            }

          <div className="btns-box">
            <Button>Sign Up</Button>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
              Sign In
            </Button>
          </div>
        </Form>
      </>
    )
  }
}

const WrappedLogin = Form.create()(Login);
ReactDOM.render(<WrappedLogin/>, document.getElementById('root'))

export default WrappedLogin
