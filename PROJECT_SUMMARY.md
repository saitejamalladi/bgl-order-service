# BGL Order Service - Project Summary

## 📋 Project Overview

The BGL Order Service is a NestJS-based REST API that calculates optimal grocery order packaging and pricing using bundle discounts. The service implements a greedy algorithm to minimize package count while maximizing cost savings through bulk purchasing options.

## 🎯 Key Features

- **Product Management API**: Retrieve available products with pricing and bundle configurations
- **Order Calculation Engine**: Intelligent packaging optimization using greedy algorithm
- **Interactive Documentation**: Swagger/OpenAPI docs at `/api/docs`
- **HTML Test Interface**: User-friendly testing page at root path `/`
- **Comprehensive Testing**: Unit, integration, and E2E test coverage
- **TypeScript Implementation**: Full type safety and modern development practices

## 🛠️ Technical Stack

- **Framework**: NestJS (Node.js framework)
- **Language**: TypeScript
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI (@nestjs/swagger)
- **Testing**: Jest with Supertest
- **Build Tool**: npm scripts
- **Linting**: ESLint
- **Static Serving**: @nestjs/serve-static

## 📡 API Endpoints Summary

### Products
- `GET /products` - Retrieve all available products

### Orders
- `POST /orders/calculate` - Calculate optimal order packaging and pricing

### Documentation
- `GET /api/docs` - Swagger/OpenAPI interactive documentation
- `GET /` - HTML test interface

## 🧪 Testing Approach

- **Unit Tests**: Service logic and controller validation

## 🔧 Development Notes

### Algorithm Implementation
The core order calculation uses a greedy algorithm that:
1. Sorts bundle options by size (largest first)
2. Calculates maximum bundles for each size
3. Handles remainders with individual pricing
4. Ensures minimal package count and optimal pricing

## 🚀 Deployment Ready

The project is production-ready with:
- Optimized build configuration
- Environment-based configuration
- Comprehensive error handling
- API documentation
- Static asset serving
- Cross-origin resource sharing (CORS)
