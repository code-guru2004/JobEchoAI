import Image from 'next/image';
import React from 'react';

const Card = ({cardNo,img,title,description}) => {
  return (
    <div className="w-64 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden">
      <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
        <p className="absolute bottom-6 left-7 text-white text-2xl">{cardNo}</p>
      </div>
      <div className="fill-violet-500 w-12">
        <Image src={img} alt='pdf' width={100} height={100}/>
      </div>
      <h1 className="font-bold text-xl">{title}</h1>
      <p className="text-sm text-zinc-500 leading-6">
        {description}
      </p>
    </div>
  );
}

export default Card;
