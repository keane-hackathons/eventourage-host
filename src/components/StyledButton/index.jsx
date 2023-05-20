import styled from 'styled-components';
import { Button } from 'antd';

export const PrimaryEntryButton = styled(Button)`
  border-radius: 25px;
  border: none;
  background-color: #001122;
  color: white;
  min-width: 400px;
  width: 35%;
  min-height: 40px;
  height: 6vh;
  font-size: 1.2rem;
  font-weight: bold;

  &.ant-btn-default:hover {
    border: 3px solid #80E572;
    color: #80E572;
  } 
`


