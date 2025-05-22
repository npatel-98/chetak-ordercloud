import { BuyerAddress } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useMemo } from 'react'
import { saveShippingAddress } from '../../redux/ocCurrentOrder'
import { useOcDispatch, useOcSelector } from '../../redux/ocStore'
import OcAddressBook from '../OcAddressBook'
import OcAddressForm from '../OcAddressForm'
import OcShipEstimates from './OcShipEstimates'
import { OcCheckoutStepProps } from './index'

const OcCheckoutShipping: FunctionComponent<OcCheckoutStepProps> = ({ onNext, }) => {
  const dispatch = useOcDispatch()

  const { initialized, order, lineItems, user } = useOcSelector((s) => ({
    initialized: s.ocCurrentOrder.initialized,
    order: s.ocCurrentOrder.order,
    lineItems: s.ocCurrentOrder.lineItems,
    user: s.ocUser.user,
  }))

  const handleSetShippingAddress = (address: Partial<BuyerAddress>) => {
    console.log('address', address)
    dispatch(saveShippingAddress(address))
  }

  const currentShippingAddress = useMemo(() => {
    if (initialized && lineItems && lineItems.length) {
      return lineItems[0].ShippingAddress
    }
    return {}
  }, [initialized, lineItems])

  const showAddressBook = useMemo(() => {
    return user && user.AvailableRoles && user.AvailableRoles.includes('MeAddressAdmin')
  }, [user])

  return initialized && order ? (
    <div className="m-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping</h2>
      {showAddressBook ? (
        <OcAddressBook
          id="shipping"
          listOptions={{ pageSize: 100 }}
          selected={order.ShippingAddressID}
          onChange={handleSetShippingAddress}
        />
      ) : (
        <OcAddressForm
          id="shipping"
          address={currentShippingAddress}
          onSubmit={handleSetShippingAddress}
        />
      )}
      <OcShipEstimates />
      <hr />
      <button type="button" onClick={onNext}>
        Billing
      </button>
    </div>
  ) : null
}

export default OcCheckoutShipping
