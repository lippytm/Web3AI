#!/bin/bash

# Sandboxes Quick Start Script
# This script helps you get started with the Web3AI sandboxes

set -e

echo "=================================================="
echo "Web3AI Sandboxes Quick Start"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}Project root: $PROJECT_ROOT${NC}"
echo ""

# Function to run backend sandboxes
run_backend_sandboxes() {
    echo -e "${BLUE}=== Backend Sandboxes ===${NC}"
    echo ""
    
    # Check if virtual environment exists
    if [ ! -d "$PROJECT_ROOT/backend/venv" ]; then
        echo -e "${YELLOW}Creating Python virtual environment...${NC}"
        cd "$PROJECT_ROOT/backend"
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    echo -e "${YELLOW}Activating virtual environment...${NC}"
    source "$PROJECT_ROOT/backend/venv/bin/activate"
    
    # Install dependencies if needed
    if ! pip show fastapi &> /dev/null; then
        echo -e "${YELLOW}Installing backend dependencies...${NC}"
        pip install -q -r "$PROJECT_ROOT/backend/requirements.txt"
    fi
    
    # Check if .env exists
    if [ ! -f "$PROJECT_ROOT/backend/.env" ]; then
        echo -e "${YELLOW}Creating .env file from example...${NC}"
        cp "$PROJECT_ROOT/backend/.env.example" "$PROJECT_ROOT/backend/.env"
        echo -e "${YELLOW}Please edit backend/.env with your API keys${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}Running Blockchain Simulation...${NC}"
    python "$SCRIPT_DIR/backend/blockchain_simulation.py"
    
    echo ""
    echo -e "${BLUE}To run AI diagnostics, use:${NC}"
    echo "  python sandboxes/backend/ai_diagnostics.py"
    echo ""
}

# Function to run contract sandboxes
run_contract_sandboxes() {
    echo -e "${BLUE}=== Contract Sandboxes ===${NC}"
    echo ""
    
    cd "$PROJECT_ROOT/contracts"
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing contract dependencies...${NC}"
        npm install -q
    fi
    
    # Copy sandbox files to contracts directory
    echo -e "${YELLOW}Copying sandbox files...${NC}"
    cp "$SCRIPT_DIR/contracts/SimpleStorage.sol" contracts/
    cp "$SCRIPT_DIR/contracts/SimpleStorage.test.js" test/
    
    echo -e "${GREEN}Compiling contracts...${NC}"
    npx hardhat compile
    
    echo ""
    echo -e "${GREEN}Running sandbox tests...${NC}"
    npm test test/SimpleStorage.test.js
    
    echo ""
}

# Function to setup frontend sandboxes
setup_frontend_sandboxes() {
    echo -e "${BLUE}=== Frontend Sandboxes ===${NC}"
    echo ""
    
    cd "$PROJECT_ROOT/frontend"
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing frontend dependencies...${NC}"
        npm install -q
    fi
    
    # Create sandbox pages
    echo -e "${YELLOW}Creating sandbox pages...${NC}"
    mkdir -p app/sandbox/web3 app/sandbox/ai
    
    echo "export { default } from '@/../sandboxes/frontend/Web3Sandbox';" > app/sandbox/web3/page.tsx
    echo "export { default } from '@/../sandboxes/frontend/AIChatSimulation';" > app/sandbox/ai/page.tsx
    
    echo -e "${GREEN}Frontend sandboxes ready!${NC}"
    echo ""
    echo -e "${BLUE}To test the frontend sandboxes:${NC}"
    echo "  1. Start the backend: cd backend && uvicorn app.main:app --reload"
    echo "  2. Start the frontend: cd frontend && npm run dev"
    echo "  3. Visit http://localhost:3000/sandbox/web3"
    echo "  4. Visit http://localhost:3000/sandbox/ai"
    echo ""
}

# Main menu
echo "What would you like to do?"
echo ""
echo "1) Run backend sandboxes"
echo "2) Setup and run contract sandboxes"
echo "3) Setup frontend sandboxes"
echo "4) All of the above"
echo "5) Exit"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        run_backend_sandboxes
        ;;
    2)
        run_contract_sandboxes
        ;;
    3)
        setup_frontend_sandboxes
        ;;
    4)
        run_backend_sandboxes
        echo ""
        run_contract_sandboxes
        echo ""
        setup_frontend_sandboxes
        ;;
    5)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo -e "${YELLOW}Invalid choice. Exiting...${NC}"
        exit 1
        ;;
esac

echo ""
echo "=================================================="
echo -e "${GREEN}Done!${NC}"
echo "=================================================="
echo ""
echo "For more information, see sandboxes/README.md"
