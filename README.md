# SnapSolver

## Overview

SnapSolver is a full-stack application that allows users to draw or upload images containing mathematical expressions, equations, or graphical problems. The application uses Google Generative AI to analyze and solve these problems, displaying the results directly on the canvas.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)


## Features

- Draw or upload images containing mathematical problems.
- Analyze and solve mathematical expressions, equations, and graphical problems using Google Generative AI.
- Display results directly on the canvas.
- Support for LaTeX rendering of mathematical expressions.

## Technologies Used

### Frontend

- React
- TypeScript
- Vite
- MathJax for LaTeX rendering

### Backend

- Node.js
- Express
- Google Generative AI

## Project Structure

Workspace
Sure, here is a comprehensive README file for your project:

MathImageAnalyzer/ ├── BackEnd/ │ ├── .env │ ├── .gitignore │ ├── package.json │ ├── src/ │ │ ├── app.js │ │ ├── config/ │ │ │ └── constants.js │ │ ├── Controllers/ │ │ ├── models/ │ │ ├── routes/ │ │ └── utils/ ├── FrontEnd/ │ ├── .env │ ├── .gitignore │ ├── .vite/ │ ├── components.json │ ├── eslint.config.js │ ├── index.html │ ├── package.json │ ├── postcss.config.cjs │ ├── postcss.config.js │ ├── public/ │ ├── README.md │ ├── src/ │ │ ├── App.css │ │ ├── App.tsx │ │ ├── assets/ │ │ ├── components/ │ │ └── screens/ │ │ └── home/ │ │ └── index.tsx │ ├── tailwind.config.js │ ├── tsconfig.app.json │ ├── tsconfig.app.tsbuildinfo │ ├── tsconfig.json │ ├── tsconfig.node.json │ ├── tsconfig.node.tsbuildinfo │ └── vite.config.ts


## Setup and Installation

### Prerequisites

- Node.js
- npm or yarn

### Backend Setup

1. Navigate to the `BackEnd` directory:

    ```sh
    cd BackEnd
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `BackEnd` directory and add the following environment variables:

    ```env
    PORT=8900
    NODE_ENV=dev
    GEMINI_API_KEY=your_gemini_api_key
    ```

4. Start the backend server:

    ```sh
    npm run dev
    ```

### Frontend Setup

1. Navigate to the `FrontEnd` directory:

    ```sh
    cd FrontEnd
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `FrontEnd` directory and add any necessary environment variables.

4. Start the frontend development server:

    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Draw or upload an image containing mathematical problems.
3. Click the "Analyze" button to get the results displayed on the canvas.
