import type { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next";
import Banner from "../components/banner";
import Head from "next/head";
import Image from "next/image";
import Card from "../components/card";
import { fetchBakeries } from "../lib/bakeries";

// import bakeryData from "../data/coffee-stores.json";

export const getStaticProps: GetStaticProps = async (context) => {
  const bakeries = await fetchBakeries();
  return {
    props: {
      bakeryData: bakeries,
    },
  };
};

interface Data {
  address: string;
  fsq_id: number;
  imgUrl: string;
  name: string;
  neighborhood: string;
  websiteUrl: string;
}

const Home: NextPage<{ bakeryData: Data[] }> = ({ bakeryData: bakeries }) => {
  console.log("props", bakeries);
  const handleOnBannerClick = (): void => {
    console.log("hi banner button");
  };

  return (
    <div className="flex place-content-center h-screen md:block md:m-10">
      <Head>
        <title> Bakery Pastery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center">
        <Banner
          buttonText="View bakeries nearby"
          handleOnClick={handleOnBannerClick}
        />
        <div className="absolute top-0 right-1/4 md:top-0 md:right-1/8">
          <Image src="/static/baker.png" width={400} height={400} />
        </div>
      </main>
      {bakeries.length > 0 && (
        <>
          <h2 className="mt-10"> Chicago Bakeries</h2>
          <div className="grid">
            {bakeries.map((bakery) => {
              return (
                <Card
                  key={bakery.fsq_id}
                  name={bakery.name}
                  imgUrl={
                    bakery.imgUrl ||
                    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  }
                  href={`/bakery/${bakery.fsq_id}`}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
