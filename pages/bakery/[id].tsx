import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Bakery, fetchBakeries } from "../../lib/bakeries";
import { StoreContext } from "../../store/store-context";
import { useContext, useEffect, useState } from "react";
import { isEmpty } from "../../utils";

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const bakeries = await fetchBakeries();
  const findBakeryById = bakeries.find((bakery: Bakery) => {
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
  const paths = bakeries.map((bakery: Bakery) => {
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

const Bakery: NextPage<{ bakery: Bakery }> = (initialProps) => {
  const router = useRouter();
  const id = router.query.id;

  const [bakery, setBakery]: [Bakery, any] = useState(initialProps.bakery);

  const {
    state: { bakeries },
  } = useContext(StoreContext);

  let nb: string;
  const handleCreateBakery = async (bakeryData: Bakery) => {
    const { id, name, address, neighborhood, votes, imgUrl } = bakeryData;
    if (typeof neighborhood === "object") {
      nb = neighborhood[0];
    }
    const data = {
      id: id || 1,
      name,
      address: address || "",
      neighborhood: nb || "",
      votes: votes || 0,
      imgUrl,
    };
    const response = await fetch("/api/createBakery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dbBakery = await response.json();
  };

  useEffect(() => {
    if (isEmpty(initialProps.bakery)) {
      if (bakeries.length) {
        const bakeryFromContext = bakeries.find((bakery: Bakery) => {
          return bakery.id.toString() === id;
        });
        if (bakeryFromContext) {
          console.log("Context", bakeryFromContext);
          setBakery(bakeryFromContext);
          handleCreateBakery(bakeryFromContext);
        }
      }
    } else {
      // SSG
      handleCreateBakery(initialProps.bakery);
    }
  }, [id, initialProps, initialProps.bakery]);

  if (router.isFallback) {
    return <div className="">Loading...</div>;
  }

  const { imgUrl, address, neighborhood, name, votes } = bakery;
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="px-10 pt-3">
        <Link href="/">
          <a className=" font-bold"> ⬅ Back to home</a>
        </Link>
      </div>
      <div className="grid grid-cols-2 px-10 py-3 gap-5 ">
        <div className="flex flex-col">
          <p className="text-3xl font-bold text-white my-3">{name}</p>
          <Image
            className="rounded-2xl grow-0"
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={400}
            height={400}
            alt={name}
          />
        </div>
        <div className="glass mt-[4rem] h-1/2 p-5">
          <p className="text-xl font-semibold">{address}</p>
          {neighborhood && (
            <p className="font-semibold text-xl">{neighborhood}</p>
          )}
          <p className="font-semibold text-xl">Votes: {votes}</p>
          <button className="mt-10 bg-blue-600 p-2 text-white font-bold rounded-md">
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bakery;
