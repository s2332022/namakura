#!/usr/bin/env bash
# Download external icons into public assets
# Usage: ./scripts/download-icons.sh

set -euo pipefail

# Resolve script directory so paths work when run from project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST_DIR="$SCRIPT_DIR/../public/assets/icons"
mkdir -p "$DEST_DIR"

echo "Downloading TikTok icon (Pixabay)..."
curl -L -o "$DEST_DIR/tiktok.png" "https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338432_960_720.png"

echo "Downloaded to public/assets/icons/tiktok.png"

echo "Note: Source: Pixabay (https://pixabay.com). Pixabay images are generally free to use without attribution, but please verify the specific image license if you plan to redistribute." 

echo "Downloading Spotify icon (Vecteezy preview)..."
curl -L -o "$DEST_DIR/spotify.png" "https://static.vecteezy.com/system/resources/previews/018/930/750/large_2x/spotify-app-logo-spotify-icon-transparent-free-png.png"

echo "Downloaded to public/assets/icons/spotify.png"

echo "Note: Spotify asset source: Vecteezy (https://www.vecteezy.com). The page indicates 'Free License - Attribution Required' for this asset; include contributor attribution when redistributing." 
