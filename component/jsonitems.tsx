import Link from 'next/link';
import useSWR from 'swr';
import { Item } from '../types/types';

export const fetcher: (args: string) => Promise<any> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function Items() {
  const { data, error } = useSWR('/api/items', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      {data.map((item: Item) => {
        const { id, name, price, imagePath } = item;
        return (
          <div key={id}>
            <table>
              <tr>
                <th>
                  <p className="image">{imagePath}</p>
                </th>
              </tr>
              <tr>
                <td>
                  <Link href="#" className="name">
                    {name}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="price">{price}</p>
                </td>
              </tr>
            </table>
          </div>
        );
      })}
      ;
    </>
  );
}
