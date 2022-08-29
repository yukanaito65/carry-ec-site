import styles from "./layout.module.css"
import { useState } from "react";
import Link from "next/link";


export function Layout({ children }: { children: any }) {
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
            <Link href="/posts/order">
              <a>
                <li>ショッピングカート</li>
              </a>
            </Link>
            <Link href="/">
              <a>
                <li>注文履歴</li>
              </a>
            </Link>
            <Link href="/posts/login">
              <a>
                <li>ログイン</li>
              </a>
            </Link>
            <Link href="/">
              <a>
                <li>ログアウト</li>
              </a>
            </Link>
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
  )
}
