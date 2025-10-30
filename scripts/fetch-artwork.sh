#!/usr/bin/env bash
set -euo pipefail

# Script to download music artwork into public/assets/music/
# Run from repo root: bash scripts/fetch-artwork.sh

mkdir -p public/assets/music

echo "Downloading BRAVMEN..."
curl -fL "https://img-towercloud.eggs.mu/jacketImg/30874-thumbnail.jpg" -o public/assets/music/bravmen.jpg

echo "Downloading 煙草..."
curl -fL "https://img-towercloud.eggs.mu/jacketImg/31641-thumbnail.jpg" -o public/assets/music/tabako.jpg

echo "Downloading 灯籠..."
curl -fL "https://image-pro.eggs.mu/jacket/eea68fbc-fed7-4b7e-8bd5-c312dbb6fff3.jpg" -o public/assets/music/tourou.jpg

echo "Downloading Diorama..."
curl -fL "https://image-pro.eggs.mu/jacket/ee868989-909d-42a8-a85d-781fae09455f.jpg" -o public/assets/music/diorama.jpg

echo "Downloading theatre.V..."
curl -fL "https://img-towercloud.eggs.mu/jacketImg/58273-thumbnail.jpg" -o public/assets/music/theatreV.jpg

echo "Downloading 胎動..."
curl -fL "https://image-pro.eggs.mu/jacket/49510f4d-8f5a-46ae-aceb-97a8136c6741.jpeg" -o public/assets/music/taidou.jpg

echo "All done. Images saved to public/assets/music/"
