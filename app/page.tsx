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
import HeroSection from '@/components/HeroSection';
import { Product } from '@/lib/types';

export default function HomePage() {
  const { items: products, setProducts } = useProductsStore()

  useEffect(() => {
    setProducts(productsData.products as Product[])
  }, [setProducts])

  const featuredProducts = products.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection/>

      {/* Company Values */}
      <section className="bg-white pt-[200px] min-h-[80vh]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
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