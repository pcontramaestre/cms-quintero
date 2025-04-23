import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Quintero & Associates</h3>
            <p className="mt-4 text-sm text-gray-300">
              Professional accounting, tax, and business services tailored to your needs.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/services/bussines" className="hover:text-white">
                  Business Services
                </Link>
              </li>
              <li>
                <Link href="/services/taxes" className="hover:text-white">
                  Tax Services
                </Link>
              </li>
              <li>
                <Link href="/services/accounting" className="hover:text-white">
                  Accounting
                </Link>
              </li>
              <li>
                <Link href="/services/compliance" className="hover:text-white">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="/services/getitin" className="hover:text-white">
                  Get It In
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <address className="mt-4 not-italic text-sm text-gray-300">
              <p>123 Main Street</p>
              <p>Suite 100</p>
              <p>Miami, FL 33101</p>
              <p className="mt-4">
                <a href="tel:+1-305-555-0123" className="hover:text-white">
                  (305) 555-0123
                </a>
              </p>
              <p>
                <a href="mailto:info@quinteroandassociates.com" className="hover:text-white">
                  info@quinteroandassociates.com
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Quintero & Associates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
