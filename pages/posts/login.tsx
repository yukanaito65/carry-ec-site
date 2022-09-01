import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Layout } from '../../component/layout';
import styles from '../../styles/login.module.css';
import { useRouter } from 'next/router';

// html
export default function Login() {
  const [mailText, setMailText] = useState<any>('');
  const [passText, setPassText] = useState<any>('');
  const [ok, setOk] = useState(false);
  const [dataId, setDataId] = useState(0);
  const [dataLastName, setDataLastName] = useState("");
  const router = useRouter();

  const onChangeMail = (e: any) => setMailText(e.target.value);
  const onChangePass = (e: any) => setPassText(e.target.value);

  // データ取得
  
  fetch(
    `http://localhost:8000/users?email=${mailText}&password=${passText}`,
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 1) {
        setOk(true);
        setDataId(data[0].id);
        setDataLastName(data[0].lastName);
      } else {
        setOk(false);
      }
    });

  // ページ遷移
  const handleClick = () => {
    if (ok === false) {
      return;
    } else {
      router.push('/');
      document.cookie = `id = ${dataId}`;
      document.cookie = `name = ${dataLastName}`;
    }
  };

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
                <label htmlFor="email" className={styles.label}>
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
                <label htmlFor="password" className={styles.label}>
                  パスワード：
                </label>
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

            <button
              type="button"
              className={styles.loginBtn}
              onClick={() => handleClick()}
            >
              ログイン
            </button>
          </div>
        </form>

        <Link href="../create">
          <a className={styles.forCreate}>ユーザー登録はこちら</a>
        </Link>
      </Layout>
    </>
  );
}
