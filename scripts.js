    const header = document.getElementById('site-header');
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('nav a, .mobile-menu a');

    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });

    const sectionIds = ['home', 'about', 'services', 'references', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id));
    const navItems = Array.from(document.querySelectorAll('nav a'));

    window.addEventListener('scroll', () => {
      const fromTop = window.scrollY + 120;
      let currentIndex = 0;
      sections.forEach((section, index) => {
        if (section && section.offsetTop <= fromTop) {
          currentIndex = index;
        }
      });
      navItems.forEach((link, index) => {
        link.classList.toggle('active', index === currentIndex);
      });
    });

    // Carousel functionality for multiple carousel wrappers
    const carouselWrappers = document.querySelectorAll('.carousel-wrapper');

    carouselWrappers.forEach(wrapper => {
      const carouselImages = wrapper.querySelectorAll('.carousel-image');
      const carouselPrev = wrapper.querySelector('.carousel-prev');
      const carouselNext = wrapper.querySelector('.carousel-next');
      let currentIndex = 0;
      let autoSlideInterval;

      function showCarouselImage(index) {
        if (carouselImages.length === 0) return;
        currentIndex = (index + carouselImages.length) % carouselImages.length;
        carouselImages.forEach((img, i) => {
          img.style.opacity = i === currentIndex ? '1' : '0';
          img.style.position = i === currentIndex ? 'relative' : 'absolute';
        });
      }

      function autoSlide() {
        showCarouselImage(currentIndex + 1);
      }

      if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
          showCarouselImage(currentIndex - 1);
        });
      }

      if (carouselNext) {
        carouselNext.addEventListener('click', () => {
          showCarouselImage(currentIndex + 1);
        });
      }

      if (carouselImages.length > 0) {
        showCarouselImage(0);
        autoSlideInterval = setInterval(autoSlide, 5000);

        wrapper.addEventListener('mouseenter', () => {
          clearInterval(autoSlideInterval);
        });

        wrapper.addEventListener('mouseleave', () => {
          autoSlideInterval = setInterval(autoSlide, 5000);
        });
      }
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    const formMessage = document.querySelector('.form-message');

    if (contactForm && formMessage) {
      contactForm.addEventListener('submit', async event => {
        event.preventDefault();
        formMessage.textContent = 'Enviando mensaje...';
        formMessage.classList.remove('success', 'error');

        const formData = new FormData(contactForm);

        try {
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json'
            }
          });

          if (response.ok) {
            formMessage.textContent = 'Mensaje enviado con éxito. Gracias por contactarnos.';
            formMessage.classList.add('success');
            contactForm.reset();
          } else {
            throw new Error('Error en el envío');
          }
        } catch (error) {
          console.error(error);
          formMessage.textContent = 'No se pudo enviar el mensaje. Intenta de nuevo más tarde.';
          formMessage.classList.add('error');
        }
      });
    }
