import Link from 'next/link';
import useSWR from 'swr';
import { Item } from '../types/types';
import React, { useState } from 'react';

export const fetcher: (args: string) => Promise<any> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function Items() {
  const { data, error } = useSWR('http://localhost:8000/items', fetcher);

  const [nameText, setNameText] = useState('');
  const onChangeNameText = (event: any) =>
    setNameText(event.target.value);
  const [searchData, setSearchData] = useState([]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const onClickSearch = () => {
    setSearchData(
      data.find((e: any) => {
        return e.name === nameText;
      })
    );
    console.log(searchData);
  };

  return (
    <>
      <div className="panel panel-default">
        <div className="panel-title">
          <p>商品を検索する</p>
        </div>
        <div className="panel-body">
          <form method="post" action="#" className="form-horizontal">
            <label htmlFor="name">商品名</label>
            <input
              type="text"
              id="name"
              name="name"
              value={nameText}
              placeholder={'search'}
              onChange={onChangeNameText}
            ></input>
            <br />
            <button
              type="button"
              value="検索"
              className="btn btn-primary"
              onClick={() => {
                onClickSearch();
              }}
            >
              検索
            </button>
            <button
              type="reset"
              value="クリア"
              className="btn btn-default"
            >
              クリア
            </button>
          </form>
        </div>
      </div>

      {nameText == ''
        ? data.map((item: Item) => {
            const { id, name, price, imagePath } = item;
            return (
              <div key={id}>
                <table>
                  <tr>
                    <th>
                      <img
                        src={imagePath}
                        className="image"
                        width={300}
                      />
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <Link href={`/posts/${id}`} className="name">
                        {name}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="price">{price}円（税抜き）</p>
                    </td>
                  </tr>
                </table>
              </div>
            );
          })
        : searchData.map((item: Item) => {
            const { id, name, price, imagePath } = item;
            return (
              <div key={id}>
                <table>
                  <tr>
                    <th>
                      <img
                        src={imagePath}
                        className="image"
                        width={300}
                      />
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <Link href={`/posts/${id}`} className="name">
                        {name}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="price">{price}円（税抜き）</p>
                    </td>
                  </tr>
                </table>
              </div>
            );
          })}
    </>
  );
}
