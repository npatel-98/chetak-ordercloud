import { PriceSchedule, RequiredDeep } from 'ordercloud-javascript-sdk'
import { ChangeEvent, FunctionComponent } from 'react'

interface OcQuantityInputProps {
  controlId: string
  priceSchedule: RequiredDeep<PriceSchedule>
  label?: string
  disabled?: boolean
  quantity: number
  onChange: (quantity: number) => void
}

const OcQuantityInput: FunctionComponent<OcQuantityInputProps> = ({
  controlId,
  priceSchedule,
  label = 'Quantity',
  disabled,
  quantity,
  onChange,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value))
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value))
  }

  return (
    <label htmlFor={controlId} className="quantityWrapper font-cust mt-8 items-base items-center">
      {label}
      {priceSchedule?.RestrictedQuantity ? (
        // eslint-disable-next-line
        <select id={controlId} disabled={disabled} value={quantity} onChange={handleSelectChange}>
          {priceSchedule.PriceBreaks.map((pb) => (
            <option key={pb.Quantity} value={pb.Quantity}>
              {pb.Quantity}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={controlId}
          disabled={disabled}
          type="number"
          min={priceSchedule?.MinQuantity}
          max={priceSchedule?.MaxQuantity}
          step={1}
          value={quantity}
          onChange={handleInputChange}
          className="p-4 w-full rounded bg-white border"
        />
      )}
    </label>
  )
}

export default OcQuantityInput
