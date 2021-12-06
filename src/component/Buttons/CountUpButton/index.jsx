import React from 'react';
import { Button } from 'antd';
import {
  PlusOutlined
} from "@ant-design/icons";
export const CountUpButton = ({ onClick, isDisabled, }) => (
  <Button onClick={onClick} disabled={isDisabled}>
    <PlusOutlined />
  </Button>
)
