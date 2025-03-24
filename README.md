# Placemark

A full stack web application for managing points of interest (placemarks). This project was developed as part of the Full Stack Web Development course and demonstrates user authentication, CRUD operations, and API development using Node.js and Hapi.

## Overview

Placemark allows users to sign up, log in, and create placemark with a name, description, category, and location. The application began as a memory store implementation and has evolved to include cookie based authentication, API testing, and optional cloud database integration. This project is built with a focus on code quality, testing, and structured deployment.

## Features

- **User Accounts**  
  - Sign up, log in, and account deletion.
  - Cookie-based authentication implemented with Hapi.

- **Placemark Management**  
  - Create, read, update, and delete placemarks.
  - Create, read, update, and delete Categorys.

- **API and Testing**  
  - API endpoints for user and placemark/category operations.
  - TDD practices with comprehensive unit tests.

- **Data Storage**  
  - Initially using an mem store.
  - JSON storage implementation and MongoDB integration via Cloud Atlas (optional).

## Live Deplotments
  - [Render/Heroku](https://placemark-nigel.onrender.com/)
  - [Glitch](https://cubic-fabulous-wish.glitch.me/)

## Tech Stack

- **Back End**: Node.js, Hapi.js
- **Authentication**: Cookie-based auth, Joi schema validation
- **Database**: Memstore, Json, Mongo (&cloud atlas)
- **Testing**: Mocha, TDD 
- **Version Control**: Git
- **Other Technolodgy Used**: Javascript, Handlebars, Mongoose, Render, Glitch, chai, Nodemon & Bulma
