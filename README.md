# 🧠 AI Study Assistant

**AI Study Assistant** is a premium, AI-powered productivity platform designed to help students organize their studies, focus better, and leverage Artificial Intelligence to summarize complex lecture notes.

## 🚀 Key Features

*   **AI Note Summarization**: Effortlessly condense long lecture notes into structured, bulleted summaries using GPT-3.5/4.
*   **Google OAuth Integration**: Secure and seamless "Continue with Google" login.
*   **Smart Planner**: Manage tasks and deadlines with an integrated study planner.
*   **Subject Organization**: Categorize your materials with custom color-coded subjects.
*   **Pomodoro Timer**: Stay focused with a built-in productivity timer.
*   **Premium UI/UX**: Modern, responsive design with smooth animations and dark mode support.

## 🛠️ Tech Stack

*   **Frontend**: [Next.js](https://nextjs.org/), React, Tailwind CSS, Framer Motion, Lucide Icons.
*   **Backend**: Node.js, Express.
*   **ORM/Database**: Sequelize with MySQL.
*   **AI**: OpenAI API integration.
*   **Auth**: JSON Web Tokens (JWT) & Google OAuth 2.0.

## 📦 Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/ai-study-assistant.git
    cd ai-study-assistant
    ```

2.  **Environment Variables**:
    Create a `.env` file in both `frontend` and `backend` directories using the provided guidance in the project documentation.

3.  **Install Dependencies**:
    ```bash
    # Root
    npm install
    # Frontend
    cd frontend && npm install
    # Backend
    cd ../backend && npm install
    ```

4.  **Run Development Server**:
    ```bash
    # Backend (from /backend)
    npm run dev
    # Frontend (from /frontend)
    npm run dev
    ```

## 📜 License
Available under the [ISC License](LICENSE).
