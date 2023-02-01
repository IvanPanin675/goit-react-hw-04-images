import axios from 'axios';

const instans = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '31970069-a9908647d31fafc5acab91eef',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchImage = async (q, page = 1) => {
  const { data } = await instans.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
