import Link from "next/link"
import { Layout } from "../component/layout"

export default function Thankyou () {
  return (
    <Layout show={true}>
      <h1>ご注文ありがとうございます</h1>
      <Link href="/">
        <a>ホームへ</a>
      </Link>
    </Layout>
  )
}
