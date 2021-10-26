import React from "react";
import type { NextPage } from "next";

type Props = {
  buttonText: string;
  handleOnClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Banner: NextPage<Props> = (props) => {
  return (
    <div>
      <h1 className="text-xl">
        <span className="font-bold">Bakery/</span>
        <span className="text-white">Pastery</span>
      </h1>
      <p className=""> Discover your local bakeries!</p>
      <button className="btn-hero" onClick={props.handleOnClick}>
        {props.buttonText}
      </button>
    </div>
  );
};

export default Banner;
