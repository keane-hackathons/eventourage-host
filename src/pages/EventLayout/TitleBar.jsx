import React from "react";
import { Button, Typography, Dropdown, Space } from "antd";
import { LeftOutlined, MoreOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import "./TitleBar.css"

export const TitleBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { Title } = Typography;

  const items = [
    {
      key: "1",
      label: "test",
    },
  ];

  return (
    <div className="title-bar">
      <Button type="link" onClick={() => navigate("..")}>
        <LeftOutlined /> home
      </Button>
      <div className="title-bar-R">
        <Title level={3}>{location.state.title}</Title>
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Space>
              <MoreOutlined />{" "}
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};
