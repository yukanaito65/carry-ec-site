import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/create.module.css';
import { Layout } from '../component/layout';

export default function User() {
  const [lastName, setlastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const router = useRouter();
  const [passwordError, setPasswordError] = useState('');

  const handleBlur = (e: any) => {
    const password = e.target.value;
    if (!password) {
      setPasswordError('パスワードを入力してください');
    } else if (password.length < 8) {
      setPasswordError('8文字以上で入力してください');
    } else if (password.length > 16) {
      setPasswordError('16文字以下で入力してください');
    } else {
      setPasswordError;
    }
  }; //パスワードを入力したときに、表示される関数。

  const onClickRegister = () => {     //全ての項目があるときに、db.jsonのusersに値が追加される。
    fetch("http://localhost:8000/users").then(res => res.json()).then(data => {
      if (
        !(lastName &&
          firstName &&
          email &&
          zipcode &&
          address &&
          tel &&
          8 <= password.length &&
          password.length <= 16 &&
          checkPassword)
      ) {
        alert('埋めてください')
      } else if (data.filter((el: any) => el.email === email).length > 0) {
        alert("既にあります")
      } else {
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
      }
    })
    // if (
    //   !lastName ||
    //   !firstName ||
    //   !email ||
    //   !zipcode ||
    //   !address ||
    //   !tel ||
    //   !password ||
    //   !checkPassword
    // ) {
    //   alert('全ての項目を入力してください'); //一つでも項目の入力がされてなかったら、アラートを表示
    //   router.push('/create');
    // } else {
    //   alert('全ての項目を入力してください');

    //   return;
    // }
  };

  return (
    <Layout>
      <fieldset className={styles.fieldset_style}>
        <p className={styles.form_title}>ユーザ登録</p>
        <form action="post">
          <div className={styles.title}>
            <label htmlFor="lastName">名前：</label>
            {lastName.length < 1 && (
              <span className={styles.subTitle}>
                名前を入力してください
              </span>
            )} {/*入力されてない時だけ"名前を入力してください”を表示 以下全てのinputに同様の機能追加*/}
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
            {email.length < 1 && (
              <span className={styles.subTitle}>
                メールアドレスを入力してください
              </span>
            )}
            <input
              type="email"
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
            {zipcode.length < 1 && (
              <span className={styles.subTitle}>
                郵便番号を入力してください
              </span>
            )}
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
            {address.length < 1 && (
              <span className={styles.subTitle}>
                住所を入力してください
              </span>
            )}
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
            {tel.length < 1 && (
              <span className={styles.subTitle}>
                電話を入力してください
              </span>
            )}

            <input
              type="tel"
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
            {passwordError && (
              <span className={styles.subTitle}>{passwordError}</span>
            )}
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
              onBlur={handleBlur}
            />
          </div>
          <div className={styles.title}>
            <label htmlFor="checkPassword">確認用パスワード:</label>
            {checkPassword.length < 1 && (
              <span className={styles.subTitle}>
                確認用パスワードを入力してください
              </span>
            )}
            {checkPassword !== password && (
              <span className={styles.subTitle}>
                パスワードと確認用パスワードが不一致です。
              </span>
            )}{/*パスワードと確認用パスワードが違ったら表示される*/}
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
                setTel(''),
                setZipcode(''),
                setEmail(''),
                setPassword(''),
                setCheckPassword('');
            }}
          >{/* キャンセルボタンが押されたときに、全ての値をリセットする*/}
            キャンセル
          </button>
        </form>
      </fieldset>
    </Layout>
  );
}
