document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Sample Menu Items
    const menuItems = [
        {
            name: 'Classic Burger',
            price: 12.99,
            description: 'Juicy beef patty with fresh vegetables',
            image: 'images/burger.jpg'
        },
        {
            name: 'Margherita Pizza',
            price: 14.99,
            description: 'Fresh tomatoes, mozzarella, and basil',
            image: 'images/pizza.jpg'
        },
        {
            name: 'Pasta Alfredo',
            price: 13.99,
            description: 'Creamy sauce with parmesan cheese',
            image: 'images/pasta.jpg'
        },
        {
            name: 'Caesar Salad',
            price: 9.99,
            description: 'Fresh romaine lettuce with classic caesar dressing',
            image: 'images/salad.jpg'
        },
        {
            name: 'Chocolate Cake',
            price: 6.99,
            description: 'Rich chocolate layer cake',
            image: 'images/dessert.jpg'
        },
        {
            name: 'Fresh Smoothie',
            price: 4.99,
            description: 'Blend of seasonal fruits',
            image: 'images/smoothie.jpg'
        }
    ];

    // Load Menu Items
    const menuGrid = document.querySelector('.menu-grid');
    menuItems.forEach(item => {
        const menuItem = createMenuItem(item);
        menuGrid.appendChild(menuItem);
    });

    // Search Functionality
    const searchInput = document.querySelector('.search input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterMenuItems(searchTerm);
    });
});

function createMenuItem(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-item-footer">
            <span class="price">$${item.price}</span>
            <button class="btn-primary add-to-cart" data-item='${JSON.stringify(item)}'>
                Add to Cart
            </button>
        </div>
    `;
    return div;
}

function filterMenuItems(searchTerm) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const name = item.querySelector('h3').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}