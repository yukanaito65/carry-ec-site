import styles from './layout.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '../types/types';
import { userAgent } from 'next/server';
import { useRouter } from 'next/router';



export function Layout({
  children,
  show,
}: {
  children: any;
  show: boolean;
}) {
  // const [show, setShow] = useState("");
  // const onClickShow = () => {
  //   if (show === "") {
  //     setShow("show");
  //   } else {
  //     setShow("");
  //   }
  // }

  const [loginShow, setLoginShow] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoginShow(true);
    }
  }, []);

// ログアウトボタンのクッキー削除
function onClickLogout() {
  // クッキーのid削除
  const cookieId = document.cookie
    .split('; ')
    .find((row) => row.startsWith('id'));
  console.log(cookieId); //id=1
  document.cookie = `${cookieId}; max-age=0`;

  // クッキーのname削除
  const cookieName = document.cookie;
  console.log(cookieName);
  document.cookie = `${cookieName}; max-age=0`;
  console.log(loginShow);
}

  // 現在のURLを宣言
  const router = useRouter();
  let currentUrl = router.pathname;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <img src="/img_curry/header_logo.png" height={35} />
          </a>
        </Link>
        <BreadCrumb
          lists={[
            {
              name: 'ホーム',
              path: '/',
            },
          ]}
        />
        <div className={styles.span}></div>
        {/* <div className={styles.hamburgerMenu} onClick={onClickShow}>
          <span></span>
        </div> */}

        <div className={styles.pcHeaderNav}>
          <ul>
            {!(currentUrl === '/') ? (
              <Link href="/">
                <a>
                <li className={styles.nav}>商品一覧</li>
                </a>
              </Link>
            ):(<li className={styles.nowNav}>商品一覧</li>)}
            
            {!(currentUrl === '/order') ? (
              <Link href="/order">
                <a>
                <li className={styles.nav}>ショッピングカート</li>
                </a>
              </Link>
            ):(<li className={styles.nowNav}>ショッピングカート</li>)}

            {show === true && loginShow && (
              <>
              {document.cookie && currentUrl !== '/history' ? (
              <Link href="/history">
                <a>
                <li className={styles.nav}>注文履歴</li>
                </a>
              </Link>
            ) : document.cookie && (<li className={styles.nowNav}>注文履歴</li>)}
            
                {/*ログイン状態なら、ログインの代わりにユーザー名を表示 */}
                {document.cookie && (
                  <a>
                    <li>
                      {
                        //@ts-ignore
                        document.cookie
                          .split('; ')
                          .find((row) => row.startsWith('name'))
                          .split('=')[1]
                      }
                      さん
                    </li>
                  </a>
                )}
                {!document.cookie && (
                  <Link href="/posts/login">
                    <a>
                      <li>ログイン</li>
                    </a>
                  </Link>
                )}
                {document.cookie && (
                  <Link href="/">
                    <a>
                      <li>
                        <button
                          className={styles.logout}
                          onClick={() => onClickLogout()}
                        >
                          ログアウト
                        </button>
                      </li>
                    </a>
                  </Link>
                )}
              </>
            )}
          </ul>
        </div>
      </header>
      {/* <nav id="headerNav" className={`${styles.headerNav} ${show}`}>
        <ul>
          <li>ショッピングカート</li>
          <li>注文履歴</li>
          <li>ログイン</li>
          <li>ログアウト</li>
        </ul>
      </nav> */}
      {children}
    </div>
  );
}
