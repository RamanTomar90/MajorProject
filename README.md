# 🌍 WanderLust

> An Airbnb-inspired full-stack web application to discover and list unique stays around the world.

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?logo=mongodb)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)

---

## ✨ Features

- 🔐 **User Authentication** — Sign up, log in, and log out securely using Passport.js
- 🏠 **Listings** — Create, read, update, and delete property listings
- 📸 **Image Uploads** — Upload listing photos directly to Cloudinary
- 🗺️ **Interactive Maps** — Every listing shows its exact location using Mapbox GL JS
- ⭐ **Reviews** — Leave star ratings and comments on any listing
- 🔍 **Search** — Search listings by title, location, or country
- 🔒 **Authorization** — Only listing owners can edit/delete their own listings

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | Passport.js (Local Strategy) |
| Image Storage | Cloudinary + Multer |
| Maps & Geocoding | Mapbox GL JS |
| Templating | EJS + EJS-Mate |
| Frontend | Bootstrap 5, Custom CSS |
| Sessions | express-session + connect-mongo |
| Validation | Joi |

---

## 📁 Project Structure

```
MajorProject/
├── controllers/        # Route handler logic
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/             # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/             # Express routers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/              # EJS templates
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── public/             # Static assets (CSS, JS)
├── utils/              # Helper classes
├── init/               # Database seed script
├── middleware.js        # Custom middleware
├── schema.js           # Joi validation schemas
├── cloudconfig.js      # Cloudinary config
└── app.js              # Main entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Cloudinary](https://cloudinary.com/) account
- [Mapbox](https://www.mapbox.com/) account

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/RamanTomar90/MajorProject.git
cd MajorProject
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file** in the root directory with the following variables:
```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_access_token
MONGO_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
```

**4. (Optional) Seed the database**
```bash
node init/index.js
```

**5. Start the server**
```bash
node app.js
```

**6. Open your browser** and visit `http://localhost:8080`

---

## 📸 Usage

| Action | How |
|--------|-----|
| Browse listings | Visit `/listings` |
| Create a listing | Sign up/login → click **Airbnb your home** |
| Edit/Delete | Only available to the listing owner |
| Leave a review | Open any listing and scroll down (must be logged in) |
| Search | Use the search bar in the navbar |

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `MAP_TOKEN` | Mapbox public access token |
| `MONGO_URL` | MongoDB Atlas connection URI |
| `SECRET` | Secret key for session encryption |

> ⚠️ Never commit your `.env` file to GitHub. It is already listed in `.gitignore`.

---

## 👨‍💻 Author

**Raman Tomar**
- GitHub: [@RamanTomar90](https://github.com/RamanTomar90)

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).
