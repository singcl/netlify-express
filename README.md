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
├── config/                # Application configuration
│   └── app.js            # Main configuration file
├── middleware/            # Express middleware
│   ├── errorHandler.js   # Error handling middleware
│   └── logger.js         # Request logging middleware
├── routes/               # API routes
│   ├── index.js         # Main routes index
│   ├── apiV1.js         # API v1 routes
│   └── apiV2.js         # API v2 routes
├── utils/                # Utility functions
│   └── response.js      # Standardized response helpers
├── public/               # Static files served by Express
│   ├── index.html       # Main HTML file
│   └── app.js           # Frontend JavaScript
├── netlify/
│   └── functions/
│       └── api.js       # Netlify function handler
├── server.js            # Express server (for local development)
├── netlify.toml         # Netlify configuration
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## 🛠️ API Endpoints

### API v1 (Legacy)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hello` | Returns a greeting message with timestamp |
| GET | `/api/users` | Returns mock user data |
| POST | `/api/contact` | Handles contact form submissions |

### API v2 (Enhanced)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/apiv2/status` | Returns API v2 status and version information |
| GET | `/apiv2/products` | Returns product data with filtering support |
| POST | `/apiv2/orders` | Creates new orders with validation |
| GET | `/apiv2/tasks` | Get task manager status and running tasks |
| POST | `/apiv2/tasks/start` | Start the task manager |
| POST | `/apiv2/tasks/stop` | Stop the task manager |
| GET | `/apiv2/external-api` | Get external API monitoring statistics |
| POST | `/apiv2/external-api/test` | Manually test external API connectivity |
| POST | `/apiv2/external-api/test-endpoints` | Test specific external API endpoints |

#### API v2 Features:
- **Enhanced Status Endpoint**: Returns version info, environment status, and feature list
- **Product Filtering**: Support for category and stock filtering via query parameters
- **Order Management**: Full order creation with validation and total calculation
- **Task Management**: Scheduled tasks for cleanup, health checks, and data synchronization
- **External API Monitoring**: Automatic monitoring of external APIs to keep them alive
- **Version Information**: All responses include API version for compatibility tracking

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

## ⏰ Scheduled Tasks

The application includes a comprehensive task management system with the following scheduled tasks:

### Task Types

1. **Cleanup Tasks**
   - **Log Cleanup**: Daily at 2 AM - Removes log files older than 7 days
   - **Temp Files Cleanup**: Every 6 hours - Removes temporary files older than 24 hours
   - **Backup Cleanup**: Removes backup files older than 30 days

2. **Health Check Tasks**
   - **System Health Check**: Every 5 minutes - Monitors memory, CPU, and uptime
   - **Database Health Check**: Every 15 minutes - Checks database connectivity

3. **Data Sync Tasks**
   - **Data Synchronization**: Every hour - Syncs data with external sources
   - **Data Backup**: Daily at 3 AM - Creates backups of all data types

4. **External API Monitoring Tasks**
   - **NetEase API Ping**: Every minute - Keeps the NetEase Cloud Music API alive
   - **NetEase API Testing**: Every 30 minutes - Tests specific API endpoints

### Task Management

- **Start Tasks**: `POST /apiv2/tasks/start`
- **Stop Tasks**: `POST /apiv2/tasks/stop`
- **Check Status**: `GET /apiv2/tasks`

### Adding New Tasks

1. **Create task function in appropriate module** (`tasks/cleanup.js`, `tasks/healthCheck.js`, or `tasks/dataSync.js`)
2. **Add task to TaskManager** in `tasks/index.js`
3. **Configure schedule** using cron syntax

Example:
```javascript
// In tasks/index.js
const newTask = cron.schedule('0 */2 * * *', () => {
  // Run every 2 hours
  yourTaskFunction();
}, {
  scheduled: true,
  timezone: "UTC"
});
```

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