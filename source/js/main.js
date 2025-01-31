import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modules/modals/init-modals';
import { Form } from './modules/form-validate/form';
import Swiper from './vendor/swiper';
import emailjs from 'emailjs-com';
// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  iosVhFix();

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


  emailjs.init('5PmWz66_umUsErIKy');
  function sendEmail(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      from_message: formData.get('message'),
    };

    emailjs.send('service_mad1pwe', 'template_ezi20ms', templateParams)
      .then(function(response) {
        console.log('Email sent successfully!', response.status, response.text);
        form.reset();

        document.querySelector('.form__wrapper--default').style.height = '0';
        document.querySelector('.form__wrapper--default').style.opacity = '0';
        document.querySelector('.form__wrapper--default').style.transition = 'all 0.5s';
        document.querySelector('.form__wrapper--success').classList.remove('visually-hidden');
        document.getElementById('my-form').style.display = 'none';

      }, function(error) {
        console.log('Error sending email:', error);

      });
  }

  const submitButton = document.querySelector('[type="submit"]');
  submitButton.setAttribute('disabled', 'true');


  if (document.getElementById('my-form')) {
    document.getElementById('my-form').addEventListener('submit', sendEmail);
  }

  document.getElementById('my-form').addEventListener('input', () => {
    if (document.getElementById('name').value && document.getElementById('email').value && document.querySelector('[type="checkbox"]').checked) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'true');
    }
  })

  document.querySelector('type="checkbox"').addEventListener('change', () => {
    if (document.getElementById('name').value && document.getElementById('email').value && document.querySelector('[type="checkbox"]').checked) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'true');
    }
  })




  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

