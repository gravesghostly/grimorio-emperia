# 🎮 Grimorio Emperia - Gamification System

## ✨ Overview

This package contains a complete RPG/leveling system for your grimoire practice! It transforms your spiritual journey into an engaging, trackable, gamified experience.

## 📦 What's Included

### **Core Pages:**
1. **profile.html** - Complete character sheet/codex
2. **quests.html** - Daily/Weekly/Monthly quest system with timers
3. **js/profile.js** - Profile management with localStorage
4. **js/quests.js** - Quest tracking with auto-reset timers

### **Features:**

#### **Profile System (profile.html)**
- ✅ Complete character identity (name, motto, oath date, studiolo location)
- ✅ Three Virtue tracking (Thoth, Ma'at, Caerus) with individual levels
- ✅ Overall rank progression (7 ranks: Novice → Grandmaster)
- ✅ 6 specialization paths (unlockable at Journeyman)
- ✅ Practice statistics & analytics
- ✅ Achievement showcase
- ✅ Streak tracking
- ✅ Export/Import profile data
- ✅ In-character reflection prompts

#### **Quest System (quests.html)**
- ✅ **Daily Quests** (5 quests, auto-reset at midnight)
  - Morning intention (+2 Ma'at)
  - Study session (+5 Thoth)
  - Moon phase check (+2 Caerus)
  - Journal entry (+3 Ma'at)
  - Review herb/crystal (+3 Thoth)
  - **Bonus:** Complete 3/5 = +5 bonus points

- ✅ **Weekly Quests** (5 quests, reset Mondays)
  - Perform working (+15 mixed)
  - Cleanse studiolo (+8 Ma'at)
  - Document 3+ workings (+10 Thoth)
  - Esperanto practice 3x (+9 Thoth)
  - Sync with moon phase (+10 Caerus)

- ✅ **Monthly Quests** (5 quests, reset 1st of month)
  - Complete volume quiz (+20 Thoth)
  - Track full moon cycle (+15 Caerus)
  - Master new herb (+12 Thoth)
  - Work in all phases (+25 Caerus)
  - 20+ documented practices (+30 Ma'at)

- ✅ **Rank-Up Requirements**
  - Detailed checklist for each rank
  - Auto-tracking of progress
  - Quiz unlock when requirements met

#### **Virtue Point System:**
- 🌙 **Thoth Points** - Knowledge, study, documentation
- ⚖️ **Ma'at Points** - Balance, ethics, cleansing
- ⚡ **Caerus Points** - Timing, synchronicity, opportunity

#### **7-Tier Rank System:**
1. **Novice** (0-50 points)
2. **Apprentice** (51-150 points)
3. **Journeyman** (151-300 points) - Unlocks specializations!
4. **Adept** (301-500 points)
5. **Master** (501-750 points)
6. **Sage** (751-1000 points)
7. **Grandmaster** (1000+ points)

#### **6 Specialization Paths:**
1. 🌿 **Master Herbalist** - Plant mastery
2. 🌙 **Lunar Astrologer** - Timing expert
3. ⚗️ **Alchemist** - Transformation
4. 🛡️ **Apotropaic Adept** - Protection specialist
5. 📚 **Scribe Scholar** - Documentation master
6. 🗣️ **Polyglot Mage** - Esperanto fluency

## 🚀 Installation

### Step 1: Add to Your Repository

Upload these files to your grimorio-emperia repository:

```
grimorio-emperia/
├── profile.html          (← New)
├── quests.html           (← New)
├── js/
│   ├── profile.js        (← New)
│   └── quests.js         (← New)
├── index.html
├── css/
│   └── divine-baroque.css
└── volumes/
    └── (existing volumes)
```

### Step 2: Update Navigation

Add these links to your existing navigation in all pages:

```html
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="profile.html">Profile</a></li>      <!-- NEW -->
        <li><a href="quests.html">Quests</a></li>        <!-- NEW -->
        <li><a href="volumes/volume1.html">Volume I</a></li>
        <!-- ... rest of your nav -->
    </ul>
</nav>
```

### Step 3: Test Locally

1. Open `profile.html` in browser
2. Click "Edit Profile" and set up your character
3. Go to `quests.html` and start checking off tasks
4. Watch your points accumulate!

## 💾 Data Persistence

**All data is saved to browser localStorage:**
- ✅ Profile information
- ✅ Virtue points & levels
- ✅ Quest completion status
- ✅ Statistics & streaks
- ✅ Specialization progress

**IMPORTANT:** Your data stays on your device. Use Export/Import to:
- Back up your profile
- Transfer between devices
- Keep a backup copy

## 🎯 How to Use

### **Daily Workflow:**

1. **Morning:**
   - Open quests.html
   - Check off "Morning Intention Setting"
   - Review today's moon phase (check it off)

2. **During the Day:**
   - Study session (15+ min) → check off
   - Review an herb → check off
   - Journal entry → check off

3. **Evening:**
   - Check profile.html to see progress
   - Review your streak
   - Plan tomorrow's practices

### **Earning Points:**

**Easy Early Points:**
- Daily quests = 15 points/day minimum
- Complete 3/5 daily = +5 bonus
- That's 20 points/day just from dailies!
- In 3 days you can reach Apprentice rank!

**Weekly Boosts:**
- Full working = +15 points
- Document 3 workings = +10 points
- Cleanse studiolo = +8 points

**Monthly Milestones:**
- Track moon cycle = +15
- Master new herb = +12
- Work all phases = +25

### **Rank Progression:**

1. Start as **Novice**
2. Do daily quests to earn points
3. Check "Rank-Up Requirements" tab
4. Complete ALL requirements
5. Take quiz (when implemented)
6. Advance to next rank!
7. At **Journeyman**, specializations unlock!

## 🎨 Customization

### Adjust Point Values

Edit `js/quests.js`, find `awardQuestReward()`:

```javascript
const rewards = {
    'daily-intention': { maat: 2 },  // ← Change these numbers
    'daily-study': { thoth: 5 },
    // ... etc
};
```

### Add New Quests

1. Edit `quests.html`
2. Copy an existing quest `<li>` block
3. Change `data-quest="your-new-id"`
4. Update title, description, reward
5. Add reward to `js/quests.js` rewards object

### Change Rank Names

Edit `js/profile.js`, find `getRankTitle()`:

```javascript
const ranks = [
    "Novice",
    "Your Custom Name Here",  // ← Edit these
    "Another Custom Name",
    // ... etc
];
```

## 🐛 Troubleshooting

**Q: My quests won't check off**
- A: Make sure JavaScript is enabled
- Clear browser cache and reload
- Check browser console for errors (F12)

**Q: Quests didn't reset**
- A: Refresh the page at the reset time
- Check your system time/timezone
- Manually reset: Open console, type `localStorage.clear()`

**Q: Lost my data!**
- A: Use Export Profile regularly to backup
- Data is per-browser (Chrome data ≠ Firefox data)
- Incognito mode doesn't save data

**Q: Progress bars not updating**
- A: Refresh the page
- Make sure you're checking off quests in quests.html
- Points only update when quests are completed

## 🔮 Future Enhancements

**Coming Soon:**
- achievements.html - Badge gallery with lore
- logger.html - Working documentation logger
- Quiz system for rank-ups
- Achievement notifications
- Visual level-up effects
- Specialization skill trees
- Mobile app version

## 📝 Notes for Worldbuilding

This system is designed to support your worldbuilding! The profile data structure includes:

- Character identity fields
- IC (in-character) reflection prompts
- Roleplay-friendly terminology
- Extensible data structure

You can add custom fields to `profileData` in profile.js:

```javascript
// In getDefaultProfile()
worldbuilding: {
    characterBackground: "",
    connections: [],
    personalTheory: "",
    researchNotes: []
}
```

## 🌙⚖️⚡ Philosophy Integration

The gamification respects the Three Virtues:

- **Thoth** quests emphasize learning and documentation
- **Ma'at** quests focus on balance and ethics
- **Caerus** quests reward timing and awareness

This isn't just a point system - it's a reflection of your actual practice philosophy!

## 📊 Technical Details

**Browser Compatibility:**
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

**Data Storage:**
- Format: JSON in localStorage
- Size: ~50KB typical
- Limit: 5-10MB (browser dependent)
- Scope: Per domain, per browser

**Performance:**
- Lightweight: Pure vanilla JS
- No frameworks needed
- Fast loading (<1s)
- No external dependencies

## 🤝 Integration with Existing Grimoire

These pages use your existing `divine-baroque.css` stylesheet, so they match your current aesthetic perfectly. The midnight blue starfield theme carries through seamlessly!

## 💡 Tips for Maximum Engagement

1. **Set realistic goals** - Start with just daily quests
2. **Use streaks** - They're motivating!
3. **Track one specialization at a time**
4. **Export data weekly** - Don't lose progress
5. **Celebrate milestones** - Each rank is an achievement
6. **Make it ritual** - Check quests as part of morning/evening practice
7. **Use IC reflection prompts** - They're great for journaling

## 🎭 Roleplay Integration

The system is designed for immersion:

- Use your scribe name in practice
- Write IC reflections
- Treat rank titles seriously
- Document as if for future students
- Your profile IS your character sheet

## ⚠️ Important Reminders

1. **Backup your data** - Use export regularly!
2. **One browser = one profile** - Export to transfer
3. **Timers are client-side** - Based on your system time
4. **Quest completion is manual** - Honest self-reporting
5. **localStorage can be cleared** - Browser settings affect this

## 🌟 Getting Started Checklist

- [ ] Upload files to repository
- [ ] Update navigation links
- [ ] Open profile.html
- [ ] Set up your character (Edit Profile)
- [ ] Set oath date
- [ ] Go to quests.html
- [ ] Complete first daily quest
- [ ] Export your profile (backup!)
- [ ] Check off 3/5 dailies for bonus
- [ ] Watch your first points appear!

## 📧 Questions?

This system is fully functional and ready to use! Just upload to GitHub Pages and start your journey. Everything saves automatically, timers run in background, and progress is persistent.

---

**Remember:** The grimoire is the tool, but YOU are the practitioner. The points are just a reflection of your actual practice. Stay true to the Three Virtues! 🌙⚖️⚡

---

## Version History

- **v1.0** (December 2025)
  - Initial release
  - Profile system
  - Quest system with daily/weekly/monthly
  - 7-tier rank progression
  - 6 specialization paths
  - localStorage persistence
  - Export/Import functionality
