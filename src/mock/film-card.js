import {FILM_COUNT} from '../main.js';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, conctetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, Purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
  ];
  const randomIndex = getRandomInteger(0, 5);
  return description.slice(randomIndex);
};

const generateInfoFilm = () => {
  const films = [
    {
      title: 'Made for each other',
      image: 'made-for-each-other.png',
      rating: '8.3',
      year: 1929,
      duration: '1h 55m',
      genre: 'Musical'
    },
    {
      title: 'Sagebrush Trail',
      image: 'sagebrush-trail.jpg',
      rating: '3.2',
      year: 1933,
      duration: '54m',
      genre: 'Western'
    },
    {
      title: 'The Man with the Golden Arm',
      image: 'the-man-with-the-golden-arm.jpg',
      rating: '9.0',
      year: 1955,
      duration: '1h 59m',
      genre: 'Drama'
    },
    {
      title: 'Santa Claus Conquers the Martians',
      image: 'santa-claus-conquers-the-martians.jpg',
      rating: '2.3',
      year: 1964,
      duration: '1h 21m',
      genre: 'Comedy'
    },
    {
      title: 'The Great Flamarion',
      image: 'the-great-flamarion.jpg',
      rating: '8.9',
      year: 1945,
      duration: '1h 18m',
      genre: 'Mystery'
    },
    {
      title: 'Popeye the Sailor Meets Sindbad the Sailor',
      image: 'popeye-meets-sinbad.png',
      rating: '6.3',
      year: 1936,
      duration: '16m',
      genre: 'Cartoon'
    },
    {
      title: 'The Dance of Life',
      image: 'the-dance-of-life.jpg',
      rating: '8.3',
      year: 1929,
      duration: '1h 55m',
      genre: 'Musical'
    }];

  const randomIndex = getRandomInteger(0, films.length - 1);
  return films[randomIndex];
};

export const generateFilmCard = () => {
  const numberOfComments = getRandomInteger(0, 5);
  const fullDescription = generateDescription();
  const shortDescription = fullDescription.toString().substr(1, 139).concat(' ...');
  return {
    filmCount: FILM_COUNT,
    shortDescription,
    fullDescription,
    numberOfComments,
    watchlist: Boolean(getRandomInteger(0, 1)),
    history: Boolean(getRandomInteger(0, 1)),
    favorite: Boolean(getRandomInteger(0, 1)),
    film: generateInfoFilm()
  };
};