# Express.js + Netlify App

A modern Express.js application designed for deployment on Netlify using serverless functions. This project demonstrates how to build a full-stack application with Express.js that can be deployed as a serverless application on Netlify.

## 🚀 Features

- **Express.js Backend**: Full Express.js functionality with middleware, routing, and error handling
- **Serverless Deployment**: Deployed on Netlify Functions for automatic scaling
- **Modern Frontend**: Beautiful, responsive UI built with Tailwind CSS
- **API Endpoints**: RESTful API with multiple endpoints for testing
- **Contact Form**: Functional contact form with validation
- **Responsive Design**: Mobile-first design that works on all devices

## 📁 Project Structure

```
netlify-express/
├── public/                 # Static files served by Express
│   ├── index.html         # Main HTML file
│   └── app.js             # Frontend JavaScript
├── netlify/
│   └── functions/
│       └── api.js         # Netlify function handler
├── server.js              # Express server (for local development)
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hello` | Returns a greeting message with timestamp |
| GET | `/api/users` | Returns mock user data |
| POST | `/api/contact` | Handles contact form submissions |

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Netlify account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd netlify-express
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Local Development Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

## 🌐 Deployment to Netlify

### Method 1: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy the application**
   ```bash
   netlify deploy --prod
   ```

### Method 2: Deploy via Git Integration

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect your repository to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose your repository
   - Configure build settings:
     - Build command: `npm install`
     - Publish directory: `public`
     - Functions directory: `netlify/functions`

3. **Deploy**
   - Netlify will automatically deploy your site
   - Your site will be available at `https://your-site-name.netlify.app`

## ⚙️ Configuration

### Netlify Configuration (`netlify.toml`)

The `netlify.toml` file contains:

- **Build settings**: Specifies the publish directory and functions directory
- **Redirects**: Routes API calls to Netlify Functions and handles SPA routing
- **Headers**: Security headers and CORS configuration

### Environment Variables

You can set environment variables in Netlify:

- `NODE_ENV`: Set to `production` for deployment
- Add any other environment variables your app needs

## 🔧 Customization

### Adding New API Routes

1. **Add the route to `server.js`**
   ```javascript
   app.get('/api/new-route', (req, res) => {
     res.json({ message: 'New route working!' });
   });
   ```

2. **The route will automatically be available in production**

### Styling

The app uses Tailwind CSS for styling. You can:

- Modify the Tailwind configuration in `public/index.html`
- Add custom CSS in the `<style>` section
- Use Tailwind utility classes for rapid development

### Frontend Features

The frontend includes:

- **Responsive navigation**
- **Hero section with call-to-action**
- **Features showcase**
- **API testing interface**
- **Contact form with validation**
- **Smooth scrolling**
- **Interactive animations**

## 🐛 Troubleshooting

### Common Issues

1. **API calls not working locally**
   - Ensure the development server is running on port 3000
   - Check that all dependencies are installed

2. **Deployment issues**
   - Verify your `netlify.toml` configuration
   - Check Netlify build logs for errors
   - Ensure all files are committed to your repository

3. **CORS errors**
   - The app includes CORS headers for API routes
   - If you're calling from a different domain, you may need to adjust the headers

### Debug Mode

To enable debug logging, set the environment variable:
```bash
DEBUG=express:* npm run dev
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Support

If you have any questions or need help:

1. Check the [Netlify documentation](https://docs.netlify.com/)
2. Review the [Express.js documentation](https://expressjs.com/)
3. Open an issue in this repository

---

**Built with ❤️ using Express.js and Netlify** 