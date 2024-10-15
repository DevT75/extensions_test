document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('productList');

    fetch('https://fakestoreapi.com/products?limit=5')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
                <p>${product.description.substring(0, 100)}...</p>
            `;
                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            productList.innerHTML = `<p>Error fetching products: ${error.message}</p>`;
        });
});