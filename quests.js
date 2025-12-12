// Quest Management System
// Handles daily, weekly, monthly quests and rank-up requirements

class QuestManager {
    constructor() {
        this.profileData = this.loadProfile();
        this.init();
    }

    loadProfile() {
        const saved = localStorage.getItem('grimorioProfile');
        return saved ? JSON.parse(saved) : this.getDefaultProfile();
    }

    getDefaultProfile() {
        // Matches profile.js default structure
        return {
            totalPoints: 0,
            overallRank: 1,
            totalWorkings: 0,
            thoth: { points: 0, volumesRead: 0, herbsStudied: 0, workingsDocumented: 0 },
            maat: { points: 0, cleansingRituals: 0, altarDays: 0 },
            caerus: { points: 0, moonWorkings: 0, planetaryHours: 0, synchronicities: 0 },
            currentStreak: 0,
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

    saveProfile() {
        localStorage.setItem('grimorioProfile', JSON.stringify(this.profileData));
    }

    init() {
        this.checkResets();
        this.loadQuestStates();
        this.startTimers();
        this.updateCompletionBars();
        this.loadRankRequirements();
    }

    // Check if quests need to reset
    checkResets() {
        const now = new Date();
        const today = now.toDateString();

        // Daily reset at midnight
        if (!this.profileData.lastDailyReset || this.profileData.lastDailyReset !== today) {
            this.resetDaily();
            this.profileData.lastDailyReset = today;
        }

        // Weekly reset on Monday
        const lastWeekly = this.profileData.lastWeeklyReset ? new Date(this.profileData.lastWeeklyReset) : null;
        if (!lastWeekly || now.getDay() === 1 && now.toDateString() !== lastWeekly.toDateString()) {
            if (now.getDay() === 1) {
                this.resetWeekly();
                this.profileData.lastWeeklyReset = today;
            }
        }

        // Monthly reset on 1st
        const lastMonthly = this.profileData.lastMonthlyReset ? new Date(this.profileData.lastMonthlyReset) : null;
        if (!lastMonthly || (now.getDate() === 1 && now.toDateString() !== lastMonthly.toDateString())) {
            this.resetMonthly();
            this.profileData.lastMonthlyReset = today;
        }

        this.saveProfile();
    }

    resetDaily() {
        this.profileData.completedQuests.daily = [];
    }

    resetWeekly() {
        this.profileData.completedQuests.weekly = [];
    }

    resetMonthly() {
        this.profileData.completedQuests.monthly = [];
    }

    // Load saved quest states
    loadQuestStates() {
        // Daily quests
        this.loadQuestsForType('daily');
        this.loadQuestsForType('weekly');
        this.loadQuestsForType('monthly');
    }

    loadQuestsForType(type) {
        const quests = document.querySelectorAll(`#${type}Quests .quest-item`);
        const completed = this.profileData.completedQuests[type] || [];

        quests.forEach(quest => {
            const questId = quest.dataset.quest;
            if (completed.includes(questId)) {
                const checkbox = quest.querySelector('.quest-checkbox');
                checkbox.classList.add('checked');
                quest.classList.add('completed');
            }
        });
    }

    // Toggle quest completion
    toggleQuest(checkboxElement) {
        const questItem = checkboxElement.closest('.quest-item');
        const questId = questItem.dataset.quest;
        const questType = this.getQuestType(questId);

        if (!this.profileData.completedQuests[questType]) {
            this.profileData.completedQuests[questType] = [];
        }

        const completed = this.profileData.completedQuests[questType];
        const index = completed.indexOf(questId);

        if (index > -1) {
            // Uncomplete
            completed.splice(index, 1);
            checkboxElement.classList.remove('checked');
            questItem.classList.remove('completed');
        } else {
            // Complete
            completed.push(questId);
            checkboxElement.classList.add('checked');
            questItem.classList.add('completed');
            this.awardQuestReward(questId);
        }

        this.saveProfile();
        this.updateCompletionBars();
        this.checkDailyBonus();
    }

    getQuestType(questId) {
        if (questId.startsWith('daily-')) return 'daily';
        if (questId.startsWith('weekly-')) return 'weekly';
        if (questId.startsWith('monthly-')) return 'monthly';
        return 'daily';
    }

    // Award quest rewards
    awardQuestReward(questId) {
        const rewards = {
            // Daily
            'daily-intention': { maat: 2 },
            'daily-study': { thoth: 5 },
            'daily-moon': { caerus: 2 },
            'daily-journal': { maat: 3 },
            'daily-review': { thoth: 3 },
            
            // Weekly
            'weekly-working': { thoth: 5, maat: 5, caerus: 5 },
            'weekly-cleanse': { maat: 8 },
            'weekly-document': { thoth: 10 },
            'weekly-esperanto': { thoth: 9 },
            'weekly-timing': { caerus: 10 },
            
            // Monthly
            'monthly-quiz': { thoth: 20 },
            'monthly-cycle': { caerus: 15 },
            'monthly-herb': { thoth: 12 },
            'monthly-phases': { caerus: 25 },
            'monthly-practice': { maat: 30 }
        };

        const reward = rewards[questId];
        if (!reward) return;

        // Add points
        Object.keys(reward).forEach(virtue => {
            if (this.profileData[virtue]) {
                this.profileData[virtue].points += reward[virtue];
                this.profileData.totalPoints += reward[virtue];
            }
        });

        // Show notification (could be enhanced with toast/modal)
        console.log(`Quest completed! Rewards: ${JSON.stringify(reward)}`);
    }

    // Check for daily bonus
    checkDailyBonus() {
        const completed = this.profileData.completedQuests.daily.length;
        const bonusBanner = document.getElementById('dailyBonus');
        
        if (completed >= 3 && bonusBanner) {
            bonusBanner.style.display = 'block';
            
            // Award bonus if not already given today
            const bonusKey = 'daily-bonus-' + new Date().toDateString();
            if (!this.profileData.completedQuests.daily.includes(bonusKey)) {
                this.profileData.completedQuests.daily.push(bonusKey);
                this.profileData.totalPoints += 5;
                this.profileData.maat.points += 5; // Bonus goes to Ma'at
                this.saveProfile();
            }
        } else if (bonusBanner) {
            bonusBanner.style.display = 'none';
        }
    }

    // Update completion progress bars
    updateCompletionBars() {
        this.updateBarForType('daily', 5);
        this.updateBarForType('weekly', 5);
        this.updateBarForType('monthly', 5);
    }

    updateBarForType(type, total) {
        const completed = this.profileData.completedQuests[type].filter(q => !q.includes('bonus')).length;
        const percentage = (completed / total) * 100;
        
        const bar = document.getElementById(`${type}Completion`);
        const text = document.getElementById(`${type}CompletionText`);
        
        if (bar) bar.style.width = percentage + '%';
        if (text) text.textContent = `${completed} / ${total} Completed`;
    }

    // Timer functions
    startTimers() {
        this.updateTimers();
        setInterval(() => this.updateTimers(), 60000); // Update every minute
    }

    updateTimers() {
        this.updateDailyTimer();
        this.updateWeeklyTimer();
        this.updateMonthlyTimer();
    }

    updateDailyTimer() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const diff = tomorrow - now;
        const timer = document.getElementById('dailyTimer');
        if (timer) {
            timer.textContent = `Resets in: ${this.formatTimeRemaining(diff)}`;
        }
    }

    updateWeeklyTimer() {
        const now = new Date();
        const nextMonday = new Date(now);
        const daysUntilMonday = (8 - now.getDay()) % 7 || 7;
        nextMonday.setDate(now.getDate() + daysUntilMonday);
        nextMonday.setHours(0, 0, 0, 0);
        
        const diff = nextMonday - now;
        const timer = document.getElementById('weeklyTimer');
        if (timer) {
            timer.textContent = `Resets in: ${this.formatTimeRemaining(diff)}`;
        }
    }

    updateMonthlyTimer() {
        const now = new Date();
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        
        const diff = nextMonth - now;
        const timer = document.getElementById('monthlyTimer');
        if (timer) {
            timer.textContent = `Resets in: ${this.formatTimeRemaining(diff)}`;
        }
    }

    formatTimeRemaining(ms) {
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) {
            return `${days}d ${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    }

    // Load rank requirements
    loadRankRequirements() {
        const requirements = this.getRankRequirements();
        const list = document.getElementById('rankRequirements');
        const nextRankName = document.getElementById('nextRankName');
        const quizButton = document.getElementById('takeQuizButton');
        
        if (nextRankName) {
            nextRankName.textContent = requirements.rankName;
        }

        if (!list) return;

        list.innerHTML = '';
        let allComplete = true;

        requirements.requirements.forEach(req => {
            const li = document.createElement('li');
            li.className = 'requirement-item';
            
            const label = document.createElement('span');
            label.className = 'stat-label';
            label.textContent = req.description;
            
            const status = document.createElement('span');
            status.className = 'requirement-status';
            
            if (req.current >= req.needed) {
                status.classList.add('complete');
                status.textContent = '✓ Complete';
            } else {
                status.classList.add('incomplete');
                status.textContent = `${req.current} / ${req.needed}`;
                allComplete = false;
            }
            
            li.appendChild(label);
            li.appendChild(status);
            list.appendChild(li);
        });

        // Enable/disable quiz button
        if (quizButton) {
            quizButton.disabled = !allComplete;
            if (allComplete) {
                quizButton.style.opacity = '1';
                quizButton.style.cursor = 'pointer';
            }
        }
    }

    getRankRequirements() {
        const rank = this.profileData.overallRank;
        
        // Define requirements for each rank
        const rankData = {
            1: { // Novice → Apprentice
                rankName: "Apprentice",
                requirements: [
                    { description: "Complete 5 workings", current: this.profileData.totalWorkings, needed: 5 },
                    { description: "Read 1 grimoire volume", current: this.profileData.thoth.volumesRead, needed: 1 },
                    { description: "Study 3 herbs", current: this.profileData.thoth.herbsStudied, needed: 3 },
                    { description: "Cleanse studiolo 3 times", current: this.profileData.maat.cleansingRituals, needed: 3 },
                    { description: "Reach 50 total points", current: this.profileData.totalPoints, needed: 50 }
                ]
            },
            2: { // Apprentice → Journeyman
                rankName: "Journeyman",
                requirements: [
                    { description: "Complete 15 workings", current: this.profileData.totalWorkings, needed: 15 },
                    { description: "Read 3 grimoire volumes", current: this.profileData.thoth.volumesRead, needed: 3 },
                    { description: "Master 5 different herbs", current: this.profileData.thoth.herbsStudied, needed: 5 },
                    { description: "Work in 3 moon phases", current: this.profileData.caerus.moonWorkings, needed: 3 },
                    { description: "7-day practice streak", current: this.profileData.currentStreak, needed: 7 },
                    { description: "Reach 150 total points", current: this.profileData.totalPoints, needed: 150 }
                ]
            },
            3: { // Journeyman → Adept
                rankName: "Adept",
                requirements: [
                    { description: "Complete 40 workings", current: this.profileData.totalWorkings, needed: 40 },
                    { description: "Read all 5 volumes", current: this.profileData.thoth.volumesRead, needed: 5 },
                    { description: "Master 10 herbs", current: this.profileData.thoth.herbsStudied, needed: 10 },
                    { description: "Use planetary hours 10 times", current: this.profileData.caerus.planetaryHours, needed: 10 },
                    { description: "Document 3 synchronicities", current: this.profileData.caerus.synchronicities, needed: 3 },
                    { description: "14-day practice streak", current: this.profileData.currentStreak, needed: 14 },
                    { description: "Reach 300 total points", current: this.profileData.totalPoints, needed: 300 }
                ]
            },
            4: { // Adept → Master
                rankName: "Master",
                requirements: [
                    { description: "Complete 75 workings", current: this.profileData.totalWorkings, needed: 75 },
                    { description: "Master 15 herbs", current: this.profileData.thoth.herbsStudied, needed: 15 },
                    { description: "Perfect timing on 10 workings", current: this.profileData.caerus.perfectTimings || 0, needed: 10 },
                    { description: "30-day practice streak", current: this.profileData.currentStreak, needed: 30 },
                    { description: "Reach 500 total points", current: this.profileData.totalPoints, needed: 500 }
                ]
            },
            5: { // Master → Sage
                rankName: "Sage",
                requirements: [
                    { description: "Complete 100 workings", current: this.profileData.totalWorkings, needed: 100 },
                    { description: "Master 20 herbs", current: this.profileData.thoth.herbsStudied, needed: 20 },
                    { description: "Document 10 synchronicities", current: this.profileData.caerus.synchronicities, needed: 10 },
                    { description: "60-day practice streak", current: this.profileData.currentStreak, needed: 60 },
                    { description: "Reach 750 total points", current: this.profileData.totalPoints, needed: 750 }
                ]
            },
            6: { // Sage → Grandmaster
                rankName: "Grandmaster",
                requirements: [
                    { description: "Complete 150 workings", current: this.profileData.totalWorkings, needed: 150 },
                    { description: "Master 25 herbs", current: this.profileData.thoth.herbsStudied, needed: 25 },
                    { description: "100-day practice streak", current: this.profileData.currentStreak, needed: 100 },
                    { description: "200+ points in each virtue", current: Math.min(this.profileData.thoth.points, this.profileData.maat.points, this.profileData.caerus.points), needed: 200 },
                    { description: "Reach 1000 total points", current: this.profileData.totalPoints, needed: 1000 }
                ]
            }
        };

        return rankData[rank] || rankData[1];
    }
}

// Tab switching
function switchTab(tabName) {
    // Hide all panels
    document.querySelectorAll('.quest-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Remove active from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Show selected panel
    document.getElementById(tabName + 'Panel').classList.add('active');

    // Activate button
    event.target.classList.add('active');
}

// Quest toggle (global function for onclick)
function toggleQuest(element) {
    questManager.toggleQuest(element);
}

// Take rank quiz
function takeRankQuiz() {
    // This would redirect to quiz page or open modal
    alert('Quiz system coming soon! This will test your knowledge of the grimoire.');
    // window.location.href = 'quiz.html?rank=' + questManager.profileData.overallRank;
}

// Initialize quest manager
const questManager = new QuestManager();
