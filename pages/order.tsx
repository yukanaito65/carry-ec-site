import { json } from "stream/consumers";
import useSWR, { useSWRConfig } from "swr";
import { Layout } from "../component/layout";
import { Item, OrderItem } from "../types/types";

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
          <h1>ショッピングカート</h1>
          <table>
            <thead>
              <tr>
                <th>商品名</th>
                <th>サイズ、価格（税抜）、数量</th>
                <th>トッピング、価格（税抜）</th>
                <th>小計</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ name, id, TotalPrice, price, imagePath, count, toppingList }: any) => (
                <tr key={id}>
                  <td>
                    <img src={imagePath} width={100} />
                    <p>{name}</p>
                  </td>
                  <td>
                    数量：{count}個 <br />
                    単品価格：{price}円
                  </td>
                  <td>
                    トッピング：{toppingList.map((topping: { name: string; checked: boolean; id: number }) => (
                      <ul key={id}>
                        <li>{topping.name}</li>
                      </ul>
                    ))}
                    価格：{toppingList.length * 200}円
                  </td>
                  <td>
                    {TotalPrice}円
                  </td>
                  <td><button onClick={() => onClickDelete(id)}>削除</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  )
}
