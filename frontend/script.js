<script>
        // Add event listener for the Add to Cart button on the product details page
        document.querySelector('.btn').addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            const productImage = document.getElementById('ProductImg').src; // Dynamically get the image src
            
            addToCart(productId, productName, productPrice, productImage);
        });

        // Function to add product to cart
        function addToCart(productId, productName, productPrice, productImage) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Check if product already exists in the cart
            const productExists = cart.find(item => item.id === productId);
            
            if (productExists) {
                productExists.quantity += 1; // Increment quantity if the product is already in the cart
            } else {
                // Add new product to the cart
                cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
            }
            
            // Update localStorage with the new cart
            localStorage.setItem('cart', JSON.stringify(cart));
            
            alert('Product added to cart!');
        }
    </script>