# LandSellerPro Website

A modern, professional landing page for a real estate land selling business. Inspired by ruralacres.com.

## Features

- **Modern, Clean Design** - Professional UI with smooth animations
- **Fully Responsive** - Works on desktop, tablet, and mobile devices
- **Interactive Components**:
  - Sticky navigation with scroll effects
  - Mobile hamburger menu
  - Testimonial carousel with autoplay
  - FAQ accordion
  - Scroll reveal animations
  - Form validation with notifications
  - Smooth scroll navigation

## Project Structure

```
land-seller-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles with CSS variables
├── js/
│   └── main.js         # Interactive functionality
├── images/             # Place your images here
└── README.md           # This file
```

## Getting Started

1. **Open locally**: Simply open `index.html` in your browser
2. **Use a local server** (recommended for development):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (npx)
   npx serve
   
   # Using VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"
   ```

## Customization

### Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary: #2563eb;        /* Main brand color */
    --primary-dark: #1d4ed8;   /* Darker shade */
    --secondary: #10b981;      /* Accent color */
    --dark: #1e293b;           /* Text color */
    /* ... more variables */
}
```

### Content
- Update text content directly in `index.html`
- Replace placeholder contact info with your actual details
- Add real testimonials from your customers
- Update FAQ questions and answers

### Images
Place your images in the `images/` folder:
- Hero background image
- Property photos
- Team photos
- Logo

## Sections Included

1. **Navigation** - Sticky header with smooth scroll links
2. **Hero** - Large headline with CTAs and stats
3. **Trust Badges** - Social proof indicators
4. **Problem/Solution** - Value proposition
5. **Promises** - Key benefits cards
6. **Process** - 5-step process timeline
7. **Benefits** - Detailed feature cards
8. **Testimonials** - Customer reviews carousel
9. **Why Choose Us** - Key differentiators
10. **FAQ** - Accordion-style questions
11. **Contact** - Form and contact details
12. **Footer** - Links and legal info

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This template is free to use for personal and commercial projects.
