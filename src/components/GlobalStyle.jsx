import React from "react";
import { ConfigProvider } from 'antd';

export const GlobalStyle = (props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Gotham",
        },
      }}
    >
      {props.children}
    </ConfigProvider>
  );
};
