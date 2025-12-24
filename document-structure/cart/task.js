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

    function loadCardFromLocalStorage() {
        const cardDate = JSON.parse(localStorage.getItem('cart')) || [];
        const cartProducts = document.querySelector('.cart__products');

        cardDate.forEach(card => {
            const existingProduct = document.querySelector(`cart__product[data-id='${card.id}']`)

            if (!existingProduct) {
                const cardProduct = document.createElement('div');
                cardProduct.className = 'cart__product';
                cardProduct.dataset.id = card.id;

                const cardImage = document.createElement('img');
                cardImage.className = 'cart__product-image';
                cardImage.src = card.image;

                const cardCount = document.createElement('div');
                cardCount.className = 'cart__product-count';
                cardCount.textContent = card.count;

                cardProduct.appendChild(cardImage);
                cardProduct.appendChild(cardCount);
                cartProducts.appendChild(cardProduct);
            }
        })

    }


    const quantityControls = document.querySelectorAll('.product__quantity-controls');

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

    const addButtons = document.querySelectorAll('.product__add');

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productId = product.dataset.id;

            const productImg = product.querySelector('.product__image').src;
            const productValue = parseInt(product.querySelector('.product__quantity-value').textContent);

            const cartProducts = document.querySelector('.cart__products');

            const existingProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);
            // console.log(existingProduct);
            // console.log(`.cart__product[data-id="${productId}"]`);
            // console.log(cartProducts.querySelector(`.cart__product[data-id="${productId}"]`));

            if (existingProduct) {
                const countElement = existingProduct.querySelector('.cart__product-count');
                const currentCount = parseInt(countElement.textContent);
                countElement.textContent = currentCount + productValue;
            } else {
                const cartProduct = document.createElement('div');
                cartProduct.className = 'cart__product';
                cartProduct.dataset.id = productId;

                const img = document.createElement('img');
                img.className = 'cart__product-image';
                img.src = productImg;

                const count = document.createElement('div');
                count.className = 'cart__product-count';
                count.textContent = productValue;

                cartProduct.appendChild(img);
                cartProduct.appendChild(count);
                cartProducts.appendChild(cartProduct);
            }
            saveCardToLocalStorage();
        });
    });

});