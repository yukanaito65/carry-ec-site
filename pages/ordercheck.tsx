import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import styles from '../component/check.module.css';
import React from 'react';
import StripeApi from '../lib/stripe';
import Link from 'next/link';
import OrderCheck from '../component/Cluculate';
export const fetcher: (args: string) => Promise<any> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function CheckUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [tel, setTel] = useState('');
  const [day, setDay] = useState('');
  const [creditVal, setCreditVal] = useState('');
  const router = useRouter();
  const [creditShow, setCreditShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);

  const { data, error } = useSWR(
    'http://localhost:8000/order',
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  //  @ts-ignore
  const cookieName = document.cookie
    .split('; ')
    .find((row) => row.startsWith('name'))
    .split('=')[1];
  fetch(`http://localhost:8000/users?name=${cookieName}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      setName(data[0].name), setEmail(data[0].email);
    });

  const onClickSync = () => {
    fetch(`http://localhost:8000/users?name=${name}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setZipcode(data[0].zipcode),
          setAddress(data[0].address),
          setTel(data[0].tel);
      });
  };

  const onClickCheck = () => {
    if (creditVal === 'card') {
      setCreditShow(true);
    }
    if (
      !(
        name &&
        email &&
        zipcode &&
        address &&
        tel &&
        day &&
        creditVal
      )
    ) {
      setErrorShow(true);
    } else{
      //@ts-ignore
      const cookieId = document.cookie
        .split('; ')
        .find((row) => row.startsWith('id'))
        .split('=')[1];

      console.log(day);
  
      const firstPut =async()=>{
       fetch(`http://localhost:8000/order`)
        .then((res) => res.json())
        .then((json) => {
          json.map((e: any) => {
          fetch(`http://localhost:8000/order/${e.id}`, {
              method: 'put',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                name: e.name,
                price: e.price,
                imagePath: e.imagePath,
                toppingList: e.toppingList,
                count: e.count,
                TotalPrice: e.TotalPrice,
                day: day,
              }),
            })
          });        
        });  
         
      }   
      firstPut();

   const secondPut=async()=>{ 
       await firstPut();
        fetch(`http://localhost:8000/users/${cookieId}`)
        .then((res) => res.json())
        .then((json) => {
          fetch(`http://localhost:8000/users/${cookieId}`, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              name: json.name,
              email: json.email,
              zipcode: json.zipcode,
              address: json.address,
              tel: json.tel,
              password: json.password,
              checkPassword: json.checkPassword,
              history: [...json.history, ...data],
            }),
          });
        });

      }
      secondPut();


      // fetch('http://localhost:8000/orderItems/')
      //   .then((res) => res.json())
      //   .then((json) => {
      //     json.map((item: any) => {
      //       fetch(`http://localhost:8000/orderItems/${item.id}`, {
      //         method: 'DELETE',
      //       });
      //     });
      //   });

      // fetch('http://localhost:8000/order/')
      //   .then((res) => res.json())
      //   .then((json) => {
      //     json.map((item: any) => {
      //       fetch(`http://localhost:8000/order/${item.id}`, {
      //         method: 'DELETE',
      //       });
      //     });
      //     router.push('/thankyou');
      //   });
      
    }
  };

  return (
    <div>
      <OrderCheck />
      <h2 className={styles.title}>お届け先情報</h2>
      <button
        name="sync"
        className={styles.sync}
        onClick={() => onClickSync()}
      >
        自動入力
      </button>
      <form method="post">
        <table className={styles.userTitle}>
          <tr>
            <td className={styles.td}>
              <label htmlFor="name">お名前：</label>
              {errorShow === true && name.length < 1 && (
                <span>名前を入力してください</span>
              )}{' '}
              {/*入力されてない時だけ"名前を入力してください”を表示 以下全てのinputに同様の機能追加*/}
            </td>
            <td>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                value={name}
                placeholder="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td className={styles.td}>
              <label htmlFor="email">メールアドレス：</label>
              {errorShow === true && email.length < 1 && (
                <span>メールアドレスを入力してください</span>
              )}
              {!email.match(
                /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
              ) &&
                email.length >= 1 && (
                  <span>メールアドレスの形式が不正です</span>
                )}
            </td>
            <td>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td className={styles.td}>
              <label htmlFor="zipcode">郵便番号：</label>
              {errorShow === true && zipcode.length < 1 && (
                <span className={styles.alert}>
                  郵便番号を(-)を付けて入力してください
                </span>
              )}
            </td>
            <td>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                className={styles.input}
                value={zipcode}
                placeholder="Zipcode"
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td className={styles.td}>
              <label htmlFor="address">住所：</label>
              {errorShow === true && address.length < 1 && (
                <span className={styles.alert}>
                  住所を入力してください
                </span>
              )}
            </td>
            <td>
              <input
                type="text"
                id="address"
                name="address"
                className={styles.input}
                value={address}
                placeholder="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td className={styles.td}>
              <label htmlFor="tel">電話番号：</label>
              {errorShow === true && tel.length === 0 && (
                <span className={styles.alert}>
                  電話番号を(-)を付けて入力してください
                </span>
              )}
            </td>
            <td>
              <input
                type="tel"
                id="tel"
                name="tel"
                className={styles.input}
                value={tel}
                placeholder="PhoneNumber"
                onChange={(e) => {
                  setTel(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="day" className={styles.td}>
                配達日時：
              </label>
              {errorShow === true && day.length === 0 && (
                <span className={styles.alert}>
                  配達日時を選択して下さい。
                </span>
              )}
            </td>
            <td>
              <input
                type="datetime-local"
                name="day"
                className={styles.input}
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                }}
              />
            </td>
          </tr>
        </table>

        <div>
          <h2 className={styles.credit}>お支払い方法</h2>
          <div className={styles.creditTd}>
            <input
              type="radio"
              id="money"
              name="credit"
              value="money"
              checked={creditVal === 'money'}
              className={styles.cred}
              onChange={(e) => setCreditVal(e.target.value)}
            />
            <label htmlFor="money" className={styles.cred}>
              代金引換
            </label>

            <input
              type="radio"
              id="card"
              name="credit"
              value="card"
              checked={creditVal === 'card'}
              className={styles.cred}
              onChange={(e) => setCreditVal(e.target.value)}
            />
            <label htmlFor="card" className={styles.cred}>
              クレジットカード決済
            </label>

            {errorShow === true && creditVal === '' && (
              <div className={styles.alert}>
                支払い方法を選択してください
              </div>
            )}
          </div>
          <button
            type="button"
            className={styles.btn}
            onClick={() => onClickCheck()}
          >
            この内容で注文する
          </button>
        </div>
      </form>
      {creditShow && <StripeApi />}
    </div>
  );
}
