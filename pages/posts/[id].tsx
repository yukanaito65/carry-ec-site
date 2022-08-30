import { privateDecrypt } from "crypto";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../component/jsonitems";
import { Layout } from "../../component/layout";
import { getAllJsonIds, getJsonData } from "../../lib/json";
import { Item, Topping } from "../../types/types";
// import styles from "../../components/details.modules.css";

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
  const { data, error } = useSWR("http://localhost:8000/topping/", fetcher);
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
    newToppingList = data.filter((el: any) => {
      el.checked === true;
    });
    setToppingList([...newToppingList])

    fetch("http://localhost:8000/orderItems/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        id: id,
        price: price,
        toppingList: toppingList
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
      {data.map(({ name, id }: Topping, index: any) => (
        <>
          <input type="checkbox" id={name} name={name} checked={checked[index]} onChange={() => onChangeCheck(index)} />
          <label htmlFor={name}>{name}</label>
        </>
      ))}
      <h3>数量:</h3>
      <select name="count" id="count">
        {arr.map((el) => (
          <option key={el} value={el}>{el}</option>
        ))}
      </select>
      <p>この商品金額: 38000円（税抜）</p>
      <button onClick={() => onClickCart()}>カート</button>
    </Layout>
  );
}
