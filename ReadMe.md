# Social Media App – Project Context

## Overview

This is a full-stack social media feed web application.

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Auth: Google OAuth, JWT
- API communication: REST
- Frontend and backend run on different ports

## Folder Structure

- /frontend → React client
- /backend → Express API server

## Authentication Flow

1. User logs in with google account
2. Backend validates google oAuth credential
3. JWT is generated using `jsonwebtoken`
4. JWT is returned in the response body
5. Frontend stores the JWT (in local storage)
6. Frontend sends JWT in the `Authorization` header for protected routes

## CORS Configuration

- Frontend URL: http://localhost:5173
- Backend URL : http://localhost:3000/
- Backend allows credentials
- Access-Control-Allow-Origin is NOT '\*' — backend sets Access-Control-Allow-Origin to http://localhost:5173 and responds to OPTIONS preflight. JSON body limit increased to accept larger payloads (e.g. images/base64).

## Features Implemented So Far

- User authentication (login with google account)
- Feed page which fetches data from mongodb and displays the data on feed table
- Protected routes using middleware

## Pending Features

- Like/unlike posts
- create post
