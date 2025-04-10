# Groovo - Song Information Web Application

This web application allows users to retrieve song information from Spotify and lyrics from Genius. It consists of a frontend built with Vite and a backend proxy using Express.js.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js and npm (or yarn):** Download and install from [https://nodejs.org/](https://nodejs.org/).
- **Spotify API Credentials:** You need a Spotify Client ID and Client Secret. Create an application on the Spotify Developer Dashboard: [https://developer.spotify.com/dashboard/](https://www.google.com/search?q=https://developer.spotify.com/dashboard/).
- **Genius API Access Token:** Obtain a Genius API access token by creating a developer application on the Genius API website: [https://genius.com/developers](https://genius.com/developers).

## Setup and Installation

Follow these steps to set up and run the application:

**1. Clone the Repository (if you haven't already)**

```bash
git https://github.com/daveyloder/groovo.git
cd groovo
```

**2. Configure Enviroment Variables**

**2.1 Frontend Configuration(`frontend/.env`)**

Navigate to the `frontend` directory and create a `.env` file if it doesn't exist. Add your API keys and the backend URL:

```env
VITE_GENIUS_ACCESS_TOKEN=<YOUR_GENIUS_ACCESS_TOKEN>

VITE_SPOTIFY_CLIENT_ID=<YOUR_SPOTIFY_CLIENT_ID>
VITE_SPOTIFY_SECRET=<YOUR_SPOTIFY_SECRET>

VITE_BACKEND_URL=http://localhost:5000
```

⚠️ **Important:** Replace the placeholders with your actual API credentials.

**2.2 Backend Configuration (`backend/.env` or environment variables)**

Navigate to the `backend` directory. You can configure the environment variables in one of the following ways:

- **Create a `.env` file:** Add the following to a `.env` file in the backend directory:

```.env
SPOTIFY_CLIENT_ID=<YOUR_SPOTIFY_CLIENT_ID>
SPOTIFY_SECRET=<YOUR_SPOTIFY_SECRET>
PORT=5000
GENIUS_ACCESS_TOKEN=<YOUR_GENIUS_ACCESS_TOKEN>
```

⚠️ **Important:** Replace the placeholders with your actual API credentials.

- **Set environment variables directly:** Alternatively, you can set these environment variables directly in your operating system's environment.

**3. Install Backend Dependencies and Run the Backend Server**

1. Open a new terminal window
2. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the backend server:

   ```bash
   node server.mjs
   ```

**4. Install Frontend Dependencies and Run the Frontend Application**

1. Open another new terminal window.

2. Navigate to the frontend directory:

   ```Bash
   cd frontend
   ```

3. Install the dependencies:

   ```Bash
   npm install
   # or
   yarn install
   ```

4. Start the frontend development server:

   ```Bash
   npm run dev
   ```

This will typically start a development server, and you can access the application in your browser at the provided URL (usually `http://localhost:<some_port>`).

## Accessing the Application

Open your web browser and navigate to the URL provided by the `npm run dev` command in the frontend terminal. You should now be able to use the web application.

## Troubleshooting

- **API Key Errors:** Ensure that your Spotify Client ID, Client Secret, and Genius Access Token are correctly entered in the respective `.env` files or environment variables.

- **Backend Not Running:** Verify that the backend server has started successfully without any errors by checking the terminal output.
- **Frontend Not Running:** Check the frontend terminal for any error messages during startup.

- **Network Issues:** Make sure the VITE_BACKEND_URL in your `frontend/.env` file is correctly set to `http://localhost:5000` (or the actual address where your backend is running).

- **CORS Issues:** If you encounter CORS errors in your browser's console, you might need to configure CORS headers in your backend Express.js application to allow requests from your frontend domain.

## Contributing

We welcome contributions to this project! If you'd like to contribute, please follow these steps:

1.  **Fork the repository** on GitHub.

2.  **Clone your forked repository** to your local machine.

3.  **Create a new branch** for your feature or bug fix:

    ```Bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b fix/your-bug-fix
    ```

4.  **Make your changes** and commit them with clear and concise commit messages:

    ```Bash
    git add .
    git commit -m "feat: Add new feature"
    # or
    git commit -m "fix: Resolve issue with..."
    ```

5.  **Push your changes** to your forked repository:
    ```Bash
    git push origin feature/your-feature-name
    # or
    git push origin fix/your-bug-fix
    ```
6.  **Create a Pull Request** from your branch to the main branch of the original repository.

Please ensure your code follows the project's coding standards and includes relevant tests. We will review your pull request and provide feedback.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
