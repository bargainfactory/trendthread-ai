"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    isOpen,
    setIsOpen,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-surface border-l border-surface-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-surface-border">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white">Your Cart</h2>
                <span className="px-2 py-0.5 rounded-full bg-neon-purple/20 text-neon-purple text-sm font-semibold">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <span className="text-5xl block mb-4">🛒</span>
                  <p className="text-gray-400 text-lg mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-gray-500 text-sm">
                    Start adding some fire designs!
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="flex gap-4 p-4 rounded-xl bg-surface-light border border-surface-border"
                  >
                    {/* Product thumbnail */}
                    <div
                      className={`w-16 h-16 rounded-lg bg-gradient-to-br ${item.product.gradient} flex items-center justify-center text-2xl shrink-0`}
                    >
                      {item.product.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        by {item.product.creator}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="w-6 h-6 rounded-full bg-surface border border-surface-border text-white text-sm flex items-center justify-center hover:border-neon-purple transition-colors"
                          >
                            -
                          </button>
                          <span className="text-sm text-white w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="w-6 h-6 rounded-full bg-surface border border-surface-border text-white text-sm flex items-center justify-center hover:border-neon-purple transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-neon-purple">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors self-start"
                      aria-label="Remove item"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-surface-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-xl font-bold text-white">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Shipping calculated at checkout
                </p>
                {/* Shopify Buy Button integration point */}
                {/* data-shopify-buy-button data-shop="trendthread-ai.myshopify.com" */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
                >
                  Checkout
                </motion.button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
