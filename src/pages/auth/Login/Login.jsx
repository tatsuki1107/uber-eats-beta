import React, { useState, useContext } from 'react'
import { auth } from '../../../config/firebase'
import { AuthContext } from '../../../AuthService';
import { Redirect } from 'react-router';
import { Layout, Form, Row, Col, Typography, Input, Button, message, Modal } from 'antd'
import styles from './style.module.css'
import { useForm } from 'antd/lib/form/Form';


const { Header, Content, Footer } = Layout;
const { Title } = Typography

const Login = ({ history }) => {
  const [form] = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const resetPassword = (email) => {
    auth.sendPasswordResetEmail(email);
  }
  const handleOk = () => {
    resetPassword(email);
    message.success('再発行メールを送信しました');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
        message.success('ログインに成功しました')
      })
      .catch(err => {
        message.error('ログインに失敗しました')
        console.log(err);
      });
  };
  const user = useContext(AuthContext)

  if (user) {
    return <Redirect to="/" />
  }

  return (
    <>
      <Layout>
        <Header />
        <Content>
          <Form layout="vertical" onFinish={handleSubmit} form={form} size="large">
            <div className={styles.form}>
              <Row>
                <Col xs={0} sm={1} md={4} lg={5} xl={6} />
                <Col xs={24} sm={22} md={16} lg={14} xl={12}>
                  <Title level={1} className={styles.title}>
                    ログイン
                  </Title>
                  <Form.Item
                    name="email"
                    label="メールアドレス"
                    rules={[{ required: true, message: '必須項目です' }]}
                    value={email}
                  >
                    <Input onChange={e => {
                      setEmail(e.target.value);
                    }} />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="パスワード"
                    rules={[{ required: true, message: '必須項目です' }]}
                    value={password}
                  >
                    <Input.Password onChange={e => {
                      setPassword(e.target.value);
                    }} />
                  </Form.Item>
                  <div className={styles.buttonLink}>
                    <Button type="link" size='small' href='/SignUp'>初めての方はこちら</Button>
                    <Button type="link" onClick={showModal} size='small'>パスワードを忘れた方はこちら</Button>
                  </div>
                  <Modal
                    title="パスワードを再発行する"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <label htmlFor="email">メールアドレスを入力して下さい</label>
                    <Input
                      name="email"
                      onChange={e => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Modal>
                  <div className={styles.buttonWrapper}>
                    <Button block size="large" type="primary" htmlType="submit">
                      ログイン
                    </Button>
                  </div>
                </Col>
                <Col xs={0} sm={1} md={4} lg={5} xl={6} />
              </Row>
            </div>
          </Form>
        </Content>
        <Footer />
      </Layout>
    </>
  )
}

export default Login
