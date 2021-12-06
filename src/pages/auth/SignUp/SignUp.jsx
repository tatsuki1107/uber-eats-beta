import React, { useState } from 'react'
import { db, auth } from '../../../config/firebase'
import { Layout, Form, Row, Col, Typography, Input, Button, message } from 'antd'
import styles from './style.module.css';
import { useHistory } from 'react-router';

const { Header, Content, Footer } = Layout;
const { Title } = Typography

const SignUp = () => {
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        db.collection('users').doc(user.uid)
          .set({
            email: email,
            name: name
          });
        history.push('/')
        message.success('完飲登録に成功しました')
      })
      .catch(err => {
        console.log(err);
        message.error('ログインに失敗しました')
      })
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
                    会員登録
                  </Title>
                  <Form.Item
                    name='name'
                    label="名前"
                    rules={[{ required: true, message: '必須項目です' }]}
                    value={name}
                  >
                    <Input onChange={e => {
                      setName(e.target.value);
                    }} />
                  </Form.Item>
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
                  <Button type="link" size='small' href='/Login'>会員の方はこちら</Button>
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

export default SignUp
