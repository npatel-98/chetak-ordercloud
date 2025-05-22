import { isEqual } from 'lodash'
import { BuyerAddress } from 'ordercloud-javascript-sdk'
import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { EMPTY_ADDRESS } from '../../redux/ocAddressBook'

interface OcAddressFormProps {
  id: string
  onSubmit: (address: BuyerAddress) => void
  onDelete?: (addressId: string) => void
  address?: BuyerAddress
}

const OcAddressForm: FunctionComponent<OcAddressFormProps> = ({
  id,
  onSubmit,
  onDelete,
  address,
}) => {
  const [formValues, setFormValues] = useState(address || EMPTY_ADDRESS)

  useEffect(() => {
    setFormValues(address || EMPTY_ADDRESS)
  }, [address])

  const handleFormSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      onSubmit(formValues)
    },
    [onSubmit, formValues]
  )

  const handleDeleteAddress = useCallback(() => {
    onDelete(address.ID)
  }, [onDelete, address])

  const handleInputChange = (field: keyof BuyerAddress) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((s) => ({ ...s, [field]: e.target.value }))
  }

  const handleDiscardChanges = useCallback(() => {
    setFormValues(address || EMPTY_ADDRESS)
  }, [address])

  const hasChanges = useMemo(() => {
    return !isEqual(address, formValues)
  }, [address, formValues])

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {address && address.ID ? 'Edit Address' : 'Add New Address'}
      </h2>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor={`${id}_address_addressName`} className="block text-sm font-medium text-gray-700 mb-1">
              Address Name
            </label>
            <input
              type="text"
              id={`${id}_address_addressName`}
              name="address_addressName"
              placeholder="Home, Office, etc."
              value={formValues.AddressName}
              onChange={handleInputChange('AddressName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${id}_address_companyName`} className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id={`${id}_address_companyName`}
              name="address_companyName"
              placeholder="Enter company name"
              value={formValues.CompanyName}
              onChange={handleInputChange('CompanyName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${id}_address_firstName`} className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id={`${id}_address_firstName`}
              name="address_firstName"
              placeholder="Enter first name"
              value={formValues.FirstName}
              onChange={handleInputChange('FirstName')}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${id}_address_lastName`} className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id={`${id}_address_lastName`}
              name="address_lastName"
              placeholder="Enter last name"
              value={formValues.LastName}
              onChange={handleInputChange('LastName')}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="form-group md:col-span-2">
            <label htmlFor={`${id}_address_street1`} className="block text-sm font-medium text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              id={`${id}_address_street1`}
              name="address_street1"
              placeholder="Enter street address"
              value={formValues.Street1}
              onChange={handleInputChange('Street1')}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="form-group md:col-span-2">
            <label htmlFor={`${id}_address_street2`} className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              id={`${id}_address_street2`}
              name="address_street2"
              placeholder="Floor, suite, apartment #"
              value={formValues.Street2}
              onChange={handleInputChange('Street2')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${id}_address_city`} className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              id={`${id}_address_city`}
              name="address_city"
              placeholder="Enter city"
              value={formValues.City}
              onChange={handleInputChange('City')}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${id}_address_state`} className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <input
              type="text"
              id={`${id}_address_state`}
              name="address_state"
              placeholder="Enter state"
              value={formValues.State}
              onChange={handleInputChange('State')}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${id}_address_zip`} className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code *
            </label>
            <input
              type="text"
              id={`${id}_address_zip`}
              name="address_zip"
              placeholder="Enter zip code"
              value={formValues.Zip}
              onChange={handleInputChange('Zip')}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${id}_address_country`} className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <input
              type="text"
              id={`${id}_address_country`}
              name="address_country"
              placeholder="Enter two-digit country code"
              value={formValues.Country}
              onChange={handleInputChange('Country')}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="form-group md:col-span-2">
            <label htmlFor={`${id}_address_phone`} className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id={`${id}_address_phone`}
              name="address_phone"
              placeholder="Enter 10 digit phone number"
              value={formValues.Phone}
              onChange={handleInputChange('Phone')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-end mt-8">
          {address && address.ID && (
            <button
              type="button"
              onClick={handleDeleteAddress}
              disabled={hasChanges || !address.ID}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
            >
              Delete Address
            </button>
          )}
          <button
            type="button"
            onClick={handleDiscardChanges}
            disabled={!hasChanges}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            disabled={!hasChanges}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {address && address.ID ? 'Update Address' : 'Save Address'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default OcAddressForm
