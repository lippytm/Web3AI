# Web3AI - Full Stack AI Application with Blockchain Integration

A modern full-stack application combining blockchain technology with artificial intelligence, featuring user authentication, database management, and deployment-ready infrastructure.

## 🌟 Features

### Frontend
- **React 19** with Vite for fast development
- **TailwindCSS** for responsive, modern UI design
- **Web3 Integration** using ethers.js for blockchain interactions
- **React Router** for navigation
- **Axios** for API communication
- **Context API** for state management

### Backend
- **Node.js & Express.js** RESTful API
- **Sequelize ORM** for PostgreSQL database operations
- **JWT Authentication** with bcrypt for security
- **TensorFlow.js** for AI/ML capabilities
- **Smart Contract Risk Assessment** using neural networks
- **Blockchain Service** with ethers.js

### Database
- **PostgreSQL** for data persistence
- User management with encrypted passwords
- Blockchain interaction history tracking

### AI/ML
- **TensorFlow.js** neural network for smart contract risk assessment
- Risk level classification (low, medium, high)
- Contract analysis with insights and recommendations

### Testing
- **Jest** for backend testing
- **Vitest & React Testing Library** for frontend testing
- Automated test coverage

### Deployment
- **Docker & Docker Compose** for containerization
- **GitHub Actions** CI/CD pipeline
- Production-ready configuration

## 📋 Prerequisites

- Node.js 20.x or higher
- PostgreSQL 15 or higher
- Docker & Docker Compose (for containerized deployment)
- MetaMask or similar Web3 wallet (for frontend blockchain features)

## 🚀 Quick Start

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/lippytm/Web3AI.git
   cd Web3AI
   ```

2. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env with your API URL
   npm install
   npm run dev
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb web3ai_db
   # Database tables will be created automatically on backend startup
   ```

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000
   - Database: localhost:5432

## 📁 Project Structure

```
Web3AI/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── config/            # Database and JWT configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Authentication & error handling
│   │   ├── models/            # Sequelize database models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic (AI, Blockchain)
│   │   └── index.js           # Application entry point
│   ├── tests/                 # Jest tests
│   ├── Dockerfile             # Backend container configuration
│   └── package.json
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # React Context providers
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service layer
│   │   └── App.jsx            # Main application component
│   ├── Dockerfile             # Frontend container configuration
│   ├── nginx.conf             # Nginx configuration
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions CI/CD pipeline
├── docker-compose.yml          # Multi-container orchestration
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Blockchain
- `GET /api/blockchain/balance` - Get wallet balance
- `GET /api/blockchain/transaction/:txHash` - Get transaction details
- `GET /api/blockchain/contract/:address` - Get contract information
- `POST /api/blockchain/interactions` - Save blockchain interaction (protected)
- `GET /api/blockchain/interactions` - Get user interactions (protected)

### AI/ML
- `POST /api/ai/assess-risk` - Assess smart contract risk (protected)
- `POST /api/ai/predict` - Generic AI prediction (protected)
- `GET /api/ai/model-info` - Get AI model information

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
npm test -- --coverage  # With coverage report
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=web3ai_db
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your-secret-key-change-in-production
ETHEREUM_RPC_URL=https://eth.llamarpc.com
POLYGON_RPC_URL=https://polygon-rpc.com
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎨 Frontend Pages

- **Home** - Landing page with feature overview
- **Login/Register** - User authentication
- **Dashboard** - User profile and blockchain interactions
- **AI Analysis** - Smart contract risk assessment tool
- **Blockchain** - Blockchain explorer (balance checker, transaction viewer)

## 🤖 AI Model

The application includes a TensorFlow.js neural network that analyzes smart contracts based on:
- Code complexity
- Transaction count
- Number of unique users
- Total value locked
- Code size
- External calls
- Ownership structure
- Upgradeability
- Audit score
- Time deployed

The model outputs risk levels (low, medium, high) with confidence scores and actionable insights.

## 🔄 CI/CD Pipeline

The GitHub Actions workflow automatically:
1. Runs backend tests with PostgreSQL
2. Runs frontend tests
3. Builds Docker images (on main branch)
4. Validates code quality

## 🛡️ Security Features

- **JWT Authentication** with secure token storage
- **Password Hashing** using bcrypt
- **Environment Variables** for sensitive data
- **CORS Configuration** for API security
- **Input Validation** on all endpoints
- **SQL Injection Protection** via Sequelize ORM

## 📚 Technology Stack

**Frontend:**
- React 19
- Vite
- TailwindCSS
- ethers.js
- Axios
- React Router

**Backend:**
- Node.js 20
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT & bcrypt
- TensorFlow.js
- ethers.js

**DevOps:**
- Docker & Docker Compose
- GitHub Actions
- Nginx

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 👥 Authors

Web3AI Team

## 🙏 Acknowledgments

- TensorFlow.js for machine learning capabilities
- ethers.js for blockchain integration
- The open-source community