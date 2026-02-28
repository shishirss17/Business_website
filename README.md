# Firebase Studio Next.js Starter

This is a Next.js application built with Firebase and standard web technologies.

## Prerequisites

Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

Follow these steps to run the application manually:

### 1. Clone the repository (if applicable)

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory. You can use `env.txt` as a template.
At a minimum, you may need to configure:

```
GEMINI_API_KEY=your_api_key_here
```
(and any other required environment variables specific to your setup)

### 4. Run the Development Server

Start the development server:

```bash
npm run dev
```

This will start the application on port 9002 (as configured in `package.json`).
Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

### 5. Build for Production

To build the application for production usage:

```bash
npm run build
```

Then start the production server:

```bash
npm run start
```

## Project Structure

- `src/app`: Application routes and pages
- `src/components`: Reusable user interface components
- `src/lib`: Utility functions and shared logic
- `public`: Static assets

## Scripts

- `npm run dev`: Starts the development server with Turbopack on port 9002
- `npm run build`: Builds the application for production
- `npm start`: Starts the production server
- `npm run lint`: Runs the linter
