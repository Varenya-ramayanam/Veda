# Veda – E-commerce Platform

Veda is a full-stack e-commerce application with separate **frontend** and **backend** implementations, containerized with Docker, and supporting optional Redis caching.  
It integrates with **Cloudinary** for image hosting and supports role-based admin functionality.

---

## 🚀 Features

- **User Features**
  - Browse products
  - Add products to cart
  - Checkout with stored user data
  - Order tracking

- **Admin Features**
  - Add/Edit/Delete products
  - Manage orders
  - Manage users
  - Upload product images (Cloudinary)

- **Technical**
  - REST API with Express.js
  - MongoDB for database
  - Redis for caching (optional)
  - Cloudinary integration
  - Dockerized frontend and backend
  - Role-based authentication

---

## 📂 Project Structure

```
Veda-main/
│
├── docker-compose.yaml         # Orchestration for frontend, backend, and Redis
│
├── backend/
│   ├── config/                  # DB, Redis configurations
│   ├── controllers/             # API logic
│   ├── middlewares/              # Authentication, uploads
│   ├── models/                   # Mongoose models
│   ├── routes/                   # API routes
│   ├── seed/                     # Data seeding
│   ├── uploads/                  # Uploaded files (local)
│   ├── utils/                    # Cloudinary helper
│   ├── server.js                 # Express server entry
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── components.json
│   ├── index.html
│   ├── Dockerfile
│   ├── package.json
│   └── public/ & src/ (React/Next.js app)
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Varenya-ramayanam/Veda.git
cd Veda
```

---

### 2️⃣ Environment Variables

Create `.env` files for **backend** and **frontend**.

**Backend `.env`**

**For localhost development - with no Redis caching**
```env
NODE_ENV=development
PORT=3000
USE_REDIS=false
DOCKER=false
MONGO_URI=mongodb://localhost:27017/veda
JWT_SECRET=your_jwt_secret
CLOUDINARY_cloud_name=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend `.env`**
```env
VITE_API_URL=http://localhost:3000
```

---

### 3️⃣ Development Modes

#### Local Development (No Redis)
```env
USE_REDIS=false
DOCKER = false
```
```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

#### Docker Development (With Redis)
```env
USE_REDIS=true
DOCKER = true
```
```bash
docker-compose up --build
```

---

## 🛠 API Endpoints

### **Public Routes**
| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| GET    | `/api/products`       | List all products   |
| GET    | `/api/products/:id`   | Get product details |

### **User Routes**
| Method | Endpoint                | Description       |
|--------|-------------------------|-------------------|
| POST   | `/api/users/login`      | Login user        |
| POST   | `/api/users/register`   | Register user     |
| GET    | `/api/orders/myorders`  | Get my orders     |

### **Admin Routes**
| Method | Endpoint                 | Description           |
|--------|--------------------------|-----------------------|
| POST   | `/api/products`          | Add product           |
| PUT    | `/api/products/:id`      | Update product        |
| DELETE | `/api/products/:id`      | Delete product        |
| GET    | `/api/orders`            | View all orders       |


---

## 📦 Localhost support

Run the frontend with:
```bash
cd frontend
npm install
npm run dev
```
This will:
- Start **frontend** (React/Next.js)

Run the backend with:
```bash
cd backend
npm install 
npm run dev
```
This will:
- Start **backend** (Express API)



---

## 📦 Docker Support

Run the full stack with:
```bash
docker-compose up --build
```
This will:
- Start **frontend** (React/Next.js)
- Start **backend** (Express API)
- Start **Redis** (only if `USE_REDIS=true`)

---

## ☁ Cloudinary Integration
Image uploads are automatically stored in **Cloudinary**.  
Configure your credentials in the backend `.env` file.

---

## 👨‍💻 Author
Developed by **Varenya Ramayanam** – Contributions welcome!


## 🤝 Contributing

We welcome contributions from the community!  
Follow these steps to contribute:

```bash
# 1️⃣ Fork the repository
#    (Click the 'Fork' button on the top-right of this page)

# 2️⃣ Clone your fork locally
git clone https://github.com/<your-username>/Veda.git
cd Veda

# 3️⃣ Create a new branch for your feature/fix
git checkout -b feature/your-feature-name

# 4️⃣ Make your changes and commit
git add .
git commit -m "Add: your feature description"

# 5️⃣ Push your branch to your fork
git push origin feature/your-feature-name

# 6️⃣ Open a Pull Request
#    (Go to the original repo and click 'New Pull Request')

