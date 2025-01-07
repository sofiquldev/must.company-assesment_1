class Main {
    constructor() {
        $(document).ready(() => this.initialize());
    }

    initialize() {
        this.initializeSwiper('#introduction .banner__slider', '.banner__pagination');
        this.initializeSwiper('.fluid__slider', '.fluid__pagination');
        this.initializeAvenueSwiper('.avenue__slider');
        this.setupMenuToggler();
        this.setupDropdownToggler();
        this.setupStickyHeader();
        this.setupBackToTop();
        this.setupQuickMenu();
        this.initializeImageBoxToggler('.image__box__toggler');
    }

    /**
     * Initializes the image box toggler functionality.
     * @param {string} buttonSelector - The selector for the button that toggles the image box.
     */
    initializeImageBoxToggler(buttonSelector) {
        $(buttonSelector).on('click', function () {
            $(this).closest('.image__box').find('.image__box__image').stop(true, true).slideToggle(300);
        });
    }

    /**
     * Initializes a Swiper instance for the given selector.
     * @param {string} selector - The selector for the Swiper container.
     * @param {string} paginationSelector - The selector for the Swiper pagination.
     */
    initializeSwiper(selector, paginationSelector) {
        const swiperElement = document.querySelector(selector);
        if (swiperElement) {
            new Swiper(selector, {
                spaceBetween: 0,
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: paginationSelector,
                    clickable: true,
                },
            });
        }
    }

    /**
     * Initializes a Swiper instance for the avenue slider with responsive settings.
     * @param {string} selector - The selector for the avenue Swiper container.
     */
    initializeAvenueSwiper(selector) {
        const avenueSwiper = document.querySelector(selector);
        if (avenueSwiper) {
            const avenueSwiperInstance = new Swiper(selector, {
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: this.getSlidesPerView(),
                spaceBetween: this.getSpaceBetween(),
                speed: 1000,
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
            });

            window.addEventListener('resize', () => this.updateAvenueSwiperOnResize(avenueSwiperInstance));
        }
    }

    /**
     * Gets the number of slides to show based on the window width.
     * @returns {number} The number of slides to show.
     */
    getSlidesPerView() {
        const width = window.innerWidth;
        if (width <= 576) return 1.75;
        if (width <= 992) return 2.7;
        if (width <= 1200) return 4;
        return 4.5;
    }

    /**
     * Gets the space between slides based on the window width.
     * @returns {number} The space between slides in pixels.
     */
    getSpaceBetween() {
        const width = window.innerWidth;
        if (width <= 576) return 32;
        if (width <= 992) return 56;
        return 92;
    }

    /**
     * Updates the avenue Swiper instance settings on window resize.
     * @param {object} avenueSwiperInstance - The Swiper instance for the avenue slider.
     */
    updateAvenueSwiperOnResize(avenueSwiperInstance) {
        avenueSwiperInstance.params.slidesPerView = this.getSlidesPerView();
        avenueSwiperInstance.params.spaceBetween = this.getSpaceBetween();
        avenueSwiperInstance.update();
    }

    /**
     * Sets up the menu toggler functionality.
     * @param {string} [togglerSelector='.header__nav__toggler'] - The selector for the menu toggler button.
     * @param {string} [menuSelector='.header__nav'] - The selector for the navigation menu.
     */
    setupMenuToggler(togglerSelector = '.header__nav__toggler', menuSelector = '.header__nav') {
        const togglerButton = document.querySelector(togglerSelector);
        const navMenu = document.querySelector(menuSelector);

        togglerButton.addEventListener('click', () => navMenu.classList.toggle('active'));
    }

    /**
     * Sets up the dropdown toggler functionality.
     * @param {string} [dropdownToggleSelector='.dropdown-toggle'] - The selector for the dropdown toggle button.
     * @param {string} [dropdownMenuSelector='.dropdown-menu'] - The selector for the dropdown menu.
     */
    setupDropdownToggler(dropdownToggleSelector = '.dropdown-toggle', dropdownMenuSelector = '.dropdown-menu') {
        const dropdownToggles = document.querySelectorAll(dropdownToggleSelector);

        dropdownToggles.forEach(dropdownToggle => {
            const dropdownMenu = dropdownToggle.nextElementSibling;

            dropdownToggle.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdownMenu.classList.toggle('active');
            });

            document.addEventListener('click', (event) => {
                if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                    dropdownMenu.classList.remove('active');
                }
            });
        });
    }

    /**
     * Sets up the sticky header functionality.
     */
    setupStickyHeader() {
        const header = document.querySelector('.header');
        const stickyOffset = 80;

        const toggleStickyClass = () => {
            header.classList.toggle('sticky', window.scrollY > stickyOffset);
        };

        window.addEventListener('scroll', toggleStickyClass);
        toggleStickyClass();
    }

    /**
     * Sets up the back-to-top button functionality.
     */
    setupBackToTop() {
        const backToTopButton = document.querySelector('#back-to-top');

        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * Sets up the quick menu visibility toggle based on scroll position.
     */
    setupQuickMenu() {
        const quickMenu = document.querySelector('#quick__menu');

        const toggleQuickMenuVisibility = () => {
            quickMenu.classList.toggle('show', window.scrollY > window.innerHeight * 0.01);
        };

        window.addEventListener('scroll', toggleQuickMenuVisibility);
        toggleQuickMenuVisibility();
    }
}

new Main();
