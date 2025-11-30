import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const result = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '53154523-05709ccc1510dd918919f2375',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });
  return result.data;
}
