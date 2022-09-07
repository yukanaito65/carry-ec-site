import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';



export const Pagination = ({maxPageNumber}:{maxPageNumber:Number}) => {

  const [nowNum, setNowNum] = useState(1);
  const currentPage = `http://localhost:8000/items?_page=${nowNum}&_limit=5`;
  // const maxPageNumber = "rel=prev";
  const router = useRouter();



  // fetchで今のページに表示する分の商品を取ってくる
  fetch(
    currentPage,
    {
      method: 'GET',
    }
  )
    .then((res) => res.json());
  
  function onClickPrevtNum() {

    router.push(`http://localhost:8000/items?_page=${nowNum}&_limit=5`);
  }
  function onClickCurrentNum() {
    router.push(`http://localhost:8000/items?_page=${nowNum}&_limit=5`);
  }
  function onClickNextNum() {
    router.push(`http://localhost:8000/items?_page=${nowNum}&_limit=5`);
  }

  

  return (
    <>
      {/* 今のページ番号が1じゃなければ前へボタンを置く */}
      <div className="flex px-3 my-12">
        {nowNum !== 1 && (
          <Link href={"rel=next"}>
            <a>&lt; 前へ</a>
          </Link>
        )}

        {/* 今のページが2以上なら置く */}
        {nowNum > 1 &&
        <button onClick={() =>  setNowNum(nowNum -1)}>{nowNum}</button>}

        {/* 今のページ */}
        <button onClick={() => onClickCurrentNum() }>{nowNum}</button>

        {/* 今のページが最後じゃなければ置く */}
        {nowNum < maxPageNumber &&
        <button onClick={() => onClickNextNum() }>{nowNum-1}</button>}

        {/* 今のページ番号が最後じゃなければ次へボタンを置く */}
        {nowNum !== maxPageNumber && (
          <Link href={"rel=next"}>
            <a className="ml-4">次へ &gt;</a>
          </Link>
        )}
      </div>
      <div>{ nowNum } / {maxPageNumber}</div>
    </>
  );
}
