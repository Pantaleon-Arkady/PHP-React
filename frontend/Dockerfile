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
    