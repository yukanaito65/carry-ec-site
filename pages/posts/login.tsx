import { useState } from 'react';
import { User } from '../../types/types';
import Link from 'next/link';
import Head from 'next/head';
import { Layout } from '../../component/layout';
import styles from '../../styles/login.module.css';
import useSWR from 'swr';
import { fetcher } from '../../component/jsonitems';

// idとメアドとパスワードをfetchで取得する

export async function getAllJsonUser() {
  return fetch(`http://localhost:8000/users/`)
    .then((res) => res.json())
    .then((data) => {
      return data.map((data: User) => {
        return {
            id: data.id,
            email: data.email,
            password: data.password,
            logined: data.logined,
        };
      });
    });
}

// html
export default function Login() {
  const [mailText, setMailText] = useState<any>("");
  const [passText, setPassText] = useState<any>("");

  const onChangeMail = (e: any) => setMailText(e.target.value);
  const onChangePass = (e: any) => setPassText(e.target.value);

  // ログインボタンをクリックした時に、Userのloginedをtrueにする & ページ遷移する”
  async function onCkickMatch() {
    const users = await getAllJsonUser();

    // console.log(users[0]);

    users.map(
      (user: {
        id: number;
        email: string;
        password: string;
        logined: boolean;
      }) => {
        console.log(user);
        console.log(user.email);
        console.log(mailText);
        console.log(user.password);
        console.log(passText);
        if (
          user.email === mailText &&
          user.password === passText
        ) {

          return user.logined = true;
        }
      }
    );

    console.log(users);

    return fetch("http://localhost:8000/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users)
    })
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
                {mailText === '' && (
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
                value={mailText}
                onChange={onChangeMail}
              />
            </div>

            <div>
              <div className={styles.labelError}>
                <label className={styles.label}>パスワード：</label>
                {passText === "" && (
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
                value={passText}
                onChange={onChangePass}
              />
            </div>
            {passText === '' && (
              <button onClick={() => onCkickMatch()}>ログイン</button>
            )}
            {!(passText === '') && (
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
