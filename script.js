/* Preloader Grid Generation */
document.addEventListener('DOMContentLoaded', () => {
    const gridLoader = document.getElementById('grid-loader');
    if (gridLoader) {
        // Calculate the number of blocks needed to fill the screen
        const blockSize = 50; // Corresponds to minmax(50px, 1fr) in CSS
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const numCols = Math.ceil(screenWidth / blockSize);
        const numRows = Math.ceil(screenHeight / blockSize);
        const numBlocks = numCols * numRows;

        for (let i = 0; i < numBlocks; i++) {
            const block = document.createElement('div');
            block.classList.add('grid-block');
            block.style.animationDelay = `${Math.random() * 2}s`;
            block.style.animationDuration = `${2 + Math.random() * 3}s`;
            gridLoader.appendChild(block);
        }
    }

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (theme) => {
        const particlesJsEl = document.getElementById('particles-js');
        const starFieldEl = document.getElementById('star-field');

        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
            if (particlesJsEl) particlesJsEl.style.display = 'none';
            if (starFieldEl) starFieldEl.style.display = 'block';
            destroyParticles();
            createStars();
        } else {
            body.classList.remove('dark-mode');
            themeToggle.checked = false;
            if (particlesJsEl) particlesJsEl.style.display = 'block';
            if (starFieldEl) starFieldEl.style.display = 'none';
            destroyStars();
            initParticles();
        }
    };

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    applyTheme(savedTheme || preferredTheme);

    /* Typewriter Effect */
    const heroTitle = document.querySelector('#hero-title');
    if (heroTitle) {
        new TypeIt(heroTitle, {
                speed: 75,
                loop: true,
                waitUntilVisible: true,
            })
            .type("I build things for the web.", { delay: 1500 })
            .delete()
            .type("I am a Coder & Innovator.", { delay: 1200 })
            .delete()
            .type("I am Ayush Sapkota.", { delay: 1800 })
            .go();
    }

    /* Scroll Reveal Animation */
    const sr = ScrollReveal({
        distance: '60px',
        duration: 2000,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false
    });

    sr.reveal('.hero-text-content', { origin: 'left' });
    sr.reveal('.hero-logo', { origin: 'right', delay: 200 });
    sr.reveal('.section-title', { origin: 'top', distance: '40px' });
    sr.reveal('.about-image', { origin: 'left' });
    sr.reveal('.about-cards', { origin: 'right', interval: 100 });
    sr.reveal('.skill-card, .project-card', { origin: 'bottom', interval: 150 });
    sr.reveal('.contact-image', { origin: 'left' });
    sr.reveal('.contact-form', { origin: 'right' });
    sr.reveal('.footer-container', { origin: 'bottom' });

    // Change title on tab visibility
    const originalTitle = document.title;
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = 'Please come back!';
        } else {
            document.title = originalTitle;
        }
    });
});

const preloader = document.getElementById('preloader');

if (preloader) {
    const minDisplayTime = 2000;
    const pageLoadTime = Date.now();

    window.addEventListener('load', () => {
        const timeWaited = Date.now() - pageLoadTime;
        const remainingTime = Math.max(0, minDisplayTime - timeWaited);

        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
                preloader.addEventListener('transitionend', () => {
                    if (preloader) {
                        preloader.remove();
                    }
                });
            }
        }, remainingTime);
    });
}

