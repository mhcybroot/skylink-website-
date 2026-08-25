#!/usr/bin/env bash

# ==============================================================================
# Skylink Website Deployment & Auto-Update Script
# Pulls latest changes from GitHub, builds production bundle, and restarts service.
# ==============================================================================

set -e

# Color definitions
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}====================================================${NC}"
echo -e "${CYAN}   🚀 Skylink Innovations Ltd — Update & Deploy     ${NC}"
echo -e "${CYAN}====================================================${NC}"

# Navigate to script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 1. Pull latest code from GitHub
echo -e "\n${YELLOW}[1/4] Pulling latest changes from GitHub (origin/main)...${NC}"
git fetch origin main
git pull origin main

# 2. Install any new dependencies if needed
echo -e "\n${YELLOW}[2/4] Checking and installing dependencies...${NC}"
npm install --prefer-offline --no-audit

# 3. Build production assets
echo -e "\n${YELLOW}[3/4] Building production assets (dist/)...${NC}"
npm run build

# 4. Restart systemd service
echo -e "\n${YELLOW}[4/4] Restarting skylink.service...${NC}"
if systemctl is-active --quiet skylink.service 2>/dev/null; then
    sudo systemctl restart skylink.service
    echo -e "${GREEN}✓ skylink.service restarted successfully!${NC}"
elif [ -f /etc/systemd/system/skylink.service ]; then
    sudo systemctl restart skylink.service
    echo -e "${GREEN}✓ skylink.service restarted!${NC}"
else
    echo -e "${YELLOW}Notice: skylink.service not detected or not active.${NC}"
fi

echo -e "\n${GREEN}====================================================${NC}"
echo -e "${GREEN}   ✨ Update Completed Successfully!                ${NC}"
echo -e "${GREEN}====================================================${NC}"
