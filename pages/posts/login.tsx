import { useState } from 'react';
import { User } from '../../types/types';
import Link from 'next/link';
import Head from 'next/head';
import { Layout } from '../../component/layout';
import styles from '../../styles/login.module.css';

// idとメアドとパスワードをfetchで取得する
export async function getAllJsonUser() {
  return fetch(`http://localhost:8000/users/`)
    .then((res) => res.json())
    .then((data) => {
      return data.map((data: User) => {
        return {
          user: {
            id: data.id,
            email: data.email,
            password: data.password,
            logined: data.logined,
          },
        };
      });
    });
}

// html
export default function Login() {
  const initialValue = { mail: '', pass: '' };
  const [formValue, setFormValue] = useState<any>(initialValue);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let newFormValue = formValue;
    newFormValue[name] = value;
    setFormValue(newFormValue);
    console.log(formValue);
  };

  // ログインボタンをクリックした時に、Userのloginedをtrueにする & ページ遷移する”
  async function onCkickMatch() {
    const users = await getAllJsonUser();

    // console.log(users[0]);
    users.forEach(
      (user: {
        id: number;
        email: string;
        password: string;
        logined: boolean;
      }) => {
        if (
          user.email === formValue.mail &&
          user.password === formValue.pass
        ) {
          user.logined = true;
        }
      }
    );
    return fetch('http://localhost:8000/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users),
    }).then((res) => res.json());
  }

  return (
    <>
      <Head>
        <title>ログイン画面</title>
      </Head>
      <Layout>
        <form className={styles.formContainer}>
          <h1 className={styles.h1}>ログイン</h1>
          <div>
            <div>
              <div className={styles.labelError}>
                <label className={styles.label}>
                  メールアドレス：
                </label>
                {formValue.mail === '' && (
                  <p className={styles.error}>
                    メールアドレスを入力してください
                  </p>
                )}
                <br />
              </div>
              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                name="mail"
                id="email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <div className={styles.labelError}>
                <label className={styles.label}>パスワード：</label>
                {formValue.pass === '' && (
                  <p className={styles.error}>
                    パスワードを入力してください
                  </p>
                )}
                <br />
              </div>
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                name="pass"
                id="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {formValue.pass === '' && (
              <button onClick={() => onCkickMatch()}>ログイン</button>
            )}
            {!(formValue.pass === '') && (
              <Link href="/">
                <button className={styles.loginBtn} onClick={() => onCkickMatch()}>
                  ログイン
                </button>
              </Link>
            )}
          </div>
        </form>

        <Link href="../create">
          <a className={styles.forCreate}>ユーザー登録はこちら</a>
        </Link>
      </Layout>
    </>
  );
}

// エラーメッセが消えない -> 17業目のエラーが関係してる？
// db.jsonに存在してるアドレスとパスを入れてもページ遷移されない -> 不明
