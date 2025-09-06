# Pravah.ai - KMRL Document Automation MVP

A modern, beautiful, and intelligent document automation system for KMRL (Kochi Metro Rail Limited) operations. Built with React, TypeScript, and Tailwind CSS with premium dark theme and advanced animations.

## Features

### Core Functionality
- 🚀 **Smart Document Upload** - Drag & drop with real-time progress and processing stages
- 🤖 **OCR & AI Processing** - Automatic text extraction and intelligent summarization
- 👥 **Stakeholder Routing** - Automatic routing to relevant teams (Station Controller, Procurement, HR)
- ✅ **Quality Control** - Human-in-the-loop editing for low-confidence extractions
- 🔍 **Advanced Search** - Full-text search with filters and smart categorization
- 📊 **Analytics Dashboard** - Real-time stats and department breakdowns
- 🔌 **Connectors** - Integration with SharePoint, Maximo, IMAP, WhatsApp
- 📋 **Audit Trail** - Complete document lifecycle tracking

### Visual Design
- 🎨 **Premium Dark Theme** - Modern dark UI with teal and amber accents
- ✨ **Advanced Animations** - Framer Motion micro-interactions and Vanta.js backgrounds
- 💫 **Glow Effects** - Card hover effects, priority indicators, and confidence badges
- 📱 **Responsive Design** - Mobile-first approach with adaptive layouts
- 🎯 **Accessibility** - WCAG AA compliant with keyboard navigation

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS for premium effects
- **Animations**: Framer Motion + Vanta.js
- **Icons**: Lucide React
- **File Upload**: React Dropzone
- **HTTP Client**: Axios
- **Charts**: D3.js / Recharts
- **Fonts**: Inter (UI) + Sora (Headings)

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### 🚀 One-Click Launch (Recommended)

**Windows Users:**
- Double-click `launcher.bat` for a complete menu with all options
- Or double-click `run-project.bat` to start development server directly

**PowerShell Users:**
- Right-click `run-project.ps1` → "Run with PowerShell"

**Linux/Mac Users:**
- Run `chmod +x run-project.sh && ./run-project.sh`

### Manual Installation

```bash
# Clone the repository
git clone <repository-url>
cd pravah-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Launch Scripts

| Script | Purpose |
|--------|---------|
| `launcher.bat` | **Interactive menu** with all options (Windows) |
| `run-project.bat` | Quick development server start (Windows) |
| `run-project.ps1` | PowerShell version (Windows) |
| `run-project.sh` | Shell script (Linux/Mac) |
| `setup.bat` | Install dependencies only (Windows) |
| `run-production.bat` | Build and run production server (Windows) |

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application
open http://localhost:3000
```

## Project Structure

```
pravah-ai/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AppShell.tsx    # Main layout wrapper
│   │   ├── Header.tsx      # Top navigation
│   │   ├── Sidebar.tsx     # Left navigation
│   │   ├── SummaryCard.tsx # Document summary cards
│   │   └── VantaBackground.tsx # Animated backgrounds
│   ├── pages/              # Route components
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── Upload.tsx      # File upload interface
│   │   ├── DocumentView.tsx # Document viewer
│   │   ├── QCEditor.tsx    # Quality control editor
│   │   ├── Connectors.tsx  # Integration management
│   │   └── Audit.tsx       # Audit trail viewer
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts        # Core data models
│   ├── api/                # API client
│   │   └── index.ts        # HTTP client setup
│   ├── App.tsx             # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                 # Static assets
├── tailwind.config.js     # Tailwind configuration
├── vite.config.ts         # Vite configuration
├── Dockerfile             # Container setup
├── docker-compose.yml     # Multi-service setup
└── README.md              # This file
```

## Design System

### Colors
- **Background**: `#071028` (Dark navy)
- **Panels**: `#0E1A2B` (Muted blue)
- **Accent**: `#00C2A8` (Teal mint)
- **Accent 2**: `#FFB400` (Warm amber)
- **Muted**: `#9AA7BD` (Slate)

### Typography
- **Headings**: Sora, Poppins (600-700 weight)
- **Body**: Inter (400-500 weight)
- **UI Elements**: Clean, readable, accessible contrast

### Components
- **Cards**: Glass morphism with subtle gradients and glow effects
- **Buttons**: Three variants (primary, ghost, secondary) with hover animations
- **Form Elements**: Dark theme with accent focus states
- **Priority Indicators**: Color-coded borders (red/amber/teal)

## Key Components

### SummaryCard
Interactive cards displaying document summaries with:
- Priority color coding
- Confidence indicators
- Source provenance
- Action buttons (View, Acknowledge, Assign, Create Ticket)
- Hover animations and glow effects

### Upload Area
Advanced file upload with:
- Drag & drop functionality
- Real-time progress tracking
- Processing stage visualization
- File previews and validation
- Department and priority settings

### Dashboard
Central hub featuring:
- Statistics cards with animations
- Advanced filtering and search
- Responsive grid layout
- Real-time updates via WebSocket

## API Integration

The frontend is designed to work with RESTful APIs:

```typescript
// Document upload
POST /api/upload
// Document processing status
GET /api/documents/:id/status
// Acknowledge summary
POST /api/summaries/:id/acknowledge
// Reprocess with corrections
POST /api/documents/:id/reprocess
```

See `src/api/index.ts` for complete API client implementation.

## Development

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- TypeScript strict mode enabled
- ESLint + Prettier configured
- Consistent component patterns
- Comprehensive prop types

## Deployment

### Production Build
```bash
npm run build
```

### Docker
```bash
# Build image
docker build -t pravah-ai .

# Run container
docker run -p 3000:80 pravah-ai
```

### Environment Variables
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_WEBSOCKET_URL` - WebSocket server URL

## Performance

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Dynamic imports for heavy components
- **Asset Optimization**: Vite's built-in optimization
- **Caching**: Aggressive caching for static assets

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+
- Mobile browsers with ES2020 support

## License

This project is part of the Smart India Hackathon 2024 submission for KMRL.

## Contributing

This is an MVP prototype. For production deployment, consider:

1. **Security**: Add authentication, CSRF protection, input validation
2. **Testing**: Unit tests, integration tests, E2E tests
3. **Monitoring**: Error tracking, performance monitoring
4. **Accessibility**: Full WCAG AA compliance audit
5. **Internationalization**: Multi-language support
6. **Progressive Web App**: Offline functionality, push notifications

---

Built with ❤️ for Smart India Hackathon 2024
