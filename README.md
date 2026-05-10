# Style Saloon | Premium Grooming Experience ✂️✨

Style Saloon is a sophisticated, high-performance web application designed for a premium salon experience. It combines modern design aesthetics with a seamless user interface to offer grooming and beauty services at your fingertips.

![Project Preview](assets/splash_logo.png)

## 🌟 Key Features

- **🛍️ Dynamic Shopping Cart**: A persistent cart system that allows users to add and manage multiple services before "booking."
- **👤 User Profiles**: Personalized user experience with editable profile details and persistent data across sessions.
- **📅 simulated Booking System**: Users can "book" appointments which are then tracked in their booking history.
- **📱 Hybrid Mobile Experience**: A unique mobile-first design featuring a custom bottom navigation bar and a sliding drawer menu for effortless navigation on smaller screens.
- **✨ Premium UI/UX**: Built with a "wow" factor in mind, utilizing glassmorphism, smooth transitions, and a curated color palette.
- **🔐 Local Authentication**: Simulated login and sign-up flow that maintains user state using browser `localStorage`.

## 🎨 Design Philosophy

Style Saloon is built on a "Premium & Modern" design language:

- **Color Palette**:
    - **Primary**: `#ff6b35` (Vibrant Orange) - Represents energy and creativity.
    - **Secondary**: `#fff5f0` (Soft Cream) - Provides a clean, luxury backdrop.
    - **Text**: `#2c2c2c` (Deep Gray) - Ensures high readability and contrast.
- **Typography**: Uses the **Inter** font family for its clean, professional, and highly legible characteristics.
- **Iconography**: Powered by **Lucide Icons** for a consistent and modern look.
- **Visual Effects**: Includes backdrop blurs (glassmorphism), subtle gradients, and micro-animations to enhance user engagement.

## 🛠️ Technical Stack

- **Structure**: Semantic HTML5 for SEO and accessibility.
- **Styling**: 
    - **Tailwind CSS (via CDN)** for rapid, utility-first styling.
    - **Vanilla CSS** for custom components, variables, and complex animations.
- **Logic**: **Vanilla JavaScript (ES6+)** for state management and DOM manipulation.
- **Persistence**: **Web Storage API (localStorage)** to ensure data (cart, user, bookings) persists even after page refreshes.
- **Assets**: Optimized images and vector graphics for fast loading times.

## 📂 Project Structure

```text
FUTURE_UX_01/
├── index.html        # Landing page with hero, reviews, and gallery
├── services.html     # Service listing with cart integration
├── pricing.html      # Detailed service packages and pricing
├── contact.html      # Contact information and inquiry form
├── login.html        # Authentication gateway (Login/Signup)
├── profile.html      # User dashboard and booking history
├── app.js            # Core application logic & state management
├── style.css         # Custom CSS variables and global styles
└── assets/           # Images, logos, and media assets
```

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RamKalyan10/FUTURE_UX_01.git
   ```
2. **Open the project**:
   Simply open `index.html` in any modern web browser. No build steps or servers are required!

## 🔧 Implementation Details

### State Management
The application uses a centralized `state` object in `app.js` to track the cart, user authentication, and bookings. Every state change is automatically mirrored to `localStorage`, ensuring a seamless experience across page transitions.

### Responsive Navigation
- **Desktop**: A standard sticky header with full navigation.
- **Mobile**: A hybrid approach using a **Sliding Drawer** for depth and a **Fixed Bottom Bar** for quick access to core features (Home, Services, Contact, Profile).

### Simulated Backend
While the app is frontend-only, it simulates a full-stack experience by managing "database" entries (users, bookings) within the browser's local storage, demonstrating how a real-world API would interact with the UI.

---

*Developed for the Future Interns program by Ram Kalyan.*
