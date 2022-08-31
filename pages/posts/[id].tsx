import { privateDecrypt } from "crypto";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../component/jsonitems";
import { Layout } from "../../component/layout";
import { getAllJsonIds, getJsonData } from "../../lib/json";
import { Item, Topping } from "../../types/types";
import detailStyle from "../../component/details.module.css"

export async function getStaticPaths() {
  const paths = await getAllJsonIds();
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  const jsonData = await getJsonData(params.id);
  return {
    props: {
      jsonData
    },
    revalidate: 10
  }
}



export default function Details({ jsonData }: { jsonData: Item }) {
  const { data, error } = useSWR("http://localhost:8000/topping/", fetcher, {refreshInterval: 1000});

  const initialChecked: any[] = [false, false, false, false, false, false, false, false];
  const [checked, setChecked] = useState<any>(initialChecked);

  const [toppingList, setToppingList] = useState([]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const onChangeCheck = (index: number) => {
    const newCheck = [...checked];
    newCheck.splice(index, 1, !(newCheck[index]));
    setChecked(newCheck);
    console.log(checked)
  }

  const arr = [];
  for (let i = 0; i < 13; i++) {
    arr.push(i);
  }

  const { id, name, imagePath, description, price } = jsonData;
  const onClickCart = () => {
    let newToppingList = [...toppingList];
    data.map((el: any, index: number) => {
      el.checked = checked[index];
    });
    console.log(data);
    newToppingList = data.filter((el: any) => el.checked == true);
    setToppingList(newToppingList)
    console.log(newToppingList);
    console.log(toppingList)

    fetch("http://localhost:8000/orderItems/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        price: price,
        imagePath: imagePath,
        toppingList: toppingList
      })
    })
  }

  return (
    <Layout>
      <h1 className={detailStyle.textTitle}>商品詳細</h1>
      <div className={detailStyle.item}>
        <img src={imagePath} width={300} className={detailStyle.itemImg} />
        <div className={detailStyle.itemDetail}>
         <h2>{name}</h2>
         <p>{description}</p>
        </div>
      </div>
      <h3 className={detailStyle.optionTitle}>トッピング: 1つにつき200円（税抜）</h3>
      <div className={detailStyle.optionTag}>
        {data.map(({ name, id }: Topping, index: any) => (
        <>
          <input type="checkbox" id={name} name={name} checked={checked[index]} onChange={() => onChangeCheck(index)} />
          <label htmlFor={name}>{name}</label>
        </>
        ))}
      </div>
      <h3 className={detailStyle.quantity}>数量:</h3>
      <select name="count" id="count" className={detailStyle.select}>
        {arr.map((el) => (
          <option key={el} value={el}>{el}</option>
        ))}
      </select>
      <p className={detailStyle.total}>この商品金額: 38000円（税抜）</p>
      <Link href="/">
        <button className={detailStyle.Btn} onClick={() => onClickCart()}>カートに追加</button>
      </Link>
    </Layout>
  );
}
