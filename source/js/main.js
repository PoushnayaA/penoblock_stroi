import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modules/modals/init-modals';
import { Form } from './modules/form-validate/form';
import Swiper from './vendor/swiper';
// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  iosVhFix();

  const images = [
    '../img/main-slider/slide-1.jpg',
    '../img/main-slider/slide-2.jpg',
    '../img/main-slider/slide-3.jpg',
    '../img/projects/project-1/1-min.jpg',
    '../img/projects/project-1/2-min.jpg',
    // '../img/projects/project-1/3-min.jpg',
    '../img/projects/project-2/1-min.jpg',
    '../img/projects/project-2/2-min.jpg',
    '../img/projects/project-2/3-min.jpg',
    '../img/projects/project-3/1-min.jpg',
    '../img/projects/project-3/2-min.jpg',
    '../img/projects/project-3/3-min.jpg',
    '../img/projects/project-4/1-min.jpg',
    '../img/projects/project-4/2-min.jpg',
    '../img/projects/project-4/3-min.jpg',
    '../img/projects/project-5/1-min.jpg',
    '../img/projects/project-5/2-min.jpg',
    '../img/projects/project-5/3-min.jpg',
];

// Функция для предварительной загрузки изображений
function preloadImages(imageArray) {
  return Promise.all(imageArray.map(src => {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
      });
  }));
}

// Предварительная загрузка изображений перед инициализацией Swiper
preloadImages(images).then(() => {
  // Все изображения загружены, инициализируем Swiper
  new Swiper('.js-hero-slider', {
      loop: true,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });
}).catch(error => {
  console.error('Ошибка при загрузке изображений:', error);
});


  new Swiper('.js-hero-slider', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  const swipers = document.querySelectorAll('.js-results-swiper');
  swipers.forEach((swiperElement) => {
      new Swiper(swiperElement, {
          loop: true,
          navigation: {
            nextEl: swiperElement.querySelector('.swiper-button-next'),
            prevEl: swiperElement.querySelector('.swiper-button-prev'),
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
      });
  });


  const advantagesItems = document.querySelectorAll('.advantages__item');
  const headers = document.querySelectorAll('.price__title-wrapper');

  function changeHeight(items, adaptive) {
    items.forEach((item) => {
      item.style.height = 'auto';
    });
    if (adaptive) {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1024) {
        return
      } else {
        let maxHeight = 0;

        items.forEach((item) => {
          const itemHeight = item.offsetHeight;
          if (itemHeight > maxHeight) {
            maxHeight = itemHeight;
          }
        });

        items.forEach((item) => {
          item.style.height = `${maxHeight}px`;
        });
      }

    } else {
      let maxHeight = 0;

      items.forEach((item) => {
        const itemHeight = item.offsetHeight;
        if (itemHeight > maxHeight) {
          maxHeight = itemHeight;
        }
      });


      items.forEach((item) => {
        item.style.height = `${maxHeight}px`;
      });
    }
  }

  window.addEventListener('load', () => {
    changeHeight(advantagesItems, false);
    changeHeight(headers, true);
});

window.addEventListener('resize', () => {
    changeHeight(advantagesItems, false);
    changeHeight(headers, true);
});


const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок и контента
            buttons.forEach(btn => btn.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            // Добавляем активный класс к нажатой кнопке и соответствующему контенту
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });






  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

