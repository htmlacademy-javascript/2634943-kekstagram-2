const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getPhotos = () => fetch(`${BASE_URL}/data`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии');
    }
    return response.json();
  });

const sendFormData = (formData) => fetch(`${BASE_URL}`, {
  method: 'POST',
  body: formData,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось отправить форму');
    }
    return response.json();
  });

export { getPhotos, sendFormData };
