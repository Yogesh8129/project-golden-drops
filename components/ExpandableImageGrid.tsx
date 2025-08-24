"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "SUNFLOWER OIL",
    subtitle: "Pure & Natural",
    image: "/sunflower.png",
    description: "Contains polyunsaturated fatty acids and essential vitamins A, D, E & K for optimal health.",
    color: "from-yellow-400/80 to-orange-500/80",
  },
  {
    id: 2,
    name: "HAZELNUT OIL",
    subtitle: "Premium Quality",
    image: "/hazelnut.png",
    description: "Higher percentage of oleic acid with superior burning temperature for all cooking needs.",
    color: "from-green-400/80 to-emerald-600/80",
  },
  {
    id: 3,
    name: "WALNUT OIL",
    subtitle: "Heart Healthy",
    image: "/walnut.png",
    description: "Light and savory oil, rich in Omega-3 (ALA) and natural antioxidants for heart health.",
    color: "from-green-500/80 to-green-700/80",
  },
  {
    id: 4,
    name: "SAFFLOWER OIL",
    subtitle: "Cold Pressed",
    image: "/safflower.png",
    description: "High vitamin E content with ideal temperature resistance for frying and cooking.",
    color: "from-yellow-500/80 to-orange-600/80",
  },
];

export function ExpandableImageGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-between min-h-screen bg-white p-4 mr-24 ml-24 gap-11">
      <h1 className="text-5xl lg:text-9xl text-center font-light text-gray-600 leading-tight font-display">
        <p className="mb-0 p-0">Overwhelmed</p>
        <p>
          <span className="text-4xl leading-tight text-cotanak-dark">HEALTH</span>
          <br />
        </p>
        <p className="text-cotanak-dark">Benifits</p>
      </h1>
      <div className="flex gap-2 h-[90vh] max-w-[50vw] min-w-[50vw]">
        {products.map((product, index) => {
          const isHovered = hoveredIndex === index;
          const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

          return (
            <motion.div
              key={product.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ flex: 1 }}
              animate={{
                flex: isHovered ? 3 : 0.5,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Dark overlay */}
              <motion.div
                className="absolute inset-0 bg-black/40"
                animate={{
                  opacity: isHovered ? 0.2 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Gradient overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-0`}
                animate={{
                  opacity: isHovered ? 0.4 : 0,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 100,
                  }}
                  transition={{ duration: 0.3, delay: isHovered ? 0.3 : 0 }}
                >
                  <motion.h2
                    className="text-white font-bold text-xl md:text-2xl mb-2 tracking-wider"
                    transition={{ duration: 0.3 }}
                  >
                    {product.name}
                  </motion.h2>

                  <motion.div
                    className="w-12 h-1 bg-white rounded-full mb-2"
                    animate={{
                      width: isHovered ? 70 : 48,
                      opacity: isHovered ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.1 }}
                  />

                  <motion.p
                    className="text-white/90 text-sm mb-1"
                    animate={{
                      opacity: isHovered ? 1 : 0.8,
                    }}
                  >
                    {product.subtitle}
                  </motion.p>
                </motion.div>
              </div>

              {/* Side label for compressed state */}
              <motion.div
                className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center"
                animate={{
                  opacity: isOtherHovered ? 1 : 0,
                  scale: isOtherHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-bold text-lg tracking-widest whitespace-nowrap">{product.name}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
