import Head from 'next/head'
import { ReactNode, useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import ImageHelper from '../helper/Image'
import { Poppins } from '@next/font/google'
import Breadcrumb from './Breadcrumb'
import { ShoppingCart, X } from 'lucide-react'
import useOcCart from '../ordercloud/redux/useOcCart'
import { useRouter } from 'next/router'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700', '800', '900'],
})

interface LayoutProps {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
   const router = useRouter()
  // const [cartItems] = useState([
  //   { id: 1, name: 'Product 1', price: 1000, quantity: 1 },
  //   { id: 2, name: 'Product 2', price: 2000, quantity: 2 },
  // ])

  const {getProductLineItems } = useOcCart()
  const cartItems = getProductLineItems();

  // console.log('@@cartItems', cartItems)

  const cartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 150
      const scrollPosition = window.scrollY
      setIsSticky(scrollPosition > headerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const cartItemCount = cartItems?.length || 0
  const cartTotal = cartItems?.reduce((total, item) => total + (item.UnitPrice * item.Quantity), 0) || 0

  const handleCheckout = () => {
    // Add your checkout logic here
   router?.push('/checkout')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <Head>
        <title>{'BAJAJ Auto'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={poppins.className}>
        <div className="relative" id="header">
          <header
            className={`header w-full z-50 transition-all duration-300 ${
              isSticky
                ? 'fixed top-0 left-0 right-0 py-3 bg-[#23284a] shadow-lg'
                : 'py-3 bg-[#23284a]'
            }`}
          >
            <div className="header__wrapper flex items-center justify-between px-8">
              <div className="flex items-center gap-12">
                <Link href="/">
                  <div className="cursor-pointer">
                    <ImageHelper
                      key={'headerLogo'}
                      url="https://cdn.bajajauto.com/-/media/assets/bajajauto/global/bajaj-logo2.png"
                    />
                  </div>
                </Link>
                {/* Desktop Navigation */}
                <nav className="hidden lg:block">
                  <ul className="flex gap-10 items-center text-white">
                    <li>
                      <Link href="/products" className="!text-white text-sm  hover:underline">
                        Motorcycles
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/three-wheelers"
                        className="!text-white text-sm  hover:underline"
                      >
                        3 Wheelers & Qute
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shareholders"
                        className="!text-white text-sm  hover:underline"
                      >
                        Shareholders
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* Desktop Buttons */}
              <div className="hidden lg:flex gap-4 items-center">
                <div className="relative" ref={cartRef}>
                  <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="relative p-2 text-white hover:bg-white/10 rounded-full transition"
                  >
                    <ShoppingCart size={24} />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Cart Dropdown */}
                  {isCartOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-800">Shopping Cart</h3>
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={20} />
                          </button>
                        </div>
                        
                        {cartItems.length > 0 ? (
                          <>
                            <div className="max-h-60 overflow-y-auto">
                              {cartItems.map((item) => (
                                <div key={item.ID} className="flex items-center gap-3 py-3 border-b">
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-800">{item.Product?.Name}</h4>
                                    <p className="text-sm text-gray-600">Qty: {item.Quantity}</p>
                                  </div>
                                  <p className="text-sm font-medium text-gray-800">₹{item.UnitPrice}</p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 pt-4 border-t">
                              <div className="flex justify-between mb-4">
                                <span className="font-medium text-gray-800">Total:</span>
                                <span className="font-bold text-gray-800">₹{cartTotal}</span>
                              </div>
                              <button
                                onClick={handleCheckout}
                                className="w-full py-2 px-4 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition"
                              >
                                Checkout
                              </button>
                            </div>
                          </>
                        ) : (
                          <p className="text-center text-gray-500 py-4">Your cart is empty</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="py-2 px-6 rounded-3xl text-white bg-[#2563eb]  hover:bg-[#1d4ed8] transition"
                >
                  Enquire Now
                </button>
                <button
                  type="button"
                  className="py-2 px-6 rounded-3xl text-white border border-white  hover:bg-white hover:text-[#23284a] transition"
                >
                  Visit E-showroom
                </button>
              </div>
              {/* Mobile Menu Button */}

              <button
                onClick={toggleMenu}
                className="lg:hidden text-white text-2xl rotate-90"
                aria-label="Toggle menu"
                key={isMenuOpen ? 'close' : 'open'}
              >
                |||
              </button>
            </div>
          </header>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 bg-[#23284a] z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } lg:hidden`}
          >
            <div className="relative h-full">
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-white text-2xl"
                aria-label="Close menu"
              >
                X
              </button>
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                <nav className="w-full">
                  <ul className="flex flex-col items-center space-y-6 text-white">
                    <li>
                      <Link
                        href="/products"
                        className="!text-white text-xl font-semibold hover:underline"
                        onClick={toggleMenu}
                      >
                        Motorcycles
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/three-wheelers"
                        className="!text-white text-xl font-semibold hover:underline"
                        onClick={toggleMenu}
                      >
                        3 Wheelers & Qute
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shareholders"
                        className="!text-white text-xl font-semibold hover:underline"
                        onClick={toggleMenu}
                      >
                        Shareholders
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="flex flex-col gap-4 items-center">
                  {/* Mobile Cart */}
                  <div className="w-full px-4">
                    <button
                      onClick={() => setIsCartOpen(!isCartOpen)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-6 rounded-3xl text-white border border-white hover:bg-white hover:text-[#23284a] transition"
                    >
                      <ShoppingCart size={20} />
                      <span>Cart ({cartItemCount})</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="py-2 px-6 rounded-3xl text-white bg-[#2563eb] font-semibold hover:bg-[#1d4ed8] transition"
                    onClick={toggleMenu}
                  >
                    Enquire Now
                  </button>
                  <button
                    type="button"
                    className="py-2 px-6 rounded-3xl text-white border border-white font-semibold hover:bg-white hover:text-[#23284a] transition"
                    onClick={toggleMenu}
                  >
                    Visit E-showroom
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Cart Dropdown */}
          {isCartOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Shopping Cart</h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {cartItems.length > 0 ? (
                  <>
                    <div className="max-h-[50vh] overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.ID} className="flex items-center gap-3 py-3 border-b">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-800">{item.Product?.Name}</h4>
                            <p className="text-sm text-gray-600">Qty: {item.Quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-800">₹{item.UnitPrice}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium text-gray-800">Total:</span>
                        <span className="font-bold text-gray-800">₹{cartTotal}</span>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="w-full py-3 px-4 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition font-semibold"
                      >
                        Checkout
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-500 py-4">Your cart is empty</p>
                )}
              </div>
            </div>
          )}
        </div>
        {/* <div className="h-[72px]"></div> */}
        <Breadcrumb />
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
