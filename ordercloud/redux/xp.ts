
import {
  BuyerProduct,
  LineItem,
  OrderPromotion,
  MeUser,
  Order,
  Payment,
  PriceSchedule,
  OrderWorksheet,
  Address,
  Subscription,
  OrderCalculateResponse,
} from 'ordercloud-javascript-sdk'

export type PaymentWithXp = Payment<PaymentXp, TransactionsXp>
export type PriceScheduleWithXp = PriceSchedule<PriceScheduleXp>
export type LineItemWithXp = LineItem<LineItemXp, ProductXp>
export type OrderPromotionWithXp = OrderPromotion<OrderPromotionXp>
export type BuyerProductWithXp = BuyerProduct<BuyerProductXP, PriceScheduleXp>
export type OrderWithXp = Order<OrderXp, UserXP>
export type MeUserWithXp = MeUser<UserXP>
export type AddressWithXp = Address<AddressXp>
export type SubscriptionWithXp = Subscription<SubscriptionXp>
export type OrderCalculateResponseWithXp = OrderCalculateResponse<
  OrderCalculateResponseXp,
  ProductXp
>
export type OrderWorksheetWithXP = OrderWorksheet<
  UserXP,
  AddressXp,
  OrderXp,
  ProductXp,
  VariantXP,
  AddressXp,
  AddressXp,
  LineItemXp,
  OrderPromotionXp,
  OrderCalculateResponseXp
>

export interface PickupInfo {
  StoreId: string
  FirstName: string
  LastName: string
  Email: string
  PhoneNumber: string
  IsMobile: boolean
  SelfPickup: boolean
  SpecialInstruction: string
}

export interface DeliveryAddress {
  ID?: string
  CompanyName?: string
  FirstName?: string
  LastName?: string
  Street1?: string
  Street2?: string
  City?: string
  State?: string
  Zip?: string
  Country?: string
  Phone?: string
  AddressName?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PaymentXp {
  //
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TransactionsXp {
  //
}

export interface OrderXp {
  OrderId?: string
  OrderStatus?: string
  AutoshipFrequency?: number
  IsSubscription?: boolean
  CardEndingIn?: string
  CardExpiry?: string
  CardType?: string
  CustomerType?: string
  FulfillmentId?: string
  FulfillmentInstructions?: string
  IsManualDelivery?: string
  DeliveryProvider?: string
  VerifyCustomerId?: string
  FraudChecked?: string
  DeliveryDueDate?: string
  DeliveryAddress?: DeliveryAddress
  ExpectedDeliveryDate?: string
  PickupDeliveryDate?: string
  PPC?: string
  OverAuth?: number
  RewardPoints?: number
  PickupInfo?: PickupInfo
  OrderToSOF?: boolean
  OrderToD365?: boolean
  Emails?: string[]
  EmailContent?: EmailContent
  DataAreaId?: string
  CouponCode?: string
  CouponDiscount?: number
  TimeZone?: string
  Status?: string
  ManhattenStatus?: string
  ManhattenEvent?: string
}

export interface EmailContent {
  ListPrice?: number
  SalePrice?: number
  CouponDiscount?: number
  AutoshipDiscount?: number
  TotalMemberSaving?: number
  Subtotal?: number
  Tax?: number
  Coupons?: {
    Coupon: string
    CouponCode: string
    CouponDiscount: string
    CouponType: number
  }[]
}
export interface OrderPromotionXp {
  EvaluationType?: string
  CategoryPromotion?: boolean
  IsPLU?: boolean
  OfferId?: string
  CompanyId?: string
  PeriodDiscountType?: number
  IsGlobalPromotion?: boolean
  OptOut?: string[]
}
export interface LineItemXp {
  TipAmount?: number
  TipIsRecurring?: boolean
  Autoship?: boolean
  DT?: number
  ListPrice?: number
  MemberPrice?: number
  Promotions?: {
    Pricing: boolean
    OfferId: string
    Discount: number
  }[]
}

export interface ProductXpImage {
  Name: string
  Position: number
  Url: string
}
export interface PromoTagXp {
  IgnoreDataAreaId?: boolean
  IgnorePriceGroup?: boolean
  DataAreaId?: string
  PriceGroup?: string
  Text: string
  OfferId?: string
  Priority?: number
}

export interface ProductXp {
  Autoship?: boolean
  FirstTimeAutoshipDiscount?: boolean
  ReccuringAutoshipDiscount?: boolean
  Brand?: string
  BrandedColor?: string | null
  Curbside?: boolean
  Delivery?: boolean
  Dimensions?: string | null
  Flavor?: string[] | null
  GenericColor?: string[] | null
  IngredientsComposition?: string | null
  InStore?: boolean
  Images?: ProductXpImage[]
  Video?: string
  LifeStage?: string[] | null
  MarketingFlavorName?: string | null
  RetailMeasure?: string
  RetailUnit?: string
  ParentFamilyName?: string
  ProductMaterial?: string[] | null
  ProductSize?: string | null
  ProductType?: string | null
  UPC?: string
  USMade?: boolean
  Bullets?: string[]
  Features?: string[]
  InventoryRecordID?: string
  ProductID?: string
  Quantity?: number
  OnSale?: boolean
  BVRating?: string | number
  BVReviews?: string | number
  Path?: string
  PromoTag?: PromoTagXp[]
  WE?: boolean | null //WebsiteExcluded
  VariationAttributes?: string[] | null
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VariantXP {}

export interface BuyerProductXP extends ProductXp {
  PriceSchedule?: PriceSchedule
}

export interface PriceScheduleXp {
  ListPrice?: number
  PPCPrice?: number
  IMapPrice?: number
}

export interface UserXP {
  AdyenShopperReference?: string
  ReceivedFirstTimeAutoshipDiscount?: boolean
  LoyaltyAccepted?: boolean
  LoyaltyAcceptedOn?: string
  UnityId?: string
  HomeNumber?: string
  DeliveryInstruction?: string
  PickupInstruction?: string
  HomePhone?: string
  IsMobile?: boolean
  CartUser?: boolean
  Pets?: Record<string, string[]>
  pets?: Record<string, string[]>
  FirstLogin?: boolean
  PPC?: string
  WebId?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AddressXp {}

export interface SubscriptionXp {
  OriginalOrderId?: string
  Site?: string
  DeliveryAddress?: AddressWithXp
  Fulfillment?: string
  CardEndingIn?: string
  CardExpiry?: string
  CardType?: string
  CustomerType?: string
  PPC?: string
  Email?: string
  ExpectedDeliveryDate?: string
  AdjustmentDate?: string
  CancellationReason?: string
}

export interface OrderCalculateResponseXp {
  TaxDetails?: TaxDetails
}
export interface TaxDetails {
  OrderID?: string
  TotalTax?: number
  LineItems?: LineItems[]
}
export interface LineItems {
  LineItemID?: string
  LineItemTotalTax?: number
}
