console.log("JS IS RUNNING");
document.addEventListener("DOMContentLoaded", () => {

    // 0. Navigation Logic
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const pageViews = document.querySelectorAll('.page-view');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            pageViews.forEach(view => view.classList.remove('active'));

            const targetId = item.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) targetView.classList.add('active');
        });
    });

    // 0.1 Settings Navigation from Dropdown
    const navSettingsDropdown = document.getElementById('nav-settings-dropdown');
    if (navSettingsDropdown) {
        navSettingsDropdown.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            const settingsNav = document.querySelector('.nav-item[data-target="settings"]');
            if (settingsNav) settingsNav.classList.add('active');

            pageViews.forEach(view => view.classList.remove('active'));
            const targetView = document.getElementById('settings');
            if (targetView) targetView.classList.add('active');
        });
    }

    // 0.2 User Dropdown Toggle
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userDropdown = document.getElementById('user-dropdown');

    if (userProfileBtn && userDropdown) {
        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!userProfileBtn.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }

    // 1. Live Clock functionality
    const timeDisplay = document.getElementById("live-time");

    function updateClock() {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        if (timeDisplay) {
            timeDisplay.innerText = now.toLocaleTimeString([], options);
        }
    }

    setInterval(updateClock, 1000);
    updateClock();

    // 2. Simulate fluctuating traffic statistics
    const vehicleCountEl = document.getElementById("vehicle-count");
    const avgSpeedEl = document.getElementById("avg-speed");

    if (vehicleCountEl && avgSpeedEl) {
        let currentVehicles = parseInt(vehicleCountEl.innerText.replace(/,/g, ''));
        let currentSpeed = parseFloat(avgSpeedEl.innerText.split(' ')[0]);

        setInterval(() => {
            const changeV = Math.floor(Math.random() * 16) - 5;
            currentVehicles += changeV;
            vehicleCountEl.innerText = currentVehicles.toLocaleString();

            const changeS = (Math.random() * 1.5) - 0.7;
            currentSpeed += changeS;

            if (currentSpeed > 60) currentSpeed = 60;
            if (currentSpeed < 10) currentSpeed = 10;

            avgSpeedEl.innerText = currentSpeed.toFixed(1) + ' km/h';
        }, 3500);
    }

    // 3. Traffic Signal Simulation
    const intersectionRows = document.querySelectorAll('.intersection-row');

    if (intersectionRows.length > 0) {
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * intersectionRows.length);
            const row = intersectionRows[randomIndex];

            const lights = row.querySelectorAll('.light');
            const badge = row.querySelector('.status-badge');

            if (!lights.length || !badge) return;

            let activeIndex = 0;
            lights.forEach((light, index) => {
                if (light.classList.contains('active')) {
                    activeIndex = index;
                }
            });

            lights[activeIndex].classList.remove('active');

            let nextIndex;
            if (activeIndex === 2) {
                nextIndex = 1;
                badge.innerText = 'Slowing';
                badge.className = 'status-badge warning';
            } else if (activeIndex === 1) {
                nextIndex = 0;
                badge.innerText = 'Stopped';
                badge.className = 'status-badge critical';
            } else {
                nextIndex = 2;
                badge.innerText = 'Flowing';
                badge.className = 'status-badge optimal';
            }

            lights[nextIndex].classList.add('active');
        }, 4500);
    }

    // 4. Congestion Bar fluctuations
    const congestionItems = document.querySelectorAll('.congestion-item');

    if (congestionItems.length > 0) {
        setInterval(() => {
            const randItem = congestionItems[Math.floor(Math.random() * congestionItems.length)];
            const percentText = randItem.querySelector('.cong-percent');
            const barFill = randItem.querySelector('.cong-bar-fill');

            if (!percentText || !barFill) return;

            let currentPct = parseInt(percentText.innerText.replace('%', ''));
            let newPct = currentPct + Math.floor(Math.random() * 7) - 3;

            if (newPct > 100) newPct = 100;
            if (newPct < 5) newPct = 5;

            percentText.innerText = newPct + '%';
            barFill.style.width = newPct + '%';

            if (newPct >= 80) {
                percentText.className = 'cong-percent val-critical';
                barFill.className = 'cong-bar-fill fill-critical';
            } else if (newPct >= 60) {
                percentText.className = 'cong-percent val-warning';
                barFill.className = 'cong-bar-fill fill-warning';
            } else {
                percentText.className = 'cong-percent val-optimal';
                barFill.className = 'cong-bar-fill fill-optimal';
            }
        }, 3000);
    }

    // 5. Chart.js Initialization
    const chartCanvas = document.getElementById('trafficVolumeChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 229, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 229, 255, 0.05)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Traffic Volume (K)',
                    data: [120, 150, 180, 140, 210, 110, 95],
                    borderColor: '#00e5ff',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#00e5ff',
                    pointBorderColor: '#fff',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8', font: { family: 'Outfit' } }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(18, 22, 35, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#00e5ff',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 10
                    }
                },
                scales: {
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#94a3b8' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8' }
                    }
                }
            }
        });
    }

    // 6. Heatmap Filtering
    const filterBtns = document.querySelectorAll('.card-actions .filter-btn');
    const hotspots = document.querySelectorAll('.map-wrapper .hotspot');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterType = btn.getAttribute('data-filter');

            hotspots.forEach(spot => {
                if (filterType === 'all') {
                    spot.style.display = 'flex';
                } else {
                    const spotType = spot.getAttribute('data-type');
                    if (spotType === filterType) {
                        spot.style.display = 'flex';
                    } else {
                        spot.style.display = 'none';
                    }
                }
            });
        });
    });

    // 7. Signal Override Controls
    const overrideCards = document.querySelectorAll('.override-card');
    overrideCards.forEach(card => {
        const lightRed = card.querySelector('.light.red');
        const lightYellow = card.querySelector('.light.yellow');
        const lightGreen = card.querySelector('.light.green');
        const statusText = card.querySelector('.status-text');
        const forceRedBtn = card.querySelector('.force-red-btn');
        const forceGreenBtn = card.querySelector('.force-green-btn');

        if (!lightRed || !forceRedBtn) return;

        forceRedBtn.addEventListener('click', () => {
            lightRed.classList.add('active');
            lightYellow.classList.remove('active');
            lightGreen.classList.remove('active');
            lightYellow.style.animation = 'none';
            if (statusText) {
                statusText.innerText = 'Status: Manual Override (Red)';
                statusText.style.color = 'var(--neon-red)';
            }
        });

        forceGreenBtn.addEventListener('click', () => {
            lightRed.classList.remove('active');
            lightYellow.classList.remove('active');
            lightGreen.classList.add('active');
            lightYellow.style.animation = 'none';
            if (statusText) {
                statusText.innerText = 'Status: Manual Override (Green)';
                statusText.style.color = 'var(--neon-green)';
            }
        });
    });

    // 8. Settings Save functionality
    const saveBtn = document.getElementById('save-settings-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const originalText = saveBtn.innerText;
            saveBtn.innerText = 'Config Saved!';
            saveBtn.style.background = 'var(--neon-green)';
            saveBtn.style.color = '#000';

            setTimeout(() => {
                saveBtn.innerText = originalText;
                saveBtn.style.background = 'var(--neon-cyan)';
            }, 2000);
        });
    }

});
