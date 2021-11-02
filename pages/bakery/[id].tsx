import React from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

const Bakery = () => {
  const router = useRouter();
  console.log("router", router);
  return (
    <div>
      Bakery Page {router.query.id}
      <Link href="/"> Back to home</Link>
      <Link href="/bakery/dynamic">
        <a href="">Go to page dynamic</a>
      </Link>
    </div>
  );
};

export default Bakery;
