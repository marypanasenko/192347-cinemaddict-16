export const sortByDate = (b, a) => {
  if(a.film.year !== b.film.year){
    return a.film.year - b.film.year;
  }
};

export const sortByRating = (b, a) => {
  if(a.film.rating !== b.film.rating){
    return a.film.rating - b.film.rating;
  }
};
