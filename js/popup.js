class GreekEveningPopup {
    constructor() {
        this.popup = null;
        this.overlay = null;
        this.isVisible = false;
        this.init();
    }

    init() {
        this.createPopup();
        this.setupEventListeners();
        this.showPopupAfterDelay();
    }

    createPopup() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'popup-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;

        this.popup = document.createElement('div');
        this.popup.className = 'greek-evening-popup';
        this.popup.innerHTML = `
            <div class="popup-container">
                <button class="popup-close" id="popup-close">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="popup-badge">
                    <i class="fa-solid fa-champagne-glasses"></i>
                </div>
                
                <div class="popup-content">
                    <h3 class="popup-title">Silvester-Party</h3>
                    <div class="popup-date">
                        <i class="fas fa-calendar-alt"></i>
                        <span>31. Dezember 2025</span>
                    </div>
                    <p class="popup-description">
                        Feiern Sie den Jahreswechsel mit uns! Genießen Sie ein festliches Abendessen und Live-Musik. Sichern Sie sich jetzt Ihren Platz für eine unvergessliche Silvester-Party!
                    </p>
                    
                    <button class="popup-cta" onclick="window.location.href='/contact.html#reservation'">
                        <div class="btn-content">
                            <i class="fas fa-calendar-check"></i>
                            <span>Jetzt reservieren</span>
                        </div>
                        <div class="btn-glow"></div>
                    </button>

                    <button class="popup-cta calendar-btn" id="add-calendar">
                        <div class="btn-content">
                            <i class="fas fa-calendar-plus"></i>
                            <span>Zum Kalender hinzufügen</span>
                        </div>
                        <div class="btn-glow"></div>
                    </button>
                </div>
            </div>
        `;

        this.popup.style.cssText = `
            position: relative;
            z-index: 10001;
            opacity: 0;
            visibility: hidden;
            transform: scale(0.8);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            max-width: 90vw;
            max-height: 90vh;
        `;

        const style = document.createElement('style');
        style.textContent = `

            .popup-container {
                background: var(--white);
                border-radius: var(--radius-2xl);
                padding: var(--space-2xl);
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                position: relative;
                overflow: hidden;
                max-width: 700px;
                width: 100%;
                border: 1px solid rgba(92, 15, 20, 0.1);
            }

            .popup-close {
                position: absolute;
                top: var(--space-lg);
                right: var(--space-lg);
                width: 40px;
                height: 40px;
                background: var(--light-gray);
                border: none;
                border-radius: var(--radius-full);
                color: var(--medium-gray);
                font-size: 1.25rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2;
            }

            .popup-close:hover {
                background: var(--royal-blue);
                color: var(--white);
                transform: scale(1.1);
            }

            .popup-badge {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, var(--royal-blue), var(--deep-blue));
                color: var(--white);
                border-radius: var(--radius-full);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                margin: 0 auto var(--space-xl);
                box-shadow: 0 15px 30px rgba(92, 15, 20, 0.3);
                position: relative;
                
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }

            .popup-badge::after {
                content: '';
                position: absolute;
                top: -5px;
                right: -5px;
                width: 20px;
                height: 20px;
                background: var(--primary-gold);
                border-radius: var(--radius-full);
                border: 3px solid var(--white);
            }

            .popup-content { text-align: center; }

            .popup-title {
                font-family: Skranji, serif;
                font-size: 2rem;
                color: var(--royal-blue);
                margin-bottom: var(--space-md);
                font-weight: 700;
            }

            .popup-date {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--space-sm);
                background: linear-gradient(135deg, var(--cream), var(--white));
                border: 2px solid var(--royal-blue);
                border-radius: var(--radius-lg);
                padding: var(--space-md) var(--space-lg);
                margin-bottom: var(--space-xl);
                font-weight: 600;
                color: var(--navy-blue);
                font-size: 1.125rem;
            }

            .popup-date i { color: var(--primary-gold); font-size: 1.25rem; }

            .popup-description {
                color: var(--medium-gray);
                line-height: 1.6;
                margin-bottom: var(--space-xl);
                font-size: 1rem;
            }

            .popup-cta {
                width: 100%;
                background: linear-gradient(135deg, var(--deep-blue), var(--royal-blue));
                color: var(--white);
                border: none;
                border-radius: var(--radius-lg);
                padding: var(--space-lg) var(--space-xl);
                font-family: var(--font-primary);
                font-size: 1.125rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                box-shadow: 0 8px 25px rgba(92, 15, 20, 0.3);
                margin-top: var(--space-md);
            }

            .popup-cta .btn-content {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--space-sm);
                z-index: 2;
                position: relative;
            }

            .popup-cta .btn-glow {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
                transform: translateX(-100%);
                transition: transform 0.6s ease;
            }

            .popup-cta:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 35px rgba(92, 15, 20, 0.4);
            }

            .popup-cta:hover .btn-glow {
                transform: translateX(100%);
            }

            @media (min-width: 1200px) {
                .popup-container {
                    max-width: 500px;
                    padding: var(--space-xl);
                }

                .popup-title {
                    font-size: 1.6rem;
                }

                .popup-description {
                    font-size: 0.95rem;
                }

                .popup-cta {
                    font-size: 1rem;
                    padding: var(--space-md) var(--space-lg);
                }

                .popup-badge {
                    width: 65px;
                    height: 65px;
                    font-size: 1.6rem;
                    margin-bottom: var(--space-lg);
                }
            }

        `;
        document.head.appendChild(style);

        document.body.appendChild(this.overlay);
        this.overlay.appendChild(this.popup);

        const calBtn = this.popup.querySelector('#add-calendar');
        calBtn.addEventListener('click', () => this.addToCalendar());
    }

    setupEventListeners() {
        const closeBtn = this.popup.querySelector('#popup-close');
        closeBtn.addEventListener('click', () => this.hidePopup());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.hidePopup();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) this.hidePopup();
        });
    }

    showPopupAfterDelay() { setTimeout(() => this.showPopup(), 5000); }

    showPopup() {
        if (this.isVisible) return;
        this.isVisible = true;
        document.body.style.overflow = 'hidden';
        this.overlay.style.opacity = '1';
        this.overlay.style.visibility = 'visible';
        setTimeout(() => {
            this.popup.style.opacity = '1';
            this.popup.style.visibility = 'visible';
            this.popup.style.transform = 'scale(1)';
        }, 100);
    }

    hidePopup() {
        if (!this.isVisible) return;
        this.isVisible = false;
        this.popup.style.opacity = '0';
        this.popup.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.overlay.style.opacity = '0';
            this.overlay.style.visibility = 'hidden';
            document.body.style.overflow = 'auto';
        }, 200);
        setTimeout(() => {
            this.popup.style.visibility = 'hidden';
        }, 400);
    }

    addToCalendar() {
        const event = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Silvester-Party bei Theo & Logos
DTSTART:20251231T190000
DTEND:20260101T000000
LOCATION:Potsdamer Str. 37, 14469 Potsdam
DESCRIPTION:  Feiern Sie den Jahreswechsel mit uns! Genießen Sie ein festliches Abendessen und Live-Musik. Sichern Sie sich jetzt Ihren Platz für eine unvergessliche Silvester-Party.
END:VEVENT
END:VCALENDAR
        `.trim();

        const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "silvester-party.ics";
        a.click();
        URL.revokeObjectURL(url);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GreekEveningPopup();
    console.log('New Year Popup initialized');
});
