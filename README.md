
# 🍱 NITT Food Delivery Website

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) food delivery platform tailored specifically for students of **NIT Trichy**. It ensures secure access through NITT webmail verification, enables vendors to manage food listings and availability, and allows students to place nutrition-aware orders, make secure payments, and track them in real time.

---

## 📌 Features

### 👤 Student Module
- Sign up with **@nitt.edu** email only (verified via email link)
- Browse food items by category
- Place food orders from different vendors
- View order history
- Track calories based on weight and oil type
- Secure payment integration via Razorpay

### 🧑‍🍳 Vendor Module
- Login with verified **@nitt.edu** email
- Add, edit, delete dishes with name, price, weight, oil type
- Set item availability
- View incoming student orders

### 🔐 Authentication
- Email verification via Nodemailer
- JWT-based session authentication
- Role-based access control
- Middleware protected routes

---

## 🛠️ Tech Stack

| Category   | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js, Bootstrap                  |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB                             |
| Auth       | JWT, Bcrypt.js                      |
| Email      | Nodemailer + Gmail SMTP             |
| Payments   | Razorpay                            |
| Nutrition  | Nutritionix API                     |
| Hosting    | Render                              |

---

## 📁 Project Structure

### Frontend (`frontend/`)
- `components/` - UI components like `Card.js`, `Navbar.js`, etc.
- `screens/` - Main views like `Login.js`, `Signup.js`, `AddDish.js`
- `App.js` - App entry and routing

### Backend (`backend/`)
- `Routes/` - API endpoints (`CreateUser.js`, `DisplayData.js`, etc.)
- `models/` - Mongoose schemas (`User.js`, `foodItem.js`, `Orders.js`)
- `index.js` - Express server entry point

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js and npm
- MongoDB Atlas connection string
- Razorpay test account
- Nutritionix API credentials
- Gmail account with **App Passwords** enabled (for sending email verification links)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nitt-food-delivery-website.git
cd nitt-food-delivery-website
```

---

### 2. Set Up Backend

```bash
cd backend
npm install
```

Create `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
BACKEND_URL=http://localhost:5000
NUTRITIONIX_APP_ID=your_nutritionix_app_id
NUTRITIONIX_API_KEY=your_nutritionix_api_key
```

Start the backend server:

```bash
npm start
```

---

### 3. Set Up Frontend

```bash
cd ../frontend
npm install
```

Create `.env` file inside `frontend/`:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

Start the React app:

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to access the site.

---

## 🧠 Nutrition-Aware Ordering

- Vendors enter dish weight and oil type (refined, mustard, coconut, olive, none)
- Calories calculated via **Nutritionix API**
- Displayed to students during ordering

---

## 🔐 Security Features

- Bcrypt-hashed passwords
- JWT-based user sessions
- Role-based access (student/vendor)
- Verified payments via Razorpay
- Email verification via secure SMTP

---

## 🧑‍💻 How to Use

### Students
- Sign up with NITT webmail
- Verify email via link
- Browse & order dishes
- Track calories and payments

### Vendors
- Sign up and verify with NITT email
- Add/edit/remove dishes
- View incoming orders

---

## 🌱 Future Enhancements

- Mobile app (React Native)
- Real-time order tracking
- Chat between vendor and student
- Dish ratings and feedback
- Coupon and promo system

---

## 🙋‍♂️ Developer

Built by a student of NIT Trichy for the students of NIT Trichy.

Feel free to fork, use, or contribute to this project!
