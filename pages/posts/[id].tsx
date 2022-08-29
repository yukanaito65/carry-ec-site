import Link from "next/link";
import useSWR from "swr";
import { Layout } from "../../components/layout";
import { getAllJsonIds, getJsonData } from "../../lib/json";
import { Item } from "../../types/types";
// import styles from "../../components/details.modules.css";

export async function getStaticPaths() {
  const paths = await getAllJsonIds();
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  const jsonData = await getJsonData(params.id);
  return {
    props: {
      jsonData
    },
    revalidate: 10
  }
}



export default function Details({ jsonData }: { jsonData: Item }) {
  const { id, name, imagePath, description } = jsonData;
  console.log({ imagePath });
  return (
    <Layout>
      <h1>商品詳細</h1>
      <div>
        <img src={imagePath} width={300} />
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </Layout>
  );
}
