import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const StoreContext = createContext()

const getUserFromStorage = () => localStorage.getItem('loggedInUser')
const getCartKeyForUser = (username) => (username ? `cart:${username}` : 'cart:guest')
const getWishlistKeyForUser = (username) => (username ? `wishlist:${username}` : 'wishlist:guest')

export function StoreProvider({ children }) {
  const [user, setUser] = useState(getUserFromStorage() || null)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  
  // Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  // Load user-specific data from localStorage on startup / user change
  useEffect(() => {
    const cartKey = getCartKeyForUser(user)
    const wishlistKey = getWishlistKeyForUser(user)

    // Avoid parsing/setting state synchronously in the effect body
    // by scheduling it for the next microtask.
    Promise.resolve().then(() => {
      const savedCart = localStorage.getItem(cartKey)
      const savedWishlist = localStorage.getItem(wishlistKey)

      setCart(savedCart ? JSON.parse(savedCart) : [])
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : [])
    })
  }, [user])


  // Save data whenever cart or wishlist changes (user-scoped)
  useEffect(() => {
    const cartKey = getCartKeyForUser(user)
    localStorage.setItem(cartKey, JSON.stringify(cart))
  }, [cart, user])

  useEffect(() => {
    const wishlistKey = getWishlistKeyForUser(user)
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist))
  }, [wishlist, user])

  const login = useCallback((username) => {
    const nextUser = username || null
    if (nextUser) {
      localStorage.setItem('loggedInUser', nextUser)
      setUser(nextUser)
    } else {
      localStorage.removeItem('loggedInUser')
      setUser(null)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('loggedInUser')
    setUser(null)
    setCart([])
    setWishlist([])
  }, [])


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

  // Derived values
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // This counts total items in the basket to display in the red Navbar circle bubble
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <StoreContext.Provider
      value={{
        user,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        cartTotal,
        cartCount, // Makes it accessible by your header
        login,
        logout,
      }}

  >
    {children}
  </StoreContext.Provider>
)
}

export const useStore = () => useContext(StoreContext)


