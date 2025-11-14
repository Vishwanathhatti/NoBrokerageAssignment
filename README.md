# PropertyHub Frontend
## An assignment from NoBrokerage

A modern, responsive property listing platform built with Next.js, featuring an intuitive user interface for browsing properties and a comprehensive admin panel for property management.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (Primitives)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Carousel**: Embla Carousel
- **Charts**: Recharts (if needed for analytics)
- **Theme**: Next Themes (dark/light mode support)
- **Utilities**: clsx, tailwind-merge, class-variance-authority

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **File Uploads**: Multer
- **CORS**: cors middleware
- **Logging**: Morgan

## 📡 API Documentation

The backend provides RESTful APIs for property management and admin authentication. All API endpoints are prefixed with `/api`.

### Authentication Endpoints
- **POST** `/api/admin/register` - Register a new admin user
  - Body: `{ "username": "string", "password": "string" }`
- **POST** `/api/admin/login` - Login admin and get JWT token
  - Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token", "admin": { "id": "string", "username": "string" } }`

### Property Endpoints
- **GET** `/api/properties` - Get all properties (supports query parameters for filtering)
  - Query params: `location`, `minPrice`, `maxPrice`, `projectName`
  - Response: `{ "properties": [...], "total": number }`
- **GET** `/api/properties/:id` - Get property by ID
  - Response: Property object with full details
- **POST** `/api/properties` - Create a new property (requires authentication)
  - Headers: `Authorization: Bearer <jwt_token>`
  - Body: Form data with property details and image files
  - Files: `main_image` (single), `gallery_images` (up to 10)
- **PUT** `/api/properties/:id` - Update property by ID (requires authentication)
  - Headers: `Authorization: Bearer <jwt_token>`
  - Body: Form data with updated property details and optional image files
- **DELETE** `/api/properties/:id` - Delete property by ID (requires authentication)
  - Headers: `Authorization: Bearer <jwt_token>`

### Utility Endpoints
- **GET** `/api/health` - Health check endpoint
  - Response: `{ "status": "OK", "message": "Server is running", "timestamp": "ISO_string" }`
- **GET** `/api/endpoints` - List all available API endpoints
  - Response: `{ "endpoints": [ { "method": "string", "path": "string", "description": "string" } ] }`

### File Uploads
- Images are served statically from `/uploads` path
- Supported formats: JPEG, PNG, WebP
- Maximum file size: 5MB per image
- Main image: 1 file allowed
- Gallery images: Up to 10 files allowed

### Error Handling
All endpoints return standard HTTP status codes and JSON error responses:
```json
{
  "message": "Error description",
  "stack": "Error stack (development only)"
}
```

## ✨ Features

### User Features
- **Property Browsing**: Browse through a curated list of premium properties
- **Advanced Search & Filtering**: Filter properties by location, price range, project name, and search terms
- **Property Details**: Detailed view with image carousel, highlights, and comprehensive information
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

### Admin Features
- **Secure Authentication**: JWT-based admin login system
- **Property Management**: Full CRUD operations for properties
- **Image Upload**: Support for main image and gallery images
- **Dashboard**: Overview of all properties with quick actions
- **Form Validation**: Comprehensive validation for all property data

## 📁 Project Structure

### Frontend Structure
```
frontend/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   │   ├── login/         # Admin login page
│   │   ├── add/           # Add new property
│   │   ├── edit/[id]/     # Edit property by ID
│   │   └── page.tsx       # Admin dashboard
│   ├── api/               # API routes (if any)
│   ├── property/[id]/     # Property detail page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (property listings)
├── components/            # Reusable UI components
│   ├── ui/               # Radix UI components
│   ├── admin-header.tsx  # Admin navigation
│   ├── navbar.tsx        # Main navigation
│   ├── property-card.tsx # Property listing card
│   ├── property-form.tsx # Property creation/editing form
│   └── ...
├── lib/                  # Utility functions and configurations
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database/API calls
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # General utilities
└── public/               # Static assets
```

### Backend Structure
```
backend/
├── config/               # Database and configuration files
│   └── db.js            # MongoDB connection setup
├── controllers/         # Business logic for API endpoints
│   ├── adminController.js    # Admin authentication logic
│   └── propertyController.js # Property CRUD operations
├── middleware/          # Express middleware
│   └── authMiddleware.js     # JWT authentication middleware
├── models/             # Mongoose data models
│   ├── Admin.js        # Admin user schema
│   └── Property.js     # Property schema
├── routes/             # API route definitions
│   ├── adminRoutes.js      # Admin authentication routes
│   └── propertyRoutes.js   # Property CRUD routes
├── uploads/            # File upload directory
├── .env               # Environment variables
├── server.js          # Main server file
└── package.json       # Dependencies and scripts
```

## 🛣️ Pages & Routes

### Public Routes
- **`/`** - Property Listings: Main page with search, filters, and property grid
- **`/property/[id]`** - Property Details: Individual property page with image carousel and full details

### Admin Routes
- **`/admin/login`** - Admin Login: Secure authentication page
- **`/admin`** - Admin Dashboard: Overview of all properties with management options
- **`/admin/add`** - Add Property: Form to create new property listings
- **`/admin/edit/[id]`** - Edit Property: Form to update existing properties

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Backend server running (see backend README)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd no-brokerage-assignment/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend directory with necessary environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   # Add other environment variables as needed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Backend Setup
Ensure the backend server is running on the specified port (default: 5000). Refer to the backend README for detailed setup instructions.

#### Backend Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/propertyhub
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```
- `PORT`: Port on which the server runs (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `NODE_ENV`: Environment mode (development/production)

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🔧 Key Components

### Core Components
- **Navbar**: Main navigation with branding
- **SearchFilterBar**: Advanced search and filtering interface
- **PropertyCard**: Property listing card with key information
- **PropertyDetails**: Comprehensive property information display
- **ImageCarousel**: Interactive image gallery for properties
- **PropertyForm**: Form for creating/editing properties
- **PropertiesTable**: Admin table for property management
- **AdminHeader**: Admin navigation and logout functionality

### UI Components
- **Button**: Customizable button component
- **Card**: Content container with consistent styling
- **Dialog**: Modal dialogs for confirmations and forms
- **Toast**: Notification system for user feedback

## 🔐 Authentication

The admin panel uses JWT-based authentication:
- Login credentials are validated against the backend
- Tokens are stored securely in localStorage
- Protected routes redirect to login if no valid token is present
- Automatic logout on token expiration

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with multi-column layouts
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Single-column layouts with collapsible navigation

## 🎨 Styling & Theming

- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible, unstyled UI primitives
- **Custom Design System**: Consistent color palette, typography, and spacing
- **Dark/Light Mode**: Theme switching capability (implemented with next-themes)

## 📊 Data Management

- **TypeScript Interfaces**: Strongly typed data structures for properties and admin users
- **API Integration**: Centralized API calls in `lib/db.ts`
- **State Management**: React hooks for local state management
- **Form Validation**: Zod schemas for runtime type checking and validation

## 🚀 Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

The application will be available on port 3000 by default.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

**Vishwanath Hatti**

---

*Built with ❤️ for NoBrokerage Assignment*
