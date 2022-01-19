let quantity = 1
let cart = []
var unitPrice = 0

const getProducts = async () => {
  cart = []
  let unitPriceBegin = 0
  const data = await axios({
    method: 'get',
    url: "/api/"
  })

  if (data.data.data_1.length < 1) {
    $('#all_products').append(`<div class="row container  mb-5">No products</div>`)
  }
  if (data.data.data_2.length < 1) {
    $('#cart').append(`<div class="row container  mb-5">No products</div>`)
  }

  data.data.data_1.forEach(doc => {
    $('#all_products').append(`<div class="row container  mb-5">
        <div class="col-12 mb-2" ><img class="product_img" style="background-color: ${doc.color};" src="${doc.image}" alt=""></div>
        <div class="col-12 product_name">${doc.name}</div>
        <div class="col-12">${doc.description}</div>
        <div class="col-12"><button type="button" onclick="addToCart('${doc._id}')" class="btn btn-sm btn-danger col-12 mt-2" id="btn${doc._id}"><span>Add to cart</span></button>
        </div>
      </div>`)

  })

  data.data.data_2.forEach(doc => {
    cart.push({ id: doc._id, price: doc.price })
    console.log(cart)
    $('#cart').append(` 
            <div class="row mb-3">
              <div class="col-4"><img class="cart_img" style="background-color: ${doc.color};" src="${doc.image}" alt=""></div>
              <div class="col-8 ">
                <div class="col-12" >${doc.name}</div>
                <div class="col-12" style="font-weight: bold;">$${doc.price}</div>
                <div class="col-12"> <i class="fas fa-plus-circle" onclick = "quantityUp('${doc._id}','${doc.price}')"></i> <span id="count${doc._id}">${quantity}</span> <i
                    class="fas fa-minus-circle" onclick = "quantityDown('${doc._id}','${doc.price}')"></i> <a><i class="fa fa-trash float-right" onclick="removeFromCart('${doc._id}')" aria-hidden="true"></i></a> </div>
              </div>
            </div>
            `)

    //console.log(unitPrice_0)

  })
  for (let i = 0; i < cart.length; i++) {
    unitPriceBegin += cart[i].price
    $(`#btn${cart[i].id}`).html(`<span>Added</span>`)
    $(`#btn${cart[i].id}`).attr("disabled", "disabled")

  }
  console.log(unitPriceBegin)
  total(unitPriceBegin)
}

getProducts()


const addToCart = async (id) => {
  try {
    const result = await axios({
      method: 'put',
      url: "/api/" + id
    })
    console.log(result)
    alert("Added to cart")
    $('#all_products').empty()
    $('#cart').empty()
    getProducts()
  } catch (error) {
    console.log(error)
    alert("Can not add to cart")
  }


}
const removeFromCart = async (id) => {
  try {
    const result = await axios({
      method: 'put',
      url: "/api/cart/" + id
    })
    console.log(result)
    alert("Removed to cart")
    $('#all_products').empty()
    $('#cart').empty()
    getProducts()
  } catch (error) {
    console.log(error)
    alert("Can not remove to cart")
  }

}

const quantityUp = (id, price) => {
  let count = 0
  let sum = 0
  cart.push({ id: id, price: price })
  for (let i = 0; i < cart.length; i++) {
    if(cart[i]){
      sum += parseFloat(cart[i].price)
    if (cart[i].id == id) {
      count++
    }
    }

  }
  total(sum)
  $(`#count${id}`).html(`<span>${count}</span>`)


}
const quantityDown = (id, price) => {
  let arr = []
  let count = 0
  let sum=0
  //   arr = cart.splice(cart.indexOf(id), 1)
  for (let i = 0; i < cart.length; i++) {
    if (cart[i]) {
      if (cart[i].id == id) {
        delete cart[i]
        break;
      }
    }
  }
  for (let j = 0; j < cart.length; j++) {
    if (cart[j]) {
      sum += parseFloat(cart[j].price)
      if (cart[j].id == id) {
        count++
       
        console.log(count)
      }
    }
  }
  if(count ==0){
    removeFromCart(id)
  }
  total(sum)
  $(`#count${id}`).html(`<span>${count}</span>`)
  console.log(cart)
  //   }
  //  // countDown --
  //    console.log(countDown)
}

const total = (total) => {
  $('#total').html(`<span>$${parseFloat(total).toFixed(2)}</span>`)
}


