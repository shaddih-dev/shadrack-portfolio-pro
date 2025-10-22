# 🚀 Quick Start Guide
## Shadrack Maina - Professional Portfolio

### ⚡ Get Started in 3 Steps

#### 1️⃣ **Generate Placeholder Images**
```bash
cd ~/shadrack-portfolio-pro
firefox scripts/generate-placeholders.html
# or
google-chrome scripts/generate-placeholders.html
```
Click "Generate All Images" button, then move images to correct folders.

#### 2️⃣ **Test Locally**
```bash
cd ~/shadrack-portfolio-pro
python3 -m http.server 8000
```
Open browser: http://localhost:8000

#### 3️⃣ **Deploy**
```bash
cd ~/shadrack-portfolio-pro
./deploy.sh
```
Choose your deployment method (Netlify, Vercel, or GitHub Pages).

---

## 📝 Customization Checklist

### Essential Updates
- [ ] Replace profile photo in `assets/images/profile.jpg`
- [ ] Update contact info in `index.html` (email, phone, social links)
- [ ] Customize `data/projects.json` with your real projects
- [ ] Add your project screenshots to `assets/images/projects/`
- [ ] Update testimonials in `data/projects.json`

### Optional Enhancements
- [ ] Add videos to `assets/videos/`
- [ ] Customize colors in `styles/main.css`
- [ ] Add more projects
- [ ] Link real GitHub repositories
- [ ] Connect contact form to backend (EmailJS, Formspree, etc.)

---

## 🎨 Generate Images Manually

If the HTML generator doesn't work, use this command to create simple placeholders:

```bash
cd ~/shadrack-portfolio-pro/assets/images/projects

# Create placeholder images using ImageMagick (if installed)
convert -size 1200x800 gradient:#96bf48-#0a0e27 -pointsize 60 -fill white -gravity center -annotate +0+0 "SHOPIFY STORE" shopify-fashion-store.jpg
```

Or use online tools:
- https://placeholder.com/
- https://placehold.co/
- https://via.placeholder.com/

---

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd ~/shadrack-portfolio-pro
netlify deploy --prod
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd ~/shadrack-portfolio-pro
vercel --prod
```

### Option 3: GitHub Pages
```bash
cd ~/shadrack-portfolio-pro
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```
Then enable GitHub Pages in repository settings.

---

## 🔧 Troubleshooting

### Port already in use?
```bash
# Use different port
python3 -m http.server 3000
```

### Permission denied on deploy.sh?
```bash
chmod +x deploy.sh
```

### Missing dependencies?
The portfolio uses CDN links for libraries, so no npm install needed!

### Images not showing?
- Check file paths match exactly
- Ensure images are in correct folders
- Check browser console for 404 errors

---

## 📧 Need Help?

Contact: shaddihmaina15@gmail.com

**Happy Building! 🎉**