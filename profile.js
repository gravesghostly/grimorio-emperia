// Profile Management System
// Handles character data, virtue points, specializations, and statistics

class ProfileManager {
    constructor() {
        this.profileData = this.loadProfile();
        this.init();
    }

    // Initialize profile with default data
    getDefaultProfile() {
        return {
            // Personal Identity
            scribeName: "Apprentice Scribe",
            personalMotto: "Amo ĉiujn, fidu malmultajn, difektu neniun",
            oathDate: null,
            currentFocus: "Beginning the path of the Three Virtues",
            studiol oLocation: "My Sacred Space",
            patronVirtue: "thoth", // thoth, maat, or caerus

            // Current Status
            overallRank: 1,
            totalPoints: 0,
            totalWorkings: 0,
            currentStreak: 0,
            longestStreak: 0,
            lastPracticeDate: null,

            // Virtue Points
            thoth: {
                points: 0,
                level: 1,
                volumesRead: 0,
                herbsStudied: 0,
                esperantoPhrases: 0,
                workingsDocumented: 0,
                moonCycles: 0
            },
            maat: {
                points: 0,
                level: 1,
                dailyCheckins: 0,
                cleansingRituals: 0,
                altarDays: 0,
                ethicalDecisions: 0,
                balanceScore: "Developing"
            },
            caerus: {
                points: 0,
                level: 1,
                moonWorkings: 0,
                planetaryHours: 0,
                synchronicities: 0,
                perfectTimings: 0,
                timingAccuracy: 0
            },

            // Specializations (unlocked at Journeyman)
            specializations: {
                herbalist: { unlocked: false, progress: 0 },
                astrologer: { unlocked: false, progress: 0 },
                alchemist: { unlocked: false, progress: 0 },
                guardian: { unlocked: false, progress: 0 },
                scholar: { unlocked: false, progress: 0 },
                polyglot: { unlocked: false, progress: 0 }
            },

            // Practice Statistics
            workingsByType: {
                protection: 0,
                healing: 0,
                cleansing: 0,
                manifestation: 0
            },
            herbUsage: {},
            moonPhasePreference: {},
            dayOfWeekActivity: {},
            successfulWorkings: 0,

            // Achievements
            achievements: [],
            
            // Quest Completion
            lastDailyReset: null,
            lastWeeklyReset: null,
            lastMonthlyReset: null,
            completedQuests: {
                daily: [],
                weekly: [],
                monthly: []
            }
        };
    }

    // Load profile from localStorage
    loadProfile() {
        const saved = localStorage.getItem('grimorioProfile');
        if (saved) {
            return JSON.parse(saved);
        }
        return this.getDefaultProfile();
    }

    // Save profile to localStorage
    saveProfile() {
        localStorage.setItem('grimorioProfile', JSON.stringify(this.profileData));
    }

    // Initialize page
    init() {
        this.updateDisplay();
        this.calculateDaysPracticing();
        this.updateStreaks();
        this.checkRankProgress();
    }

    // Update all display elements
    updateDisplay() {
        // Header
        document.getElementById('scribeName').textContent = this.profileData.scribeName;
        document.getElementById('scribeTitle').textContent = this.getRankTitle();
        document.getElementById('personalMotto').textContent = this.profileData.personalMotto;
        
        if (this.profileData.oathDate) {
            document.getElementById('oathDate').textContent = new Date(this.profileData.oathDate).toLocaleDateString();
        }
        document.getElementById('daysPracticing').textContent = this.calculateDaysPracticing();

        // Current Status
        document.getElementById('overallRank').textContent = this.profileData.overallRank;
        document.getElementById('totalPoints').textContent = this.profileData.totalPoints;
        document.getElementById('totalWorkings').textContent = this.profileData.totalWorkings;
        document.getElementById('currentStreak').textContent = this.profileData.currentStreak;
        document.getElementById('currentFocus').textContent = this.profileData.currentFocus;

        // Rank Progress
        const rankProgress = this.calculateRankProgress();
        document.getElementById('rankProgressBar').style.width = rankProgress.percentage + '%';
        document.getElementById('rankProgressText').textContent = `${rankProgress.current} / ${rankProgress.needed}`;

        // Virtue Stats
        this.updateVirtueDisplay('thoth');
        this.updateVirtueDisplay('maat');
        this.updateVirtueDisplay('caerus');

        // Practice Statistics
        document.getElementById('protectionWorkings').textContent = this.profileData.workingsByType.protection;
        document.getElementById('healingWorkings').textContent = this.profileData.workingsByType.healing;
        document.getElementById('cleansingWorkings').textContent = this.profileData.workingsByType.cleansing;
        document.getElementById('manifestationWorkings').textContent = this.profileData.workingsByType.manifestation;

        // Preferred Practices
        document.getElementById('topHerb').textContent = this.getTopHerb();
        document.getElementById('favMoonPhase').textContent = this.getFavoriteMoonPhase();
        document.getElementById('activeDay').textContent = this.getMostActiveDay();
        document.getElementById('successRate').textContent = this.getSuccessRate();
        document.getElementById('longestStreak').textContent = this.profileData.longestStreak + ' days';

        // In-Character Rank
        document.getElementById('icRank').textContent = this.getRankTitle();
    }

