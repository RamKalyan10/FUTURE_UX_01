// App State Management
const state = {
    cart: JSON.parse(localStorage.getItem('style_saloon_cart')) || [],
    user: JSON.parse(localStorage.getItem('style_saloon_user')) || null,
    bookings: JSON.parse(localStorage.getItem('style_saloon_bookings')) || [],
};

// State Update Helpers
function updateCart(newCart) {
    state.cart = newCart;
    localStorage.setItem('style_saloon_cart', JSON.stringify(newCart));
    renderCart();
    updateCartBadges();
}

function updateAuth(user) {
    state.user = user;
    if (user) {
        localStorage.setItem('style_saloon_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('style_saloon_user');
    }
    renderAuthUI();
}

function updateProfile(updatedData) {
    state.user = { ...state.user, ...updatedData };
    localStorage.setItem('style_saloon_user', JSON.stringify(state.user));
    renderAuthUI();
}

function updateBookings(newBookings) {
    state.bookings = newBookings;
    localStorage.setItem('style_saloon_bookings', JSON.stringify(newBookings));
}

// UI Handlers
function toggleMobileMenu(show) {
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('menu-backdrop');
    if (!menu || !backdrop) return;

    if (show) {
        menu.classList.remove('-translate-x-full');
        backdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        menu.classList.add('-translate-x-full');
        backdrop.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function toggleCart(show) {
    const cart = document.getElementById('cart-slider');
    const backdrop = document.getElementById('cart-backdrop');
    if (!cart || !backdrop) return;

    if (show) {
        cart.classList.remove('translate-x-full');
        backdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        cart.classList.add('translate-x-full');
        backdrop.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function toggleCheckoutModal(show) {
    const modal = document.getElementById('checkout-modal');
    const backdrop = document.getElementById('checkout-backdrop');
    if (!modal || !backdrop) return;

    if (show) {
        modal.classList.remove('hidden');
        backdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Pre-fill user data if available
        if (state.user) {
            const nameInput = document.getElementById('checkout-name');
            const emailInput = document.getElementById('checkout-email');
            if (nameInput) nameInput.value = state.user.name;
            if (emailInput) emailInput.value = state.user.email;
        }
    } else {
        modal.classList.add('hidden');
        backdrop.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('checkout-name').value;
    const date = document.getElementById('checkout-date').value;
    const time = document.getElementById('checkout-time').value;

    // Save to booking history
    const newBooking = {
        id: Date.now(),
        date: date,
        time: time,
        items: [...state.cart],
        status: 'Completed',
        timestamp: new Date().toISOString()
    };
    
    updateBookings([newBooking, ...state.bookings]);

    alert(`Thank you ${name}! Your booking for ${date} at ${time} has been confirmed. We've sent a confirmation to your email.`);
    
    clearCart();
    toggleCheckoutModal(false);
    toggleCart(false);
}

// Cart Logic
function addToCart(service) {
    const exists = state.cart.find(item => item.name === service.name);
    if (!exists) {
        updateCart([...state.cart, service]);
    }
}

function removeFromCart(serviceName) {
    updateCart(state.cart.filter(item => item.name !== serviceName));
}

function clearCart() {
    updateCart([]);
}

// Rendering Logic
function renderCart() {
    const cartList = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal');
    
    if (!cartList) return;

    if (state.cart.length === 0) {
        cartList.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <i data-lucide="shopping-cart" class="w-10 h-10 text-gray-300"></i>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-[#2c2c2c]">Cart is Empty</h3>
                    <p class="text-sm text-gray-500">Add some services to get started</p>
                </div>
            </div>
        `;
    } else {
        cartList.innerHTML = state.cart.map(item => `
            <div class="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 mb-4">
                <div class="flex-1">
                    <h4 class="font-bold text-[#2c2c2c]">${item.name}</h4>
                    <p class="text-sm text-gray-500">${item.price} • ${item.duration || '30 min'}</p>
                </div>
                <button onclick="removeFromCart('${item.name}')" class="p-2 text-gray-400 hover:text-red-500 transition-colors shrink-0">
                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>
            </div>
        `).join('');
    }

    const total = state.cart.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
        return sum + price;
    }, 0);

    if (subtotalEl) subtotalEl.textContent = `₹${total}`;
    if (window.lucide) lucide.createIcons();
}

function updateCartBadges() {
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = state.cart.length;
        badge.classList.toggle('hidden', state.cart.length === 0);
    });
}

function renderAuthUI() {
    const authContainers = document.querySelectorAll('.auth-container');
    authContainers.forEach(container => {
        if (state.user) {
            container.innerHTML = `
                <a href="profile.html" class="flex items-center space-x-2 text-sm font-semibold text-[#2c2c2c]">
                    <i data-lucide="user" class="w-5 h-5 text-[#ff6b35]"></i>
                    <span class="hidden md:inline">Profile</span>
                </a>
            `;
        } else {
            container.innerHTML = `
                <a href="login.html" class="flex items-center space-x-2 text-sm font-semibold text-[#2c2c2c]">
                    <i data-lucide="log-in" class="w-5 h-5 text-[#ff6b35]"></i>
                    <span class="hidden md:inline">Login</span>
                </a>
            `;
        }
    });
    
    // Update mobile menu profile section
    const mobileProfile = document.getElementById('mobile-profile-section');
    if (mobileProfile) {
        if (state.user) {
            mobileProfile.innerHTML = `
                <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-white shrink-0">
                        <img src="${state.user.gender === 'Female' ? 'assets/female_avatar.png' : 'assets/male_avatar.png'}" alt="Profile" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-grow">
                        <h2 class="text-xl font-bold text-[#2c2c2c] leading-tight">${state.user.name}</h2>
                        <p class="text-sm text-gray-500 truncate w-40">${state.user.email}</p>
                    </div>
                </div>
            `;
        } else {
            mobileProfile.innerHTML = `
                <h2 class="text-2xl font-bold text-[#2c2c2c] leading-tight">Welcome to<br/><span class="text-[#ff6b35]">Style Saloon</span></h2>
                <p class="text-sm text-gray-500 mt-1">Log in to book your next visit</p>
            `;
        }
    }
    
    if (window.lucide) lucide.createIcons();
}

function highlightActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop Nav
    const desktopLinks = document.querySelectorAll('nav a');
    desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === path) {
            link.classList.add('text-[#ff6b35]');
            link.classList.remove('text-[#2c2c2c]');
        } else {
            link.classList.remove('text-[#ff6b35]');
            link.classList.add('text-[#2c2c2c]');
        }
    });

    // Mobile Bottom Nav
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === path) {
            item.classList.add('bg-[#ff6b35]/10', 'text-[#ff6b35]');
            item.classList.remove('text-gray-400');
            // Show label for active item
            const label = item.querySelector('.bottom-nav-label');
            if (label) label.classList.remove('hidden');
        } else {
            item.classList.remove('bg-[#ff6b35]/10', 'text-[#ff6b35]');
            item.classList.add('text-gray-400');
            const label = item.querySelector('.bottom-nav-label');
            if (label) label.classList.add('hidden');
        }
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    renderCart();
    updateCartBadges();
    renderAuthUI();
    highlightActiveLink();
});