function createStars(numStars = 100) {
    const starField = document.getElementById('star-field');
    if (!starField) return;
    starField.innerHTML = '';

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Start star on the left, at a random vertical position
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = '-10px'; // Start just off-screen

        const duration = 10 + Math.random() * 15; // Animation duration between 10s and 25s
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${Math.random() * 20}s`; // Stagger the start

        starField.appendChild(star);
    }
}

function destroyStars() {
    const starField = document.getElementById('star-field');
    if (starField) {
        starField.innerHTML = '';
    }
}

function destroyParticles() {
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }
}

/* Particle Animation */
function initParticles() {
    destroyParticles();

    const particleColor = '#777777';
    const lineColor = '#777777';

    const particleConfig = {
        "particles": {
            "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": particleColor },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.7, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": lineColor, "opacity": 0.6, "width": 1 },
            "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
        },
        "interactivity": { "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": false } } },
        "retina_detect": true
    };
    if (window.particlesJS) {
        if (window.pJSDom && window.pJSDom.length > 0) {
            // Do nothing if particles are already initialized for light mode
        } else {
            particlesJS('particles-js', particleConfig);
        }
    }
}

/* Music Player Functionality */
document.addEventListener('DOMContentLoaded', () => {
    const musicPlayer = document.getElementById('musicPlayer');
    const musicCard = document.getElementById('musicCard');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseButton = document.getElementById('playPauseButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const shuffleButton = document.getElementById('shuffleButton');
    const likeButton = document.getElementById('likeButton');
    const volumeButton = document.getElementById('volumeButton');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');
    const songCover = document.getElementById('songCover');
    const playOverlay = document.getElementById('playOverlay');
    const musicElement = document.querySelector('.music');

    if (musicPlayer && musicCard && audioPlayer) {
        let isPlaying = false;
        let isLiked = false;
        let isShuffled = false;
        let currentVolume = 1;

        const playlist = [{
                title: "Excuses",
                src: "Music/song3.mp3",
                cover: "images/song3.jpg"
            },
            {
                title: "Isq Di Bajiyan",
                src: "Music/song1.mp3",
                cover: "images/song1.jpg"
            },
            {
                title: "Madia",
                src: "Music/song2.mp3",
                cover: "images/song2.jpg"
            }
        ];

        let currentSongIndex = 0;

        function initializePlayer() {
            loadSong(currentSongIndex);
            updateTimeDisplay();
        }

        function loadSong(index) {
            const song = playlist[index];
            audioPlayer.src = song.src;
            songCover.src = song.cover;
            document.getElementById('songTitle').textContent = song.title;

            progressFill.style.width = '0%';
            currentTimeDisplay.textContent = '0:00';

            audioPlayer.addEventListener('loadedmetadata', () => {
                totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
            });
        }

        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        function updateTimeDisplay() {
            currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
            totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
        }

        function togglePlayPause() {
            if (isPlaying) {
                audioPlayer.pause();
            } else {
                audioPlayer.play();
            }
        }

        function nextSong() {
            let newIndex = currentSongIndex;
            if (isShuffled) {
                newIndex = Math.floor(Math.random() * playlist.length);
            } else {
                newIndex = (currentSongIndex + 1) % playlist.length;
            }
            loadSong(newIndex);
            currentSongIndex = newIndex;
            if (isPlaying) audioPlayer.play();
        }

        function prevSong() {
            let newIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
            loadSong(newIndex);
            currentSongIndex = newIndex;
            if (isPlaying) audioPlayer.play();
        }

        function toggleLike() {
            isLiked = !isLiked;
            likeButton.style.fill = isLiked ? 'red' : 'rgba(29, 28, 28, 0.829)';
        }

        function toggleShuffle() {
            isShuffled = !isShuffled;
            shuffleButton.style.fill = isShuffled ? '#667eea' : 'rgba(29, 28, 28, 0.829)';
        }

        function toggleVolume() {
            if (currentVolume > 0) {
                currentVolume = 0;
                audioPlayer.volume = 0;
                volumeButton.innerHTML = '<path d="M13 2.5a.5.5 0 0 1 0 1v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 1 0zM6.5 2.5a.5.5 0 0 1 0 1v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 1 0z"/>';
            } else {
                currentVolume = 1;
                audioPlayer.volume = 1;
                volumeButton.innerHTML = '<path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/><path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>';
            }
        }

        playPauseButton.addEventListener('click', togglePlayPause);
        musicElement.addEventListener('click', togglePlayPause);
        nextButton.addEventListener('click', nextSong);
        prevButton.addEventListener('click', prevSong);
        likeButton.addEventListener('click', toggleLike);
        shuffleButton.addEventListener('click', toggleShuffle);
        volumeButton.addEventListener('click', toggleVolume);

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audioPlayer.currentTime = percent * audioPlayer.duration;
        });

        audioPlayer.addEventListener('timeupdate', () => {
            if (audioPlayer.duration) {
                const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressFill.style.width = percent + '%';
                updateTimeDisplay();
            }
        });

        audioPlayer.addEventListener('ended', nextSong);

        audioPlayer.addEventListener('play', () => {
            isPlaying = true;
            playPauseButton.innerHTML = '<path d="M5.5 3.5A.5.5 0 0 1 6 4v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm3.5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>';
            musicElement.classList.add('playing');
            playOverlay.style.opacity = '1';
        });

        audioPlayer.addEventListener('pause', () => {
            isPlaying = false;
            playPauseButton.innerHTML = '<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
            musicElement.classList.remove('playing');
            playOverlay.style.opacity = '0';
        });

        const controlButtons = musicCard.querySelectorAll('.bar svg');
        controlButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1)';
                button.style.transition = 'transform 0.2s ease';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
            });
        });

        let isDragging = false;
        let currentX, currentY, initialX, initialY;
        let xOffset = 0;
        let yOffset = 0;

        musicCard.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            if (e.target.closest('.bar, .progress-container, .music')) return;
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            if (e.target === musicCard || musicCard.contains(e.target)) {
                isDragging = true;
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                setTranslate(currentX, currentY, musicPlayer);
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }

        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }

        initializePlayer();
    }
});