import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
const Card: NextPage<{
  className?: any;
  name: string;
  imgUrl: string;
  href: string;
}> = ({ href, name, imgUrl }) => {
  return (
    <div className="my-10">
      <Link href={href}>
        <div className="">
          <a className="">
            <div className="">
              <h2 className="">{name}</h2>
            </div>
            <div className="">
              <Image className="" src={imgUrl} width={260} height={160} />
            </div>
          </a>
        </div>
      </Link>
    </div>
  );
};

export default Card;
