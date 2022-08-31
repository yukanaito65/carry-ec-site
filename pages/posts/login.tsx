import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Layout } from '../../component/layout';
import styles from '../../styles/login.module.css';

// idとメアドとパスワードをfetchで取得する
// export async function getAllJsonUser() {
//   return fetch(`http://localhost:8000/users/`)
//     .then((res) => res.json())
//     .then((data) => {
//       return data.map((data: User) => {
//         return {
//           id: data.id,
//           email: data.email,
//           password: data.password,
//           logined: data.logined,
//         };
//       });
//     });
// }

// html
export default function Login() {
  const [mailText, setMailText] = useState<any>('');
  const [passText, setPassText] = useState<any>('');

  const onChangeMail = (e: any) => setMailText(e.target.value);
  const onChangePass = (e: any) => setPassText(e.target.value);

  // ログインボタンをクリックした時のアクション
  async function onCkickMatch() {
    // データ取得
    fetch(
      `http://localhost:8000/users?email=${mailText}&password=${passText}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: mailText,
          password: passText,
          logined: true,
        }),
      }
    ).catch((error) => {
      console.error('失敗しました', error);
    });
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
                {passText === '' && (
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
              <Link href="/posts/login">
                <button
                  className={styles.loginBtn}
                  onClick={() => onCkickMatch()}
                >
                  ログイン
                </button>
              </Link>
            )}
            {!(passText === '') && (
              <Link href="/">
                <button
                  className={styles.loginBtn}
                  onClick={() => onCkickMatch()}
                >
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

// 間違ったアドレス・パスワードを入れても一覧画面に遷移する
// db.jsonのloginedが変更されない
// ログインボタンの消去
// ログアウト機能の確認
