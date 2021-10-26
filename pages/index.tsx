import type { NextPage } from "next";
import Banner from "../components/banner";

const Home: NextPage = () => {
  const handleOnBannerClick = (): void => {
    console.log("hi banner button");
  };

  return (
    <div className="flex place-content-center h-screen">
      <main className="flex flex-col justify-center items-center">
        <h1 className="flex text-center text-5xl font-bold mb-4">
          Bakery Pastery
        </h1>
        <Banner
          buttonText="View bakeries nearby"
          handleOnClick={handleOnBannerClick}
        />
      </main>
    </div>
  );
};

export default Home;
