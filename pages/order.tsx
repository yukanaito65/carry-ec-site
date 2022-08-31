import { json } from "stream/consumers";
import useSWR, { useSWRConfig } from "swr";
import { Layout } from "../component/layout";
import { Item, OrderItem } from "../types/types";
import styles from "../styles/order.module.css";

export const fetcher: (args: string) => Promise<any> = (...args) => fetch(...args).then(res => res.json());

export default function Order() {
  const { data, error } = useSWR("http://localhost:8000/orderItems", fetcher);
  const { mutate } = useSWRConfig()

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  //削除ボタンの機能
  const onClickDelete = (id: number) => {
    fetch(`http://localhost:8000/orderItems/${id}`, {
      method: "delete"
    });
    mutate("http://localhost:8000/orderItems");
  }

  return (
    <>
      <Layout>
        <div>
          <h1 className={styles.h1_style}>ショッピングカート</h1>
          <table className={styles.table_style}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th_style}>商品名</th>
                <th className={styles.th_style}>サイズ、価格（税抜）、数量</th>
                <th className={styles.th_style}>トッピング、価格（税抜）</th>
                <th className={styles.th_style}>小計</th>
                <th className={styles.th_style}></th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ name, id, TotalPrice, price, imagePath, count, toppingList }: any) => (
                <tr key={id} className={styles.tr}>
                  <td className={styles.td}>
                    <img src={imagePath} width={100} />
                    <p>{name}</p>
                  </td>
                  <td className={styles.td}>
                    数量：{count}個 <br />
                    単品価格：{price}円
                  </td>
                  <td className={styles.td}>
                    {toppingList.map((topping: { name: string; checked: boolean; id: number }) => (
                      <ul key={id}>
                        <li>{topping.name}</li>
                      </ul>
                    ))}
                    価格：{toppingList.length * 200}円
                  </td>
                  <td className={styles.td}>
                    {TotalPrice}円
                  </td>
                  <td className={styles.td}><button className={styles.btn} onClick={() => onClickDelete(id)}>削除</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  )
}
