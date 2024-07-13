const Producturl = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
let allProducts = [];    //create an empty array

async function renderProducts(category = null) {           //initially categorie is null
    const section = document.querySelector(".Product");
    section.innerHTML = ''; 

    if (allProducts.length === 0) {
        const res = await fetch(Producturl);
       
        const product = await res.json();
        allProducts = product.categories;  //allProuct is storing categories of product
    }

    const productsToRender = category
        ? allProducts.find(cat => cat.category_name === category)?.category_products || []
        : allProducts.flatMap(cat => cat.category_products);
    productsToRender.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        
        productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}">
            <p>Price: $${product.price}</p>
            <p>Vendor: ${product.vendor}</p>
        `;
        
        section.appendChild(productDiv);
    });
}
function filterItems(category) {
    renderProducts(category);
}
renderProducts();
