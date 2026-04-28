# Backend Deployment Walkthrough (Render)

I have made the necessary code changes to make your backend production-ready:
1. `app.py` now supports dynamic database connections via the `DATABASE_URL` environment variable.
2. `requirements.txt` now includes `gunicorn` (the production web server) and no longer includes the heavy AI libraries that were causing deployment risks (since those run on the edge device anyway).

Follow these steps to deploy your backend to Render.

## Step 1: Commit and Push
First, we need to push the changes I just made to GitHub.
Run this in your terminal:
```bash
git add backend/app.py backend/requirements.txt
git commit -m "Prepare backend for Render deployment"
git push
```

## Step 2: Create PostgreSQL Database on Render
1. Go to [Render.com](https://render.com) and create an account or log in.
2. Click **New +** and select **PostgreSQL**.
3. Name your database (e.g., `wildalert-db`).
4. Select your preferred region and choose the **Free** instance type.
5. Click **Create Database**.
6. Once created, scroll down to the **Connections** section and copy the **Internal Database URL** (it starts with `postgres://...`). You will need this in Step 3.

## Step 3: Create Web Service on Render
1. Click **New +** and select **Web Service**.
2. Select **Build and deploy from a Git repository** and connect your GitHub account if prompted.
3. Select your "Animal Detection and Alerting System" repository.
4. Configure the Web Service:
   - **Name**: `wildalert-api`
   - **Root Directory**: `backend` (Important! Make sure you type exactly this)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: Free
5. **Environment Variables**:
   - Scroll down to Environment Variables and click "Add Environment Variable".
   - **Key**: `DATABASE_URL`
   - **Value**: Paste the **Internal Database URL** you copied in Step 2.
   - *(Optional)* Add your `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TWILIO_ACCOUNT_SID`, etc., if you want live notifications to work in production.
6. Click **Create Web Service**.

## Step 4: Wait and Verify
Render will now install your packages and start the server. This usually takes 2-5 minutes.
Watch the logs to ensure it says `gunicorn starting`.

Once deployed, copy the **Render URL** at the top left of the screen (e.g., `https://wildalert-api.onrender.com`).

## Step 5: Finalizing the Connection
Right now, your frontend on Vercel is trying to connect to a blank URL or localhost. 
We need to update Vercel to point to Render:
1. Go back to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click on your `animal-detection-frontend` project.
3. Go to **Settings** -> **Environment Variables**.
4. Edit the `VITE_API_BASE_URL` variable.
5. Set the Value to your new Render URL (e.g., `https://wildalert-api.onrender.com`). *Make sure there is no trailing slash.*
6. Click **Save**.
7. **Important:** Go to the **Deployments** tab on Vercel, click the three dots next to your latest deployment, and click **Redeploy**. This injects the new URL into your frontend code.

Your full system will now be live! Let me know when you've finished these steps or if you run into any errors on Render!
