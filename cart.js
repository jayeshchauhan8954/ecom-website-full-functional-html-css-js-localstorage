document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('user_login_data'));

    if (currentUser) {
        const cartData = currentUser.cartData || [];
        renderCart(cartData);

        document.getElementById('checkout-btn').addEventListener('click', function () {
            alert('Proceeding to checkout!');
        });
    } else {
        alert('Please log in to view your cart.');
        window.location.href = 'login.html';
    }
});

function renderCart(cartData) {
    const cartItemsContainer = document.getElementById('cart-body');
    cartItemsContainer.innerHTML = '';

    if (cartData.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('cart-subtotal').innerText = '$0.00';
        document.getElementById('cart-total').innerText = '$0.00';
        return;
    }

    let totalPrice = 0;

    cartData.forEach((item, index) => {
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;

        const itemHTML = `
            <tr>
                <td><button class="remove-item-btn" data-index="${index}"><i class="fa-solid fa-circle-xmark"></i></button></td>
                <td><img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="item-quantity"></td>
                <td>$<span class="item-total">${itemTotalPrice.toFixed(2)}</span></td>
            </tr>
        `;
        cartItemsContainer.innerHTML += itemHTML;
    });

    document.getElementById('cart-subtotal').innerText = `$${totalPrice.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `$${totalPrice.toFixed(2)}`;

    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('input', function () {
            updateQuantity(this.getAttribute('data-index'), this.value);
        });
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function () {
            removeItem(this.getAttribute('data-index'));
        });
    });
}

function updateQuantity(index, quantity) {
    const currentUser = JSON.parse(localStorage.getItem('user_login_data'));

    if (currentUser && currentUser.cartData[index]) {
        currentUser.cartData[index].quantity = parseInt(quantity, 10);
        localStorage.setItem('user_login_data', JSON.stringify(currentUser));
        renderCart(currentUser.cartData);
    }
}

function removeItem(index) {
    const currentUser = JSON.parse(localStorage.getItem('user_login_data'));

    if (currentUser) {
        currentUser.cartData.splice(index, 1);
        localStorage.setItem('user_login_data', JSON.stringify(currentUser));
        renderCart(currentUser.cartData);
    }
}
