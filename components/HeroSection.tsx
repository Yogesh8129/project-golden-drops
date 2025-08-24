"use client";

import { BRAND_NAME } from "@/constants/static";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const { scrollYProgress } = useScroll()
  const rotate_1 = useTransform(scrollYProgress, [0, 0.2], [-20, 0]); // positive x value
  const rotate_3 = useTransform(scrollYProgress, [0, 0.2], [20, 0]); // positive x value
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-cotanak-green-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cotanak-green-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-cream-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cotanak-green-300 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-8 py-12 relative z-10">
        <div className="flex flex-col gap-12 items-center justify-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
              <h1 className="text-5xl lg:text-8xl text-center font-light text-cotanak-green-800 leading-tight font-display">
                Premium Natural 
                <span className="font-semibold">&nbsp;Oils Collection</span>
                <br />
                by {BRAND_NAME}
              </h1>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(22, 163, 74, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-cotanak-green-700 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-cotanak-green-800 transition-all duration-300"
              >
                Shop Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-cotanak-green-700 text-cotanak-green-700 px-8 py-4 rounded-full text-sm font-medium hover:bg-cotanak-green-50 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>

          </div>

          {/* Product Images */}
          <div className="relative">
            {/* Main Product Images */}
            <div className="relative flex justify-center items-center w-[35vw]">
              {/* Hazelnut Oil */}
              <motion.div
                initial={{ x: 100, y: 200, opacity: 0, rotate: -15 }}
                animate={{ x: 0, y:150, opacity: 1, rotate: -20 }}
                transition={{ duration: 0.6, delay: 0 }}
                whileHover={{ scale: 1.05, rotate: 0, z: 10, y: 90 }}
                className="absolute -left-8 top-8 z-20"
                style={{ rotate: rotate_1}}
              >
                <img src="/Hazelnut_1L.png" alt="Hazelnut Oil" width={200} height={320} className="drop-shadow-2xl" />
              </motion.div>

              {/* Safflower Oil - Center */}
              <motion.div
                initial={{ y: 150, opacity: 0, scale: 0.8 }}
                animate={{ y: 70, opacity: 1, scale: 1.3, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0 }}
                whileHover={{ scale: 1.08 }}
                className="z-30"
              >
                <img src="/SaffelFlower_1L_tin.png" alt="Safflower Oil" width={200} height={350} className="drop-shadow-2xl" />
              </motion.div>

              {/* Walnut Oil */}
              <motion.div
                initial={{ x: -100, y: 200, opacity: 0, rotate: 15 }}
                animate={{ x: 0, y: 133, opacity: 1, rotate: 20 }}
                transition={{ duration: 0.6, delay: 0 }}
                whileHover={{ scale: 1.05, rotate: 0, z: 10 }}
                style={{ rotate: rotate_3}}
                className="absolute -right-8 top-12 z-20"
              >
                <img src="/Walnut_1L.png" alt="Walnut Oil" width={200} height={320} className="drop-shadow-2xl" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-cotanak-green-400 rounded-full opacity-60"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-1/3 w-3 h-3 bg-cream-400 rounded-full opacity-40"
      />
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-cotanak-green-300 rounded-full opacity-50"
      />
    </div>
  );
};

export default HeroSection;
