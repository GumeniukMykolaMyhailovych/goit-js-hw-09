const STORAGE_KEY = 'feedback-form-state';

/**
 * Обʼєкт стану форми
 * (поза будь-якими функціями)
 */
const formData = {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');

/**
 * ===== ВІДНОВЛЕННЯ ДАНИХ З localStorage =====
 */
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  const parsedData = JSON.parse(savedData);

  formData.email = parsedData.email ?? '';
  formData.message = parsedData.message ?? '';

  formEl.elements.email.value = formData.email;
  formEl.elements.message.value = formData.message;
}

/**
 * ===== ОБРОБКА INPUT (делегування) =====
 */
formEl.addEventListener('input', event => {
  const { name, value } = event.target;

  if (!formData.hasOwnProperty(name)) {
    return;
  }

  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

/**
 * ===== ОБРОБКА SUBMIT =====
 */
formEl.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  formEl.reset();
});
