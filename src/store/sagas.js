import {take,  put} from "redux-saga/effects";
import axios from "axios";
import { store } from 'react-notifications-component';

import { url } from '../consts';
import * as mutations from './mutations';
import {user} from '../consts/defaultState';

export function* getUserSaga() {
  while (true) {
    const {username} = yield take(mutations.REQUEST_USER);
    try {
      let response;
      response = yield axios.post(url + `/users`, {username})
      let {data} = response;
      if (!data) {
        throw new Error();
      }
      yield put(mutations.setState(data.state));

    } catch(err) {
      yield put(mutations.failedSetUser());
      yield put(mutations.requestClearState());
      yield put(mutations.setState(user));
    }
  }
}

export function* unAuthenticateSaga() {
  while (true) {
    yield take(mutations.REQUEST_CLEAR_STATE);
    try {
      yield put(mutations.setState(user));
    } catch (err) {
      console.log(`Clear state failed: ${err}`);
    }
  }
}

export function* updateFavDrinks() {
  while (true) {
    const { username, drink, add } =  yield take(mutations.REQUEST_UPDATE_FAV_DRINKS);
    try {
      yield axios.post(`${url}/users/fav_drinks`, {username, idDrink: drink.idDrink, add});
      yield put(mutations.successfulUpdateFavDrinks());
      if (add) {
        yield put(mutations.addDrinkToState(drink));
      } else {
        yield put(mutations.removeDrinkFromState(drink.idDrink));
      }
    } catch (err) {
      console.log(err);
      yield put(mutations.failedUpdateFavDrinks());
      store.addNotification({
        title: "Uh-oh!",
        message: "This action cannot be completed at this time. Try again later.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3500,
          onScreen: true
        }
      });
    }
  }
}


export function* updateFollowersSaga() {
  while(true) {
    const { currentUserUid, followedUserUid, wantsToFollow } = yield take(mutations.REQUEST_UPDATE_WHO_CURRENT_USER_FOLLOWS);
    try {
      yield axios.post(`${url}/users/following`, { currentUserUid, followedUserUid, wantsToFollow });
      yield put(mutations.successfulUpdateWhoCurrentUserFollows());
      if(wantsToFollow) {
        yield put(mutations.addToFollowing(followedUserUid));
      } else {
        yield put(mutations.removeFromFollowing(followedUserUid));
      }
    } catch (err) {
      yield put(mutations.failedUpdateWhoCurrentUserFollows());
      store.addNotification({
        title: "Uh-oh!",
        message: "This action cannot be completed at this time. Try again later.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3500,
          onScreen: true
        }
      });
    }
  }
}
