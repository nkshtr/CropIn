# AgriAdvisor Platform

A comprehensive agricultural advisory platform designed to empower farmers with real-time data and actionable insights.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
*   **Node.js** (v14 or higher) - [Download Here](https://nodejs.org/)
*   **MongoDB** (Community Server) - [Download Here](https://www.mongodb.com/try/download/community)

## Project Structure

*   `client/`: Frontend application (React, Vite, Tailwind CSS)
*   `server/`: Backend API (Node.js, Express, MongoDB)

## Setup Instructions

### 1. Backend Setup (Server)

1.  Open a terminal and navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  (Optional) Create a `.env` file in the `server` directory if you want to customize the configuration:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/agri-advisory
    JWT_SECRET=your_jwt_secret_key
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    *The server should start on http://localhost:5000*

### 2. Frontend Setup (Client)

1.  Open a **new** terminal window (keep the server running) and navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Ensure the `.env` file exists in the `client` directory with your API keys (already created):
    ```env
    VITE_OPENWEATHER_API_KEY=your_api_key_here
    ```
4.  Start the client application:
    ```bash
    npm run dev
    ```
5.  Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`).

## Features

*   **Multilingual Support**: English, Hindi, Punjabi.
*   **Live Weather**: Real-time weather updates.
*   **Soil Testing**: Soil health analysis and fertilizer recommendations.
*   **Pest Detection**: AI-based pest diagnosis (Mock).
*   **Crop Advisory**: Season and soil-based crop suggestions.
*   **Market Prices**: Live mandi prices and trends.
*   **Government Schemes**: Information on financial aid programs.

## Troubleshooting

*   **MongoDB Error**: Ensure the MongoDB service is running locally (`mongod`).
*   **API Errors**: Check if the backend server is running and accessible.
*   **Weather Data**: If weather data shows an error, verify your OpenWeatherMap API key in `client/.env`.
