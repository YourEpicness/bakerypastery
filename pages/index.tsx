import type { NextPage } from "next";
import { useEffect, useContext, useState } from "react";
import { GetStaticProps } from "next";
import Banner from "../components/banner";
import Head from "next/head";
import Image from "next/image";
import Card from "../components/card";
import { Bakery, fetchBakeries, Venue } from "../lib/bakeries";
import useTrackLocation from "../hooks/use-track-location";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export const getStaticProps: GetStaticProps = async (context) => {
  const bakeries: Bakery[] = await fetchBakeries();

  return {
    props: {
      bakeryData: bakeries,
    },
  };
};

const Home: NextPage<{ bakeryData: Bakery[] }> = ({ bakeryData }) => {
  const placeholder =
    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80";
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  const [bakeriesError, setBakeriesError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);

  const { bakeries, latLong } = state;

  useEffect(() => {
    let bkries: Bakery[] = [];
    if (latLong) {
      try {
        const fetchedBakeries = async () => {
          const res = await fetch(`/api/bakeries?latLong=${latLong}&limit=30`);
          const data = await res.json();
          bkries.push(...data);
        };
        fetchedBakeries();

        dispatch({
          type: ACTION_TYPES.SET_BAKERIES,
          payload: {
            bakeries: bkries,
          },
        });
        setBakeriesError(null);
      } catch (err: any) {
        // set error
        setBakeriesError(err.message);
      }
    }
  }, [latLong]);

  const handleOnBannerClick = () => {
    handleTrackLocation();
  };

  return (
    <div className="flex h-full md:block md:m-10">
      <Head>
        <title> Bakery Pastery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center">
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerClick}
        />
        {locationErrorMsg && <p>? Something went wrong: {locationErrorMsg} </p>}
        {bakeriesError && <p>? Something went wrong: {bakeriesError} </p>}
        <div className="absolute top-0 right-1/4 md:top-0 md:right-1/8">
          <Image src="/static/baker.png" width={400} height={400} />
        </div>
      </main>
      {bakeries.length > 0 && (
        <>
          <h2 className="mt-10 text-3xl text-white font-bold">
            Stores near me
          </h2>
          <div className="grid grid-cols-3 justify-items-center">
            {bakeries.map((bakery) => {
              return (
                <Card
                  key={bakery.id}
                  name={bakery.name}
                  imgUrl={bakery.imgUrl || placeholder}
                  href={`/bakery/${bakery.id}`}
                />
              );
            })}
          </div>
        </>
      )}
      {bakeryData.length > 0 && (
        <>
          <h2 className="mt-10 text-3xl text-white font-bold">
            Chicago Bakeries
          </h2>
          <div className="grid grid-cols-3 justify-items-center">
            {bakeryData.map((bakery) => {
              return (
                <Card
                  key={bakery.id}
                  name={bakery.name}
                  imgUrl={bakery.imgUrl || placeholder}
                  href={`/bakery/${bakery.id}`}
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
