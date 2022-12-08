const BASE_URL = 'https://restcountries.com/v3.1/name';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name = 'ukraine') {
  return fetch(
    `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
  )
    .then(resp => {
      // console.log(resp);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
      console.log(err);
      return err;
    });
}
