#!/bin/bash
cd src/assets/images

# Function to process image
process_image() {
    local input_file="$1"
    local filename=$(basename -- "$input_file")
    local filename_no_ext="${filename%.*}"

    echo "Processing $input_file..."

    # Generate Thumbnail (WebP, ~400px width)
    magick "$input_file" -resize 400x -quality 80 -define webp:lossless=false "thumbnails/${filename_no_ext}.webp"
    
    # Generate Optimized Large (WebP, ~1920px width)
    magick "$input_file" -resize 1920x\> -quality 85 -define webp:lossless=false "optimized/${filename_no_ext}.webp"
}

# Process specific files used in Journey.jsx
process_image "10th.jpg"
process_image "12th.jpg"
process_image "adex_apprenticeship.png"
process_image "robotics_bootcamp.png"
process_image "barber_cutting.png"
process_image "barista.png"
process_image "IELTS.jpg"

# Certifications
process_image "CEH.png"
process_image "pythonAI.png"
process_image "aws-certified-solutions-architect-associate.png"

echo "Image processing complete."
