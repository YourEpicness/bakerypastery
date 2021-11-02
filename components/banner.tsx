import React from "react";
import type { NextPage } from "next";
import Link from "next/link";

type Props = {
  buttonText: string;
  handleOnClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Banner: NextPage<Props> = (props) => {
  return (
    <div className="w-full text-white">
      <h1 className="text-4xl font-bold w-full mb-5">
        <span className="">Bakery</span>
        <span className="text-blue-800">Pastery</span>
      </h1>
      <p className="text-lg mb-2"> Discover your local bakeries!</p>
      <button className="btn-hero" onClick={props.handleOnClick}>
        {props.buttonText}
      </button>
    </div>
  );
};

export default Banner;
