import React, { FunctionComponent } from 'react'
import Image from 'next/image'

interface Field{
    field: any;
} 
const HoverImage : FunctionComponent<Field> = ({field}) => {
  return (
    <div className="image-container">
      <Image 
        className="object-cover hover:scale-105" 
        // src={product?.xp?.ImageUrl} 
        src="https://images.unsplash.com/photo-1531150677150-362c74533d21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="sd" 
        width={1000} 
        height={900} 
        layout="responsive" 
    />
      <div className="image-overlay">
        <b className="hover:text-indigo-400 text-2xl">{}</b>
      </div>
    </div>
  );
};

export default HoverImage;
