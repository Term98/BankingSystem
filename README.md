# Banking System

**Banking System** is a web application built with **React**, **Supabase**, and **Zustand**. It provides secure user authentication, role-based dashboards for customers and bankers, and profile management features. The UI is designed with **Tailwind CSS** for a responsive and visually appealing experience.

## Features
- User authentication with sign-up and login functionality.
- Role-based dashboards for customers and bankers.
- Profile management for users.
- Responsive design using Tailwind CSS.
- Easy-to-use interface with intuitive navigation.

## Tech Stack
- **Frontend**: React, React Router, Zustand, Tailwind CSS, Lucide React
- **Backend**: Supabase (Authentication and Database)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite

## Installation

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** (npm is recommended)

### Steps to Install

1. **Clone the repository**:

   Open your terminal or command prompt and run the following command to clone the repository:

   ```bash
   git clone https://github.com/your-username/banking-system.git
   cd banking-system
This will create a local copy of the repository on your machine and navigate to the project directory.

2. **Install dependencies**:

After cloning the repository, you need to install the project dependencies. Run the following command:

If you're using npm:

    ```bash
    npm install

Or if you're using yarn:


    yarn install

This will install all the required packages listed in the package.json file.

3. **Set up Supabase**:

    -Go to Supabase and create a new project.
    -Set up your authentication and database (for profiles, accounts, etc.).
    -After setting up, get your Supabase URL and API key from the Supabase dashboard.
    -In the root of your project, create a .env file and add the following variables:


    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

Replace your-supabase-url and your-supabase-anon-key with your actual Supabase credentials.

4. **Run the development server**:

Now, you're ready to run the project locally. Start the development server by running one of the following commands:

If you're using npm:


    npm run dev

Or if you're using yarn:

    yarn dev

The application should now be running at http://localhost:3000.

## Scripts
Here are the available scripts for running, building, and previewing the project:

npm run dev: Starts the development server.
npm run build: Builds the project for production.
npm run lint: Runs ESLint to check for code quality issues.
npm run preview: Previews the built project.
Environment Variables
Make sure to add your Supabase credentials in the .env file as mentioned above.

    ```env
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
These environment variables are required to connect to Supabase for authentication and data management.

##Folder Structure
This is the basic structure of the project:

    ```bash

    /src
    /components       # Reusable components like AuthForm, etc.
    /pages            # Pages like Login, Signup, Dashboard, etc.
    /services         # Authentication and API services
    /store            # Zustand store for managing authentication state
    /lib              # Supabase configuration
    /types            # TypeScript types
    /assets           # Images and other static assets


## Live Demo

You can view the live demo of the project here: [Live Demo - Banking System](https://banksystem-81661.web.app/login).
