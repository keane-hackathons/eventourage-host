import React from 'react'
import { TitleBar } from './TitleBar'
import styled from "styled-components";
import { Outlet } from 'react-router-dom';

function EventLayout () {
  return(
    <Wrapper>
      <TitleBar/>
      <Outlet/>
    </Wrapper>
   )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F0F2F6;
`;

export default EventLayout
