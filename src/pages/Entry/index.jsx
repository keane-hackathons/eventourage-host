import React from 'react'
import { useNavigate } from "react-router-dom";
import './Entry.css'
import { ReactComponent as WhiteBackdrop } from "../../assets/img/circle-scatter.svg";
import { Button } from 'antd';
import { PrimaryEntryButton } from '../../components/StyledButton';

export const Entry = () => {
  const navigate = useNavigate()
  return(
    <>
      <WhiteBackdrop className="backdrop"/>
      <div className="slogan">
        <h1>Join Heineken<br/>Events</h1>
        <p>Collect NFT</p>
      </div>
      <div className="btns-box">
        <PrimaryEntryButton onClick={() => navigate(`otp`)}>
          Explore Now
        </PrimaryEntryButton>
        <br/>
        <Button type='link'>connect your wallet to manage events</Button>
      </div>
    </>
  )
}
