import Head from 'next/head'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import OcProductDetail from '../../../ordercloud/components/OcProductDetail'
import { useOcSelector } from '../../../ordercloud/redux/ocStore'

const ProductPage: FunctionComponent = () => {
  const { isReady, query } = useRouter()

  const productName = useOcSelector(
    (s) => s.ocProductDetail.product && s.ocProductDetail.product.Name
  )

  // const handleLineItemUpdated = () => {
  //   push('/cart')
  // }

  return (
    <div className="productBackgroundWrapper relative h-screen ">
      <Head>
        <title>{productName}</title>
      </Head>
      {isReady ? <OcProductDetail productId={query.productid as string} /> : <h1>Loading</h1>}
    </div>
  )
}

export default ProductPage
