import React, { Component } from "react";

import {Typography, Button, Icon,  Upload, message } from 'antd';
import './uploadFile.css'
import sampleImg from './sample.png'

const { Title } = Typography;

class UploadFile extends Component {
  handleUpload = info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      // const file  = e.target.files[0];
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = () => {
        // console.log(reader.result);

        fetch("https://microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com/ocr", {
          "method": "POST",
          "headers": {
            "Access-Control-Allow-Origin": "*",
            "x-rapidapi-host": "microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com",
            "x-rapidapi-key": "0c205235e9msh4d5f64a8f18e9c2p1692dbjsn42b3110c49b6",
            "content-type": "multipart/form-data"
          },
          "body": {
            "file": info.file
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });

      // }


    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  render() {
    return (
      <div className="upload-page">
        <div className="title-bar">
          <Button type="link" onClick={() => { this.props.history.push("/week") }}>
            <Icon type="left" /> timetable
          </Button>
          <div className="title-bar-R">
            <Title level={3}>Reupload</Title>
          </div>
        </div>
        <div className="intrucst-text">
          <Title level={2}>New timetable?</Title>
          <Title level={4}>Take a screenshot of your registered<br/>modules and like the one below 👇🏻</Title>
        </div>

        <img className="sample-img" src={sampleImg} alt={"Sample"} />

        <Upload onChange={this.handleUpload} >
          <Button className="upload-timetable-btn" type="primary"> Upload
            {/* <input onChange={(e) =>  this.handleUpload(e)} type="file" /> */}
          </Button>
        </Upload>
      </div>
    );
  }
}

export default UploadFile;
