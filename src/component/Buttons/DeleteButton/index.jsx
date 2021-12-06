import React from "react";
import { Button } from "antd";

const DeleteButton = ({ onDelete }) => {
  return (
    <>
      <Button onClick={onDelete}>削除</Button>
    </>

  )
}

export { DeleteButton }
