# Deployment and Configuration Guide for Spotify Clone

This guide provides step-by-step instructions on how to deploy your Next.js project to Vercel and how to easily update the Telegram bot token and chat ID.

## 1. Deploying to Vercel

Vercel is the recommended platform for deploying Next.js applications. It offers seamless integration with Git providers (GitHub, GitLab, Bitbucket) and handles all the build and deployment steps automatically.

### Step 1: Prepare Your Project for Git

First, you need to initialize a Git repository and commit your project files.

1.  **Initialize Git:**
    ```bash
    cd /home/ubuntu
    git init
    ```

2.  **Commit Files:**
    ```bash
    git add .
    git commit -m "Initial commit: Spotify clone with multi-language and Telegram tracking"
    ```

3.  **Create a Remote Repository:**
    You must create a new, empty repository on your preferred Git hosting service (e.g., GitHub).

4.  **Push to Remote:**
    Replace `[YOUR_USERNAME]` and `[YOUR_REPO_NAME]` with your actual details.
    ```bash
    git remote add origin https://github.com/[YOUR_USERNAME]/[YOUR_REPO_NAME].git
    git branch -M main
    git push -u origin main
    ```

### Step 2: Import Project into Vercel

1.  **Log in to Vercel:** Go to [Vercel](https://vercel.com/) and log in with your Git account.
2.  **Import Project:** Click the **"Add New..."** button and select **"Project"**.
3.  **Select Git Repository:** Choose the repository you just pushed (e.g., `[YOUR_REPO_NAME]`).
4.  **Configure Project:** Vercel will automatically detect that it's a Next.js project. You can leave the default settings for **Build & Output Settings**.
5.  **Deploy:** Click the **"Deploy"** button. Vercel will clone your repository, build the project, and deploy it to a unique URL.

## 2. Updating Telegram Credentials

The Telegram bot token and chat ID are currently hardcoded in the `/lib/telegram.ts` file. For a production environment, it is best practice to use **Environment Variables**.

### Option A: Update in Vercel (Recommended)

To update the credentials without modifying the code every time, you should set them as Environment Variables in Vercel.

1.  **Go to Project Settings:** In your Vercel dashboard, navigate to your deployed project.
2.  **Select Environment Variables:** Click on the **"Settings"** tab, then select **"Environment Variables"** from the sidebar.
3.  **Add Variables:** Add the following two variables:

| Name | Value | Environments |
| :--- | :--- | :--- |
| `TELEGRAM_BOT_TOKEN` | `8361020073:AAFfPXu1trr71fxQXKVA0xU5WX_f9z8IN6Y` | All (Production, Preview, Development) |
| `TELEGRAM_CHAT_ID` | `5219969216` | All (Production, Preview, Development) |

4.  **Update Code to Use Environment Variables:**
    You will need to modify the `/lib/telegram.ts` file to read these variables instead of using hardcoded values.

    **Current Code in `/lib/telegram.ts`:**
    ```typescript
    const BOT_TOKEN = "8361020073:AAFfPXu1trr71fxQXKVA0xU5WX_f9z8IN6Y"
    const CHAT_ID = "5219969216"
    ```

    **Code to Replace With:**
    ```typescript
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID
    ```
    *Note: Since this is a Next.js project, you may need to prefix the variables with `NEXT_PUBLIC_` if they are used on the client side, but for server-side API calls (which is how Vercel handles this), the current names are sufficient.*

5.  **Redeploy:** After making the code change in Step 4 and pushing it to your Git repository, Vercel will automatically redeploy the project, and it will use the new Environment Variables.

### Option B: Update in Code

If you prefer to keep the credentials in the code, you can directly edit the `/lib/telegram.ts` file:

1.  **Edit the File:**
    ```bash
    # Use the file tool to edit the file
    # Replace the existing values with your new token and chat ID
    ```

2.  **Commit and Push:** Commit the change and push it to your Git repository. Vercel will automatically deploy the updated version.

## 3. Final Steps

Once deployed, your application will be live and fully functional with all the multi-language and tracking features you requested. Remember to always use Environment Variables for sensitive information like API keys and tokens.

***

### References

No external references were used for this guide. The information is based on the project's current configuration and standard Next.js/Vercel deployment practices.
