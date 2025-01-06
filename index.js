const products = [
    { id: 1, name: "SAMSUNG TV", price: 500000, image: "./Images/product1.png", quantity: 1},
    { id: 2, name: "PIXEL 4a", price: 250000, image: "./Images/product2.png", quantity: 1 },
    { id: 3, name: "PS 5", price: 500000, image: "./Images/product3.png", quantity: 1},
    { id: 4, name: "MACBOOK AIR", price: 700000, image: "./Images/product4.png", quantity: 1 },
    { id: 5, name: "APPLE WATCH", price: 200000, image: "./Images/product5.png",quantity: 1 },
    { id: 6, name: "AIR PODS", price: 150000, image: "./Images/product6.png", quantity: 1 },
  ];
  
 // Sample products for the cart
const product= [
    { id: 1, name: "Apple Watch", price: 95000, quantity: 1 },
    { id: 2, name: "MacBook Air", price: 800000, quantity: 1 }
  ];
  
  // Cart object to store selected products
  let cart = [];
  
  // Update the cart count
  function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
  }
  
  // Render cart items in the modal
  function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items
  
    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('item');
      itemElement.innerHTML = `
        <span>${item.name} - ₦${item.price}</span>
        <button onclick="changeQuantity(${item.id}, 'decrease')">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${item.id}, 'increase')">+</button>
        <button onclick="removeItem(${item.id})">Remove</button>
      `;
      cartItemsContainer.appendChild(itemElement);
    });
  
    updateTotalAmount();
  }
  
  // Change the quantity of an item in the cart
  function changeQuantity(productId, action) {
    const item = cart.find(i => i.id === productId);
    if (item) {
      if (action === 'increase') {
        item.quantity += 1;
      } else if (action === 'decrease' && item.quantity > 1) {
        item.quantity -= 1;
      }
      renderCartItems();
    }
  }
  
  // Remove item from the cart
  function removeItem(productId) {
    cart = cart.filter(i => i.id !== productId);
    renderCartItems();
    updateCartCount();
  }
  
  // Update the total amount in the cart
  function updateTotalAmount() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-amount').textContent = `Total Amount to be Paid: ₦${total}`;
  }
  
  // Show the cart modal when the cart button is clicked
  document.getElementById('cart-button').addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'block';
    renderCartItems();
  });
  
  // Close the modal when the "Continue Shopping" button is clicked
  document.getElementById('continue-shopping').addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'none';
  });
  
  // Close the modal if the user clicks outside the modal content
  window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('cart-modal')) {
      document.getElementById('cart-modal').style.display = 'none';
    }
  });
  
  // Handle checkout button click (validate user details and proceed)
  document.getElementById('checkout').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
  
    if (!name || !email || !phone) {
      alert("Please fill in all details before proceeding to checkout.");
    } else {
      alert("Proceeding to checkout...");
      // Here, you can integrate the Paystack or other payment gateways.
      document.getElementById('cart-modal').style.display = 'none';
    }
  });
  
  // Example: Adding items to the cart
  cart.push(products[0], products[1]); // Adding Apple Watch and MacBook Air to the cart
  updateCartCount();
  
  document.getElementById('checkout').addEventListener('click', function() {
    payWithPaystack(); // Call the payment function here
});

function payWithPaystack() {
  const email = document.getElementById("email").value;
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  var handler = PaystackPop.setup({
      key: 'pk_test_31b743ea82ab89dc3d1d6955e29ac8391ef5bd96', // Replace with your public key
      email: email,
      amount: totalAmount * 100, // Convert to kobo
      currency: 'NGN',
      ref: 'ref-' + new Date().getTime(),

      callback: function (response) {
          alert('Payment successful. Transaction reference: ' + response.reference);
      },
      onClose: function () {
          alert('Transaction was not completed.');
      },
  });
  handler.openIframe();
}
