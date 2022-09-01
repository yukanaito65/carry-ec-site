import { userAgent } from 'next/server';
import useSWR from 'swr';
import { Layout } from '../component/layout';
import { OrderItem } from '../types/types';

export const fetcher: (args: string) => Promise<any> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function OrderCheck() {
  const { data, error } = useSWR(
    'http://localhost:8000/orderItems',
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const onClickCheck = () => { };

  let total: number[] = [];

  return (
    <Layout show={true}>
      <div>
        <h1>注文内容確認</h1>
        <table border={1}>
          <thead>
            <tr>
              <th>商品名</th>
              <th>価格（税抜）・数量</th>
              <th>トッピング・価格（税抜）</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({
                name,
                id,
                TotalPrice,
                price,
                imagePath,
                count,
                toppingList,
              }: any) => {
                return (
                  <tr key={id}>
                    <td>
                      <img src={imagePath} width={100} />
                      <p>{name}</p>
                    </td>
                    <td>
                      {price}円/{count}個
                    </td>
                    <td>
                      {toppingList.map(
                        (topping: any) => `${topping.name} 300円`
                      )}
                    </td>
                    <td>{TotalPrice}円</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        <div>
          {data.map(({ TotalPrice }: any) => {
            total.push(TotalPrice);
          })}
          <p>
            消費税：
            {total.reduce(function (sum, element) {
              return sum + element;
            }, 0)}
          </p>

          <p>ご注文金額合計：</p>
        </div>

        <div>
          <p>お届け先情報</p>
        </div>

        <button>この内容で注文する</button>
      </div>
    </Layout>
  );
}
