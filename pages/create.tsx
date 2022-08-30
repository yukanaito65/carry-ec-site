import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function User() {
  const [lastName, setlastName] = useState('');
  const [firstName, setFirstName] = useState('');

  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const router = useRouter();

  const onClickRegister = () => {
    if (
      lastName &&
      firstName &&
      email &&
      address &&
      tel &&
      password &&
      checkPassword
    ) {
      router.push('/');
      return fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          lastName: lastName,
          firstName: firstName,
          email: email,
          address: address,
          tel: tel,
          password: password,
          checkPassword: checkPassword,
        }),
      });
    }  if (!lastName || !firstName) {
      alert('名前を入力してください。');
      return;
    }  if (!email) {
      alert('メールアドレスを入力してください。');
    }  if (!address) {
      alert('住所を入力してください。');
    }  if (!tel) {
      alert('電話番号を入力してください');
    }  if (!password) {
      alert('パスワードを入力してください。');
    }  if (!checkPassword) {
      alert('確認用のパスワードを入力してください。');
    } else {
      alert('全ての項目を入力してください');
      router.push('/create');
      return;
    }
  };

  return (
    <form action="post">
      <p>
        {' '}
        <label htmlFor="lastName">姓:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => {
            setlastName(e.target.value);
          }}
        />
        <label htmlFor="firstName">名:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </p>

      <p>
        <label htmlFor="email">メールアドレス:</label>

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
      <p>
        <label htmlFor="address">住所:</label>

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
      <p>
        <label htmlFor="tel">電話番号:</label>

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
      <p>
        <label htmlFor="password">パスワード:</label>

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
      <p>
        <label htmlFor="checkPassword">パスワード:</label>

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
      <button type="button" onClick={() => onClickRegister()}>
        登録
      </button>
      <button type="reset">キャンセル</button>
    </form>
  );
}
