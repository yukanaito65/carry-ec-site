import { json } from "stream/consumers";
import useSWR, { useSWRConfig } from "swr";
import { Layout } from "../../component/layout";
import { Item, OrderItem } from "../../types/types";

export const fetcher: (args: string) => Promise<any> = (...args) => fetch(...args).then(res => res.json());

export default function Order() {
  const { data, error } = useSWR("http://localhost:8000/order", fetcher);
  const { mutate } = useSWRConfig()

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

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
              {data.map(({name, id, description, price, imagePath}: Item) => (
                <tr key={id}>
                  <td>
                    <img src={imagePath} width={100} />
                    <p>{name}</p>
                  </td>
                  <td>{price}</td>
                  <td>1個</td>
                  <td>3000円</td>
                  <td><button>削除</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  )
}
