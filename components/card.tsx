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
    <div className="my-10 glass">
      <Link href={href} passHref>
        <div className="p-5 hover:bg-purple-400 cursor-pointer">
          <a className="">
            <div className="mb-2">
              <h2 className="font-semibold text-lg">{name}</h2>
            </div>
            <div className="">
              <Image
                className="rounded-2xl"
                src={imgUrl}
                width={260}
                height={160}
                alt="Bakery"
              />
            </div>
          </a>
        </div>
      </Link>
    </div>
  );
};

export default Card;
