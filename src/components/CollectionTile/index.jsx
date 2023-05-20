import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./CollectionTile.css";

export const CollectionTile = (props) => {
  const { shadow, path, title, background, children } = props
  const navigate = useNavigate()
  const boxShadow = `0px 20px 20px 0px ${shadow}`;
  return (
    <Button
      onClick={() => navigate(`event/${path ?? ''}`, { state: { title } })}
      style={{
        backgroundColor: background,
        boxShadow,
        WebkitBoxShadow: boxShadow,
        MozBoxShadow: boxShadow,
      }}
    >
      {children}
    </Button>
  );
};
