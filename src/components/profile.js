const getProfileRank = (watchedFilmsCount) => {
  if (watchedFilmsCount >= 0 && watchedFilmsCount <= 10) {
    return `novice`;
  } else if (watchedFilmsCount >= 11 && watchedFilmsCount <= 20) {
    return `fan`;
  } else if (watchedFilmsCount >= 21) {
    return `movie buff`;
  }
  return ``;
};

export const createProfileTemplate = (watchedFilmsCount) => {
  return `<section class="header__profile profile">
      <p class="profile__rating">${getProfileRank(watchedFilmsCount)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

