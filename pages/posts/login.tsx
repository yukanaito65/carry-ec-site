import { useState } from 'react';
import { User } from '../../types/types';
import Link from 'next/link';


// idとメアドとパスワードをfetchで取得する
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
  const [formValue, setFormValue] = useState(initialValue);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let newFormValue = formValue;
    newFormValue[name] = value;
    setFormValue(newFormValue);
    console.log(formValue)
  };

  // ログインボタンをクリックした時に、Userのloginedをtrueにする or ページ遷移する”
  async function onCkickMatch() {
    const users = await getAllJsonUser();
    console.log(users[0]);
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
    return fetch("http://localhost:8000/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users)
    })
  }


  return (
    <>
      <form>
        <h1>ログイン</h1>
        <hr />
        <div>

          <div>
            <label>メールアドレス：</label>
            <input
              type="email"
              placeholder="Email"
              name="mail"
              id="email"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            {
              (formValue.pass === "") &&
              <p>パスワードを入力してください</p>

            }
            <label>パスワード：</label>
            <input
              type="password"
              placeholder="Password"
              name="pass"
              id="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {
            formValue.pass === "" &&
            <button onClick={() => onCkickMatch()}>ログイン</button>
          }
          {/* クリックイベント2つ書きたい */}
          {
            !(formValue.pass === "") &&
            <Link href="/">
              {/* クリックイベント2つ書きたい */}
              <button onClick={() => onCkickMatch()}>ログイン</button>
            </Link>
          }

        </div>
      </form>

      <Link href="../create">
        <a>ユーザー登録はこちら</a>
      </ Link>

    </>
  );
}
