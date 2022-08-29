import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Items from '../component/jsonitems';
import styles from '../styles/Home.module.css';

const Home = ({
  allpostData,
}: {
  allpostData: { id: number; title: string; data: string };
}) => {
  return (
    <div>
      <Head>
        <title>カレー屋のネット注文</title>
      </Head>
      <div>
        <h1>商品を検索する</h1>
      </div>
      <Items></Items>
    </div>
  );
};

export default Home;
