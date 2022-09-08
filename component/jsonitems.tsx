import Link from 'next/link';
import useSWR from 'swr';
import { Item } from '../types/types';
import React, { useEffect, useState } from 'react';
import { Layout } from '../component/layout';
import styles from '../component/items.module.css';
import { arrayBuffer } from 'stream/consumers';
import sugStyles from '../styles/suggest.module.css';


export const fetcher: (args: string) => Promise<any> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function Items() {
  // 並び替え用のstate
  const [sortSelect, setSortSelect] = useState('up');
  const onChangeSortSelect = (event: any) =>
    setSortSelect(event.target.value);
  console.log(sortSelect);

  //該当する商品がありませんを表示するかどうか
  const [alertShow, setAlertShow] = useState(false);

  // 検索欄に入力された文字を含む商品だけをsetSearchDataに代入
  const [searchData, setSearchData]: any[] = useState([]);
  const [suggestData, setSuggestData]: any[] = useState([]);

  // selectが昇順と降順でfetchするdataを変更する
  const [get, setGet] = useState(`http://localhost:8000/items?_sort=price&_order=asc&_page=1&_limit=5`)
  const [get2, setGet2] = useState("http://localhost:8000/items?_sort=price&_order=asc")

  // 検索欄に文字入力できるようにする
  const [nameText, setNameText] = useState('');
  const onChangeNameText = (event: any) => {
    setNameText(event.target.value);
    setAlertShow(false);
    setShowSug(true);
  };

  useEffect(() => {
    // nameTextに書かれた物と一致する名前のdataをfilterで抽出する関数
    // 抽出したdataをsetSearchDataに保管
    setSuggestData(
      data2.filter((e: any) => {
        return e.name.indexOf(nameText) >= 0;
      })
    );
  }, [nameText]);

  const onClickSuggest = (e: any) => {
    setShowSug(false);
    setNameText(e.target.value);
  };

  //検索サジェストを表示
  const [showSug, setShowSug] = useState(false);
  const onFocusShow = () => setShowSug(true);
  const onBlurShow = () => setShowSug(false);

  const onClickSearch = () => {
    setSearchData(
      data2.filter((e: any) => {
        return e.name.indexOf(nameText) >= 0;
      })
    );
    setAlertShow(true);
    setShowSug(false);
  };

  // クリアボタンを押した時setNameTextを空で返す
  const formReset = () => {
    setNameText('');
    setSearchData([]);
    setAlertShow(false);
    setShowSug(false);
  };

  const [nowNum, setNowNum] = useState(1);
  const currentPage = `http://localhost:8000/items?_page=${nowNum}&_limit=5`;
  const maxPageNumber = "rel=prev";
  // const router = useRouter();



  // fetchで今のページに表示する分の商品を取ってくる
  fetch(
    currentPage,
    {
      method: 'GET',
    }
  )
    // .then((res) => {
    //   res.headers.get('X-Total-Count');
    //   return res.json()
    // });
    .then(response => response.headers)
    .then(headers => {
      return(`${headers.get('X-Total-Count')}`)
    });

    console.log();
  
  // ページ番号か表示順が変わるたびに商品一覧表示を変更させる
  useEffect(() => {
    if (sortSelect === 'up') {
      setGet (`http://localhost:8000/items?_page=${nowNum}&_limit=5&_sort=price&_order=asc`);
    } else if (sortSelect === 'down') {
      setGet (`http://localhost:8000/items?_page=${nowNum}&_limit=5&_sort=price&_order=desc`);
    };
  },[nowNum, sortSelect])

  useEffect(() => {
    if (sortSelect === 'up') {
      setGet2 (`http://localhost:8000/items?_sort=price&_order=asc`);
    } else if (sortSelect === 'down') {
      setGet2 (`http://localhost:8000/items?_sort=price&_order=desc`);
    };
    console.log(get2);
  },[sortSelect])
  
  function onClickNextNum() {
    setNowNum(nowNum + 1);
  }

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    fetch(get)
      .then(res => res.json())
      .then(json => setData(json))
  }, [get])

  useEffect(() => {
    fetch(get2)
      .then(res => res.json())
      .then(json => setData2(json))
    console.log(data2);
  }, [get2])

  return (
    <Layout show={true}>
      <div className={styles.searchWrapper}>
        <p>
          <span className={styles.serchTitle}>商品を検索する</span>
        </p>
        <div>
          <form
            name="form1"
            method="post"
            action="#"
            className={`${styles.searchForm}`}
          >
            <label htmlFor="name">商品名</label>
            <span className={`${sugStyles.span}`}>
              <input
                type="text"
                id="name"
                name="name"
                value={nameText}
                placeholder={'search'}
                onChange={onChangeNameText}
                //@ts-ignore
                // onFocus={onFocusShow}
                // onBlur={onBlurShow}
                className={`${styles.searchNameInput} ${sugStyles.form}`}
              ></input>
              {showSug && (
                <div className={sugStyles.suggest}>
                  {suggestData.map(
                    ({ name, id }: Item, index: number) => {
                      if (index >= 3) return;
                      return (
                        <button
                          type="button"
                          value={name}
                          onClick={(event) => onClickSuggest(event)}
                          key={id}
                        >
                          {name}
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </span>

            <span className={styles.buttonWrapper}>
              <button
                type="button"
                value="検索"
                className={styles.searchBtn}
                onClick={() => {
                  onClickSearch();
                }}
              >
                検索
              </button>

              <button
                type="reset"
                value="クリア"
                className={styles.cannselBtn}
                onClick={() => formReset()}
              >
                クリア
              </button>
            </span>
            <br />
            <select
              name="sort"
              size={1}
              className={styles.select}
              value={sortSelect}
              onChange={onChangeSortSelect}
            >
              <option value="up">価格[安い順]</option>
              <option value="down">価格[高い順]</option>
            </select>
          </form>
        </div>
      </div>

      <div className={styles.itemWrapper}>
        {/* 条件分岐 */}
        {!alertShow && searchData.length == 0 ? (
          // 「？」はtrue、「:」はfalse
          // 検索テキストが空の場合
          data.map((item: Item) => {
            const { id, name, price, imagePath } = item;
            return (
              <div key={id}>
                <table className={styles.item}>
                  <tr>
                    <th>
                      <img
                        src={imagePath}
                        className={styles.itemImg}
                        width={300}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <Link href={`/posts/${id}`}>
                        <a className={styles.name}>{name}</a>
                      </Link>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p>
                        {String(price).replace(
                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                          '$1,'
                        )}
                        円（税抜）
                      </p>
                    </th>
                  </tr>
                </table>
              </div>
            );
          })
        ) : // 検索テキストに入力した場合
        searchData.length == 0 ? (
          <p className={styles.p}>該当する商品がありません。</p>
        ) : (
          searchData.map((item: Item) => {
            const { id, name, price, imagePath } = item;
            return (
              <div key={id}>
                <table className={styles.item}>
                  <tr>
                    <th>
                      <img
                        src={imagePath}
                        width={300}
                        className={styles.itemImg}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <Link href={`/posts/${id}`}>
                        <a className={styles.name}>{name}</a>
                      </Link>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p className="price">
                        {String(price).replace(
                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                          '$1,'
                        )}
                        円（税抜）
                      </p>
                    </th>
                  </tr>
                </table>
              </div>
            );
          })
        )}
      </div>
      <div>
      {/* 今のページ番号が1じゃなければ前へボタンを置く */}
      <div className="flex px-3 my-12">
      {nowNum > 1 && (
          <button onClick={() =>  setNowNum(nowNum -1)}>&lt; 前へ</button>
          )}

        {/* 今のページが2以上なら置く */}
        {nowNum > 1 &&
        <button onClick={() =>  setNowNum(nowNum -1)}>{nowNum - 1}</button>}

        {/* 今のページ */}
        <span>{nowNum}</span>

        {/* 今のページが最後じゃなければ置く */}
        {nowNum < 3 &&
        <button onClick={() => onClickNextNum() }>{nowNum + 1}</button>}

        {/* 今のページ番号が最後じゃなければ次へボタンを置く */}
        {nowNum !== 3 && (
            <button onClick={() =>  setNowNum(nowNum +1)}>次へ &gt;</button>
        )}
      </div>
      <div>{ nowNum } / {3}</div>
    </div>
    </Layout>
  );
}
