import React, { useState, useEffect, useReducer } from 'react'
import { Layout, Divider, Card, Row, Col } from 'antd'
import {
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
} from '../../reducers/foods';
import { useHistory } from 'react-router';
import firebase from '../../config/firebase'
import { FoodOrderDialog } from '../../component/FoodModal';
import { SideMenu } from '../../component/SideMenu';
import styles from './styles.module.css';
import { REQUEST_STATE } from '../../content';

const { Header, Content } = Layout;
const { Meta } = Card
const db = firebase.firestore()

const Foods = ({ match }) => {
  const [foodState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const user = firebase.auth().currentUser;
  const userId = user.uid
  const history = useHistory();

  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
    isOpenNewOrderDialog: false,
    existingRestaurantName: '',
    newRestaurantName: '',
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING })
    db.collectionGroup('foods')
      .where('restaurantId', '==', `${match.params.id}`)
      .get()
      .then(querySnapshot => {
        const food = querySnapshot.docs.map(doc => {
          return { ...doc.data(), uid: doc.id }
        })
        dispatch({
          type: foodsActionTypes.FETCHING_SUCCESS,
          payload: { foods: food }
        })
      })
  }, [])

  const submitTetativeOrder = () => {
    db.collection('users')
      .doc(userId)
      .collection('tentativeOrder')
      .add({
        userId: userId,
        food: state.selectedFood.name,
        count: state.selectedFoodCount,
        sum: state.selectedFoodCount * state.selectedFood.fee,
        fee: state.selectedFood.fee,
        restaurantId: match.params.id,
        img: state.selectedFood.img
      }).then(() => {
        history.push('/order')
        setState({
          ...state,
          isOpenOrderDialog: false,
        })
      })
  }

  const onLogout = () => {
    return firebase.auth().signOut();
  }

  return (
    <>
      <Layout>
        <Header />
        <Layout className='site-layout' style={{ marginLeft: 200 }}>
          <SideMenu logout={onLogout} />
          <Content>
            <Divider orientation="left">メニュー一覧</Divider>
            <Row gutter={[16, 16]}>
              {foodState.fetchState === REQUEST_STATE.LOADING ?
                <div><h1>お待ち下さい・・・</h1></div> :

                foodState.foodsList.map((food, index) => {
                  return (
                    <Col key={index} className="gutter-row" span={[8]}>
                      <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={
                          <div className={styles.foodImg}>
                            <img className={styles.img} alt='exsample' src={food.img} />
                          </div>
                        }
                        onClick={() => setState({
                          ...state,
                          isOpenOrderDialog: true,
                          selectedFood: food,
                        })}
                      >
                        <Meta
                          title={food.name}
                          description={`${food.fee}円(手数料込み)`}
                        />
                      </Card>

                    </Col>
                  )
                })}
            </Row>
            {
              state.isOpenOrderDialog &&
              <FoodOrderDialog
                food={state.selectedFood}
                isOpen={state.isOpenOrderDialog}
                countNumber={state.selectedFoodCount}
                onClickCountUp={() => setState({
                  ...state,
                  selectedFoodCount: state.selectedFoodCount + 1,
                })}
                onClickCountDown={() => setState({
                  ...state,
                  selectedFoodCount: state.selectedFoodCount - 1,
                })}
                onClickOrder={() => submitTetativeOrder()}
                onClose={() => setState({
                  ...state,
                  isOpenOrderDialog: false,
                  selectedFood: null,
                  selectedFoodCount: 1
                })}
              />
            }
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default Foods;
