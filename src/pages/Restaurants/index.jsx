import React, { useReducer, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import firebase from '../../config/firebase';
import { Layout, Divider, Row, Col, Card } from 'antd';
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer,
} from '../../reducers/restaurants';

//conponent
import { SideMenu } from '../../component/SideMenu';

import styles from './styles.module.css'
import { REQUEST_STATE } from '../../content';

const { Header, Content } = Layout;
const { Meta } = Card;


const Restaurants = () => {
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  const history = useHistory()
  useEffect(() => {
    dispatch({ type: restaurantsActionTypes.FETCHING })
    firebase.firestore()
      .collection('restaurants')
      .get()
      .then(querySnapshot => {
        const rest = querySnapshot.docs.map(doc => {
          return { ...doc.data(), uid: doc.id }
        })
        dispatch({
          type: restaurantsActionTypes.FETCHING_SUCCESS,
          payload: { restaurants: rest }
        })
      })


  }, []);

  const onLogout = () => {
    return firebase.auth().signOut();
  }

  return (
    <>
      <Layout>
        <Header />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <SideMenu logout={onLogout} />

          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Divider orientation="left">レストラン一覧</Divider>
            <Row gutter={[16, 16]}>
              {state.fetchState === REQUEST_STATE.LOADING ?
                <h1>お待ち下さい・・・</h1>
                : state.restaurantsList.map((restaurants, index) => {
                  return (
                    <Col key={index} className="gutter-row" span={[8]}>
                      <Card
                        onClick={() => history.push(`/${restaurants.uid}/foods`)}
                        hoverable
                        style={{ width: 240 }}
                        cover={
                          <div className={styles.restImg}>
                            <img className={styles.img} alt='exsample' src={restaurants.img} />
                          </div>
                        }
                      >
                        <Meta
                          title={restaurants.name}
                          description={`${restaurants.time_required}分でお届け`}
                        />
                      </Card>

                    </Col>
                  )
                })}
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default Restaurants;
