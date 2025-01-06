class Main {
    constructor() {
        document.addEventListener("DOMContentLoaded", () => {
            this.initFluidSwiper();
            this.initAvenueSwiper();
            this.menu_toggler();
            this.dropdown_toggler();
            this.stickyHeader();
            this.backToTop();
            this.toggleQuickMenu();
        });
    }

    /**
     * Initialize Fluid Swiper.
     * This function initializes the Swiper carousel for the `.fluid__slider` element.
     * 
     * @param {string} selector - The selector for the Fluid Swiper element (default is '.fluid__slider').
     */
    initFluidSwiper(selector = '.fluid__slider') {
        const fluidSwiper = document.querySelector(selector);
        if (fluidSwiper) {
            new Swiper(selector, {
                spaceBetween: 0,
                pagination: {
                    el: '.fluid__pagination',
                    clickable: true,
                },
            });
        }
    }

    /**
     * Initialize the Avenue Swiper.
     * This function initializes the Swiper carousel for the `.avenue__slider` element.
     * 
     * @param {string} selector - The selector for the Avenue Swiper element (default is '.avenue__slider').
     */
    initAvenueSwiper(selector = '.avenue__slider') {
        const avenueSwiper = document.querySelector(selector);
        if (avenueSwiper) {
            new Swiper(selector, {
                grabCursor: true,
                initialSlide: window.innerWidth <= 768 ? 1.5 : 4.5,
                centeredSlides: true,
                slidesPerView: "auto",
                spaceBetween: 24,
                speed: 1000,
                freeMode: false,
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".swiper-pagination",
                },
            });
        }
    }

    /**
     * Toggles the navigation menu visibility when the menu button is clicked.
     * 
     * @param {string} togglerSelector - The selector for the menu toggler button.
     * @param {string} menuSelector - The selector for the navigation menu.
     */
    menu_toggler(togglerSelector = '.header__nav__toggler', menuSelector = '.header__nav') {
        const togglerButton = document.querySelector(togglerSelector);
        const navMenu = document.querySelector(menuSelector);

        togglerButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    /**
     * Toggles the dropdown menu visibility when the dropdown button is clicked.
     * This function listens for a click event on the dropdown button,
     * and it toggles the "active" class on the dropdown menu to show or hide it.
     * 
     * @param {string} dropdownToggleSelector - The selector for the dropdown toggle button.
     * @param {string} dropdownMenuSelector - The selector for the dropdown menu.
     */
    dropdown_toggler(dropdownToggleSelector = '.dropdown-toggle', dropdownMenuSelector = '.dropdown-menu') {
        const dropdownToggles = document.querySelectorAll(dropdownToggleSelector);

        dropdownToggles.forEach(dropdownToggle => {
            const dropdownMenu = dropdownToggle.nextElementSibling;

            dropdownToggle.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click from propagating to the body
                dropdownMenu.classList.toggle('active');
            });

            // Close the dropdown if clicked outside
            document.addEventListener('click', (event) => {
                if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                    dropdownMenu.classList.remove('active');
                }
            });
        });
    }

    /**
     * Adds a "sticky" class to the header when the user scrolls more than 80px.
     */
    stickyHeader() {
        const header = document.querySelector('.header');
        const stickyOffset = 80;

        if (window.scrollY > stickyOffset) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        window.addEventListener('scroll', () => {
            if (window.scrollY > stickyOffset) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    /**
     * Scrolls the page back to the top when the "Back to Top" button is clicked.
     */
    backToTop() {
        const backToTopButton = document.querySelector('#back-to-top');

        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * Toggles the visibility of the quick menu when the page is scrolled more than 1vh.
     */
    toggleQuickMenu() {
        const quickMenu = document.querySelector('#quick__menu');

        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight * 0.01) {
                quickMenu.classList.add('show');
            } else {
                quickMenu.classList.remove('show');
            }
        });
    }
}

// Instantiate the Main class
new Main();
