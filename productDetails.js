document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const fetchedItems = JSON.parse(window.localStorage.getItem('items'));
    const product = fetchedItems.find(item => item.id == productId);

    if (product) {
        document.getElementById('MainImg').src = product.imageUrl;
        const smallImgGroup = document.querySelector('.small-img-group');
        smallImgGroup.innerHTML = '';
        product.otherImages.forEach(image => {
            smallImgGroup.innerHTML += `
                <div class="small-img-col">
                    <img src="${image}" width="100%" class="small-img" alt="Product Image">
                </div>
            `;
        });
        document.querySelector('.single-pro-details h2').innerText = product.name;
        document.querySelector('.single-pro-details h6').innerText = product.category;
        document.querySelector('.single-pro-details h4').innerText = `$${product.price.toFixed(2)}`;
        document.querySelector('.single-pro-details span').innerText = product.description;

        document.querySelector('.single-pro-details .rating').innerHTML = Array(product.rating).fill('<i class="fas fa-star"></i>').join('');

        const sizeSelect = document.getElementById('size-select');
        sizeSelect.innerHTML = '';
        product.size.forEach(size => {
            sizeSelect.innerHTML += `<option value="${size}">${size}</option>`;
        });

        document.querySelectorAll('.small-img').forEach(img => {
            img.addEventListener('click', function () {
                document.getElementById('MainImg').src = this.src;
            });
        });

        document.getElementById('add-to-cart').addEventListener('click', function () {
            addToCart(product);
        });
    } else {
        document.querySelector('.single-pro-details').innerHTML = '<p>Product not found.</p>';
    }
});

function addToCart(product) {
    const currentUser = JSON.parse(localStorage.getItem('user_login_data'));

    if (currentUser) {

        const existingProductIndex = currentUser.cartData.findIndex(cartItem => cartItem.id === product.id);

        if (existingProductIndex !== -1) {
            alert(`This item is already in your cart. \n If You want to change quantity then \n please go to cart page...`);
            window.location.href = 'cart.html'
        } else {
            const cartProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                size: document.getElementById('size-select').value,
                quantity: document.getElementById('quantity').value,
            };

            currentUser.cartData.push(cartProduct);
            localStorage.setItem('user_login_data', JSON.stringify(currentUser));
            alert('Product added to cart!');
        }
    } else {
        alert('Please log in to add items to your cart.');
        window.location.href = 'login.html'
    }
}