'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Leaf, Award, Heart } from 'lucide-react'
import { useProductsStore } from '@/lib/stores'
import ProductCard from '@/components/molecules/ProductCard'
import Button from '@/components/atoms/Button'
import productsData from '@/data/products.json'
import companyData from '@/data/company.json'

export default function HomePage() {
  const { items: products, setProducts } = useProductsStore()

  useEffect(() => {
    setProducts(productsData.products)
  }, [setProducts])

  const featuredProducts = products.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
        <div className="container-custom py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="heading-xl mb-6">
                Pure <span className="text-gradient">Golden Drops</span> of Nature
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {companyData.about.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg">
                    Explore Products
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="secondary" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-cotanak-light to-cotanak-green rounded-full blur-3xl opacity-20 animate-pulse-slow" />
                <div className="relative bg-white rounded-3xl shadow-2xl p-12 flex items-center justify-center">
                  <span className="text-9xl animate-float">🌻</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cotanak-light rounded-full blur-2xl opacity-30 animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-cotanak-green rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      </section>

      {/* Company Values */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Why Choose <span className="text-gradient">Golden Drops</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {companyData.about.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Premium Quality', description: 'Carefully selected and processed oils meeting highest standards' },
              { icon: Leaf, title: '100% Natural', description: 'Pure, natural oils without any artificial additives' },
              { icon: Award, title: 'Certified Excellence', description: 'ISO certified production ensuring consistent quality' },
              { icon: Heart, title: 'Health Focused', description: 'Rich in nutrients for your family\'s wellbeing' }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cotanak-light to-cotanak-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Featured <span className="text-gradient">Products</span></h2>
            <p className="text-lg text-gray-600">Discover our premium selection of edible oils</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products">
              <Button size="lg">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cotanak-green to-cotanak-light">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg text-white mb-4">
              Ready to Experience Premium Quality?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Golden Drops for their daily cooking needs.
            </p>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}