    // Update individual virtue display
    updateVirtueDisplay(virtue) {
        const data = this.profileData[virtue];
        const levelThresholds = [0, 50, 100, 150, 225, 300, 400, 500];
        const currentLevel = data.level;
        const nextThreshold = levelThresholds[currentLevel] || 500;
        const progress = (data.points / nextThreshold) * 100;

        document.getElementById(virtue + 'Level').textContent = currentLevel;
        document.getElementById(virtue + 'Points').textContent = data.points;
        document.getElementById(virtue + 'ProgressBar').style.width = Math.min(progress, 100) + '%';
        document.getElementById(virtue + 'ProgressText').textContent = `${data.points} / ${nextThreshold}`;

        // Update specific stats based on virtue
        if (virtue === 'thoth') {
            document.getElementById('volumesRead').textContent = data.volumesRead + ' / 5';
            document.getElementById('herbsStudied').textContent = data.herbsStudied;
            document.getElementById('esperantoPhrases').textContent = data.esperantoPhrases;
            document.getElementById('workingsDocumented').textContent = data.workingsDocumented;
        } else if (virtue === 'maat') {
            document.getElementById('dailyCheckins').textContent = data.dailyCheckins;
            document.getElementById('cleansingRituals').textContent = data.cleansingRituals;
            document.getElementById('altarDays').textContent = data.altarDays + ' days';
            document.getElementById('balanceScore').textContent = data.balanceScore;
        } else if (virtue === 'caerus') {
            document.getElementById('moonWorkings').textContent = data.moonWorkings;
            document.getElementById('planetaryHours').textContent = data.planetaryHours;
            document.getElementById('synchronicities').textContent = data.synchronicities;
            document.getElementById('timingAccuracy').textContent = Math.round(data.timingAccuracy) + '%';
        }
    }

    // Calculate days practicing
    calculateDaysPracticing() {
        if (!this.profileData.oathDate) return 0;
        const oath = new Date(this.profileData.oathDate);
        const now = new Date();
        const diff = Math.floor((now - oath) / (1000 * 60 * 60 * 24));
        return Math.max(0, diff);
    }

    // Update practice streaks
    updateStreaks() {
        const today = new Date().toDateString();
        const lastDate = this.profileData.lastPracticeDate;

        if (lastDate) {
            const last = new Date(lastDate);
            const dayDiff = Math.floor((new Date(today) - last) / (1000 * 60 * 60 * 24));

            if (dayDiff === 0) {
                // Same day, streak continues
            } else if (dayDiff === 1) {
                // Next day, increment streak
                this.profileData.currentStreak++;
                if (this.profileData.currentStreak > this.profileData.longestStreak) {
                    this.profileData.longestStreak = this.profileData.currentStreak;
                }
            } else if (dayDiff > 1) {
                // Streak broken
                this.profileData.currentStreak = 1;
            }
        } else {
            this.profileData.currentStreak = 1;
        }

        this.profileData.lastPracticeDate = today;
        this.saveProfile();
    }

    // Calculate rank progress
    calculateRankProgress() {
        const rankThresholds = [0, 50, 150, 300, 500, 750, 1000];
        const currentRank = this.profileData.overallRank;
        const currentPoints = this.profileData.totalPoints;
        const currentThreshold = rankThresholds[currentRank - 1] || 0;
        const nextThreshold = rankThresholds[currentRank] || 1000;
        
        const pointsInLevel = currentPoints - currentThreshold;
        const pointsNeeded = nextThreshold - currentThreshold;
        const percentage = (pointsInLevel / pointsNeeded) * 100;

        return {
            current: currentPoints,
            needed: nextThreshold,
            percentage: Math.min(percentage, 100)
        };
    }

