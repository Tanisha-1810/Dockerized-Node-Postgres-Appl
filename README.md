🐳 Dockerized Node.js + PostgreSQL App

A lightweight, production-ready Node.js + Express application connected to PostgreSQL, containerized using Docker and orchestrated with Docker Compose.

🧭 Overview

This project demonstrates how to:

Connect a Node.js backend to a PostgreSQL database

Use Docker multi-stage builds to produce smaller and faster production images

Configure services via environment variables

Use Docker volumes for persistent data storage

It’s ideal for beginners learning Docker Compose, multi-container setups, or preparing for DevOps/Software Engineer interviews.

🧰 Tech Stack
Layer	Technology
Backend	Node.js + Express
Database	PostgreSQL
Containerization	Docker
Orchestration	Docker Compose
Build Optimization	Multi-stage Docker builds
Configuration	Environment Variables (.env)

📁 Project Structure

dockerized-node-postgres/

│
├── app/

│   ├── Dockerfile

│   ├── index.js

│   ├── package.json

│   └── package-lock.json

│
├── docker-compose.yml

├── .env

└── README.md


⚙️ Prerequisites

Before running this project, make sure you have:

🐋 Docker
 installed

🧩 Docker Compose
 installed

Optional: PostgreSQL CLI for database testing

🔧 Setup & Installation

1️⃣ Clone the repository

git clone https://github.com/Tanisha-1810/Dockerized-Node-Postgres-Appl.git

cd dockerized-node-postgres

2️⃣ Create a .env file

NODE_PORT=3000
DB_HOST=your_database_host
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=mydatabase


📝 Note: If you use an external PostgreSQL (e.g., on your VM), use its IP for DB_HOST.
If you prefer to run PostgreSQL inside Docker, you can extend docker-compose.yml (see below 👇).

3️⃣ Build and run the containers

docker compose up --build

4️⃣ Access the app

Open your browser and go to:

http://localhost:3000


If connected successfully, you’ll see:

Connected to PostgreSQL! Server time: <current timestamp>

🧱 Dockerfile Explained

The Dockerfile uses multi-stage builds to keep the final image minimal:

# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .


# Production stage

FROM node:18-alpine AS prod

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "start"]



Why multi-stage?

The build stage installs dependencies and copies source code.

The prod stage includes only what’s needed for runtime — smaller, faster, more secure.

🐙 Docker Compose Explained

The docker-compose.yml defines how containers run and communicate:

services:
  web:
    build:
      context: ./app
      dockerfile: Dockerfile
    ports:
      - "${NODE_PORT}:3000"
    environment:
      - PORT=${NODE_PORT}
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_NAME=${DB_NAME}
    volumes:
      - ./app:/usr/src/app
      - ./data:/usr/src/app/data


Key points:

Uses environment variables for dynamic configuration

Maps local folders for persistent code and data

Keeps the app isolated but configurable

💾 Persistent Storage

Data and logs are stored in Docker volumes:

/app/data ensures database-related or generated files persist

You can easily inspect, backup, or clean up these files without losing state

🧠 How It Works

Docker builds a lightweight image using the Node.js base image

Express server connects to PostgreSQL using credentials from .env

On GET /, the app runs a SQL query:

SELECT NOW();


and returns the current server time from PostgreSQL

🧹 Stopping Containers

To stop containers:

docker compose down


To remove everything (containers, volumes, and networks):

docker compose down --volumes --remove-orphans

🧪 (Optional) Add PostgreSQL as a Container

If you want to run PostgreSQL inside Docker (instead of your VM), add this service to your docker-compose.yml:

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: yourpassword
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:


Then, set DB_HOST=db in your .env file.

Docker Compose will automatically create a private network where web can talk to db.

📸 Demo Output

App running on port 3000

Connected to PostgreSQL! Server time: 2025-10-08 12:34:56.789


“The best way to understand Docker is to build something with it.”
