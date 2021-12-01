import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import bakeryData from "../../data/coffee-stores.json";
import Head from "next/head";

export const getStaticProps: GetStaticProps = (context) => {
  const { params } = context;
  console.log("params", params);
  return {
    props: {
      bakery: bakeryData.find((bakeryStore) => {
        return bakeryStore.id.toString() === params?.id; //dynamic id
      }),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = bakeryData.map((bakery) => {
    return {
      params: {
        id: bakery.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

const Bakery: NextPage<{ bakery: any }> = (props) => {
  const router = useRouter();
  console.log("router", router);

  if (router.isFallback) {
    return <div className="">Loading...</div>;
  }

  const { address, name, neighborhood } = props.bakery;

  console.log("props", props);
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      Bakery Page {router.query.id}
      <Link href="/"> Back to home</Link>
      <Link href="/bakery/dynamic">
        <a href="">Go to page dynamic</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighborhood}</p>
    </div>
  );
};

export default Bakery;
