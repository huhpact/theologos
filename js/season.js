class SeasonalDisplay {
    constructor() {
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.init();
    }

    init() {
        this.updateCurrentYear();
        this.determineAndShowSeason();
        this.addEventListeners();
    }

    updateCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = this.currentYear;
        }
        
        this.updateCountdown();
    }

    updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        const now = new Date();
        const targetYear = now.getFullYear() + 1; 
        const newYear = new Date(targetYear, 0, 1); 
        
        const timeDiff = newYear - now;
        
        if (timeDiff <= 0) {
            countdownElement.innerHTML = `
                <div class="countdown-display">
                    🎉 Willkommen ${targetYear}! 🎉
                </div>
            `;
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-display">Countdown bis ${targetYear}</div>
            <div class="countdown-grid">
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Tage</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Stunden</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minuten</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Sekunden</span>
                </div>
            </div>
        `;
    }

    calculateEaster(year) {
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        
        return new Date(year, month - 1, day);
    }

    isInDateRange(startMonth, startDay, endMonth, endDay) {
        const currentMonth = this.currentDate.getMonth() + 1;
        const currentDay = this.currentDate.getDate();
        
        if (startMonth > endMonth) {
            return (
                (currentMonth === startMonth && currentDay >= startDay) ||
                (currentMonth === endMonth && currentDay <= endDay) ||
                (currentMonth > startMonth) ||
                (currentMonth < endMonth)
            );
        }
        
        if (startMonth === endMonth) {
            return currentMonth === startMonth && currentDay >= startDay && currentDay <= endDay;
        }
        
        return (
            (currentMonth === startMonth && currentDay >= startDay) ||
            (currentMonth === endMonth && currentDay <= endDay) ||
            (currentMonth > startMonth && currentMonth < endMonth)
        );
    }

    isEasterSeason() {
        const easter = this.calculateEaster(this.currentYear);
        
        const palmSunday = new Date(easter);
        palmSunday.setDate(easter.getDate() - 7);
        
        const easterMonday = new Date(easter);
        easterMonday.setDate(easter.getDate() + 1);
        
        return this.currentDate >= palmSunday && this.currentDate <= easterMonday;
    }

    determineAndShowSeason() {
        this.hideAllSections();

        if (this.isInDateRange(12, 23, 12, 25)) {
            this.showSection('christmas-section');
            console.log('Showing Christmas section');
            return;
        }

        if (this.isInDateRange(12, 30, 1, 2)) {
            this.showSection('newyear-section');
            console.log('Showing New Year section');
            return;
        }

        if (this.isEasterSeason()) {
            this.showSection('easter-section');
            console.log('Showing Easter section');
            return;
        }

        this.showSection('default-section');
        console.log('Showing Default section');
    }

    hideAllSections() {
        const sections = [
            'christmas-section',
            'newyear-section', 
            'easter-section',
            'default-section'
        ];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'none';
                section.classList.remove('active');
            }
        });
    }

    showSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'flex';
            section.classList.add('active');
            
            setTimeout(() => {
                section.classList.add('animate-in');
            }, 100);
        }
    }

    addEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.season-info-btn')) {
                this.showSeasonInfo();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' && e.ctrlKey) {
                e.preventDefault();
                this.refreshDisplay();
            }
        });

        if (window.location.hash) {
            this.handleTestMode();
        }
        
        this.startCountdownTimer();
    }
    
    startCountdownTimer() {
        setInterval(() => {
            if (document.getElementById('newyear-section') && 
                document.getElementById('newyear-section').style.display !== 'none') {
                this.updateCountdown();
            }
        }, 1000);
    }

    handleTestMode() {
        const hash = window.location.hash.toLowerCase();
        
        switch (hash) {
            case '#christmas':
                this.currentDate = new Date(this.currentYear, 11, 24); 
                break;
            case '#newyear':
                this.currentDate = new Date(this.currentYear, 11, 31); 
                break;
            case '#easter':
                this.currentDate = this.calculateEaster(this.currentYear);
                break;
            case '#default':
                this.currentDate = new Date(this.currentYear, 5, 15); 
                break;
        }
        
        this.determineAndShowSeason();
    }

    refreshDisplay() {
        this.currentDate = new Date();
        this.determineAndShowSeason();
    }

    getCurrentSeason() {
        if (this.isInDateRange(12, 23, 12, 25)) return 'christmas';
        if (this.isInDateRange(12, 30, 1, 2)) return 'newyear';
        if (this.isEasterSeason()) return 'easter';
        return 'default';
    }

    getEasterDate() {
        return this.calculateEaster(this.currentYear);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.seasonalDisplay = new SeasonalDisplay();
    
    console.log('Seasonal Display initialized');
    console.log('Current date:', window.seasonalDisplay.currentDate);
    console.log('Current season:', window.seasonalDisplay.getCurrentSeason());
    console.log('Easter date for', window.seasonalDisplay.currentYear + ':', window.seasonalDisplay.getEasterDate());
    
    console.log('Test URLs:');
    console.log('Christmas: ' + window.location.origin + window.location.pathname + '#christmas');
    console.log('New Year: ' + window.location.origin + window.location.pathname + '#newyear');
    console.log('Easter: ' + window.location.origin + window.location.pathname + '#easter');
    console.log('Default: ' + window.location.origin + window.location.pathname + '#default');
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SeasonalDisplay;
}