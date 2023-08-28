//Function for adding an item into a cart
function addToCart(id) {
  //get all products from the storage : Array
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
  if (!cartProducts) {
    //if cartProducts key doesn't exist in storage, add our first product
    const products = [id]
    localStorage.setItem('cartProducts', JSON.stringify(products))
    return
  }
  // if cart products key exists
  //check to see if the product already exists
  const check = cartProducts.includes(id)
  //if product is already in cart quit.
  if (check) return

  //add product to cart
  cartProducts.push(id)
  //save to local storage
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
}

//Function for removing item from a cart
function removeFromCart(id) {
  //get all products from the storage : Array
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
  if (!cartProducts) {
    //if cartProducts key doesn't exist in storage,  quit
    return
  }
  // if cart products key exists
  //check to see if the product already exists
  const check = cartProducts.includes(id)
  //if product is not already in cart quit.
  if (!check) return

  //remove product to cart
  const newProducts = cartProducts.filter(
    (cartProductId) => cartProductId !== id
  )
  //update storage
  localStorage.setItem('cartProducts', JSON.stringify(newProducts))
}

//function for getting cart items in storage
function countItemsInCart() {
  //get all products from the storage : Array
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'))

  if (!cartProducts) {
    //if cartProducts key doesn't exist in storage,  quit
    return 0
  }

  return cartProducts.length >= 10 ? '10+' : cartProducts.length
}

//get checkout items
function getCheckOutItems() {
  //get all products from the storage : Array
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'))

  return !cartProducts ? [] : cartProducts
}

//function to update cart badge
function updateCartBadge() {
  //get cart badge
  const cartBadges = document.getElementsByClassName('cart-badge')
  //if no cart badge found
  if (!cartBadges.length) return
  //loop since we have two badges mobile and larger screens
  for (const badge of cartBadges) {
    badge.textContent = countItemsInCart()
  }
}

function singleProduct(product) {
  // Create the outermost container div with classes "col-12 col-sm-6 col-md-6 col-lg-3 p-5"
  const schema = document.createElement('div')
  schema.classList.add('col-12', 'col-sm-6', 'col-md-6', 'col-lg-3', 'p-5')

  // Create a clickable link for the product
  const productLink = document.createElement('a')
  productLink.classList.add('product-link')
  productLink.href = `jacket.html?id=${product.id}` // Assuming the URL structure

  // Create the inner row div
  const innerRowDiv = document.createElement('div')
  innerRowDiv.classList.add('row')

  // Create the image column
  const imageColumn = document.createElement('div')
  imageColumn.classList.add(
    'col-12',
    'pb-2',
    'd-flex',
    'justify-content-center'
  )
  const image = document.createElement('img')
  image.src = product.image
  image.alt = product.title

  image.classList.add('img-fluid', 'img-same-195')
  imageColumn.appendChild(image)

  // Create the details column
  const productTitleColumn = document.createElement('div')
  const productTitle = document.createElement('p')
  productTitle.classList.add('p-0', 'm-0')
  productTitle.textContent = product.title
  productTitle.classList.add('col-12', 'py-2')
  productTitleColumn.appendChild(productTitle)

  // Create the details column
  const detailsColumn = document.createElement('div')
  detailsColumn.classList.add('col-12', 'bg-secondary', 'py-2')

  // Create the inner row for details
  const detailsRow = document.createElement('div')
  detailsRow.classList.add('row', 'p-0')

  // Price column
  const priceColumn = document.createElement('div')
  priceColumn.classList.add(
    'col-4',
    'd-flex',
    'align-items-center',
    'justify-content-center'
  )
  const price = document.createElement('p')
  price.classList.add('m-0')
  price.textContent = 'Kr.' + product.price
  priceColumn.appendChild(price)

  // Heart icon column
  const heartColumn = document.createElement('div')
  heartColumn.classList.add('col-2', 'd-flex', 'align-items-center')
  const heartIcon = document.createElement('i')
  heartIcon.classList.add(product.favorite ? 'fas' : 'far', 'fa-heart', 'fa-2x')
  heartColumn.appendChild(heartIcon)

  // Add to cart button column
  const buttonColumn = document.createElement('div')
  buttonColumn.classList.add('col-6', 'd-flex', 'justify-content-end')
  const addButton = document.createElement('button')

  addButton.addEventListener('click', function (event) {
    event.preventDefault()
    addToCart(product.id)
    updateCartBadge()
    alert('Item has been added to the cart')
  })
  addButton.classList.add(
    'bg-primary',
    'border-0',
    'p-2',
    'text-white',
    'rounded',
    'add-to-cart'
  )
  addButton.textContent = 'Add to cart'
  buttonColumn.appendChild(addButton)

  // Assemble the details row
  detailsRow.appendChild(priceColumn)
  detailsRow.appendChild(heartColumn)
  detailsRow.appendChild(buttonColumn)

  // Assemble the details column
  detailsColumn.appendChild(detailsRow)

  // Assemble the inner row
  innerRowDiv.appendChild(imageColumn)
  innerRowDiv.appendChild(productTitleColumn)
  innerRowDiv.appendChild(detailsColumn)

  // Assemble the inner row inside the clickable link
  productLink.appendChild(innerRowDiv)

  // Assemble the clickable link inside the outer div
  schema.appendChild(productLink)

  return schema
}

