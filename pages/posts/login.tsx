import { useState } from 'react';
import { User } from '../../types/types';
import Link from 'next/link';


// idとメアドとパスワードをfetchで取得する
export async function getAllJsonUser({
  userData,
}: {
  userData: {
    id: number;
    email: string;
    password: string;
  };
}) {
  return fetch(`http://localhost:3000/items/${userData.id}`)
    .then((res) => res.json())
    .then((data) => {
      return data.map((data: User) => {
        return {
          params: {
            id: data.id,
            email: data.email,
            password: data.password,
          },
        };
      });
    })
}


// ログインボタンをクリックした時に、Userのloginedをtrueにする or エラー表示する
function onCkickMatch() {
    if (
        data.email === email.target.value &&
        data.password === password.target.value
      ) { // Userのloginedをtrueにする
      } else {
        // <p>メールアドレス、またはパスワードが間違っています</p>を表示する
      }
}


// html
export default function Login() {
  const initialValue = { mail: '', pass: '' };
  const [formValue, setFormValue] = useState(initialValue);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };

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
            <label>パスワード：</label>
            <input
              type="password"
              placeholder="Password"
              name="pass"
              id="password"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <Link href="/">
          {/* クリックイベント2つ書きたい */}
          <button ocClick={() => onCkickMatch() &&
            // ログイン後の一覧表示画面へ遷移
          }>ログイン</button>
          </Link>

        </div>
      </form>

      <Link href="../create">
        <a>ユーザー登録はこちら</a>
      </ Link>

    </>
  );
}