    // Check if ready for rank up
    checkRankProgress() {
        const rankThresholds = [0, 50, 150, 300, 500, 750, 1000];
        const nextThreshold = rankThresholds[this.profileData.overallRank] || 1000;
        
        if (this.profileData.totalPoints >= nextThreshold) {
            // Show rank up notification (would trigger modal or notification)
            console.log('Ready to rank up!');
        }
    }

    // Get rank title
    getRankTitle() {
        const ranks = [
            "Novice",
            "Apprentice of the Three Virtues",
            "Journeyman Scribe",
            "Adept Practitioner",
            "Master of Natural Philosophy",
            "Sage of the Three Paths",
            "Grandmaster"
        ];
        return ranks[this.profileData.overallRank - 1] || "Novice";
    }

    // Get top herb
    getTopHerb() {
        const usage = this.profileData.herbUsage;
        if (Object.keys(usage).length === 0) return "—";
        
        const sorted = Object.entries(usage).sort((a, b) => b[1] - a[1]);
        return sorted[0][0] + ` (${sorted[0][1]}x)`;
    }

    // Get favorite moon phase
    getFavoriteMoonPhase() {
        const phases = this.profileData.moonPhasePreference;
        if (Object.keys(phases).length === 0) return "—";
        
        const sorted = Object.entries(phases).sort((a, b) => b[1] - a[1]);
        return sorted[0][0] + ` (${sorted[0][1]} workings)`;
    }

    // Get most active day
    getMostActiveDay() {
        const days = this.profileData.dayOfWeekActivity;
        if (Object.keys(days).length === 0) return "—";
        
        const sorted = Object.entries(days).sort((a, b) => b[1] - a[1]);
        return sorted[0][0] + ` (${sorted[0][1]} workings)`;
    }

    // Calculate success rate
    getSuccessRate() {
        if (this.profileData.totalWorkings === 0) return "—";
        const rate = (this.profileData.successfulWorkings / this.profileData.totalWorkings) * 100;
        return Math.round(rate) + '%';
    }

    // Add virtue points
    addPoints(virtue, amount) {
        this.profileData[virtue].points += amount;
        this.profileData.totalPoints += amount;
        
        // Check for level up
        this.checkVirtueLevelUp(virtue);
        this.saveProfile();
        this.updateDisplay();
    }

    // Check virtue level up
    checkVirtueLevelUp(virtue) {
        const levelThresholds = [0, 50, 100, 150, 225, 300, 400, 500];
        const points = this.profileData[virtue].points;
        
        for (let i = levelThresholds.length - 1; i >= 0; i--) {
            if (points >= levelThresholds[i]) {
                this.profileData[virtue].level = i + 1;
                break;
            }
        }
    }

    // Export profile data
    exportData() {
        const dataStr = JSON.stringify(this.profileData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `grimorio-profile-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    // Import profile data
    importData(fileInput) {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                this.profileData = imported;
                this.saveProfile();
                this.init();
                alert('Profile imported successfully!');
            } catch (error) {
                alert('Error importing profile. Please check the file format.');
                console.error(error);
            }
        };
        reader.readAsText(file);
    }
}

// Initialize profile manager
const profileManager = new ProfileManager();

// Modal functions
function openEditProfile() {
    document.getElementById('editScribeName').value = profileManager.profileData.scribeName;
    document.getElementById('editMotto').value = profileManager.profileData.personalMotto;
    document.getElementById('editOathDate').value = profileManager.profileData.oathDate || '';
    document.getElementById('editFocus').value = profileManager.profileData.currentFocus;
    document.getElementById('editStudiolo').value = profileManager.profileData.studiolоLocation;
    document.getElementById('editModal').style.display = 'block';
}

function closeEditProfile() {
    document.getElementById('editModal').style.display = 'none';
}

function saveProfile() {
    profileManager.profileData.scribeName = document.getElementById('editScribeName').value;
    profileManager.profileData.personalMotto = document.getElementById('editMotto').value;
    profileManager.profileData.oathDate = document.getElementById('editOathDate').value;
    profileManager.profileData.currentFocus = document.getElementById('editFocus').value;
    profileManager.profileData.studiolоLocation = document.getElementById('editStudiolo').value;
    
    profileManager.saveProfile();
    profileManager.updateDisplay();
    closeEditProfile();
}

function exportProfile() {
    profileManager.exportData();
}

function importProfile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => profileManager.importData(input);
    input.click();
}

function openJournalPrompt() {
    // This would open a journal entry modal or redirect to logger
    window.location.href = 'logger.html?type=reflection';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditProfile();
    }
}
