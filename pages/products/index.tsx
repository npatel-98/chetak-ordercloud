import Link from 'next/link'
import { BuyerProduct } from 'ordercloud-javascript-sdk'
import { FunctionComponent } from 'react'
import OcProductCard from '../../ordercloud/components/OcProductCard'
import OcProductList from '../../ordercloud/components/OcProductList'
import useNextRouterMapping, { NextQueryMap } from '../../ordercloud/hooks/useNextRouterMapping'
import ClientOnly from '../../helper/ClientOnly'

const queryMap: NextQueryMap = {
  search: 's',
  page: 'p',
  pageSize: 'ps',
  searchOn: 'so',
  sortBy: 'o',
  'xp.size': 'size',
  'xp.color': 'color',
  'xp.test_boolean': 'bool',
  'xp.test_number': 'num',
}

const ProductListPage: FunctionComponent = () => {
  const { options } = useNextRouterMapping(queryMap)

  // const handleFacetChange = useCallback(
  //   (updatedFilters: Filters) => {
  //     updateQuery({ ...options, page: undefined, filters: updatedFilters })
  //   },
  //   [options, updateQuery]
  // )

  const handleRenderItem = (p: BuyerProduct) => {
    return (
      <Link href={`/products/${p.ID}`}>
        <OcProductCard product={p} />
      </Link>
    )
  }
  return (
    <ClientOnly>
      <div className="productBackgroundWrapper relative h-screen ">
        {/* <OcProductFacetForm onChange={handleFacetChange} /> */}
        <OcProductList options={options} renderItem={handleRenderItem} />
      </div>
    </ClientOnly>
  )
}

export default ProductListPage
