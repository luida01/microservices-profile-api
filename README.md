# 🚀 Microservices Profile API

Microservices system for profile management implemented with TypeScript, MongoDB, Docker, and Kubernetes. Features API Key authentication and separation of concerns (CQRS).

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)

## 📋 Features

- ✅ **Complete CRUD operations**: Create, Update, and Delete profiles securely.
- 🔍 **Optimized Read operations**: Dedicated microservice for high-performance data retrieval.
- 🔐 **Security**: API Key authentication for service-to-service communication.
- 🎫 **JWT Tokens**: Automatic token generation upon profile creation.
- 🐳 **Dockerized**: Ready-to-run with Docker Compose.
- ☸️ **Kubernetes Ready**: Full manifest configuration for cluster deployment.

## 🚀 Quick Start

### Prerequisites
- Docker
- Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/luida01/microservices-profile-api.git
   cd microservices-profile-api
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build -d
   ```

3. **Verify running services**
   ```bash
   docker-compose ps
   ```

## 📚 API Endpoints

### 🟢 Microservice: Read (`ms-lectura`)
Port: `3001` | Auth: `x-api-key: ms-lectura-key-12345`

- **GET** `/api/get-profile?email=user@example.com`
  - Retrieve a single profile by email.
- **GET** `/api/list-profiles`
  - Retrieve a paginated list of profiles.

### 🟠 Microservice: CRUD (`ms-crud`)
Port: `3002` | Auth: `x-api-key: ms-crud-key-67890`

- **POST** `/api/create-profile`
  - Create a new profile. Returns a JWT token.
- **PUT** `/api/update-profile/{id}`
  - Update existing profile details.
- **DELETE** `/api/delete-profile/{id}`
  - Remove a profile permanently.

## ☸️ Kubernetes Deployment

To deploy to a Kubernetes cluster:

```bash
kubectl apply -f kubernetes/
```

This will create:
- **Secrets** for database credentials.
- **Deployments** for MongoDB and both microservices (2 replicas each).
- **Services** (LoadBalancer/ClusterIP) for networking.

## 🛠️ Tech Stack

- **Runtime**: Node.js 18
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB 6
- **Containerization**: Docker
- **Orchestration**: Kubernetes

## 📝 License

MIT License

## 👤 Author

**Luis Daniel Santana Mercado**

- GitHub: [@luida01](https://github.com/luida01)
- Email: luisdanielsantanamercado@gmail.com
