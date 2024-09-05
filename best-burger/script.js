document.addEventListener("DOMContentLoaded", () => {
	const nav = document.querySelector("nav");
    const openMapBtn = document.querySelector("#openMapBtn");
    const closeMapBtn = document.querySelector("#closeMapBtn");
    const checkAvailabilityBtn = document.querySelector("#checkAvailabilityBtn");
    const reservationForm = document.querySelector('#reservation-form');
	const menuBtn = document.querySelector("#menu-btn");
	const header = document.querySelector('header');
    const firstSection = document.querySelector('main > section'); 
    let lastScrollY = window.scrollY;
	
	// Menu Button Click Event
	document.querySelector("#menu-btn").addEventListener("click", (ev) => {
        const nav = document.querySelector("nav");
        const currentState = document.querySelector("#menu-btn").getAttribute("data-state");
    
        if (!currentState || currentState === "closed") {
            document.querySelector("#menu-btn").setAttribute("data-state", "opened");
            document.querySelector("#menu-btn").setAttribute("aria-expanded", "true");
    
            // Show the menu and start animation
            nav.classList.add("menu-visible");
            gsap.fromTo(
                ".menu-visible", 
                { y: -500, opacity: 0 }, 
                { duration: 0.75, y: 0, opacity: 1 }
            );
        } else {
            document.querySelector("#menu-btn").setAttribute("data-state", "closed");
            document.querySelector("#menu-btn").setAttribute("aria-expanded", "false");
    
            // Animate hiding the menu
            gsap.to(".menu-visible", {
                duration: 0.75,
                y: -500,
                opacity: 0,
                onComplete: () => {
                    // Remove the class after the animation completes
                    nav.classList.remove("menu-visible");
                }
            });
        }
    });
    
    
	// Nav aublenden bei Klick auf Nav Links
	document.querySelectorAll("nav ul li a").forEach((link) => {
		link.addEventListener("click", (ev) => {
			nav.classList.remove("menu-visible");
		});
	});
	// Sticky Header
    const calculateStickyPoint = () => {
        return firstSection.getBoundingClientRect().bottom + window.scrollY;
    };

    let stickyPoint = calculateStickyPoint();

    window.addEventListener('resize', () => {
        stickyPoint = calculateStickyPoint();
    });

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > stickyPoint) {
            if (currentScrollY < lastScrollY) {
                // Nach oben scrollen
                header.classList.add('small');
                header.style.position = 'fixed';
                header.style.transform = 'translateY(0)';
            }
			else {
                // Nach unten scrollen
                header.style.transform = 'translateY(-100vh)';
            }
        }
		else {
            // Am Anfang der Seite
            header.classList.remove('small');
            header.style.position = 'absolute';
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
	
	// Heatmeter - Eventlistener für das Hinzufügen der Klasse 'open' beim Klicken auf Listenelemente
	const listItems = document.querySelectorAll('#wings ul li');
	const slides = document.querySelectorAll('.heat.slide');
	let lastHoveredSlide = null;

	// Zufälliges Slide auswählen und 'open' Klasse hinzufügen
	const randomIndex = Math.floor(Math.random() * slides.length);
	slides[randomIndex].classList.add('open');

	// Eventlistener für Klickereignisse auf Listenelemente
	listItems.forEach(item => {
		item.addEventListener('click', function() {
			const clickedText = this.textContent.trim(); // Text des geklickten Listenelements

			// Durchlaufe die Heat Slides und finde das entsprechende Slide
			slides.forEach(slide => {
				const slideText = slide.querySelector('p').textContent.trim(); // Text des Heat Slide

				if (slideText === clickedText) {
					// Entferne 'open' Klasse von allen Slides
					slides.forEach(s => s.classList.remove('open'));

					// Füge 'open' Klasse zum aktuellen Slide hinzu
					slide.classList.add('open');

					// Setze das zuletzt gehoverte Slide auf das aktuelle Slide
					lastHoveredSlide = slide;
				}
			});
		});
	});

	// Eventlistener für das Hovern über Heat Slides
	slides.forEach(slide => {
		slide.addEventListener('mouseover', function() {
			if (this !== lastHoveredSlide) {
				slides.forEach(s => s.classList.remove('open'));
				this.classList.add('open');
				lastHoveredSlide = this;
			}
		});
	});

	// Tisch Reservierung
    openMapBtn.addEventListener("click", () => {
        document.querySelector("#restaurantMap").classList.toggle("map-visible");
    });

    closeMapBtn.addEventListener("click", () => {
        document.querySelector("#restaurantMap").classList.remove("map-visible");
    });

    checkAvailabilityBtn.addEventListener('click', checkAvailability);

    function checkAvailability() {
        const date = document.querySelector('input[name="resTag"]').value;
        const hour = document.querySelector('select[name="resHour"]').value;
        const minute = document.querySelector('select[name="resMinute"]').value;

        if (date && hour && minute) {
            const time = hour + ':' + minute + ':00';
            fetch(`check_availability.php?date=${date}&time=${time}`)
                .then(response => response.json())
                .then(data => {
                    for (let i = 1; i <= 8; i++) {
                        const tableButton = document.getElementById(`table${i}`);
                        if (data.includes(i)) {
                            tableButton.classList.remove('green');
                            tableButton.classList.add('red');
                            tableButton.disabled = true;
                        }
						else {
                            tableButton.classList.remove('red');
                            tableButton.classList.add('green');
                            tableButton.disabled = false;
                        }
                    }
                });
        }
    }

    const tableButtons = document.querySelectorAll('.table-button');
    tableButtons.forEach(button => {
        button.addEventListener('click', function() {
            tableButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('selectedTable').value = this.id.replace('table', '');
        });
    });

    reservationForm.addEventListener('submit', (event) => {
        const hour = document.querySelector('select[name="resHour"]').value;
        const minute = document.querySelector('select[name="resMinute"]').value;

        if (!((hour >= 11 && hour <= 23) && (minute == '00' || minute == '30'))) {
            event.preventDefault();
            alert('Bitte wählen Sie eine Uhrzeit zwischen 11:00 und 23:30 Uhr.');
        }

        const selectedTable = document.getElementById('selectedTable').value;
        if (!selectedTable) {
            event.preventDefault();
            alert('Bitte wählen Sie einen Tisch.');
        }
    });
});