/**
 * Creates an HTML structure representing a message for when no products are found.
 * @returns {HTMLElement} The created HTML element.
 */
function noProductsFound() {
  // Create a <div> element with the class "p-4"
  const divElement = document.createElement('div')
  divElement.classList.add('p-4')

  // Create an <h4> element with the text "No products found"
  const h4Element = document.createElement('h4')
  h4Element.textContent = 'No products found'

  // Append the <h4> element to the <div> element
  divElement.appendChild(h4Element)

  // Return the complete HTML structure
  return divElement
}

//add product list to the favorite tray
function documentReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

function createElem(tag, classNames = [], attributes = {}) {
  const elem = document.createElement(tag)
  elem.classList.add(...classNames)
  Object.keys(attributes).forEach((attr) => {
    if (attr === 'textContent') elem.textContent = attributes[attr]
    elem.setAttribute(attr, attributes[attr])
  })
  return elem
}

function createProductDescription(product) {
  const productDescriptionContainer = createElem('div', ['row'], {
    id: 'productDescription',
  })

  // Left column
  const leftColumn = createElem('div', [
    'col-12',
    'col-sm-6',
    'col-md-6',
    'col-lg-6',
    'mt-5',
  ])
  const leftRow = createElem('div', ['row'])
  const imageColumn = createElem('div', [
    'col-12',
    'border',
    'p-4',
    'text-center',
  ])
  const image = createElem('img', ['img-fluid', 'img-same-195'], {
    src: product.image,
    alt: product.title,
  })
  imageColumn.appendChild(image)

  const detailsColumn = createElem('div', [
    'col-12',
    'mt-4',
    'bg-secondary',
    'py-2',
  ])
  const detailsRow = createElem('div', ['row', 'p-0'])
  const priceColumn = createElem('div', [
    'col-4',
    'd-flex',
    'align-items-center',
  ])
  const price = createElem('h4', [], { textContent: 'Kr.' + product.price })
  priceColumn.appendChild(price)
  const heartColumn = createElem('div', [
    'col-2',
    'd-flex',
    'align-items-center',
    'justify-content-end',
  ])
  const heartIcon = createElem('i', [
    product.favorite ? 'fas' : 'far',
    'fa-heart',
    'fa-2x',
  ])
  heartColumn.appendChild(heartIcon)
  const buttonColumn = createElem('div', [
    'col-6',
    'col-sm-6',
    'col-md-6',
    'col-lg-5',
    'd-flex',
    'justify-content-end',
  ])
  const addButton = createElem(
    'button',
    ['bg-primary', 'border-0', 'p-1', 'text-white', 'rounded'],
    { textContent: 'Add to cart' }
  )
  buttonColumn.appendChild(addButton)
  detailsRow.appendChild(priceColumn)
  detailsRow.appendChild(heartColumn)
  detailsRow.appendChild(buttonColumn)
  detailsColumn.appendChild(detailsRow)
  leftRow.appendChild(imageColumn)
  leftRow.appendChild(detailsColumn)
  leftColumn.appendChild(leftRow)

  // Right column
  const rightColumn = createElem('div', [
    'col-12',
    'col-sm-12',
    'col-md-6',
    'col-lg-6',
    'py-5',
    'pl-lg-5',
    'd-flex',
    'flex-column',
  ])
  const productName = createElem('h4', [], {
    textContent: product.title,
  })
  const priceDiscount = createElem('p')
  priceDiscount.innerHTML = `<del>Kr. ${product.price}</del> <b>Kr. ${product.discountedPrice}</b>`
  const productDescription = createElem('p', ['text-justify'])
  productDescription.textContent = product.description

  const genderRow = createElem('div', ['row'])
  const genderColumn = createElem('div', ['col-6'])
  const genderInfo = createElem('p')
  genderInfo.innerHTML = `<b>Gender:</b> <span>${product.gender}</span>`
  genderColumn.appendChild(genderInfo)
  genderRow.append(genderColumn)

  const baseColumn = createElem('div', [
    'col-6',
    'd-flex',
    'justify-content-end',
  ])
  const baseColorInfo = createElem('p')
  baseColorInfo.innerHTML = `<b>Base Color:</b> <span>${product.baseColor}</span>`
  baseColumn.appendChild(baseColorInfo)
  genderRow.append(baseColumn)

  const sizeRow = createElem('div', ['row'])
  const sizeColumn = createElem('div', ['col-12'])
  const sizeLabel = createElem('label', [], {
    for: 'sizes',
    textContent: 'Sizes',
  })
  const sizes = createElem('select', ['w-100', 'border-secondary', 'p-2'], {
    id: 'sizes',
  })

  Array.from(product.sizes).forEach((size) => {
    const sizeOption = createElem('option', [], {
      textContent: size,
      value: size,
    })
    sizes.append(sizeOption)
  })

  sizeColumn.append(sizeLabel)
  sizeColumn.append(sizes)
  sizeRow.append(sizeColumn)

  const tagsRow = createElem('div', ['my-2', 'd-flex', 'gap-2', 'flex-wrap'])
  const tagsLabel = createElem('b', [], { textContent: 'Tags:' })
  tagsRow.append(tagsLabel)
  Array.from(product.tags).forEach((tag) => {
    const tagOption = createElem('a', [], {
      textContent: tag,
      href: 'javascript:void(0)',
    })
    tagsRow.append(tagOption)
  })

  // ... (Rest of the structure creation, similar to the previous steps)

  rightColumn.appendChild(productName)
  rightColumn.appendChild(priceDiscount)
  rightColumn.appendChild(productDescription)
  rightColumn.appendChild(genderRow)
  rightColumn.appendChild(sizeRow)
  rightColumn.appendChild(tagsRow)

  // Append columns to main container
  productDescriptionContainer.appendChild(leftColumn)
  productDescriptionContainer.appendChild(rightColumn)

  return productDescriptionContainer
}

