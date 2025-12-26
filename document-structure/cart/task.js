document.addEventListener('DOMContentLoaded', () => {
    loadCardFromLocalStorage();
    const carts = document.querySelectorAll('.cart');

    carts.forEach(cart => {
        cart.addEventListener('click', (e) => {
            const cartElement = e.target.closest('.cart');

            if (cartElement) {
                const cartProduct = e.target.closest('.cart__product');
                if (cartProduct) {
                    const productID = cartProduct.dataset.id;
                    // console.log(getCartProdCoordinates(cartProduct.dataset.id));
                    // console.log('Product ID:', productID);
                    let result = confirm('Точно хотите удалить товар?');
                    if (result) {
                        alert('Товар удален!');
                        cartProduct.remove();
                        deleteProductFromCart(productID);
                        // window.location.reload();
                    }
                }
            }
        })
    })

    function deleteProductFromCart(productID) {
        const cartDate = JSON.parse(localStorage.getItem('cart')) || [];
        const UpdatedCart = cartDate.filter(item => item.id !== productID);
        localStorage.setItem('cart', JSON.stringify(UpdatedCart));
    }

    function saveCardToLocalStorage() {
        const cartProducts = document.querySelectorAll('.cart__product');
        const cardDate = [];

        cartProducts.forEach(product => {
            cardDate.push({
                id: product.dataset.id,
                count: parseInt(product.querySelector('.cart__product-count').textContent),
                image: product.querySelector('.cart__product-image').src
            })
        })
        localStorage.setItem('cart', JSON.stringify(cardDate));
    }

    function getCartProductHTML({id, image, count}) {
        return `
        <div class="cart__product" data-id="${id}">
            <img class="cart__product-image" src="${image}">
            <div class="cart__product-count">${count}</div>
        </div>
    `;
    }

    function createElement(card) {
        const cartProducts = document.querySelector('.cart__products');
        // console.log(card);
        cartProducts.insertAdjacentHTML('beforeend', getCartProductHTML(card));
    }

    function loadCardFromLocalStorage() {
        const cardDate = JSON.parse(localStorage.getItem('cart')) || [];

        cardDate.forEach(card => {
            const existingProduct = document.querySelector(`cart__product[data-id='${card.id}']`)

            if (!existingProduct) {
                createElement(card);
            }
        })
    }

    const quantityControls = document.querySelectorAll('.product__quantity-controls');
    const addButtons = document.querySelectorAll('.product__add');

    quantityControls.forEach(control => {
        const decButton = control.querySelector('.product__quantity-control_dec');
        const incButton = control.querySelector('.product__quantity-control_inc');
        const value = control.querySelector('.product__quantity-value');

        incButton.addEventListener('click', () => {
            const currentValue = parseInt(value.textContent);
            value.textContent = currentValue + 1;
        });

        decButton.addEventListener('click', () => {
            const currentValue = parseInt(value.textContent);
            if (currentValue > 1) {
                value.textContent = currentValue - 1;
            }
        });
    });

    function getCoordinates(element) {
        return element.getBoundingClientRect();
    }

    function animateToCart(product, productId) {
        const productImage = product.querySelector('.product__image');
        const cart = document.querySelector('.cart__product[data-id="' + productId + '"]');
        // console.log(cart);

        const productCoords = getCoordinates(productImage);
        const cartCoords = getCoordinates(cart);

        const flyingImage = productImage.cloneNode(true);
        flyingImage.classList.add('flying-image');

        flyingImage.style.left = productCoords.left + 'px';
        flyingImage.style.top = productCoords.top + 'px';

        // console.log(flyingImage.style.left);
        // console.log(flyingImage.style.top);

        document.body.appendChild(flyingImage);

        requestAnimationFrame(() => {
            flyingImage.style.left = cartCoords.left + 'px';
            flyingImage.style.top = cartCoords.top + 'px';
        });

        flyingImage.addEventListener('transitionend', () => {
            flyingImage.remove();
        });
    }

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productId = product.dataset.id;

            const productImg = product.querySelector('.product__image').src;
            const productValue = +product.querySelector('.product__quantity-value').textContent;

            const cartProducts = document.querySelector('.cart__products');
            const existingProduct = cartProducts.querySelector(
                `.cart__product[data-id="${productId}"]`
            );

            animateToCart(product, productId);

            if (existingProduct) {
                const countElement = existingProduct.querySelector('.cart__product-count');
                countElement.textContent = +countElement.textContent + productValue;
            } else {
                createElement({
                    id: productId,
                    image: productImg,
                    count: productValue
                });
            }
            saveCardToLocalStorage();
        });
    });

});