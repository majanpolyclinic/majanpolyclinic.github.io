window.myInterop = {
    scrollToTop: function () {
        document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    },

    search: function () {
        var search = document.querySelector('.search-bar');
        search.classList.toggle('open-search-bar');
    },

    initializeTestimonialSlider: function () {
        var swiper = new Swiper('.mySwiper', {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 30,
            speed: 1000,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.testimonial-swiper-button-next',
                prevEl: '.testimonial-swiper-button-prev',
            },
        });
    },

    initializeFilter: function () {
        const filters = document.querySelectorAll('.filter');

        filters.forEach((filter) => {
            filter.addEventListener('click', function () {
                let selectedFilter = filter.getAttribute('data-filter');
                let itemsToHide = document.querySelectorAll(`.projects .project:not([data-filter='${selectedFilter}'])`);
                let itemsToShow = document.querySelectorAll(`.projects [data-filter='${selectedFilter}']`);

                if (selectedFilter == 'all') {
                    itemsToHide = [];
                    itemsToShow = document.querySelectorAll('.projects [data-filter]');
                }

                filterMenu = document.querySelectorAll('.filters li.filter');
                filterMenu.forEach((el) => {
                    el.classList.remove('active');
                });
                filter.classList.add('active');

                itemsToHide.forEach((el) => {
                    el.classList.add('hidden');
                    el.classList.remove('block');
                });

                itemsToShow.forEach((el) => {
                    el.classList.remove('hidden');
                    el.classList.add('block');
                });
            });
        });
    },

    toggleMobileMenu: function () {
        const menus = document.querySelector('.menus');
        const overlay = document.querySelector('.overlay');
        menus.classList.toggle('open-menus');
        overlay.classList.toggle('hidden');
    },
    installApp: function () {
        window.BlazorPWA.installPWA();
    },
    setOnScroll: function () {
        let scrollpos = window.scrollY;
        if (scrollpos > 0) {
            document.getElementById('scrollToTopBtn')?.classList.remove('hidden');
            document.getElementById('top-header')?.classList.add('sticky-header');
        } else {
            document.getElementById('scrollToTopBtn')?.classList.add('hidden');
            document.getElementById('top-header')?.classList.remove('sticky-header');
        }
    },

    toggleTheme: function (isFirstTime) {
        let theme = window.localStorage.getItem('theme') || 'dark';

        if (!isFirstTime) {
            theme = theme === 'light' ? 'dark' : 'light';
        }
        window.localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            document.querySelector('body').classList.add('dark');
        } else {
            document.querySelector('body').classList.remove('dark');
        }
    },

    toggleDirection: function (isFirstTime) {
        let direction = window.localStorage.getItem('direction') || 'ltr';

        if (!isFirstTime) {
            direction = direction === 'ltr' ? 'rtl' : 'ltr';
        }
        window.localStorage.setItem('direction', direction);

        if (direction === 'rtl') {
            document.querySelector('html').setAttribute('dir', 'rtl');
        } else {
            document.querySelector('html').setAttribute('dir', 'ltr');
        }
        if (!isFirstTime) {
            window.location.reload();
        }
    },

    setCurrentYear: function () {
        const ele = document.querySelectorAll('.curr-year');
        if (ele?.length) {
            const date = new Date();
            const fullyear = date.getFullYear();
            for (let i = 0; i < ele.length; i++) {
                ele[i].innerHTML = fullyear;
            }
        }
    },

    printComponent: function (componentSelector) {
        var elementToPrint = document.querySelector(componentSelector);

        if (elementToPrint) {
            var printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write('<html><head><title>Print</title>');
            printWindow.document.write('<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">');
            printWindow.document.write('<style>body { font-family: "Poppins", sans-serif; }</style>');
            printWindow.document.write('</head><body>');

            // Add logo at the top and center
            var logoImg = new Image();
            logoImg.src = 'https://majanpolyclinic.com/assets/images/majan.svg';
            logoImg.style.maxWidth = '200px';
            logoImg.onload = function () {
                printWindow.document.write('<div style="text-align: center; margin-top: 20px;">');
                printWindow.document.write('<img src="' + logoImg.src + '" style="max-width: 150px;">');
                printWindow.document.write('</div>');

                printWindow.document.write(elementToPrint.innerHTML);
                printWindow.document.write('<hr />');
                printWindow.document.write((new Date()).toLocaleString());

                printWindow.document.write('</body></html>');

                printWindow.document.close();
                printWindow.print();
                printWindow.close();
            };

        }
    },

    initialize: function () {
        window.myInterop.initializeFilter();
        window.myInterop.initializeTestimonialSlider();

    }
};

window.onscroll = function () {
    window.myInterop.setOnScroll();
};

window.myInterop.toggleTheme(true);
window.myInterop.toggleDirection(true);
window.myInterop.setCurrentYear();

