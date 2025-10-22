#!/bin/bash

# ============================================
# PORTFOLIO MANAGEMENT SCRIPT
# Quick commands for your portfolio
# ============================================

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         Shadrack Maina - Portfolio Manager                   ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

case "$1" in
    start)
        echo -e "${BLUE}🚀 Starting portfolio server...${NC}"
        cd /home/shaddistech/shadrack-portfolio-pro
        python3 -m http.server 8000 > /tmp/portfolio-server.log 2>&1 &
        echo $! > /tmp/portfolio-server.pid
        sleep 2
        echo -e "${GREEN}✅ Server started on http://localhost:8000${NC}"
        echo -e "${YELLOW}📝 PID: $(cat /tmp/portfolio-server.pid)${NC}"
        echo ""
        echo -e "${BLUE}Opening in browser...${NC}"
        xdg-open http://localhost:8000 2>/dev/null || firefox http://localhost:8000 2>/dev/null &
        ;;
        
    stop)
        echo -e "${YELLOW}⏸️  Stopping portfolio server...${NC}"
        if [ -f /tmp/portfolio-server.pid ]; then
            kill $(cat /tmp/portfolio-server.pid) 2>/dev/null
            rm /tmp/portfolio-server.pid
            echo -e "${GREEN}✅ Server stopped${NC}"
        else
            echo -e "${RED}❌ No server running${NC}"
        fi
        ;;
        
    restart)
        echo -e "${BLUE}🔄 Restarting portfolio server...${NC}"
        $0 stop
        sleep 2
        $0 start
        ;;
        
    status)
        if [ -f /tmp/portfolio-server.pid ]; then
            PID=$(cat /tmp/portfolio-server.pid)
            if ps -p $PID > /dev/null 2>&1; then
                echo -e "${GREEN}✅ Server is running${NC}"
                echo -e "${BLUE}📝 PID: $PID${NC}"
                echo -e "${BLUE}🌐 URL: http://localhost:8000${NC}"
            else
                echo -e "${RED}❌ Server is not running${NC}"
            fi
        else
            echo -e "${RED}❌ No server running${NC}"
        fi
        ;;
        
    open)
        echo -e "${BLUE}🌐 Opening portfolio in browser...${NC}"
        xdg-open http://localhost:8000 2>/dev/null || firefox http://localhost:8000 2>/dev/null &
        ;;
        
    deploy)
        echo -e "${BLUE}🚀 Starting deployment...${NC}"
        cd /home/shaddistech/shadrack-portfolio-pro
        ./deploy.sh
        ;;
        
    stats)
        echo -e "${BLUE}📊 Portfolio Statistics:${NC}"
        echo ""
        cd /home/shaddistech/shadrack-portfolio-pro
        echo -e "${GREEN}Files:${NC}"
        echo "  HTML: $(find . -name "*.html" | wc -l) files"
        echo "  CSS:  $(find . -name "*.css" | wc -l) files"
        echo "  JS:   $(find . -name "*.js" | wc -l) files"
        echo "  JSON: $(find . -name "*.json" | wc -l) files"
        echo ""
        echo -e "${GREEN}Lines of Code:${NC}"
        echo "  Total: $(find . -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')"
        echo ""
        echo -e "${GREEN}Folders:${NC} $(find . -type d | wc -l) directories"
        echo -e "${GREEN}Size:${NC} $(du -sh . | cut -f1)"
        ;;
        
    images)
        echo -e "${BLUE}🎨 Opening image generator...${NC}"
        xdg-open /home/shaddistech/shadrack-portfolio-pro/scripts/generate-placeholders.html 2>/dev/null || \
        firefox /home/shaddistech/shadrack-portfolio-pro/scripts/generate-placeholders.html 2>/dev/null &
        ;;
        
    edit)
        echo -e "${BLUE}✏️  Opening portfolio in editor...${NC}"
        cd /home/shaddistech/shadrack-portfolio-pro
        code . 2>/dev/null || gedit index.html 2>/dev/null || nano index.html
        ;;
        
    backup)
        echo -e "${BLUE}💾 Creating backup...${NC}"
        BACKUP_NAME="portfolio-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
        tar -czf ~/$BACKUP_NAME -C /home/shaddistech shadrack-portfolio-pro
        echo -e "${GREEN}✅ Backup created: ~/$BACKUP_NAME${NC}"
        ;;
        
    *)
        echo -e "${YELLOW}Usage: $0 {command}${NC}"
        echo ""
        echo -e "${GREEN}Available commands:${NC}"
        echo "  start     - Start the portfolio server"
        echo "  stop      - Stop the portfolio server"
        echo "  restart   - Restart the portfolio server"
        echo "  status    - Check server status"
        echo "  open      - Open portfolio in browser"
        echo "  deploy    - Deploy to production"
        echo "  stats     - Show portfolio statistics"
        echo "  images    - Generate placeholder images"
        echo "  edit      - Open in code editor"
        echo "  backup    - Create backup archive"
        echo ""
        echo -e "${BLUE}Examples:${NC}"
        echo "  ./portfolio.sh start"
        echo "  ./portfolio.sh open"
        echo "  ./portfolio.sh deploy"
        echo ""
        ;;
esac