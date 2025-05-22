import Link from 'next/link'
import { LineItem } from 'ordercloud-javascript-sdk'
import { FormEvent, FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import useOcProduct from '../../hooks/useOcProduct'
import { removeLineItem, updateLineItem } from '../../redux/ocCurrentOrder'
import OcQuantityInput from '../OcQuantityInput'
import Image from 'next/image'

interface OcLineItemCardProps {
  lineItem: LineItem
  editable?: boolean
}

const OcLineItemCard: FunctionComponent<OcLineItemCardProps> = ({ lineItem, editable }) => {
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const [quantity, setQuantity] = useState(lineItem.Quantity)

  const product = useOcProduct(lineItem.ProductID)

  const handleRemoveLineItem = useCallback(async () => {
    setDisabled(true)
    await dispatch(removeLineItem(lineItem.ID))
    setDisabled(false)
  }, [dispatch, lineItem])

  const handleUpdateLineItem = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setDisabled(true)
      await dispatch(updateLineItem({ ...lineItem, Quantity: quantity }))
      setDisabled(false)
    },
    [dispatch, quantity, lineItem]
  )

  const isUpdateDisabled = useMemo(() => {
    return disabled || lineItem.Quantity === quantity
  }, [lineItem, disabled, quantity])

  return (
    <div className="cartWrapper">
      <div className="productTitle flex justify-between items-base">
        <p className="">
          {lineItem.Product.Name}
          {lineItem.Specs.map((s) => (
            <span key={s.SpecID}>
              <br />
              {`${s.Name}: ${s.Value}`}
            </span>
          ))}
        </p>
        <div className="ctaActionWrapper flex gap-4">
          {editable && (
            <Link href={`/products/${lineItem.ProductID}?lineitem=${lineItem.ID}`}>
              <a
                aria-label="Edit Line Item"
                className="py-2 px-8 rounded-3xl text-[#322b54] bg-[#47bcc8]"
              >
                Edit
              </a>
            </Link>
          )}

          {editable && (
            <button
              aria-label="Remove Line Item"
              type="button"
              disabled={disabled}
              onClick={handleRemoveLineItem}
              className="py-2 px-8 rounded-3xl text-[#322b54] bg-[#ffa9a9]"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <div className="productDetails md:flex md:justify-start">
        <div className="imgWrapper md:mr-4 md:w-1/4">
          {product?.xp?.ImageUrl && (
            <Image
              alt={product?.Name}
              src={product?.xp?.ImageUrl}
              width={150}
              height={150}
              className="object-cover"
            />
          )}
        </div>

        {editable ? (
          <>
            {product && (
              <form onSubmit={handleUpdateLineItem} className="w-full">
                <div className="h-full flex justify-between items-baseline md:items-center md:flex-auto mx-2">
                  <OcQuantityInput
                    controlId={`${lineItem.ID}_quantity`}
                    quantity={quantity}
                    disabled={disabled}
                    onChange={setQuantity}
                    priceSchedule={product.PriceSchedule}
                  />
                  <button
                    type="submit"
                    aria-label="Update Line Item Quantity"
                    disabled={isUpdateDisabled}
                    className="py-2 px-8 rounded-3xl text-[#322b54] bg-[#47bcc8]"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <p>{`Quantity: ${lineItem.Quantity}`}</p>
        )}
      </div>
    </div>
  )
}

export default OcLineItemCard
