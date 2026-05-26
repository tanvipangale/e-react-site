import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

const StoreContext = createContext()

const getUser = () =>
  localStorage.getItem('loggedInUser')

const getCartKey = (user) =>
  `cart:${user || 'guest'}`

const getWishlistKey = (user) =>
  `wishlist:${user || 'guest'}`

export function StoreProvider({
  children
}) {

  const [user, setUser] =
    useState(getUser())

  const [cart, setCart] =
    useState([])

  const [wishlist, setWishlist] =
    useState([])

  // LOAD USER DATA
  useEffect(() => {

    const savedCart =
      localStorage.getItem(
        getCartKey(user)
      )

    const savedWishlist =
      localStorage.getItem(
        getWishlistKey(user)
      )

    setCart(
      savedCart
        ? JSON.parse(savedCart)
        : []
    )

    setWishlist(
      savedWishlist
        ? JSON.parse(savedWishlist)
        : []
    )

  }, [user])

  // SAVE CART
  useEffect(() => {
    localStorage.setItem(
      getCartKey(user),
      JSON.stringify(cart)
    )
  }, [cart, user])

  // SAVE WISHLIST
  useEffect(() => {
    localStorage.setItem(
      getWishlistKey(user),
      JSON.stringify(wishlist)
    )
  }, [wishlist, user])

  // LOGIN
  const login = (username) => {
    localStorage.setItem(
      'loggedInUser',
      username
    )

    setUser(username)
  }

  // LOGOUT
  const logout = () => {
    localStorage.removeItem(
      'loggedInUser'
    )

    setUser(null)
    setCart([])
    setWishlist([])
  }

  // ADD TO CART
  const addToCart = (product) => {

    setCart((prev) => {

      const exists =
        prev.find(
          (item) =>
            item.id === product.id
        )

      if (exists) {

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
        )
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1
        }
      ]
    })
  }

  // REMOVE CART
  const removeFromCart = (
    id
  ) => {

    setCart((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    )
  }

  // WISHLIST
  const toggleWishlist = (
    product
  ) => {

    setWishlist((prev) => {

      const exists =
        prev.find(
          (item) =>
            item.id === product.id
        )

      return exists
        ? prev.filter(
            (item) =>
              item.id !== product.id
          )
        : [...prev, product]
    })
  }

  // TOTALS
  const cartCount =
    cart.reduce(
      (a, b) =>
        a + b.quantity,
      0
    )

  const cartTotal =
    cart.reduce(
      (a, b) =>
        a +
        b.quantity *
          Number(b.price),
      0
    )

  return (
    <StoreContext.Provider
      value={{
        user,
        cart,
        wishlist,

        login,
        logout,

        addToCart,
        removeFromCart,

        toggleWishlist,

        cartCount,
        cartTotal
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () =>
  useContext(StoreContext)