function searchLikeSQL(searchWord, text) {
  const escapedSearchWord = searchWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') // Escape special characters
  const pattern = new RegExp(escapedSearchWord, 'i') // 'i' flag for case-insensitive search
  return pattern.test(text)
}

function slideShowProductImage(product) {
  const divElement = document.createElement('div')
  divElement.className = 'col-12 col-sm-4 col-md-4 col-lg-4 pt-4'

  const imgElement = document.createElement('img')
  imgElement.src = product.image
  imgElement.className = 'img-fluid same-jackets'
  imgElement.alt = product.title
  divElement.appendChild(imgElement)
  return divElement
}

function createCheckoutElement(product) {
  const increaseQuantity = (input) => {
    input.value = Number(input.value) + 1
  }

  const decreaseQuantity = (input) => {
    if (input.value <= 1) return (input.value = 1)
    input.value = Number(input.value) - 1
  }
  const removeCartItem = ()=>{
    removeFromCart(product.id)
    mainRow.style.display = 'none'
    updateCartBadge()
  }
  // Create the main row container
  const mainRow = createElem('div', ['row'])

  // Create the left column
  const leftColumn = createElem('div', [
    'col-12',
    'col-sm-6',
    'col-md-6',
    'col-lg-6',
    'p-3',
  ])

  // Create the left inner row
  const leftInnerRow = createElem('div', ['row'])

  // Create the image container
  const imageContainer = createElem('div', ['col-12', 'text-center'])

  // Create the image element
  const image = createElem('img', ['img-fluid', 'size-132'], {
    src: product.image,
    alt: product.title,
  })

  // Append the image to the image container
  imageContainer.appendChild(image)

  // Create the title container
  const titleContainer = createElem('div', ['col-12'])

  // Create the title element
  const title = createElem('h4', ['text-center', 'p-2'], {
    textContent: product.title,
  })

  // Append the title to the title container
  titleContainer.appendChild(title)

  // Append the image container and title container to the left inner row
  leftInnerRow.appendChild(imageContainer)
  leftInnerRow.appendChild(titleContainer)

  // Append the left inner row to the left column
  leftColumn.appendChild(leftInnerRow)

  // Create the right column
  const rightColumn = createElem('div', [
    'col-12',
    'col-sm-6',
    'col-md-6',
    'col-lg-6',
    'd-flex',
    'justify-content-center',
    'align-items-center',
  ])

  // Create the right inner row
  const rightInnerRow = createElem('div', ['row', 'gap-1'])
  const rightInnerInsideRow = createElem('div', ['row'])
  const checkoutControls = createElem('div', ['col-8'])
  const checkoutItemDelete = createElem('div', ['col-2'])
  const deleteButton = createElem('i', ['fa', 'fa-trash', 'text-orange'], {
    title: 'Remove ' + product.title,
  })
  deleteButton.addEventListener('click',(event)=>{
    event.preventDefault()
    const check = confirm("Do you want to remove item from cart")
    if(!check) return 

    removeCartItem()
  })
  checkoutItemDelete.append(deleteButton)
  // Create the "decrease" button column
  const decreaseButtonColumn = createElem('div', ['col-2', 'p-0'])

  // Create the "decrease" button
  const decreaseButton = createElem(
    'button',
    [
      'w-100',
      'p-2',
      'border-1',
      'border-orange',
      'bg-orange',
      'text-white',
      'font-weight-bolder',
    ],
    { textContent: '-' }
  )
  decreaseButtonColumn.appendChild(decreaseButton)

  // Create the input column
  const inputColumn = createElem('div', ['col-8', 'p-0'])

  // Create the input element
  const inputElement = createElem(
    'input',
    ['w-100', 'p-2', 'border-1', 'border-orange', 'text-right'],
    { type: 'number', value: 1, min: 1 }
  )
  inputColumn.appendChild(inputElement)

  // Create the "increase" button column
  const increaseButtonColumn = createElem('div', ['col-2', 'p-0'])

  // Create the "increase" button
  const increaseButton = createElem(
    'button',
    [
      'w-100',
      'p-2',
      'border-1',
      'border-orange',
      'bg-orange',
      'text-white',
      'font-weight-bolder',
    ],
    { textContent: '+' }
  )
  increaseButtonColumn.appendChild(increaseButton)
  //add event to the buttons
  increaseButton.addEventListener('click', function () {
    increaseQuantity(inputElement)
  })
  decreaseButton.addEventListener('click', function () {
    decreaseQuantity(inputElement)
  })
  // Append the button elements to the right inner row
  rightInnerInsideRow.appendChild(decreaseButtonColumn)
  rightInnerInsideRow.appendChild(inputColumn)
  rightInnerInsideRow.appendChild(increaseButtonColumn)
  checkoutControls.appendChild(rightInnerInsideRow)

  // Append the right inner row to the right column
  rightColumn.appendChild(checkoutControls)
  rightColumn.appendChild(checkoutItemDelete)

  // Append the left and right columns to the main row
  mainRow.appendChild(leftColumn)
  mainRow.appendChild(rightColumn)

  return mainRow
}

function showNoCheckOutProducts(){
  // Create the main container
  const mainContainer = createElem('div', ['w-100'])

  // Create the image element
  const image = createElem('img', ['w-100'], {
    src: './images/RainyDays_Jacket3.png',
    alt: 'No checkout items',
  })
  mainContainer.appendChild(image)

  // Create the paragraph element
  const paragraph = createElem('p', ['text-center'], {
    textContent: 'No items in cart.',
  })

  // Create the anchor element
  const anchor = createElem('a', [], {
    href: './jackets.html',
    textContent: "Let's go shopping",
  })
  paragraph.appendChild(anchor)
  mainContainer.appendChild(paragraph)  
  return mainContainer
}