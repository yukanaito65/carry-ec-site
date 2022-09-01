import styles from './layout.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { User } from '../types/types';
import { userAgent } from 'next/server';


// ログアウトボタンのクッキー削除
function onClickLogout() {
  console.log(document.cookie); // id=1; name=undefined

  // クッキーのid削除
  const cookieId = document.cookie
  .split('; ')
  .find(row => row.startsWith('id'))
  console.log(cookieId); //id=1
  document.cookie = `${cookieId}; max-age=0`;

  // クッキーのname削除
  const cookieName = document.cookie
  console.log(cookieName); 
  document.cookie = `${cookieName}; max-age=0`;
}



export function Layout({ children, show }: { children: any; show: boolean }) {
  // const [show, setShow] = useState("");
  // const onClickShow = () => {
  //   if (show === "") {
  //     setShow("show");
  //   } else {
  //     setShow("");
  //   }
  // }


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <img src="/img_curry/header_logo.png" height={35} />
          </a>
        </Link>
        {/* <div className={styles.hamburgerMenu} onClick={onClickShow}>
          <span></span>
        </div> */}
        <div className={styles.pcHeaderNav}>
          <ul>
            <Link href="/order">
              <a>
                <li>ショッピングカート</li>
              </a>
            </Link>
            
            {show === true ?
              <>
                <Link href="/">
              <a>
                <li>注文履歴</li>
              </a>
            </Link>
            {/*ログイン状態なら、ログインの代わりにユーザー名を表示 */}
            {document.cookie && 
            <a>
              <li>{
                document.cookie.split('; ').find(row => row.startsWith('name')).split('=')[1]
                }さんようこそ</li>
            </a>
            }
            {!(document.cookie) && 
            <Link href="/posts/login">
            <a>
              <li>ログイン</li>
            </a>
            </Link>
            }
            <Link href="/">
              <a>
                <li>
                  <button onClick={() => onClickLogout()}>
                    ログアウト
                  </button>
                </li>
              </a>
            </Link>
              </> :
              <></>
            }
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
