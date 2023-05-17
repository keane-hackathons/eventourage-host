import React from "react";
import { Tabs, ConfigProvider } from "antd";
import "./ActionsHub.css";

export const ActionsHub = (props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#293647",
          fontSize: "1.4rem",
          lineWidth: "0"
        },
      }}
    >
      <div className="actions-hub">
        <Tabs 
          defaultActiveKey="1" 
          tabBarGutter={15} 
          animated={true}
          tabBarStyle={{
            fontWeight: "bold",
          }}
          {...props}
        >
          {props.children}
        </Tabs>
      </div>
    </ConfigProvider>
  );
};
