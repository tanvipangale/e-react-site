import { createContext, useContext, useState, useEffect } from 'react'

const StoreContext = createContext()

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  
  // Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  // Load data from localStorage on startup
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  // Save data whenever cart or wishlist changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId))
  }

// Inside src/context/StoreContext.jsx
const cartTotal = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
)

// This counts total items in the basket to display in the red Navbar circle bubble
const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

return (
  <StoreContext.Provider
    value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      cartTotal,
      cartCount, // Makes it accessible by your header
    }}
  >
    {children}
  </StoreContext.Provider>
)
}

export const useStore = () => useContext(StoreContext)