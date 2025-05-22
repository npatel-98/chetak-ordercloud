import { Spec } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useEffect, useState } from 'react'
import useOcProductDetail from '../../hooks/useOcProductDetail'
import { useOcSelector } from '../../redux/ocStore'
import formatPrice from '../../utils/formatPrice'
import OcProductSpecField from './OcProductSpecField'
import ImageHelper from '../../../helper/Image'

interface OcProductDetailProps {
  productId: string
}

interface GalleryImage {
  Url: string
}

const determineDefaultOptionId = (spec: Spec) => {
  if (spec.DefaultOptionID) return spec.DefaultOptionID
  return spec.OptionCount ? spec.Options[0].ID : undefined
}

const OcProductDetail: FunctionComponent<OcProductDetailProps> = ({ productId }) => {
  const { product, specs } = useOcProductDetail(productId)

  const [specValues, setSpecValues] = useState([])

  const lineItem = useOcSelector((s) =>
    s.ocCurrentOrder.lineItems
      ? s.ocCurrentOrder.lineItems.find((li) => li.ID === productId)
      : undefined
  )

  useEffect(() => {
    if (lineItem) {
      setSpecValues(lineItem.Specs)
    } else if (specs) {
      setSpecValues(
        specs.map((s) => {
          return {
            SpecID: s.ID,
            OptionID: determineDefaultOptionId(s),
            Value: s.DefaultValue ? s.DefaultValue : undefined,
          }
        })
      )
    }
  }, [specs, lineItem])

  const handleSpecFieldChange = (values: { SpecID: string; OptionID?: string; Value?: string }) => {
    setSpecValues((sv) =>
      sv.map((s) => {
        if (s.SpecID === values.SpecID) {
          return {
            SpecID: values.SpecID,
            OptionID: values.OptionID === 'OpenText' ? undefined : values.OptionID,
            Value: values.Value,
          }
        }
        return s
      })
    )
  }

  return product ? (
    <div className=" my-8 ">
      <div className="container mx-auto  gap-8">
        <div>
          {/* Left Column: Name and Image */}
          <div className="flex justify-between">
            <div className="md:col-span-7 flex flex-col">
              <div className="mb-4">
                {/* Assuming "Bajaj Pulsar" comes from somewhere else or is static */}
                <h2 className="text-[#0f172a] text-2xl font-black pb-4 lg:pb-8 ">{product.Name}</h2>
              </div>
            </div>

            {/* Right Column: Price and Details */}
            <div className="md:col-span-5 p-3 z-20">
              {/* Add the "Pulsar NS125 price starting from" text */}
              <p className="text-sm mb-2">Pulsar NS125 price starting from</p>
              <p className="text-lg font-semibold pb-4 lg:pb-2 ">
                {formatPrice(product.PriceSchedule?.PriceBreaks[0].Price)}
              </p>
              {/* Add the "Ex-showroom Price New Delhi Change City" text/link */}
              <p className="text-xs">
                Ex-showroom Price New Delhi{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Change City
                </a>
              </p>

              {/* Description */}
              <div className="mt-8">
                <p className="" dangerouslySetInnerHTML={{ __html: product.Description }} />
              </div>

              {/* Specs - Keep specs if needed, remove quantity and button */}
              {specs &&
                specs.map((s) => {
                  const specValue = specValues.find((sv) => sv.SpecID === s.ID)
                  return (
                    <OcProductSpecField
                      key={s.ID}
                      spec={s}
                      onChange={handleSpecFieldChange}
                      optionId={specValue && specValue.OptionID}
                      value={specValue && specValue.Value}
                    />
                  )
                })}

              {/* Removed Quantity Input and Add/Update Cart Button */}
            </div>
          </div>
          {(product?.xp?.Images?.[0]?.Url || product?.xp?.Images?.[1]?.Url) && (
            <div className="flex justify-center">
              <ImageHelper
                url={product?.xp?.Images?.[0]?.Url || product?.xp?.Images?.[1]?.Url}
                className="object-cover "
                pictureClasses="h-[420px] w-[600px]"
              />
            </div>
          )}
        </div>

        {/** Product Specification */}
        <div className="my-8 container mx-auto">
          <h2 className="text-[#0f172a] text-2xl font-black pb-4 lg:pb-8 text-center">
            {`${product?.Name} Specifications`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-start">
              {product?.xp?.MaxPower && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Max Power</span>
                  <span>{product.xp.MaxPower}</span>
                </div>
              )}
              {product?.xp?.RearSuspension && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Rear Suspension</span>
                  <span>{product.xp.RearSuspension}</span>
                </div>
              )}
              {product?.xp?.Displacement && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Displacement</span>
                  <span>{product.xp.Displacement}</span>
                </div>
              )}
              {product?.xp?.FuelTank && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Fuel Tank</span>
                  <span>{product.xp.FuelTank}</span>
                </div>
              )}
              {product?.xp?.EngineType && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Engine Type</span>
                  <span>{product.xp.EngineType}</span>
                </div>
              )}
              {product?.xp?.SafeBraking && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Safe Braking</span>
                  <span>{product.xp.SafeBraking}</span>
                </div>
              )}
            </div>
            {(product?.xp?.Images?.[0]?.Url || product?.xp?.Images?.[1]?.Url) && (
              <div className="flex justify-center scale-x-[-1]">
                <ImageHelper
                  url={product?.xp?.Images?.[0]?.Url || product?.xp?.Images?.[1]?.Url}
                  className="object-cover"
                  pictureClasses="h-[420px] w-[600px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/** Image gallery section*/}
      {product?.xp?.GalleryImages && product?.xp?.GalleryImages.length > 0 && (
        <div className="imageGallery flex flex-col  bg-[#E5E5E5] pt-10 pl-10 pb-[60px]">
          <h2 className="text-2xl lg:text-[48px] font-bold">Pulsar NS125 Gallery</h2>
          <div className="mt-8 flex space-x-4 w-full overflow-x-scroll">
            {product.xp.GalleryImages.map((image: GalleryImage, index: number) => (
              <div key={index} className="w-[300px] lg:w-[400px]">
                <ImageHelper
                  url={image.Url}
                  className="w-full h-auto"
                  pictureClasses="w-[300px] lg:w-[400px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : null
}

export default OcProductDetail
