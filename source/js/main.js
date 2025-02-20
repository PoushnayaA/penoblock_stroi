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
  const nextButton = document.querySelector('.js-next-tab');

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

    document.querySelector('.js-next-tab').addEventListener('click', () => {
      
    })
  });

  nextButton.addEventListener('click', () => {
    document.getElementById('results').scrollIntoView({
      behavior: 'smooth',});
    for (let i=0; i<buttons.length; i++) {
      if (buttons[i].classList.contains('active')) {
        if (i == buttons.length - 1) {
          buttons[i].classList.remove('active');
          contents[i].classList.remove('active');
          buttons[0].classList.add('active');
          contents[0].classList.add('active');
          return
        } else {
          buttons[i].classList.remove('active');
          contents[i].classList.remove('active');
          buttons[i+1].classList.add('active');
          contents[i+1].classList.add('active');
          return
        }
      }
    }
  })


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

    emailjs.send('service_v2zmitf', 'template_ezi20ms', templateParams)
      .then(function(response) {
        console.log('Email sent successfully!', response.status, response.text);
        form.reset();

        document.querySelector('.form__wrapper--default').style.height = '0';
        document.querySelector('.form__wrapper--default').style.opacity = '0';
        document.querySelector('.form__wrapper--default').style.transition = 'all 0.5s';
        document.querySelector('.form__wrapper--success').classList.remove('visually-hidden');
        formEl.style.display = 'none';

      }, function(error) {
        console.log('Error sending email:', error);

      });
  }

  const submitButton = document.querySelector('[type="submit"]');
  submitButton.setAttribute('disabled', 'true');

  const formEl = document.getElementById('my-form');
  
  if (formEl) {
    formEl.addEventListener('submit', sendEmail);
  }

  formEl.addEventListener('input', () => {
    if (formEl.querySelector('#name').value && formEl.querySelector('#email').value && formEl.querySelector('[type="checkbox"]').checked) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'true');
    }
  })

  formEl.querySelector('[type="checkbox"]').addEventListener('change', () => {
    if (formEl.querySelector('#name').value && formEl.querySelector('#email').value && formEl.querySelector('[type="checkbox"]').checked) {
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

