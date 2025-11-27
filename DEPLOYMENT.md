# 🚀 Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and your app will be live!

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"

**Your app will be live at**: `https://your-project-name.vercel.app`

## Deploy to Netlify

1. Build the application:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod
```

Or use the Netlify dashboard to connect your Git repository.

## Deploy to AWS Amplify

1. Push code to GitHub
2. Go to AWS Amplify Console
3. Connect your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
5. Deploy

## Deploy to Your Own Server

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

The app will run on port 3000 by default.

### Using PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start npm --name "digital-assessment" -- start
pm2 save
pm2 startup
```

## Environment Variables

This application doesn't require any environment variables as it's fully client-side.

## Custom Domain

### Vercel
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to "Domain settings"
2. Add custom domain
3. Configure DNS

## Performance Optimization

The application is already optimized with:
- ✅ Next.js automatic code splitting
- ✅ Image optimization (if you add images)
- ✅ CSS optimization with Tailwind
- ✅ Client-side rendering for interactive components

## SSL/HTTPS

Both Vercel and Netlify provide automatic SSL certificates.

## Monitoring

Consider adding:
- Google Analytics
- Vercel Analytics
- Sentry for error tracking

## Build Output

After running `npm run build`, you'll see:
- Optimized production build
- Bundle size analysis
- Route information

## Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Clear `.next` folder and rebuild
- Verify all dependencies are installed

### PDF Generation Issues
- jsPDF works client-side only
- Ensure browser supports required features

### Chart Not Displaying
- Recharts requires client-side rendering
- Check that 'use client' directive is present

## Post-Deployment Checklist

- [ ] Test all 5 assessment categories
- [ ] Verify PDF download works
- [ ] Check responsive design on mobile
- [ ] Test radar chart rendering
- [ ] Verify all animations work
- [ ] Test "Start New Assessment" functionality
- [ ] Check browser compatibility

## Scaling Considerations

This is a client-side application, so:
- No server-side scaling needed
- CDN handles all traffic
- No database to manage
- Infinite scalability with static hosting

---

**Your Digital Transformation Assessment tool is ready to deploy! 🎉**
