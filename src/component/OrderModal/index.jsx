import React from "react";
import { Modal, Button } from "antd";
//import styles from './styles.module.css'

export const OrderModal = ({ isOpen, totalAmount, orderList, onClose, onBuy }) => {
  return (

    <>
      <Modal
        title="注文画面"
        visible={isOpen}
        onCancel={onClose}
        footer={[
          <Button
            key='submit'
            type='primary'
            onClick={onBuy}
          >注文を確定する
          </Button>
        ]}
      >
        <div>
          {orderList.map((order) => {
            return (
              <div>
                <h1>{order.food}</h1>
                <h1>{`¥${order.fee}`}</h1>
                <h1>{`個数: ${order.count}`}</h1>
              </div>
            )
          })}
          <h3>{`合計金額${totalAmount}円`}</h3>
        </div>


      </Modal>
    </>
  )
}
