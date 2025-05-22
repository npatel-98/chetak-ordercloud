// import Link from 'next/link'
import { FunctionComponent } from 'react'
import OcLineItemList from '../ordercloud/components/OcLineItemList'
// import { deleteCurrentOrder } from '../ordercloud/redux/ocCurrentOrder'
// import { useOcDispatch } from '../ordercloud/redux/ocStore'

const CartPage: FunctionComponent = () => {
  // const dispatch = useOcDispatch()

  return (
    <div className="">
      <div className="cartActionWrapper container mx-auto flex justify-end">
        {/* <button type="button" onClick={() => dispatch(deleteCurrentOrder())} className="mx-5 ">
          Clear Cart
        </button>
        <Link href="/checkout">
          <a>Checkout</a>
        </Link> */}
      </div>
      <OcLineItemList emptyMessage="Your shopping cart is empty" editable />
    </div>
  )
}

export default CartPage
