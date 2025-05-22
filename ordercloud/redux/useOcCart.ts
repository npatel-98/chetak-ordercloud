
import useOcCurrentOrder from "../hooks/useOcCurrentOrder"
import { useOcDispatch } from "./ocStore"
import { LineItemWithXp, OrderWorksheetWithXP } from "./xp"
import { createLineItem, updateLineItem } from "./ocCurrentOrder"

interface CartResponse {
  payload?: {
    errorCode?: string
    LineItems?: LineItemWithXp[]
  }
  isError?: boolean
}

const useOcCart = () => {
  /***
   ** TODO:: We will replace with middleware call
   */
  const dispatch = useOcDispatch()
  const {  lineItems } = useOcCurrentOrder()
  const getProductLineItems = (specifiedLineItems?: LineItemWithXp[]): LineItemWithXp[] => {
    const actualLineItems = specifiedLineItems ?? lineItems
    return actualLineItems
  }


  // to get LineTotal from passed lineItems. Used for Rewards calculation.
//   const getProductLineItemsTotal = (lineItems: LineItem[] = []): number => {
//     const productLineItems = getProductLineItems(lineItems)
//     return productLineItems.reduce(
//       (totalValue, element) => totalValue + (element.LineTotal ?? 0),
//       0
//     )
//   }
  /*
  const getColoradoLineItem = () => {
    return lineItems?.find((x) => x.ProductID === DiscreteLineItem.CORDF) ?? undefined;
  };
  */


//   const getInventoryId = async (productId: string, storeId: string) => {
//     if (productId && storeId) {
//       const inventory = await Me.ListProductInventoryRecords(productId, {
//         search: storeId as string,
//         searchOn: ['AddressID'],
//       })
//       return inventory?.Items[0]?.ID
//     }
//     return null
//   }

  /**
   * Add to cart
   * @param productId Product id
   * @param quantity Item quantity
   * @returns return null if id and quantity is not valid else send success response.
   */
  const addToCart = async ({
    productId,
    quantity,
  }: {
    productId: string
    quantity: number
  }): Promise<CartResponse | null> => {
    try {
      if (productId && quantity) {
        const lineItem: LineItemWithXp = {
          ProductID: productId,
          Quantity: quantity,
        }

        const existingLineItem = lineItems?.find((li) => li?.Product?.ID === productId)
        let internalRes: CartResponse
        if (existingLineItem) {
          const updatedLineItem = {
            ...existingLineItem,
            Quantity: quantity + (existingLineItem?.Quantity ?? 0),
          }
          const res = await dispatch(updateLineItem(updatedLineItem))
          internalRes = res as CartResponse
        } else {
          const res = await dispatch(createLineItem(lineItem))
          internalRes = res as CartResponse
        }
        if (internalRes?.payload?.errorCode) {
          return internalRes
        }
        if (internalRes?.payload?.LineItems?.length > 0) {
          sessionStorage.setItem(
            'cartLineItems',
            JSON.stringify(internalRes.payload.LineItems)
          )
          return internalRes
        }
      }
      return null
    } catch (_err) {
      return { isError: true }
    }
  }


  //Get Product Price
  /**
   *
   * @param productId Product id
   * @returns return null if id is not valid else send price as response.
   */
//   const getProductPrice = useCallback(
//     async (productId: string, storeId: string): Promise<NormalizedProductPrice> => {
//       if (productId && storeId) {
//         const response = await Me.GetProduct<BuyerProductWithXp>(productId, {
//           sellerID: storeId,
//         })
//         return {
//           productId: productId,
//           listPrice: response?.PriceSchedule?.xp.ListPrice,
//           memberPrice: response?.PriceSchedule?.xp?.PPCPrice,
//           iMapPrice: response?.PriceSchedule?.xp?.IMapPrice,
//         }
//       }
//       return {}
//     },
//     []
//   )

//   const getProductsPrice = useCallback(
//     async (productIds: string[]): Promise<NormalizedProductPrice[]> => {
//       const result: NormalizedProductPrice[] = []

//       if (order?.ToCompanyID) {
//         const promises = productIds.map(async (id) => {
//           const response = await Me.GetProduct<BuyerProductWithXp>(id, {
//             sellerID: order?.ToCompanyID,
//           })
//           const value: NormalizedProductPrice = {
//             productId: id,
//             listPrice: response?.PriceSchedule?.xp.ListPrice,
//             memberPrice: response?.PriceSchedule?.xp?.PPCPrice,
//             iMapPrice: response?.PriceSchedule?.xp?.IMapPrice,
//           }
//           result.push(value)
//         })

//         await Promise.all(promises)
//       }

//       return result
//     },
//     [order?.ToCompanyID]
//   )
//   //Get Product optioms
//   /**
//    *
//    * @param productId Product id
//    * @param storeId Store id
//    * @returns return product options.
//    */
//   // Define the type for your objects
//   interface Item {
//     Value?: string
//   }
//   const getProductOptions = async (parentId: string, storeId: string) => {
//     const variationAttributesData = await Me?.GetProduct(parentId)
//     if (
//       variationAttributesData?.xp?.VariationAttributes &&
//       variationAttributesData?.xp?.VariationAttributes?.length > 0
//     ) {
//       const isRetailUnitMeasure = variationAttributesData?.xp?.VariationAttributes?.includes(
//         retailUnitMeasureFieldName
//       )
//       const data = await Me?.ListProducts({
//         search: parentId,
//         searchOn: ['ParentID'],
//         filters: { 'xp.WE': false },
//         sellerID: storeId,
//       })
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const filteredFacets = data?.Meta?.Facets?.filter((facet: any) =>
//         variationAttributesData?.xp?.VariationAttributes?.includes(facet?.Name?.toString())
//       )
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const filterFacetKeys = filteredFacets?.map((facet: any) => facet?.Name?.toString())
//       if (isRetailUnitMeasure) {
//         filterFacetKeys?.push(retailUnitMeasureFieldName)
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const filteredProducts = data?.Items?.map((item: any) => {
//         const filteredProduct: { [key: string]: string } = {}
//         filterFacetKeys?.forEach((key: string) => {
//           if (key === retailUnitMeasureFieldName) {
//             filteredProduct[key] =
//               item?.xp?.RetailUnit + ' ' + item?.xp?.RetailMeasure?.toUpperCase()
//           } else {
//             filteredProduct[key] = Array.isArray(item?.xp?.[key])
//               ? item?.xp?.[key]?.join('; ')
//               : item?.xp?.[key]
//           }
//         })
//         return { ...filteredProduct, sku: item?.xp?.UPC }
//       })
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const facetsList: any = filteredFacets?.map((facet: any) => {
//         return {
//           Name: facet?.Name,
//           Values: filteredProducts
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             ?.map((item: any) => {
//               return {
//                 Value: Array.isArray(item?.[facet?.Name])
//                   ? item?.[facet?.Name]?.join('; ')
//                   : item?.[facet?.Name],
//               }
//             })
//             .reduce((accumulator: Item[], current: Item) => {
//               if (current.Value && current.Value?.length > 0) {
//                 if (!accumulator.some((item: Item) => item.Value === current.Value)) {
//                   accumulator.push(current as Item)
//                 }
//               }
//               return accumulator
//             }, []),
//         }
//       })
//       if (isRetailUnitMeasure) {
//         facetsList?.push({
//           Name: retailUnitMeasureFieldName,
//           Values: filteredProducts
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             ?.map((item: any) => {
//               return {
//                 Value: item?.[retailUnitMeasureFieldName],
//               }
//             })
//             .reduce((accumulator: Item[], current: Item) => {
//               if (current.Value && current.Value?.length > 0) {
//                 if (!accumulator.some((item: Item) => item.Value === current.Value)) {
//                   accumulator.push(current as Item)
//                 }
//               }
//               return accumulator
//             }, []),
//         })
//       }
//       return {
//         filteredProducts,
//         filterFacetKeys: filterFacetKeys || [],
//         facets: facetsList?.filter((facet: { Values: Item[] }) => {
//           return facet?.Values?.length > 0
//         }),
//       }
//     }
//     return null
//   }

//   //Get Product Inventory
//   /**
//    *
//    * @param productId Product id
//    * @returns return null if id is not valid else send Inventory as response.
//    */
//   const getProductInventory = useCallback(
//     async (productId: string, storeId: string) => {
//       const cacheKey = `${productId}-${storeId}`
//       if (inventoryCache[cacheKey]) {
//         return inventoryCache[cacheKey]
//       }

//       if (productId) {
//         try {
//           const inventory = await Me.ListProductInventoryRecords(productId, {
//             search: storeId as string,
//             searchOn: ['AddressID'],
//           })
//           const inventoryData = {
//             inventory: inventory.Items?.[0]?.QuantityAvailable,
//             inventoryRecordId: inventory.Items?.[0]?.ID,
//           }

//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           setInventoryCache((prevCache: any) => ({
//             ...prevCache,
//             [cacheKey]: inventoryData,
//           }))

//           return inventoryData
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (error: any) {
//           const cookies = new Cookies()
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           error?.errors?.map(async (error: any) => {
//             const hasRefreshToken = cookies.get('ordercloud.refresh-token')
//             // Can check refresh tokens from Tokens.GetRefreshToken but looking fishy.
//             // const hasOCRefreshToken = Tokens.GetRefreshToken();

//             if (error && error?.ErrorCode.includes('Authorization.')) {
//               if (!hasRefreshToken && process.env.NEXT_PUBLIC_ENABLE_SOFTLOGIN == 'true') {
//                 toExecuteBeforeSoftLogin(ocUser.user, ocCurrentOrder) // invokes softLogin state
//                 await dispatch(setIsAnonymous(true))
//                 /**
//                  *  need to redirect to Login Page as upon Qty manipulation from invoked func,
//                  *  will need to redirect to LoginPage to identify as softLogin
//                  */
//                 router.push(currentPath?.isLogin)
//               }
//             }
//           })
//         }
//       }
//       return null
//     },
//     [inventoryCache]
//   )

//   //Get Product Availability
//   /**
//    *
//    * @param productId Product id
//    * @returns return null if id is not valid else send Inventory as response.
//    * {"IN":"In Stock","LOW":"Low Stock","OUT":"Out of Stock"}
//    */
//   // const currentlineItems: LineItemWithXp[] = getProductLineItems();
//   // const currentlineItems: LineItemWithXp[] =
//   //   localStorage.getItem('isSoftLoginEnabled') == 'true'
//   //     ? getProductLineItemsSoftLogin()
//   //     : getProductLineItems();

//   // Please refer to https://pspgroup.visualstudio.com/ecomm%203.0/_git/petsuppliesplus/commit/b4cfacfd239a203328cca9f495612f4e39e1e57b?refName=refs/heads/uat&path=/XMC-PSP/src/PetSuppliesPlus/src/hooks/useOcCart.ts&_a=compare

//   const isSoftLoginEnabled = useIsSoftLoginEnabled()
//   const currentlineItems = isSoftLoginEnabled
//     ? getProductLineItemsSoftLogin()
//     : getProductLineItems()

//   const getProductAvailability = async (
//     productId: string,
//     storeId: string,
//     thresholdValue?: number
//   ) => {
//     if (productId && storeId) {
//       const data = await getProductInventory(productId, storeId)
//       if (data) {
//         const productInLineItems = currentlineItems?.find(
//           (item) => item.InventoryRecordID === data.inventoryRecordId
//         )

//         const dataInventory = data.inventory
//         const numInCart = productInLineItems?.Quantity ?? 0
//         const realInventory = dataInventory - numInCart

//         let availability: productAvailability
//         if (realInventory <= 0) {
//           availability = productAvailability.OUT
//         } else if (thresholdValue && realInventory <= thresholdValue) {
//           availability = productAvailability.LOW
//         } else {
//           availability = productAvailability.IN
//         }
//         return {
//           productInventory: realInventory,
//           availability: availability,
//           inventoryRecordId: data.inventoryRecordId,
//           productId: productId,
//         }
//       }
//     }
//     return null
//   }

//   //Remove specific item from cart
//   /**
//    *
//    * @param productId Product id
//    */
//   const removeFromCart = async (productId: string) => {
//     lineItems?.map(async (i: LineItem) => {
//       if (i?.ID && i?.Product?.ID === productId) {
//         const res = await dispatch(removeLineItem(i?.ID))
//         return res
//       } else {
//         return { error: 'items is not available in cart !!' }
//       }
//     })
//   }
//   //Remove all items from the cart
//   const clearCart = () => {
//     //weather remove all lineitems or delete cart Deepak?
//     dispatch(deleteCurrentOrder())
//   }

//   //Add to cart for Purchase Orders
//   const purchaseOrderAddToCart = async (
//     productId: string,
//     quantity: number,
//     storeId: string,
//     lowStock: number
//   ) => {
//     const inventory = await getProductAvailability(productId, storeId, lowStock)
//     if (inventory) {
//       if (quantity <= inventory?.productInventory) {
//         const res = await addToCart({
//           productId: productId,
//           quantity: quantity,
//           ID: productId,
//         })
//         return { res: res }
//       } else {
//         const res = await addToCart({
//           productId: productId,
//           quantity: inventory?.productInventory,
//           ID: productId,
//         })
//         return { inventoryStatus: productAvailability?.LOW, res: res }
//       }
//     }
//     return { inventoryStatus: productAvailability?.OUT }
//   }

//   //

//   //ReorderAll
//   const reorderAll = async ({
//     ProductToAdd,
//     CurrentCardId,
//     orderFulFillMentType,
//     currentCartLineItemLength,
//     currentCartFulFillMentType,
//   }: {
//     ProductToAdd: ProductToAddProps
//     CurrentCardId: string
//     orderFulFillMentType: string
//     currentCartLineItemLength: number
//     currentCartFulFillMentType: string
//   }): Promise<reorderAllOcResponse> => {
//     if (ProductToAdd && CurrentCardId) {
//       const options = {
//         method: REQUEST_METHOD?.post,
//         data: {
//           ProductToAdd,
//           CurrentCardId,
//         },
//       }
//       if (currentCartLineItemLength < 1) {
//         if (orderFulFillMentType !== currentCartFulFillMentType) {
//           if (orderFulFillMentType === FulfillmentType?.BOPIS) {
//             const request: Order = { xp: { Fulfillment: FulfillmentType.BOPIS } }
//             await dispatch(patchOrder({ request }))
//             const res = await handleReorderAll({ options: options })
//             return res
//           } else {
//             setHeaderContextData({
//               ...headerContextData,
//               openMiniCart: true,
//               showMiniCartLoader: true,
//             })
//             localStorage.setItem(purchaseConst?.reorderAllStorageItem, JSON.stringify(options))
//             return {
//               isDFS: true,
//             }
//           }
//         } else {
//           const res = await handleReorderAll({ options: options })
//           return res
//         }
//       } else {
//         const res = await handleReorderAll({ options: options })
//         return res
//       }
//     } else {
//       return { isAllNotAdded: undefined }
//     }
//   }

//   const handleReorderAll = async ({
//     options,
//   }: {
//     options: {
//       method: string
//       data: {
//         ProductToAdd: ProductToAddProps
//         CurrentCardId: string
//       }
//     }
//     isDFS?: boolean
//   }) => {
//     setHeaderContextData({
//       ...headerContextData,
//       openMiniCart: true,
//       showMiniCartLoader: true,
//     })
//     const res: reorderAllResponse = await apiRequest(getMyOrdersAPI.reorderAll, options)
//     if (res?.EntityAdded?.length > 0) {
//       await dispatch(refreshOrder())
//       const isPartiallyAdded = res?.EntityAdded?.some(
//         (x: reorderAllProductEntity) => x?.QuantityAdded === 0
//       )
//       const isFullyAdded = res?.EntityAdded?.every(
//         (x: reorderAllProductEntity) => x?.QuantityAdded > 0
//       )
//       setHeaderContextData({
//         ...headerContextData,
//         openMiniCart: true,
//         showMiniCartLoader: false,
//       })
//       return { isPartiallyAdded: isPartiallyAdded, isFullyAdded: isFullyAdded }
//     } else {
//       setHeaderContextData({
//         ...headerContextData,
//         openMiniCart: true,
//         showMiniCartLoader: false,
//       })
//       return { isAllNotAdded: true }
//     }
//   }

//   //Frequently Brought Products
//   const handleAddAllToCart = async ({
//     productIds,
//     storeId,
//     inventoryItemId,
//   }: {
//     productIds: { productId: string; isAutoship: boolean }[]
//     storeId: string
//     inventoryItemId?: string
//   }) => {
//     try {
//       if (!productIds || productIds.length === 0) {
//         return null
//       }

//       const selectedStoreId = storeId

//       // Map each productId to a promise that resolves when the item is added to cart
//       const promises = productIds.map(async (productId) => {
//         const inventoryId =
//           inventoryItemId || (await getInventoryId(productId?.productId, selectedStoreId))

//         if (!inventoryId) {
//           return null // Skip if no inventory ID found
//         }

//         const lineItem: LineItemWithXp = {
//           ProductID: productId?.productId,
//           InventoryRecordID: inventoryId,
//           Quantity: 1,
//           ID: `${selectedStoreId}-${productId?.productId}`,
//         }

//         const existingLineItem = lineItems?.find((li) => li?.Product?.ID === productId?.productId)

//         if (existingLineItem) {
//           const updatedLineItem = {
//             ...existingLineItem,
//             Quantity: (existingLineItem?.Quantity ?? 0) + 1,
//           }
//           return await dispatch(updateLineItem(updatedLineItem))
//         } else {
//           if (lineItem && lineItem.ProductID != DiscreteLineItem.TIP) {
//             if (lineItem.xp) {
//               lineItem.xp.DT = 2
//             } else {
//               lineItem.xp = { DT: 2 }
//             }
//           }
//           if (
//             lineItem.xp &&
//             localStorage.getItem('Is_Autoship_Method') === 'true' &&
//             productId?.isAutoship
//           ) {
//             lineItem.xp.Autoship = true
//           }

//           return await dispatch(
//             createLineItem({
//               request: lineItem,
//               isDFS: localStorage.getItem('selected_fulfillment_Method') === FulfillmentType?.DFS,
//             })
//           )
//         }
//       })

//       // Wait for all promises to resolve
//       const results = await Promise.all(promises)

//       // Filter out null results
//       const response = results.filter((result) => result !== null)

//       const newResponse = {
//         data: response,
//         isPartiallyAdded: response?.some(
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           (val: any) => val?.payload?.errorCode == ErrorCodes.InventoryInsufficient
//         ),
//       }
//       return response.length > 0 ? newResponse : null
//     } catch (_err) {
//       return { isError: true }
//     }
//   }

  return {
    addToCart,
    getProductLineItems,
    // getTipLineItem,
    // getColoradoLineItem,
    // getProductPrice,
  }
}

export default useOcCart

//Reorder all types
export type ProductToAddProps = { ProductId: string; Quantity: number }[]
export type reorderAllProductEntity = {
  ProductId: string
  QuantityToAdd: number
  QuantityAdded: number
}
export type reorderAllResponse = {
  EntityAdded: reorderAllProductEntity[] | []
  Worksheet: OrderWorksheetWithXP
}
export type reorderAllOcResponse = {
  isPartiallyAdded?: boolean
  isFullyAdded?: boolean
  isAllNotAdded?: boolean
  isDFS?: boolean
}
