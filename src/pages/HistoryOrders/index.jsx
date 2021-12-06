import React, { useEffect, useReducer } from "react";
import { db, auth } from '../../config/firebase';
import { Layout, Row, Divider } from "antd";
import { SideMenu } from "../../component/SideMenu";
import {
  initialstate,
  historysActionTypes,
  historysReducer,
} from '../../reducers/Historys'
import { REQUEST_STATE } from "../../content";

const { Header, Content } = Layout;

const HistoryOrders = () => {
  const [historysState, dispatch] = useReducer(historysReducer, initialstate);
  const user = auth.currentUser;
  const userId = user.uid;

  useEffect(() => {
    dispatch({ type: historysActionTypes.FETCHING })
    db.collection('users').doc(userId)
      .collection('orderHistory')
      .get()
      .then(querysnapshot => {
        const historyOrder = querysnapshot.docs.map(doc => {
          return { ...doc.data() }
        })
        dispatch({
          type: historysActionTypes.FETCHING_SUCCESS,
          payload: { historys: historyOrder }
        })
      })
      .catch((e) => console.log(e))
  }, [])
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
            <div>
              <Divider orientation="left">プロフィール</Divider>
              <h1>{`メールアドレス: ${user.email}`}</h1>
              <h1>住所: XX県XX市XX区X-X-X</h1>
            </div>
            <div>
              <Divider orientation='center'>注文商品履歴</Divider>
              <Row gutter={[16, 16]}>
                {historysState.featchState === REQUEST_STATE.LOADING ?
                  <div><h1>お待ち下さい・・・</h1></div> :
                  historysState.historysList.map((history, index) => {
                    return (
                      <>
                        <h1>NotFound</h1>
                      </>

                    )
                  })}

              </Row>
            </div>

          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default HistoryOrders
