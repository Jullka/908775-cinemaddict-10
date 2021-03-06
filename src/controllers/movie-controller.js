import FilmCardComponent from '../components/film-card-component.js';
import FilmDetailsComponent from '../components/film-details-component.js';
import UserRatingComponent from '../components/user-rating-component.js';
import CommentsComponent from '../components/comments-component.js';
import CountCommentsComponent from '../components/count-comments-component.js';
import CommentController from '../controllers/comments-controller.js';
import CommentsModel from '../models/comments-model.js';
import {RenderPosition, isSubmitPressed, render, remove, replace} from '../utils.js';

const Mode = {
  DEFAULT: `default`,
  OPEN: `open`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange, filmsModel) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmsModel = filmsModel;
    this._commentsModel = new CommentsModel();

    this._film = null;
    this._mode = Mode.DEFAULT;
    this._showedCommentControllers = [];

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._countCommentsComponent = null;
    this._userRatingComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._closeDetails = this._closeDetails.bind(this);
    this._openDetails = this._openDetails.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);
    this._onSubmitForm = this._onSubmitForm.bind(this);

    this._commentsModel.setCommentChangeHandler(this._onCommentChange);
  }

  render(film) {
    this._film = film;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._commentsModel.setComments(film.comments);
    this._prepeareFilm(this._film);
    this._prepearDetails(this._film);

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent.getElement());
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeDetails();
    }
  }

  _prepeareFilm(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmCardComponent.setOpenDetailsClickHandler(() => this._openDetails(film));
    this._filmCardComponent.setWatchlistClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._filmCardComponent._film, Object.assign({}, this._filmCardComponent._film, {
        isAddedToWatchlist: !film.isAddedToWatchlist
      }));
    });
    this._filmCardComponent.setWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmCardComponent._film, Object.assign({}, this._filmCardComponent._film, {
        isAlreadyWatched: !film.isAlreadyWatched
      }));
    });
    this._filmCardComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmCardComponent._film, Object.assign({}, this._filmCardComponent._film, {
        dateWatched: (film.dateWatched ? null : new Date()),
        isAddedToFavorites: !film.isAddedToFavorites
      }));
    });
  }

  _prepearDetails(film) {
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._filmDetailsComponent.setCloseClickHandler(this._closeDetails);
    this._filmDetailsComponent.setWatchlistClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddedToWatchlist: !film.isAddedToWatchlist
      }));
    });
    this._filmDetailsComponent.setWatchedClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAlreadyWatched: !film.isAlreadyWatched
      }));
    });
    this._filmDetailsComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddedToFavorites: !film.isAddedToFavorites
      }));
    });

    if (film.isAlreadyWatched) {
      const detailsMiddleContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__middle-container`);
      this._userRatingComponent = new UserRatingComponent(film).getElement();
      render(detailsMiddleContainer, this._userRatingComponent);
    }

    const comments = this._commentsModel.getComments();
    this._renderComments(comments);
  }

  _onSubmitForm(evt) {
    if (isSubmitPressed(evt)) {
      this._filmDetailsComponent.setFormSumbitHandler(() => {
        const data = this._filmDetailsComponent.getData();
        this._commentsModel.addComment(data);

        const comments = this._commentsModel.getComments();
        this._film.comments = comments;
        this._filmsModel.updateFilm(this._film.id, this._film);

        this._updateComments(comments);
      });
    }
  }

  _onCommentChange(commentController, oldData, newData) {
    if (newData === null) {
      commentController.destroy();
      this._commentsModel.removeComment(oldData);

      const comments = this._commentsModel.getComments();
      this._film.comments = comments;
      this._filmsModel.updateFilm(this._film.id, this._film);
    }

    this._updateComments();
  }

  _renderComments(comments) {
    this._detailsBottomElement = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._commentsComponent = new CommentsComponent();

    this._commentsComponent.setClickEmojiHandler();

    const commentsWrapElement = this._commentsComponent.getElement();
    this._countCommentsComponent = new CountCommentsComponent(comments.length);

    render(this._detailsBottomElement, this._commentsComponent.getElement());
    render(commentsWrapElement, this._countCommentsComponent.getElement(), RenderPosition.AFTERBEGIN);

    const commentListElement = this._commentsComponent.getElement().querySelector(`.film-details__comments-list`);
    const newComment = comments.map((comment) => {
      const commentController = new CommentController(commentListElement, this._onCommentChange, this._commentsModel);
      commentController.render(comment);

      return commentController;
    });

    this._showedCommentControllers = [...this._showedCommentControllers, ...newComment];
  }

  _removeComents() {
    remove(this._commentsComponent);
    this._showedCommentControllers.forEach((commentController) => commentController.destroy());
    this._showedCommentControllers = [];
  }

  _updateComments() {
    const comments = this._commentsModel.getComments();
    this._removeComents();
    this._renderComments(comments);
  }


  _closeDetails() {
    this._mode = Mode.DEFAULT;
    remove(this._filmDetailsComponent);
    remove(this._commentsComponent);
    remove(this._countCommentsComponent);
    document.removeEventListener(`keydown`, this._onSubmitForm);
    document.removeEventListener(`keydown`, this._onSubmitForm);
  }

  _openDetails(film) {
    this._onViewChange();
    this._mode = Mode.OPEN;

    if (!this._filmDetailsComponent._element) {
      this._prepearDetails(film);
    }

    render(document.querySelector(`body`), this._filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, this._onEscKeyDown);
    document.addEventListener(`keydown`, this._onSubmitForm);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeDetails();
    }
  }
}
