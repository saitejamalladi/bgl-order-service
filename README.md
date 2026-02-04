# BGL Order Service

A NestJS-based API for calculating optimal grocery order packaging and pricing with bundle discounts.

## 🚀 Features

- **Product Management**: View available products with pricing and bundle options
- **Order Calculation**: Minimize package count using greedy algorithm
- **Interactive API Docs**: Swagger/OpenAPI documentation at `/api/docs`
- **HTML Test Page**: User-friendly interface at root path `/`
- **Comprehensive Testing**: Unit tests, integration tests, and E2E tests

## 📋 Available Products

| Code | Name | Unit Price | Bundle Options |
|------|------|------------|----------------|
| CE | Cheese | $7.95 | 5×$20.95, 3×$14.95 |
| HM | Ham | $7.95 | 8×$40.95, 5×$29.95, 2×$13.95 |
| SS | Soy Sauce | $11.95 | Individual only |

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Application will be available at:
# - API: http://localhost:3000
# - Swagger Docs: http://localhost:3000/api/docs
# - HTML Test Page: http://localhost:3000
```

## 📖 API Usage

### Calculate Order

**Endpoint:** `POST /orders/calculate`

**Request:**
```json
{
  "items": [
    {"productCode": "CE", "quantity": 10},
    {"productCode": "HM", "quantity": 14},
    {"productCode": "SS", "quantity": 3}
  ]
}
```

**Response:**
```json
{
  "items": [
    {
      "productCode": "CE",
      "productName": "Cheese",
      "orderedQuantity": 10,
      "totalCost": 41.90,
      "breakdown": [
        {"quantity": 2, "bundleSize": 5, "unitPrice": 20.95, "totalPrice": 41.90}
      ]
    }
  ],
  "grandTotal": 156.60
}
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test:cov
```

## 🏗️ Architecture

- **Framework**: NestJS with TypeScript
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest with Supertest
- **Algorithm**: Greedy approach for minimal package calculation

## 📁 Project Structure

```
src/
├── app.controller.ts      # HTML test page
├── app.module.ts          # Root module
├── main.ts               # Application bootstrap
├── products/             # Product management
│   ├── products.service.ts
│   ├── products.controller.ts
│   ├── products.module.ts
│   └── dto/
├── orders/               # Order calculation
│   ├── orders.service.ts
│   ├── orders.controller.ts
│   ├── orders.module.ts
│   └── dto/
└── config/               # Product configuration
```

## 🎯 Algorithm Explanation

The order calculation uses a **greedy algorithm** to minimize the number of packages:

1. Sort packaging options by bundle size (largest first)
2. For each bundle size, calculate maximum packages that fit
3. Subtract used quantity from remaining total
4. Handle remainder with individual unit pricing

**Example:** 14 Ham items
- 1×8 bundle ($40.95) = 8 items
- 1×5 bundle ($29.95) = 5 items
- 1×1 item ($7.95) = 1 item
- **Total:** $78.85 (vs $98.65 for 2×5 + 4×1)

## 🔧 Development

```bash
# Build for production
npm run build

# Start production server
npm run start:prod

# Lint code
npm run lint

# Format code
npm run format
```

