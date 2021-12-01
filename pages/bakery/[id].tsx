import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import bakeryData from "../../data/coffee-stores.json";

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
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: true,
  };
};

const Bakery: NextPage<{ bakery: any }> = (props) => {
  const router = useRouter();
  console.log("router", router);

  console.log("props", props);
  return (
    <div>
      Bakery Page {router.query.id}
      <Link href="/"> Back to home</Link>
      <Link href="/bakery/dynamic">
        <a href="">Go to page dynamic</a>
      </Link>
      <p>{props.bakery.address}</p>
      <p>{props.bakery.name}</p>
    </div>
  );
};

export default Bakery;
