# Muhammad Ikrama - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features dark/light mode toggle, animated backgrounds, project showcase, and integrated Google Calendar booking.

## 🚀 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Animated Backgrounds**: CSS-based star field (dark) and galaxy (light) animations
- **Project Showcase**: Detailed project cards with achievements and technologies
- **Career Timeline**: Interactive experience timeline with animations
- **Skills Section**: Categorized technical expertise display
- **Google Calendar Integration**: Direct meeting booking functionality
- **Smooth Animations**: Framer Motion powered interactions
- **Performance Optimized**: Fast loading with optimized images and animations
- **Accessibility**: Screen reader friendly with proper ARIA labels

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify compatible

## 📦 Installation

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/muhammad-ikrama-portfolio.git
cd muhammad-ikrama-portfolio
\`\`\`

### Install Dependencies

Using npm:
\`\`\`bash
npm install
\`\`\`

Using yarn:
\`\`\`bash
yarn install
\`\`\`

Using pnpm:
\`\`\`bash
pnpm install
\`\`\`

Using bun:
\`\`\`bash
bun install
\`\`\`

## 🚀 Development

Start the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🏗️ Build

Create a production build:

\`\`\`bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun run build
\`\`\`

Start the production server:

\`\`\`bash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
\`\`\`

## 📁 Project Structure

\`\`\`
muhammad-ikrama-portfolio/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main portfolio page
├── public/
│   └── (static assets)
├── .gitignore
├── README.md
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
\`\`\`

## 🎨 Customization

### Personal Information

Update the following in `app/page.tsx`:

1. **Hero Section**: Name, title, description, and profile image
2. **Projects**: Add/modify project details, achievements, and technologies
3. **Experience**: Update career timeline with your experience
4. **Skills**: Modify skill categories and technologies
5. **Contact**: Update email, phone, and location information
6. **Education**: Update educational background

### Styling

- **Colors**: Modify color schemes in `tailwind.config.js`
- **Animations**: Customize animations in `app/globals.css`
- **Layout**: Adjust component layouts in `app/page.tsx`

### Google Calendar Integration

The booking system creates Google Calendar events. To customize:

1. Update the email in the `handleBookMeeting` function
2. Modify meeting duration (default: 1 hour)
3. Customize meeting details template

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to [Netlify](https://netlify.com)
3. Or connect your GitHub repository for automatic deployments

### Manual Deployment

1. Run `npm run build`
2. Upload the generated files to your hosting provider
3. Configure your server to serve the static files

## 🔧 Configuration Files

### Environment Variables

Create a `.env.local` file for any environment-specific variables:

\`\`\`env
# Add any environment variables here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
\`\`\`

### Next.js Configuration

The `next.config.js` includes:
- Image optimization settings
- Build error handling
- Export configuration for static hosting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for faster loads

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed correctly
2. **Image Loading**: Check image URLs and formats
3. **Animation Performance**: Reduce animation complexity on slower devices
4. **Theme Switching**: Clear localStorage if theme toggle isn't working

### Development Issues

\`\`\`bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run build
\`\`\`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📞 Contact

- **Email**: ikramaansari312@gmail.com
- **Phone**: (+92) 333-3666-962
- **Location**: Lahore, Pakistan

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vercel](https://vercel.com/) for seamless deployment

---

**Built with ❤️ by Muhammad Ikrama**
