import { useRouter } from 'next/router'
import Link from 'next/link'
import { Poppins } from '@next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const Breadcrumb = () => {
  const router = useRouter()
  const pathSegments = router.asPath.split('/').filter((segment) => segment)
  const isBookingPage = router.asPath.includes('/booking')

  // Don't show breadcrumb on home page
  if (pathSegments.length === 0) return null

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
    const label = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return {
      href,
      label,
      isLast: index === pathSegments.length - 1,
    }
  })

  return (
    <div className={`${poppins.className} bg-gray-50 py-3 ${isBookingPage ? 'hidden md:block' : ''}`}>
      <div className="container mx-auto px-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-[#23284a] transition-colors">
                Home
              </Link>
            </li>
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.href} className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                {breadcrumb.isLast ? (
                  <span className="text-[#23284a] font-medium">{breadcrumb.label}</span>
                ) : (
                  <Link
                    href={breadcrumb.href}
                    className="text-gray-500 hover:text-[#23284a] transition-colors"
                  >
                    {breadcrumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default Breadcrumb
