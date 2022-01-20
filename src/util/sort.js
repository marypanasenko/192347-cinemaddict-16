import dayjs from 'dayjs';
export const sortByDate = (b, a) => {
  if(a.film.year !== b.film.year){
    return dayjs(a.film.year).isAfter(dayjs(b.film.year)) ? 1 : -1;
  }
};

export const sortByRating = (b, a) => {
  if(a.film.rating !== b.film.rating){
    return a.film.rating - b.film.rating;
  }
};
