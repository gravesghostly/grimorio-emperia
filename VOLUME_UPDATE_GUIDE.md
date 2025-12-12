# 📝 Quick Update Guide for Volume Pages

## ✅ What I Just Updated

I've added the desktop CSS link to these 5 new pages:
- ✅ index.html
- ✅ profile.html
- ✅ quests.html
- ✅ achievements.html
- ✅ logger.html

## 📚 What You Need to Update

Your existing volume pages need two updates:

### **Update 1: Add Desktop CSS**

In each volume page (`volume1.html` through `volume5.html`), find this in the `<head>`:

```html
<link rel="stylesheet" href="../css/divine-baroque.css">
```

Change it to:

```html
<link rel="stylesheet" href="../css/divine-baroque.css">
<link rel="stylesheet" href="../css/desktop-grimoire.css">
```

**Note the `../` - that's important for volume pages since they're in a subfolder!**

---

### **Update 2: Add New Navigation Links**

In each volume page, find your `<nav>` section and update it to include the new pages:

**OLD navigation:**
```html
<nav>
    <ul>
        <li><a href="../index.html">Home</a></li>
        <li><a href="volume1.html">Volume I</a></li>
        <li><a href="volume2.html">Volume II</a></li>
        <li><a href="volume3.html">Volume III</a></li>
        <li><a href="volume4.html">Volume IV</a></li>
        <li><a href="volume5.html">Volume V</a></li>
    </ul>
</nav>
```

**NEW navigation:**
```html
<nav>
    <ul>
        <li><a href="../index.html">Home</a></li>
        <li><a href="../profile.html">Profile</a></li>
        <li><a href="../quests.html">Quests</a></li>
        <li><a href="../achievements.html">Achievements</a></li>
        <li><a href="../logger.html">Logger</a></li>
        <li><a href="volume1.html">Volume I</a></li>
        <li><a href="volume2.html">Volume II</a></li>
        <li><a href="volume3.html">Volume III</a></li>
        <li><a href="volume4.html">Volume IV</a></li>
        <li><a href="volume5.html">Volume V</a></li>
    </ul>
</nav>
```

---

## 🎯 Files to Update on GitHub

You need to edit these 5 files in your GitHub repo:

1. `volumes/volume1.html`
2. `volumes/volume2.html`
3. `volumes/volume3.html`
4. `volumes/volume4.html`
5. `volumes/volume5.html`

---

## 📋 Step-by-Step

### **Option A: Edit on GitHub Website**

1. Go to https://github.com/shieldsofrosaria/grimorio-emperia
2. Navigate to `volumes/volume1.html`
3. Click the pencil icon (Edit)
4. Find the `<link rel="stylesheet"...` line
5. Add the new desktop CSS line below it
6. Find the `<nav>` section
7. Add the 4 new navigation links
8. Click "Commit changes"
9. Repeat for volumes 2-5

### **Option B: Edit Locally**

1. Clone or pull your repo
2. Open each volume file in a text editor
3. Make both changes (CSS link + navigation)
4. Save all files
5. Commit and push:
   ```bash
   git add .
   git commit -m "Add desktop CSS and new navigation to volumes"
   git push
   ```

---

## ✅ Checklist

After updating, verify:

- [ ] Desktop CSS link added to volume1.html
- [ ] Desktop CSS link added to volume2.html
- [ ] Desktop CSS link added to volume3.html
- [ ] Desktop CSS link added to volume4.html
- [ ] Desktop CSS link added to volume5.html
- [ ] New nav links added to all 5 volumes
- [ ] All files pushed to GitHub
- [ ] Test on mobile (< 1024px)
- [ ] Test on desktop (1024px+)

---

## 🎨 What Will Change

**Mobile users:** Nothing! They'll see the same clean layout.

**Desktop users:** They'll get:
- Three-column layout with sidebars
- Ornate card corners (✦)
- Book spine effects
- Parchment textures
- Enhanced hover effects
- Grimoire aesthetic

---

## 💡 Need Help?

If you want me to create complete updated versions of your volume pages, just let me know and I can rebuild them with all the updates included!

The example template (`EXAMPLE_VOLUME_TEMPLATE.html`) shows the structure with both updates already in place.
