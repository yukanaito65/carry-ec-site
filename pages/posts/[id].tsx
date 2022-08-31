import { privateDecrypt } from "crypto";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../component/jsonitems";
import { Layout } from "../../component/layout";
import { getAllJsonIds, getJsonData } from "../../lib/json";
import { Item, Topping } from "../../types/types";
// import styles from "../../components/details.modules.css";

//posts/1などのpathを用意する
export async function getStaticPaths() {
  const paths = await getAllJsonIds();
  return {
    paths,
    //yarn build → yarn startをしても動くようにblocking
    fallback: "blocking",
  };
}

//上のpathから拾ってきたデータをpropsとして下のコンポーネントに渡す。
export async function getStaticProps({ params }: { params: { id: number } }) {
  const jsonData = await getJsonData(params.id);
  return {
    props: {
      //jsonDataに格納
      jsonData
    },
    revalidate: 10
  }
}


export default function Details({ jsonData }: { jsonData: Item }) {
  //toppingを拾ってきてCSRで表示
  const { data, error } = useSWR("http://localhost:8000/topping/", fetcher, { refreshInterval: 1000 });

  //初期値ではトッピングは何も選ばれていない状態
  const initialChecked: any[] = [false, false, false, false, false, false, false, false];
  const [checked, setChecked] = useState<any>(initialChecked);
  //注文個数のstate
  const [count, setCount] = useState(1);
  //追加されたtoppingのstate
  const [toppingList, setToppingList] = useState([]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  //クリックされたときにtrueとfalseが入れ替わる
  const onChangeCheck = (index: number) => {
    const newCheck = [...checked];
    //splice関数 = 配列の一部を入れ替える
    newCheck.splice(index, 1, !(newCheck[index]));
    setChecked(newCheck);
    console.log(checked);
    let newToppingList = [...toppingList];
    //toppingにcheckedのtrue, falseを割り当てる
    data.map((el: any, index: number) => {
      el.checked = checked[index];
    });
    console.log(data);
    //toppingがtrueになっているものだけを集める
    newToppingList = data.filter((el: any) => el.checked == true);
    setToppingList(newToppingList)
    console.log(newToppingList);
    console.log(toppingList)
  }

  const arr = [];
  for (let i = 1; i < 13; i++) {
    arr.push(i);
  }

  //注文個数を代入
  const onChangeCount = (event: any) => {
    setCount(event.target.value)
  }

  const { id, name, imagePath, description, price } = jsonData;
  const onClickCart = () => {

    //dbJsonのorderItemsに反映させる
    fetch("http://localhost:8000/orderItems/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        price: price,
        imagePath: imagePath,
        toppingList: toppingList,
        count: Number(count),
        TotalPrice: (price + 200 * checked.filter((el: any) => el === true).length) * count
      })
    })
  }

  return (
    <Layout>
      <h1>商品詳細</h1>
      <div>
        <img src={imagePath} width={300} />
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <h3>トッピング: 1つにつき200円（税抜）</h3>
      {//toppingのデータを一つ一つ表示
        data.map(({ name, id }: Topping, index: any) => (
          <>
            <input type="checkbox" id={name} name={name} checked={checked[index]} onChange={() => onChangeCheck(index)} />
            <label htmlFor={name}>{name}</label>
          </>
        ))}
      <h3>数量:</h3>
      <select name="count" id="count" value={count} onChange={onChangeCount}>
        {arr.map((el) => (
          <option key={el} value={el}>{el}</option>
        ))}
      </select>
      <p>この商品金額: {(price + 200 * checked.filter((el: any) => el === true).length) * count}円（税抜）</p>
      <Link href="/">
        <button onClick={() => onClickCart()}>カートに追加</button>
      </Link>
    </Layout>
  );
}
