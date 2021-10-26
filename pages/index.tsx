import type { NextPage } from "next";
import Banner from "../components/banner";
import Head from "next/head";

const Home: NextPage = () => {
  const handleOnBannerClick = (): void => {
    console.log("hi banner button");
  };

  return (
    <div className="flex place-content-center h-screen">
      <Head>
        <title> Bakery Pastery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center">
        <Banner
          buttonText="View bakeries nearby"
          handleOnClick={handleOnBannerClick}
        />
      </main>
    </div>
  );
};

export default Home;
