import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { fetchBakeries } from "../../lib/bakeries";

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const bakeries = await fetchBakeries();
  const findBakeryById = bakeries.find((bakery: any) => {
    return bakery.id.toString() === params?.id;
  });
  return {
    props: {
      bakery: findBakeryById ? findBakeryById : {},
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const bakeries = await fetchBakeries();
  const paths = bakeries.map((bakery: any) => {
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

  if (router.isFallback) {
    return <div className="">Loading...</div>;
  }

  const { imgUrl, address, location, neighborhood, name } = props.bakery;

  console.log("props", props);
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="">
        <div className="">
          <div className="">
            <Link href="/"> Back to home</Link>
            <Link href="/bakery/dynamic">
              <a href="">Go to page dynamic</a>
            </Link>
          </div>

          <p>{name}</p>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={400}
            height={400}
            alt={name}
          />
        </div>
        <div className="">
          <p>{address}</p>
          {neighborhood && <p>{neighborhood}</p>}
        </div>
      </div>
    </div>
  );
};

export default Bakery;
