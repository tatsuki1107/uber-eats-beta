import React from "react";
import { Modal, Button } from "antd";
import { CountDownButton } from "../Buttons/CountDownButton";
import { CountUpButton } from "../Buttons/CountUpButton";
import styles from './style.module.css';

export const FoodOrderDialog = ({
  food,
  countNumber,
  isOpen,
  onClose,
  onClickCountUp,
  onClickCountDown,
  onClickOrder,
}) => {
  return (
    <Modal
      title="注文画面"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key='back'
          onClick={onClose}
        >戻る
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={onClickOrder}
        >{`${countNumber}点を注文に追加`}
        </Button>
      ]}
    >
      <div>
        <div>
          <div className={styles.foodImg}>
            <img
              alt='example'
              src={food.img}
              className={styles.img} />
          </div>

          <div>{food.name}</div>
          <div>{`単価${food.fee}円`}</div>
        </div>
        <div className={styles.sumFee}>
          <CountDownButton
            onClick={() => onClickCountDown()}
            isDisabled={countNumber <= 1}
          />
          <div>{countNumber}</div>
          <CountUpButton
            onClick={() => onClickCountUp()}
            isDisabled={countNumber >= 9}
          />
          <div>{`¥${countNumber * food.fee}`}</div>
        </div>
      </div>
    </Modal>
  )
}
