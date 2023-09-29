const getPopularProducts = async () => {
  const popularProductsContainer = document.getElementById('popular-products')
  const popularProductsSkeletons = document.getElementById(
    'popular-products-skeletons'
  )
  if (!popularProductsContainer) return
  try {
    // Fetch all products
    const products = await get()
    // Hide skeletons
    popularProductsSkeletons.style.display = 'none'

    // Get only four popular products
    const popularProducts = products.slice(0, 4)

    // Render popular products
    popularProducts.forEach((product) => {
      const productElement = singleProduct(product)
      popularProductsContainer.appendChild(productElement)
    })
  } catch (error) {
    console.error('Error fetching or rendering products:', error)
    // Handle error appropriately
    popularProductsSkeletons.style.display = 'none'
    popularProductsContainer.append(noProductsFound())
  }
}

const getAllProducts = async () => {
  const allProductsContainer = document.getElementById('allProducts')
  const allProductsSkeletons = document.getElementById('allProductsSkeletons')
  const genderElement = document.getElementById('gender')
  const sizesElement = document.getElementById('sizes')
  const searchElement = document.getElementById('search')

  if (!allProductsContainer) return

  try {
    // Fetch all products
    const products = await get()

    // Hide skeletons
    allProductsSkeletons.style.display = 'none'

    // Retrieve query parameters
    const searchParams = new URLSearchParams(window.location.search)
    const gender = searchParams.get('gender')
    const sizes = searchParams.get('sizes')
    const search = searchParams.get('search')

    let filteredProducts = products

    // Filter products by sizes
    if (sizes) {
      sizesElement.value = sizes
      filteredProducts = products.filter((product) =>
        product.sizes.includes(sizes)
      )
    }
    // Filter products by gender
    if (gender) {
      genderElement.value = gender
      filteredProducts = products.filter(
        (product) => product.gender.toLowerCase() === gender.toLowerCase()
      )
    }

    //filter by search word
    if (search) {
      searchElement.value = search
      filteredProducts = products.filter((product) =>
        searchLikeSQL(search, product.title)
      )
    }

    // Render products
    if (filteredProducts.length === 0) {
      return allProductsContainer.append(noProductsFound())
    }

    filteredProducts.forEach((product) => {
      const productElement = singleProduct(product)
      allProductsContainer.appendChild(productElement)
    })
  } catch (error) {
    console.error('Error fetching or rendering products:', error)
    // Handle error appropriately
    allProductsSkeletons.style.display = 'none'
    allProductsContainer.append(noProductsFound())
  }
}

const showSlideShow = async () => {
  const popularProductsContainer = document.getElementById('productSlide')
  const popularProductsSkeletons = document.getElementById(
    'productImageSlideShow'
  )
  if (!popularProductsContainer) return
  try {
    // Fetch all products
    const products = await get()
    // Hide skeletons
    popularProductsSkeletons.style.display = 'none'

    // Get only four slide products
    const slideProducts = products.reverse().slice(0, 3)

    // Render slide products
    slideProducts.forEach((product) => {
      const productElement = slideShowProductImage(product)
      popularProductsContainer.appendChild(productElement)
    })
  } catch (error) {
    console.error('Error fetching or rendering products:', error)
    // Handle error appropriately
    popularProductsSkeletons.style.display = 'none'
    popularProductsContainer.append(noProductsFound())
  }
}

const renderCheckOutProducts = async () => {
  //get rendering area
  const checkOutContainer = document.getElementById('checkOutItems')
  //get ckeckout skeletons
  const checkOutSkeletons = document.getElementById('checkoutSkeletons')
  //if checout container is not found, exit
  if (!checkOutContainer) return

  try {
    // Fetch all products
    const products = await get()
    checkOutSkeletons.style.display = 'none'
    //fetch checkout items
    const checkOutProducts = getCheckOutItems()

    if (!checkOutProducts.length)
      return checkOutContainer.appendChild(showNoCheckOutProducts())

    //update the checkout total
    updateCheckoutTotal()

    //iterate all checkout products and filter them out from the list of all products

    checkOutProducts.forEach((checkoutProduct) => {
      const found = products.find(
        (product) => product.id === checkoutProduct['id']
      )

      if (found) {
        checkOutContainer.appendChild(
          createCheckoutElement(found, checkoutProduct['total'])
        )
      }
    })
  } catch (error) {
    checkOutContainer.appendChild(showNoCheckOutProducts())
  }
}
documentReady(function () {
  //update cart
  updateCartBadge()
  getPopularProducts()
  getAllProducts()
  showSlideShow()
  renderCheckOutProducts()
})
