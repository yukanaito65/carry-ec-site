import Link from 'next/link';
import { useState } from 'react';

export default function User() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const onClickRegister = () => {
    if (name && email && address && tel && password && checkPassword) {
      return fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          address: address,
          tel: tel,
          password: password,
          checkPassword: checkPassword,
        }),
      });
    } else {
      alert('全ての項目を入力してください');
      return;
    }
  };

  return (
    <form action="post">
      <label htmlFor="name">名前:</label>
      <p>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </p>

      <label htmlFor="email">メールアドレス:</label>
      <p>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </p>
      <label htmlFor="address">住所:</label>
      <p>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </p>
      <label htmlFor="tel">電話番号:</label>
      <p>
        <input
          type="text"
          id="tel"
          name="tel"
          value={tel}
          onChange={(e) => {
            setTel(e.target.value);
          }}
        />
      </p>
      <label htmlFor="password">パスワード:</label>
      <p>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </p>
      <label htmlFor="checkPassword">パスワード:</label>
      <p>
        <input
          type="password"
          id="checkPassword"
          name="checkPassword"
          value={checkPassword}
          onChange={(e) => {
            setCheckPassword(e.target.value);
          }}
        />
      </p>
      {(name &&email &&address &&tel &&password &&checkPassword) && 
         <Link href='/'><button type='button' onClick={() => onClickRegister()}>登録</button></Link>}
      <button type="reset">キャンセル</button>
    </form>
  );
}
