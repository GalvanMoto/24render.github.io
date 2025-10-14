# 24Render Website

This is the source code for the 24Render VFX & Video Editing website.

## How to Deploy to GitHub Pages

1. **Push your code to a GitHub repository**
   - Make sure your `index.html` is at the root of the repository.
   - All assets (CSS, JS, images, etc.) should be in their respective folders as in this project structure.

2. **Configure GitHub Pages**
   - Go to your repository on GitHub.
   - Click on **Settings** > **Pages**.
   - Under **Source**, select the `main` branch (or `master` if that's your default) and `/ (root)` folder.
   - Click **Save**.

3. **Wait for Deployment**
   - GitHub will build and deploy your site. The link will be shown at the top of the Pages settings.

## Notes
- All links and asset paths are relative, so the site will work on GitHub Pages without changes.
- If you use custom domains, configure them in the Pages settings.
- If you use SPA-style navigation, consider adding a `404.html` that redirects to `index.html`.

---

**You're ready to deploy!**
