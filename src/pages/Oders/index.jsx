import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { Layout, Divider, Card, Row, Col, Button, message } from "antd";
import {
  initialstate,
  ordersActionTypes,
  ordersReducer
} from "../../reducers/oders";
import { db, auth } from '../../config/firebase'
import Meta from "antd/lib/card/Meta";
import { OrderModal } from "../../component/OrderModal";
import { useHistory } from "react-router";
import { SideMenu } from "../../component/SideMenu";
import styles from './styles.module.css'

const { Header, Content } = Layout

const Orders = () => {
  const [ordersState, dispatch] = useReducer(ordersReducer, initialstate);
  const user = auth.currentUser;
  const userId = user.uid;
  const [updateOrder, setUpdateOrder] = useState(false);
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: ordersActionTypes.FETCHING })
    db.collection('users').doc(user.uid)
      .collection('tentativeOrder')
      .get()
      .then(querysnapshot => {
        const order = querysnapshot.docs.map(doc => {
          return { ...doc.data(), uid: doc.id }
        })
        dispatch({
          type: ordersActionTypes.FETCHING_SUCCESS,
          payload: { orders: order }
        })
      })
      .catch((e) => console.log(e));
    setUpdateOrder(false);
  }, [updateOrder])

  let tentativeSum = []
  ordersState.ordersList.map((order) => {
    tentativeSum.push(order.sum);
  })

  const sumArray = tentativeSum => {
    let sum = 0;
    for (let i = 0, len = tentativeSum.length; i < len; i++) {
      sum += tentativeSum[i];
    }
    return sum
  }

  const amount = (sumArray(tentativeSum));
  const onBuy = (userId) => {
    db.collection('users').doc(userId)
      .collection('orderHistory')
      .add({
        orders: { created: new Date(), ...ordersState.ordersList.map((list) => list) }
      }).then(() => {
        setIsOpenOrderModal(false);
        message.success('ご注文ありがとうございました。到着までしばらくお待ち下さい。')
        history.push('/')
      }).catch(e => console.log(e))
  }

  const onDelete = (orderId) => {
    db.collection('users').doc(user.uid)
      .collection('tentativeOrder').doc(orderId)
      .delete()
    setUpdateOrder(true);
  }

  const onLogout = () => {
    return auth.signOut();
  }


  return (
    <>
      <Layout>
        <Header />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <SideMenu logout={onLogout} />
          <Content>
            <Divider orientation="left">仮注文一覧</Divider>
            {ordersState.ordersList.length !== 0 &&
              <div className={styles.orderItem}>
                <div>{`現在の合計金額${amount}円`}</div>
                <Button
                  onClick={() => setIsOpenOrderModal(true)}
                >注文を確定する
                </Button>
              </div>
            }


            <Row gutter={[16, 16]}>
              {ordersState.ordersList.map((order, index) => {
                return (
                  <>
                    <Col key={index} className="gutter-row" span={[8]}>
                      <Card
                        hoverable
                        extra={
                          <Button onClick={() => onDelete(order.uid)}
                            shape='circle'>
                            削除</Button>
                        }
                        style={{ width: 240 }}
                        cover={
                          <div className={styles.orderImg}>
                            <img className={styles.img} alt='exsample' src={order.img} />
                          </div>
                        }

                      >
                        <Meta
                          title={order.food}
                          description={`${order.fee}円 　個数: ${order.count}`}
                        />
                      </Card>
                    </Col>
                  </>
                )
              })}
            </Row>
            {
              isOpenOrderModal &&
              <OrderModal
                isOpen={isOpenOrderModal}
                totalAmount={amount}
                orderList={ordersState.ordersList}
                onClose={() => setIsOpenOrderModal(false)}
                onBuy={() => onBuy(userId, history)}
              />
            }
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default Orders;
