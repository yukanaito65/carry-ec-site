import { privateDecrypt } from "crypto";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../component/templates/jsonitems";
import { Layout } from "../../component/layout";
import { getAllJsonIds, getJsonData } from "../../lib/json";
import { Item, Topping } from "../../types/types";
import detailStyle from "../../component/details.module.css"
import Head from 'next/head';
import { MainBtn } from "../../component/atoms/MainBtn";

//posts/1などのpathを用意する
export async function getStaticPaths() {
  const paths = await getAllJsonIds();
  return {
    paths,
    //idがない場合は404になるようにfalse
    fallback: false,
  };
}

//上のpathから拾ってきたデータをpropsとして下のコンポーネントに渡す。
export async function getStaticProps({
  params,
}: {
  params: { id: number };
}) {
  const jsonData = await getJsonData(params.id);
  return {
    props: {
      //jsonDataに格納
      jsonData,
    },
    revalidate: 10,
  };
}

export default function Details({ jsonData }: { jsonData: Item }) {
  //toppingを拾ってきてCSRで表示
  const { data, error } = useSWR(
    'http://localhost:8000/topping/',
    fetcher
  );

  //初期値ではトッピングは何も選ばれていない状態

  const initialCheckedToppingsArray: any[] = [false, false, false, false, false, false, false, false, false];

  const priceArr = [];
  if (data) {
    data.map((el: any) => {
      priceArr.push(el.price);
    })
  }

  const [checkedToppingsArray, setCheckedToppingsArray] = useState<any>(initialCheckedToppingsArray);
  //注文個数のstate
  const [count, setCount] = useState(1);
  //追加されたtoppingのstate
  const [toppingList, setToppingList] = useState([]);

  const [show, setShow] = useState(true);

  //クリックされたときにtrueとfalseが入れ替わる
  function onChangeCheck(index: number) {
    const newCheck = [...checkedToppingsArray];
    //splice関数 = 配列の一部を入れ替える
    newCheck.splice(index, 1, !(newCheck[index]));
    setCheckedToppingsArray(newCheck);
    setShow(true);

  }

  let totalPrice = 0;
  checkedToppingsArray.forEach((checkedTopping: boolean, index: number) => {
    if (checkedTopping) {
      return totalPrice += data[index].price;
    } else return;
  });

  function onClickDec() {
    //toppingにcheckedToppingsArrayのtrue, falseを割り当てる
    data.map((el: any, index: number) => el.checkedToppingsArray = checkedToppingsArray[index]);

    //toppingがtrueになっているものだけを集める
    let newToppingList = [...toppingList];
    newToppingList = data.filter((el: any) => el.checkedToppingsArray == true);
    setToppingList(newToppingList)

    setShow(false);
  }

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const arr = [];
  for (let i = 1; i < 13; i++) {
    arr.push(i);
  }

  //注文個数を代入
  const onChangeCount = (event: any) => {

    setShow(true);
    setCount(event.target.value);
  };

  const { id, name, imagePath, description, price } = jsonData;
  const onClickCart = () => {

// //@ts-ignore
//     const cookieName = document.cookie.split('; ')
//     .find(row=>row.startsWith('name')).split('=')[1];

    //dbJsonのorderItemsに反映させる
    fetch('http://localhost:8000/orderItems/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        price: price,
        imagePath: imagePath,
        toppingList: toppingList,
        count: Number(count),
        TotalPrice: (price + totalPrice) * count
      })
    })
  }



  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <Layout show={true}>
        {/* ぱんくずリスト */}
        <Link href='/'>
          <a>商品一覧</a>
        </Link>
        &nbsp; &gt; &nbsp;
        <span>{name}</span>

        <div className={detailStyle.item}>
          <img
            src={imagePath}
            width={300}
            className={detailStyle.itemImg}
          />
          <div className={detailStyle.itemDetail}>
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className={detailStyle.option}>
          <h3 className={detailStyle.optionTitle}>ライス大盛り: 300円</h3>
          <div className={detailStyle.optionTag}>
            {//toppingのデータを一つ一つ表示
              data.map(({ name, price, id }: Topping, index: any) => {
                if (price !== 300) return;
                return (
                  <>
                    <input type="checkbox" id={name} name={name} checked={checkedToppingsArray[index]} onChange={() => onChangeCheck(index)} />
                    <label htmlFor={name}>{name}</label>
                  </>
                )
              })}
          </div>
          <h3 className={detailStyle.optionTitle}>トッピング: 1つにつき100円（税抜）</h3>
          <div className={detailStyle.optionTag}>
            {//toppingのデータを一つ一つ表示
              data.map(({ name, price, id }: Topping, index: any) => {
                if (price !== 100) return;
                return (
                  <>
                    <input type="checkbox" id={name} name={name} checked={checkedToppingsArray[index]} onChange={() => onChangeCheck(index)} />
                    <label htmlFor={name}>{name}</label>
                  </>
                )
              })}
          </div>
          <h3 className={detailStyle.optionTitle}>トッピング: 1つにつき200円（税抜）</h3>
          <div className={detailStyle.optionTag}>
            {//toppingのデータを一つ一つ表示
              data.map(({ name, price, id }: Topping, index: any) => {
                if (price !== 200) return;
                return (
                  <>
                    <input type="checkbox" id={name} name={name} checked={checkedToppingsArray[index]} onChange={() => onChangeCheck(index)} />
                    <label htmlFor={name}>{name}</label>
                  </>
                )
              })}
          </div>
          <h3 className={detailStyle.quantity}>数量:</h3>
          <select name="count" id="count" className={detailStyle.select} value={count} onChange={onChangeCount}>
            {arr.map((el) => (
              <option key={el} value={el}>{el}</option>
            ))}
          </select>
        </div>

        <p className={detailStyle.total}>この商品金額: {String((price + totalPrice) * count)
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}円（税抜）</p>
        {show === true ?
          <MainBtn className={detailStyle.Btn} onClick={():any => onClickDec()} value={'確定'}/> :
          <Link href="/">
            <MainBtn className={detailStyle.Btn} onClick={() => onClickCart()} value={'カートに追加'}/> 
            {/* <button className={detailStyle.Btn} onClick={() => onClickCart()}>カートに追加</button> */}
          </Link>}
      </Layout>
    </>
  );
}
