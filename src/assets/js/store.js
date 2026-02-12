document.addEventListener('alpine:init', () => {
    Alpine.data('globalStore', () => ({
        isDark: false,
        cart: [],

        init() {
            this.isDark = localStorage.getItem('theme') === 'dark';
            this.cart = JSON.parse(localStorage.getItem('cart')) || [];

            if (this.isDark) {
                document.documentElement.classList.add('dark');
            }

            this.$watch('isDark', val => {
                localStorage.setItem('theme', val ? 'dark' : 'light');
                if (val) document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
            });

            this.$watch('cart', val => {
                localStorage.setItem('cart', JSON.stringify(val));
            });
        },

        toggleTheme() {
            this.isDark = !this.isDark;
        },

        addToCart(product) {
            const existing = this.cart.find(item => item.id === product.id);
            if (existing) {
                existing.qty++;
                // Update properties in case they changed (like code or price)
                existing.title = product.title;
                existing.price = product.price;
                existing.img = product.img;
                existing.code = product.code;
            } else {
                this.cart.push({ ...product, qty: 1 });
            }
            // Optional: Notification
        },

        removeFromCart(id) {
            this.cart = this.cart.filter(item => item.id !== id);
        },

        updateQty(id, delta) {
            const item = this.cart.find(item => item.id === id);
            if (item) {
                item.qty += delta;
                if (item.qty < 1) item.qty = 1;
            }
        },

        get cartCount() {
            return this.cart.reduce((acc, item) => acc + item.qty, 0);
        },

        get cartTotal() {
            return this.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
        }
    }));
});
