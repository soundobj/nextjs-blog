import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout"

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>first post</title>
      </Head>
      <h1 className="bg-red-50">First Post</h1>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </Layout>
  );
}
