import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import companyData from '@/data/company.json'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient">Golden Drops</h3>
            <p className="text-gray-600 text-sm">
              {companyData.about.subtitle}
            </p>
            <div className="flex space-x-4">
              {companyData.socialMedia?.facebook && (
                <a 
                  href={companyData.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cotanak-green transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {companyData.socialMedia?.instagram && (
                <a 
                  href={companyData.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cotanak-green transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {companyData.socialMedia?.twitter && (
                <a 
                  href={companyData.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cotanak-green transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {companyData.socialMedia?.linkedin && (
                <a 
                  href={companyData.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cotanak-green transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-cotanak-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-cotanak-green transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-cotanak-green transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-cotanak-green transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Our Products</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Sunflower Oil</li>
              <li className="text-gray-600">Safflower Oil</li>
              <li className="text-gray-600">Hazelnut Oil</li>
              <li className="text-gray-600">Walnut Oil</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  {companyData.contact.address.line1}<br />
                  {companyData.contact.address.line2 && <>{companyData.contact.address.line2}<br /></>}
                  {companyData.contact.address.city}, {companyData.contact.address.postal}
                </span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{companyData.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{companyData.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} Cotanak. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-cotanak-green transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-cotanak-green transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer