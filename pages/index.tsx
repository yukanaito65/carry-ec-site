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
        <title className={styles.title}>カレー屋のネット注文</title>
      </Head>
      <Items></Items>
    </div>
  );
};
export default Home;
