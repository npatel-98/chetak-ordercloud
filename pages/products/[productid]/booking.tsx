// pages/products/[productId]/booking.js
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { User, Phone, MapPin, Store, Calendar } from 'lucide-react'
import useOcProductDetail from '../../../ordercloud/hooks/useOcProductDetail'
import ImageHelper from '../../../helper/Image'
import useOcCart from '../../../ordercloud/redux/useOcCart'
import { useState } from 'react'
import Link from 'next/link'

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  location: Yup.string().required('Location is required'),
  dealer: Yup.string().required('Please select a dealer'),
  buyingPlan: Yup.string().required('Please select when you plan to buy'),
})

export default function ProductBookingPage() {
  const router = useRouter()
  const { productid } = router.query
  const { product } = useOcProductDetail(productid as string)
  const [isBooked, setIsBooked]=useState(false)
  const { addToCart }= useOcCart()
  

//   console.log('@@productId', productid)

  // Mock data - replace with your actual data
  const dealers = [
    'Authorized Dealer 1',
    'Authorized Dealer 2',
    'Authorized Dealer 3',
    'Authorized Dealer 4',
  ]

  const buyingOptions = ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Just exploring']

 

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Form submitted:', values)
     await addToCart({productId:product?.ID,quantity:1})
      setIsBooked(true)
    //   console.log("@@res",res)

      // Simulate API call

    //   router.push(`/products/${productid}`)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if ( !product) return null

  return (
    <div className="inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 z-50 h-screen">
      <div className="bg-white rounded-xl w-full container mx-auto overflow-y-auto">
        {/* Header */}
        <div className="p-4 lg:p-8 border-b relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">Enquire Now</h2>
              <p className="text-gray-600 text-sm lg:text-base">
                Fill in the data to get a callback
              </p>
            </div>

            {/* Product Info */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg lg:w-1/2">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <ImageHelper
                  url={product?.xp?.Images?.[0]?.Url}
                  className="w-32 "
                  pictureClasses="w-32 "
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-base lg:text-lg">{product.Name}</h3>
                <p className="text-sm text-gray-500">Book today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-4 lg:p-8">
          <Formik
            initialValues={{
              name: '',
              mobile: '',
              location: '',
              dealer: '',
              buyingPlan: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  {/* Name Field */}
                  <div>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <User size={20} />
                      </div>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Name *"
                        className="w-full pl-10 h-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs mt-1 ml-1"
                    />
                  </div>

                  {/* Mobile Field */}
                  <div>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Phone size={20} />
                      </div>
                      <Field
                        name="mobile"
                        type="tel"
                        placeholder="Mobile Number *"
                        className="w-full pl-10 h-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      />
                    </div>
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-500 text-xs mt-1 ml-1"
                    />
                  </div>

                  {/* Location Field */}
                  <div>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <MapPin size={20} />
                      </div>
                      <Field
                        name="location"
                        type="text"
                        placeholder="Location *"
                        className="w-full pl-10 h-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      />
                    </div>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="text-red-500 text-xs mt-1 ml-1"
                    />
                  </div>

                  {/* Dealer Dropdown */}
                  <div>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Store size={20} />
                      </div>
                      <Field
                        as="select"
                        name="dealer"
                        className="w-full pl-10 h-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-base"
                      >
                        <option value="">Select Dealer *</option>
                        {dealers.map((dealer, index) => (
                          <option key={index} value={dealer}>
                            {dealer}
                          </option>
                        ))}
                      </Field>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    <ErrorMessage
                      name="dealer"
                      component="div"
                      className="text-red-500 text-xs mt-1 ml-1"
                    />
                  </div>

                  {/* Buying Plan Dropdown */}
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Calendar size={20} />
                      </div>
                      <Field
                        as="select"
                        name="buyingPlan"
                        className="w-full pl-10 h-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-base"
                      >
                        <option value="">When do you plan to buy? *</option>
                        {buyingOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    <ErrorMessage
                      name="buyingPlan"
                      component="div"
                      className="text-red-500 text-xs mt-1 ml-1"
                    />
                  </div>
                </div>

                <div className="flex items-center mt-6 gap-10">
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isBooked}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-[#93c5fd] text-white font-semibold h-12 rounded-lg transition-colors duration-200  text-base"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Now'}
                  </button>
                  {isBooked &&
                  <Link
                    type="submit"
                    href={'/checkout'}
                    className="w-full h-12  px-4 bg-[#2563eb] flex justify-center items-center text-white rounded-lg hover:bg-[#1d4ed8] transition text-white font-semibold text-base"
                  >
                    Checkout Now
                  </Link>
                }
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
