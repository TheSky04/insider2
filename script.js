'use strict';

const timesEl = document.querySelector('.popup--times');
const popupContainerEl = document.querySelector('.popup--container');
const addToCartEl = document.querySelector('.popup--addToCart');
const notificationSuccessEl = document.querySelector('.notification--success');
const notificationErrorEl = document.querySelector('.notification--error');
const cartIcons = document.querySelectorAll('.site-header__cart-indicator');
const cart = []; 
const footerEl = document.querySelector('.site-footer');
const stickyNav = document.querySelector('#StickyNavSearchCart');
const cartIndicator = stickyNav.querySelector('.site-header__cart-indicator');
const addToCartBtnBlue = document.querySelector('#AddToCart-product-template');
const sizeSelectBoxEl = document.querySelector('.single-option-selector.single-option-selector-product-template.product-form__input');
const colorSelectBoxEl = document.querySelector('#SingleOptionSelector-1');
const minusBtn = document.querySelector('.js-qty__adjust.js-qty__adjust--minus');
const plusBtn = document.querySelector('.js-qty__adjust.js-qty__adjust--plus');
const quantity = document.querySelector('#Quantity');
let currentQuantity = +quantity.textContent || 1;

minusBtn.addEventListener('click', function() {

    if (currentQuantity > 0) {
        currentQuantity--;
        quantity.value = currentQuantity;
        document.querySelector('.popup--quantity').textContent = currentQuantity;
    }
});

plusBtn.addEventListener('click', function() {

    currentQuantity++;
    quantity.value = currentQuantity;
    document.querySelector('.popup--quantity').textContent = currentQuantity;
});

let product = {
    productName:'Vans Sh 8 HI',
    price:99.95,
    size:4,
    color:'black',
    quantity:1
}

 function updatePopup(product) {
    document.querySelector('.popup--productName').textContent = product.productName;
    document.querySelector('.popup--price').textContent = `$${product.price.toFixed(2)}`;
    document.querySelector('.popup--size').textContent = product.size;
    document.querySelector('.popup--color').textContent = product.color;
    document.querySelector('.popup--quantity').textContent = product.quantity;
}

document.addEventListener('DOMContentLoaded', () => updatePopup(product));

const observerCallback  = (entries) => entries.forEach(entry => entry.isIntersecting ? makePopupBlue() : makePopupWhite());

const makePopupBlue = function(){
    document.documentElement.style.setProperty('--popup-background', '#fff');
    document.documentElement.style.setProperty('--color-title', '#051336');
    document.documentElement.style.setProperty('--color-feature', 'rgba(5,19,54,0.5)');
    document.documentElement.style.setProperty('--color-times', '#051336');
};

const makePopupWhite = function(){
    document.documentElement.style.setProperty('--popup-background', 'linear-gradient(90deg,#051336,#000000)');
    document.documentElement.style.setProperty('--color-title', '#fff');
    document.documentElement.style.setProperty('--color-feature', 'rgba(255,255,255,.8)');
    document.documentElement.style.setProperty('--color-times', '#fff');
}

const observerOptions = {
    root:null,
    threshold:0.1
}

const observer = new IntersectionObserver(observerCallback,observerOptions);
observer.observe(footerEl);

const closePopup = () => popupContainerEl.classList.add('hide');
    
const showErrorMessage = () => {
    notificationErrorEl.classList.add('notification--active'); 
    notificationErrorEl.textContent = "You can't add more VANS SH-8 HI - 4 / black to the cart.";

    setTimeout(() => {
        notificationErrorEl.classList.remove('notification--active'); 
    },3000);
}

const showSuccessMessageAndAddToCart = () => {
    notificationSuccessEl.classList.add('notification--active');
    cartIcons.forEach(cartIcon => cartIcon.classList.remove('hide'));

    product = {
        productName: product.productName,
        price:product.price,
        size: +document.querySelector('.popup--size').textContent,
        color: document.querySelector('.popup--color').textContent,
        quantity: currentQuantity
    }

    cart.push(product);

    setTimeout(() => {
        notificationSuccessEl.classList.remove('notification--active'); 
    },3000);

}

const addToCart = () => {

    cart.length === 0 ? showSuccessMessageAndAddToCart() : showErrorMessage();
    closePopup();
};

sizeSelectBoxEl.addEventListener('change',(e) => document.querySelector('.popup--size').textContent = e.target.value);
colorSelectBoxEl.addEventListener('change',(e) => document.querySelector('.popup--color').textContent = e.target.value);

addToCartEl.addEventListener('click',addToCart);
addToCartBtnBlue.addEventListener('click',addToCart);
timesEl.addEventListener('click',closePopup);


