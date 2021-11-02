import type { NextPage } from "next";
import Banner from "../components/banner";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
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
    </div>
  );
};

export default Home;
