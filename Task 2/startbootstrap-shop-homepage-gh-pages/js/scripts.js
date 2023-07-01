/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project




document.addEventListener("DOMContentLoaded", function () {
    const addToBasketBtns = document.querySelectorAll(".addToBasketBtn");
    const cartButton = document.getElementById("cartButton");
    const cartItemCount = document.getElementById("cartItemCount");
    const cartDropdown = document.getElementById("cartDropdown");
    let isDropdownOpen = false;
  
   
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    
    function updateLocalStorage() {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  
   
    function updateCartButtonCount() {
      const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
      cartItemCount.innerText = totalQuantity;
    }
  
    addToBasketBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const productCard = this.closest(".card");
        const productId = productCard.dataset.productId;
        const productName = productCard.querySelector("h5").innerText;
        const productImage = productCard.querySelector("img").getAttribute("src");
  
        let quantity = parseInt(productCard.getAttribute("data-quantity")) || 0;
        quantity++;
  
        productCard.setAttribute("data-quantity", quantity);
        updateBasket(productId, productName, productImage, quantity);
        updateCartDropdown();
        updateCartButtonCount();
  
       
        updateLocalStorage();
      });
    });
  
    function updateBasket(productId, productName, productImage, quantity) {
      if (quantity <= 0) {
     
        cartItems = cartItems.filter((item) => item.productId !== productId);
      } else {
        
        const existingItemIndex = cartItems.findIndex((item) => item.productId === productId);
  
        if (existingItemIndex !== -1) {
          
          cartItems[existingItemIndex].quantity = quantity;
        } else {
          
          const newItem = {
            productId,
            productName,
            productImage,
            quantity,
          };
          cartItems.push(newItem);
        }
      }
  
     
      updateLocalStorage();
    }
  
    function updateCartDropdown() {
   
      cartDropdown.innerHTML = "";
  
    
      cartItems.forEach((item) => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
          <img src="${item.productImage}" alt="${item.productName}" width="50" height="50">
          <span>${item.productName}</span>
          <div class="count-controls">
            <button class="btn btn-outline-dark btn-sm decrementCountBtn" data-product-id="${item.productId}">-</button>
            <span class="count">${item.quantity}</span>
            <button class="btn btn-outline-dark btn-sm incrementCountBtn" data-product-id="${item.productId}">+</button>
          </div>
          <button class="removeFromBasketBtn btn btn-danger btn-sm" data-product-id="${item.productId}">Remove All</button>
        `;
  
        
        cartItem.querySelector(".decrementCountBtn").addEventListener("click", function (event) {
          event.stopPropagation();
          const productId = event.target.getAttribute("data-product-id");
          const item = cartItems.find((item) => item.productId === productId);
          if (item) {
            item.quantity--;
            if (item.quantity <= 0) {
              cartItems.splice(cartItems.indexOf(item), 1);
            }
            updateCartDropdown();
            updateCartButtonCount();
            updateLocalStorage(); 
          }
        });
  
        
        cartItem.querySelector(".incrementCountBtn").addEventListener("click", function (event) {
          event.stopPropagation();
          const productId = event.target.getAttribute("data-product-id");
          const item = cartItems.find((item) => item.productId === productId);
          if (item) {
            item.quantity++;
            updateCartDropdown();
            updateCartButtonCount();
            updateLocalStorage(); 
          }
        });
  
        cartItem.querySelector(".removeFromBasketBtn").addEventListener("click", function (event) {
          event.stopPropagation();
          const productId = event.target.getAttribute("data-product-id");
          const index = cartItems.findIndex((item) => item.productId === productId);
          if (index !== -1) {
            cartItems.splice(index, 1);
            updateCartDropdown();
            updateCartButtonCount();
            updateLocalStorage(); 
          }
        });
  
        cartDropdown.appendChild(cartItem);
      });
    }
  
    updateCartButtonCount();
    
    updateCartDropdown();
  
    
    cartButton.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
  
      if (isDropdownOpen) {

        cartDropdown.classList.remove("show");
      } else {
    
        cartDropdown.classList.add("show");
      }
  
      isDropdownOpen = !isDropdownOpen;
    });
  
    
    document.addEventListener("click", function (event) {
      if (isDropdownOpen && event.target !== cartButton && !cartButton.contains(event.target)) {
        cartDropdown.classList.remove("show");
        isDropdownOpen = false;
      }
    });
  });