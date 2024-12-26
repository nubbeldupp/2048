# Use a lightweight web server image
FROM nginx:alpine

# Copy the project files to the nginx html directory
COPY index.html /usr/share/nginx/html/
COPY game.js /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/

# Expose port 5565
EXPOSE 5565

# The nginx image already has a default CMD to start the web server
