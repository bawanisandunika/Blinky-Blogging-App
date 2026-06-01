# Blog Display Platform

A production-ready single-page web application to cleanly display blog posts fetching from a public API. It handles Cloudinary images seamlessly, supports light/dark mode, and is fully responsive.

## Project Structure

This project uses React, Vite, and Tailwind CSS.

- `src/App.tsx` - Core logical structure, fetching logic, UI layout, and modal.
- `src/mockData.ts` - Fallback mock data in case the public API fails.
- `src/index.css` - Tailwind directives and custom CSS variables for effortless dark mode.
- `backend-example/` - Contains the example Node.js/Express snippet for configuring CORS on a public API.

## Frontend Setup & Run

1. Make sure you have Node installed. Look in the active directory and run:
   ```bash
   npm install
   ```
2. Start the development environment:
   ```bash
   npm run dev
   ```

*Note: You can pass your API URL using environment variables: Create a `.env` file with `VITE_API_URL=http://your-public-api.com`*

## How to Deploy the Backend (Public API Safety & CORS)

### Public API CORS Snippet (Express.js)

For building a public API, CORS configuration must allow `*`, and it **must not** expect standard browser cookies/credentials. This makes cache layers (like Cloudflare or Varnish) incredibly easy to implement and improves public safety against CSRF.

Below is the standard Express.js setup for the public API:

```javascript
// backend-example/server.js
const express = require('express');
const app = express();

/**
 * ⚠️ PUBLIC API CONFIGURATION ⚠️
 * Using '*' explicitly marks this as public and open.
 * Ensures the preflight (OPTIONS) request is handled correctly.
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  // Allow basic headers. Authorization is listed only if you use simple API Token rate limiting.
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Immediately terminate preflight requests with 200 OK
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

// Ephemeral array for the example
let posts = [];

// [GET] List posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// [POST] Create a post
app.post('/api/posts', (req, res) => {
  const { title, message, imageUrl } = req.body;
  if(!title || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newPost = { 
    id: Date.now().toString(), 
    title, 
    message, 
    imageUrl 
  };
  
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Public API Gateway listening on port ${PORT}`);
});
```

### Safety and Infrastructure for Public APIs

If you are exposing `POST /api/posts` completely publicly from the mobile app (so anyone can post):

1. **Abuse Protection / Rate Limiting:** Implement a Reverse Proxy rate-limiter (e.g., NGINX `limit_req`, or Cloudflare WAF). Do not rely solely on the application layer.
2. **Stateless Tokens (Optional but Recommended for POST):** If you wish to ensure only your Mobile App can post, provide an un-expiring or long-lived API Key in the `Authorization` header to track requests. CORS `*` is still completely valid here.
3. **Caching:** Because there are no credentials/cookies and CORS is `*`, `GET /api/posts` can be extremely cached at the edge (CDN) reducing your backend load to virtually zero.
4. **Cloudinary Validations:** Ensure that the input strings for `imageUrl` are verified to be actual imagery hosts (e.g., regex `^https://res.cloudinary.com/...`) on the backend to avoid injecting XSS via broken `src` tags on the frontend.
