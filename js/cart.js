class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    init() {
        // Cart Button Click
        const cartBtn = document.querySelector('.cart-btn');
        const cartModal = document.querySelector('.cart-modal');

        cartBtn.addEventListener('click', () => {
            cartModal.classList.toggle('active');
        });

        // Add to Cart Buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const itemData = JSON.parse(e.target.dataset.item);
                this.addItem(itemData);
            }
        });
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.name === item.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...item,
                quantity: 1
            });
        }

        this.updateCart();
    }

    removeItem(itemName) {
        this.items = this.items.filter(item => item.name !== itemName);
        this.updateCart();
    }

    updateCart() {
        const cartItems = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const cartTotal = document.querySelector('#cartTotal');

        // Update cart count
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update cart items
        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            </div>
        `).join('');

        // Update total
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${this.total.toFixed(2)}`;
    }
}

// Initialize cart
const cart = new Cart();