import React from "react";
import { Button, ConfigProvider } from "antd";
import "./CollectionTile.css";

export const CollectionTile = (props) => {
  const boxShadow = `0px 20px 20px 0px ${props.shadow}`
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryHover: "#293647",
        },
      }}
    >
      <Button
        style={{
          backgroundColor: props.background,
          boxShadow,
          WebkitBoxShadow: boxShadow,
          MozBoxShadow: boxShadow,
        }}
      > {props.children} </Button>
    </ConfigProvider>
  );
};
