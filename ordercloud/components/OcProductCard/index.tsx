/* eslint-disable import/no-unresolved */
import { BuyerProduct } from 'ordercloud-javascript-sdk'
import { FunctionComponent } from 'react'
import Image from 'next/image'
import HoverImage from '../../../helper/HoverImage'

interface OcProductCardProps {
  product: BuyerProduct
}

const OcProductCard: FunctionComponent<OcProductCardProps> = ({ product }) => {
  const fieldsProps = product
  return (
    <div className=" border-red-300 w-full h-full hover:bg-stone-200 hover:shadow-stone-500/50 shadow-md z-10 productCard">
      <div className="image-container">
        <Image
          className="object-cover hover:scale-125 transform transition-all duration-300"
          src={product?.xp?.ImageUrl}
          alt="sd"
          width={1000}
          height={900}
          layout="responsive"
        />
        <div className="image-overlay">
          <b className="hover:text-indigo-400 text-xl pl-1">{product.Name}</b>
        </div>
      </div>
    </div>
  )
}

export default OcProductCard
