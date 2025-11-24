// getImagesByQuery(query). Ця функція повинна приймати один параметр query (пошукове слово, яке є рядком), здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.
import axios from 'axios';

export default async function getImagesByQuery(query) {
  const BASE_URL = 'https://pixabay.com/api/';

  const params = {
    key: '53337460-da8d4afc1a3151b07a1e25c69',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const response = await axios.get(BASE_URL, { params });

  return response.data;
}
