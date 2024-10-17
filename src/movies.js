const movies = require("./data");

// Iteration 1: All directors? - Get the array of all directors.
function getAllDirectors(movies) {
  return movies.map(movies => movies.director);
}

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getUniqueDirectors(movies) {
  const allDirectors = getAllDirectors(movies);
  return [...new Set(allDirectors)];
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  return movies.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  if (!movies.length) return 0;
  const totalScore = movies.reduce((acc, movie) => acc + (movie.score || 0), 0);
  return parseFloat((totalScore / movies.length).toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  const dramaMovies = movies.filter(movie => movie.genre.includes('Drama'));
  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  return [...movies].sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  const sortedTitles = movies.map(movie => movie.title).sort((a, b) => a.localeCompare(b));
  return sortedTitles.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  return movies.map(movie => {
    let durationStr = movie.duration;
    let hours = 0;
    let minutes = 0;
    const hoursMatch = durationStr.match(/(\d+)h/);
    const minutesMatch = durationStr.match(/(\d+)min/);
    if (hoursMatch) {
      hours = parseInt(hoursMatch[1], 10);
    }
    if (minutesMatch) {
      minutes = parseInt(minutesMatch[1], 10);
    }
    const totalMinutes = hours * 60 + minutes;
    return { ...movie, duration: totalMinutes };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  if (!movies.length) return null;
  const scoresByYear = movies.reduce((acc, movie) => {
    if (!acc[movie.year]) acc[movie.year] = { sum: 0, count: 0 };
    acc[movie.year].sum += movie.score;
    acc[movie.year].count += 1;
    return acc;
  }, {});
  let bestYear = '';
  let bestAvg = 0;
  for (let year in scoresByYear) {
    const avg = scoresByYear[year].sum / scoresByYear[year].count;
    if (avg > bestAvg || (avg === bestAvg && year < bestYear)) {
      bestAvg = avg;
      bestYear = year;
    }
  }
  const formattedAvg = bestAvg % 1 === 0 ? bestAvg : bestAvg.toFixed(1);
  return `The best year was ${bestYear} with an average score of ${formattedAvg}`;
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
