# --- Base image ---
    FROM node:20

    # --- Working directory inside the container ---
    WORKDIR /app
    
    # --- Copy dependency files first (for better caching) ---
    COPY package*.json ./
    
    # --- Install dependencies ---
    RUN npm install
    
    # --- Copy the rest of the frontend source ---
    COPY . .
    
    # --- Expose Vite dev server port ---
    EXPOSE 5173
    
    # --- Start the dev server when container runs ---
    CMD ["npm", "run", "dev", "--", "--host"]

# # ---------- Stage 1: Build the React app ----------
#     FROM node:20 AS build

#     WORKDIR /app
#     COPY frontend/package*.json ./
#     RUN npm install
#     COPY frontend .
#     RUN npm run build
    
#     # ---------- Stage 2: Serve with Nginx ----------
#     FROM nginx:1.23
    
#     # Copy built React files to Nginx
#     COPY --from=build /app/dist /usr/share/nginx/html
    
#     # Copy default.conf from project root (now accessible because of context: .)
#     COPY default.conf /etc/nginx/conf.d/default.conf
    
#     # Copy backend PHP files
#     COPY backend/projectSrc /var/www
    
#     EXPOSE 80
    