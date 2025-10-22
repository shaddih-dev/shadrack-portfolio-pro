#!/bin/bash

# ============================================
# PORTFOLIO DEPLOYMENT SCRIPT
# Shadrack Maina - Professional Portfolio
# ============================================

echo "🚀 Portfolio Deployment Script"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if git is initialized
if [ ! -d .git ]; then
    print_info "Initializing Git repository..."
    git init
    print_success "Git initialized"
else
    print_info "Git repository already initialized"
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    print_warning ".gitignore not found, creating one..."
    cat > .gitignore << 'EOF'
node_modules/
.env
.DS_Store
*.log
.vercel
.netlify
EOF
    print_success ".gitignore created"
fi

# Add all files
print_info "Adding files to git..."
git add .
print_success "Files added"

# Commit
print_info "Creating commit..."
git commit -m "Initial portfolio deployment - Shadrack Maina" || print_warning "Nothing to commit or commit failed"

# Ask user which deployment method they want
echo ""
echo "Choose deployment method:"
echo "1) Netlify"
echo "2) Vercel"
echo "3) GitHub Pages"
echo "4) All of the above"
echo "5) Skip deployment (just setup)"
echo ""
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        print_info "Setting up Netlify deployment..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod
            print_success "Deployed to Netlify!"
        else
            print_warning "Netlify CLI not found. Install with: npm install -g netlify-cli"
            print_info "Then run: netlify deploy --prod"
        fi
        ;;
    2)
        print_info "Setting up Vercel deployment..."
        if command -v vercel &> /dev/null; then
            vercel --prod
            print_success "Deployed to Vercel!"
        else
            print_warning "Vercel CLI not found. Install with: npm install -g vercel"
            print_info "Then run: vercel --prod"
        fi
        ;;
    3)
        print_info "Setting up GitHub Pages..."
        print_info "Please follow these steps:"
        echo "  1. Create a new repository on GitHub"
        echo "  2. Run: git remote add origin YOUR_REPO_URL"
        echo "  3. Run: git branch -M main"
        echo "  4. Run: git push -u origin main"
        echo "  5. Enable GitHub Pages in repository settings"
        ;;
    4)
        print_info "Setting up all deployment options..."
        print_warning "Please install CLIs manually and deploy to each platform"
        ;;
    5)
        print_info "Skipping deployment"
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
print_success "Setup complete!"
echo ""
print_info "Next steps:"
echo "  • Test locally: python3 -m http.server 8000"
echo "  • Open browser: http://localhost:8000"
echo "  • Add your images to assets/images/"
echo "  • Customize content in index.html and data/projects.json"
echo ""
print_success "Happy coding! 🚀"