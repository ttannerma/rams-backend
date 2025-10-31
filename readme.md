# RAMS

This project is the backend implemenation for RAMS - Resource Allocation Management System. This is a part of Insta's technical assessment for Teemu Tannerma. Frontend and Backend form a MERN stack. MERN stands for MongoDB, Express, Node, React.

# About the project

A simple MongoDB and ExpressJS backend. Handles communication between frontend and DB.
- ExpressJS for easy API features
- MongoDB client for MongoDB.

# Installation

1. **Clone the repository (https) and go to appropriate directory:**
   ```bash
   git clone https://github.com/ttannerma/rams-backend.git
   cd rams-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in `rams-backend` with:
     ```
     ATLAS_CONNECTION_STRING=your_mongodb_connection_string
     PORT=8080
     ```

  - .env file with working connection string will be provided for appropriate recipients.

4. **Start the backend server:**
   ```bash
   npm start
   ```

5. **API will be available at:**  
   [http://localhost:8080](http://localhost:8080)

   > **Note:**  
> Make sure you have [Node.js v25](https://nodejs.org/) (or newer) and [npm 11.6.2](https://www.npmjs.com/) or newer  installed.