import React from "react";
import { Button } from "antd";
import {
  MinusOutlined
} from "@ant-design/icons";
export const CountDownButton = ({ onClick, isDisabled, }) => (
  <Button onClick={onClick} disabled={isDisabled}>
    <MinusOutlined />
  </Button>
)
