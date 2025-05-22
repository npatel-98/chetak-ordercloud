import { BuyerProduct } from 'ordercloud-javascript-sdk'
import { FunctionComponent } from 'react'
import useOcProductList from '../../hooks/useOcProductList'
import { OcProductListOptions } from '../../redux/ocProductList'
import Link from 'next/dist/client/link'
import ImageHelper from '../../../helper/Image'
export interface OcProductListProps {
  options?: OcProductListOptions
  renderItem?: (product: BuyerProduct) => JSX.Element
}

const OcProductList: FunctionComponent<OcProductListProps> = ({ options }) => {
  const products = useOcProductList(options)

  return (
    <>
      {!products || products.length === 0 ? (
        <ol className="my-10 grid gap-6 container mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <li key={i} className="">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col items-center p-6 animate-pulse">
                {/* Image Skeleton */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="mb-4 w-64 h-40 bg-gray-200 rounded" />
                </div>
                {/* Details Skeleton */}
                <div className="flex-1 flex flex-col justify-between w-full mt-4">
                  {/* Brand and Name */}
                  <div className="mb-2">
                    <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                    <div className="h-6 w-32 bg-gray-300 rounded" />
                  </div>
                  {/* Price Skeleton */}
                  <div className="h-4 w-40 bg-gray-200 rounded mb-4" />
                  {/* Specs Skeleton */}
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 mt-4">
                    <div className="text-center md:text-left border-r border-gray-200 pr-4">
                      <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="text-center md:text-left border-r border-gray-200 pr-4">
                      <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="text-center md:text-left">
                      <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-20 bg-gray-100 rounded" />
                    </div>
                  </div>
                  {/* Buttons Skeleton */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="h-10 w-full bg-gray-200 rounded-full" />
                    <div className="h-10 w-full bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="my-10 grid gap-6 container mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products &&
            products.map((p) => (
              <Link key={p.ID} href={`/products/${p.ID}`} className="block">
                <li className="">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col  items-center p-6">
                    {/* Left: Image */}
                    <div className="flex-1 flex flex-col items-center md:items-start ">
                      {/* Product Image */}
                      <div className="mb-4 md:mb-0">
                        <ImageHelper url={p?.xp?.Images?.[0]?.Url} className=" w-64 h-40" />
                      </div>
                    </div>
                    {/* Right: Details */}
                    <div className="flex-1 flex flex-col justify-between  w-full">
                      {/* Brand and Name */}
                      <div className="mb-2">
                        <span className="text-gray-400 font-semibold text-lg">
                          {p?.xp?.Brand || 'Bajaj'}
                        </span>
                        <div className="font-bold text-xl text-gray-800">{p.Name}</div>
                      </div>
                      <span className="font-medium">
                        Price Starting from {p?.xp?.SpecialPrice || '133 101'}/- *
                      </span>
                      {/* Specs */}
                      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 mt-4">
                        <div className="text-center md:text-left border-r border-gray-200 pr-4">
                          <div className="font-bold">Engine</div>
                          <div className="text-gray-700">{p?.xp?.Engine || '164.82 cc'}</div>
                        </div>
                        <div className="text-center md:text-left border-r border-gray-200 pr-4">
                          <div className="font-bold">Max Power</div>
                          <div className="text-gray-700">
                            {p?.xp?.MaxPower || '11.7 kW (16 PS) @ 8750 rpm'}
                          </div>
                        </div>
                        <div className="text-center md:text-left">
                          <div className="font-bold">Max Torque</div>
                          <div className="text-gray-700">
                            {p?.xp?.MaxTorque || '14.65 Nm @ 6750 rpm'}
                          </div>
                        </div>
                      </div>
                      {/* Buttons */}
                      <div className="flex flex-col md:flex-row gap-4">
                        <Link
                          href={`/products/${p?.ID}/booking`}
                          className="bg-[#2563eb] text-white font-semibold py-3 rounded-full w-full text-center  transition hover:bg-[#1d4ed8]"
                        >
                          BOOK NOW
                        </Link>
                        <button className="bg-[#2563eb] text-white font-semibold py-3 rounded-full w-full  transition hover:bg-[#1d4ed8]">
                          EXPLORE NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
        </ol>
      )}
    </>
  )
}

export default OcProductList
