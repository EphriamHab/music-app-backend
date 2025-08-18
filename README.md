# 🎵 MusicApp Backend
A RESTful API built with Node.js, Express, and MongoDB for managing songs and generating statistics. This is the backend component of the MERN stack Songs Management application.

## 🌟 Features
- **CRUD Operations**: Create, read, update, and delete songs  
- **Statistics Generation**: Comprehensive statistics including:  
  - Total number of songs, artists, albums, and genres  
  - Number of songs in each genre  
  - Number of songs and albums for each artist  
  - Number of songs in each album  
- **Data Validation**: Robust input validation using Mongoose schemas  
- **Error Handling**: Centralized error handling middleware  
- **Docker Support**: Containerized application for easy deployment  

---

## 🚀 Live Demo
Backend API is deployed on Render:  
👉 **[MusicApp Backend API](https://music-app-backend-2x4e.onrender.com/api)**  

---
# Technologies Used

- **Node.js**: Runtime environment  
- **Express.js**: Web framework for handling HTTP requests  
- **MongoDB**: NoSQL database for data storage  
- **Mongoose**: ODM for MongoDB interaction and schema modeling  
- **Docker**: Containerization platform  
- **CORS**: Cross-origin resource sharing middleware  
- **dotenv**: Environment variable management  

# Installation & Setup

## Local Development

### 1. Clone the repository
```bash
  git clone https://github.com/EphriamHab/music-app-backend.git
  cd music-app-backend
```
### 2. Install dependencies
```bash
npm install
```
### 3. Environment Configuration
Create a .env file in the root directory and set env variables.

### 4. Start MongoDB
Make sure MongoDB is running locally (default port 27017).

### 5. Run the server
```bash
npm run dev
```
## 🐳 Run with Docker

```bash
docker-compose up --build .
docker run -p 5000:5000 music-app-backend
```
## 📡 API Endpoints

### Songs
| Method | Endpoint          | Description         |
|--------|-----------------|-------------------|
| GET    | `/api/songs`     | Get all songs      |
| GET    | `/api/songs/:id` | Get song by ID     |
| POST   | `/api/songs`     | Add a new song     |
| PUT    | `/api/songs/:id` | Update song by ID  |
| DELETE | `/api/songs/:id` | Delete song by ID  |

### Statistics
| Method | Endpoint      | Description               |
|--------|---------------|---------------------------|
| GET    | `/api/stats`  | Get songs & artists stats |

---

## 🌐 Deployment on Render

1. Push your code to **GitHub**.  
2. Create a new **Web Service** in [Render](https://render.com/).  
3. Connect your GitHub repo.  
4. Add **Environment Variables** in Render’s dashboard:  
   - `PORT=10000` (Render will auto-assign a port)  
   - `MONGODB_URI` = your MongoDB Atlas connection string  
   - `NODE_ENV=production`  
5. Deploy and get your live API URL.  

---

## ✅ Future Improvements
- 🎶 Add file upload support for music files (Cloudinary, AWS S3)  
- 🔐 Implement JWT authentication for secure access  
- 📊 Add advanced filtering and search for songs  

---

## 👨‍💻 Author
**Ephrem Habtamu**  
🔗 [GitHub](https://github.com/EphriamHab)



