

import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/create.module.css';
import { Layout } from '../components/layout';

export default function User() {
  const [lastName, setlastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const router = useRouter();
  const [fromValue, setFormValue]=useState('');

  const onClickRegister = () => {
    if (
      lastName &&
      firstName &&
      email &&
      zipcode &&
      address &&
      tel &&
      password &&
      checkPassword
    ) {
      router.push('/');
      return fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          lastName: lastName,
          firstName: firstName,
          email: email,
          zipcode: zipcode,
          address: address,
          tel: tel,
          password: password,
          checkPassword: checkPassword,
        }),
      });
    }  if (!lastName || !firstName) {
      alert('名前を入力してください。');
      return;
    }  if (!email) {
      alert('メールアドレスを入力してください。');

    }
    if (!zipcode) {
      alert('郵便番号を入力してください。');
    }
    if (!address) {

      alert('住所を入力してください。');
    }  if (!tel) {
      alert('電話番号を入力してください');

    }
    if (!password) {
      alert('パスワードを入力してください。');
    }
    if (!checkPassword) {

      alert('確認用のパスワードを入力してください。');
    } else {
      alert('全ての項目を入力してください');
      router.push('/create');
      return;
    }
  };

  return (

    <Layout>
      <fieldset className={styles.fieldset_style}>
        <legend className={styles.legend}>ユーザ登録</legend>
        
        <form action="post">
          <div className={styles.title}>
            <label htmlFor="lastName">名前：</label>
            <div>
              <label htmlFor="lastName">姓</label>

              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                placeholder="LastName"
                className={styles.form_name}
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
              />
              <label htmlFor="firstName">
                &nbsp;&nbsp;&nbsp;&nbsp;名
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                placeholder="FirstName"
                className={styles.form_name}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.title}>
            <label htmlFor="email">メールアドレス:</label>

            <input
              type="text"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              className={styles.form}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={styles.title}>
            <label htmlFor="zipcode">郵便番号:</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={zipcode}
              placeholder="Zipcode"
              className={styles.form}
              onChange={(e) => {
                setZipcode(e.target.value);
              }}
            />
          </div>
          <div className={styles.title}>
            <label htmlFor="address">住所：</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              placeholder="Address"
              className={styles.form}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></input>
          </div>
          <div className={styles.title}>
            <label htmlFor="tel">電話番号:</label>

            <input
              type="text"
              id="tel"
              name="tel"
              value={tel}
              placeholder="PhoneNumber"
              className={styles.form}
              onChange={(e) => {
                setTel(e.target.value);
              }}
            />
          </div>
          <div className={styles.title}>
            <label htmlFor="password">パスワード:</label>
            {password.length < 8 &&(<span>8文字以上で入力してください</span>)}
            {password.length > 16 &&(<span>16文字以下で入力してください</span>)}
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className={styles.form}
              placeholder="PassWord"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.title}>
            <label htmlFor="checkPassword">確認用パスワード:</label>

            <input
              type="password"
              id="checkPassword"
              name="checkPassword"
              value={checkPassword}
              placeholder="Comfirmaition Password"
              className={styles.form}
              onChange={(e) => {
                setCheckPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className={styles.button_style}
            onClick={() => onClickRegister()}
          >
            登録
          </button>
          <button
            type="reset"
            className={styles.button_style}
            onClick={() => {
              setAddress(''),
                setlastName(''),
                setFirstName(''),
                setZipcode(''),
                setEmail(''),
                setPassword(''),
                setCheckPassword('');
            }}
          >
            キャンセル
          </button>
        </form>
      </fieldset>
    </Layout>

  );
}
