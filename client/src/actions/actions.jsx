import { SET_TRIVIA_API_INPUTS, FETCH_TRIVIA_API_SUCCESS, FETCH_TRIVIA_API_ERROR } from './actionTypes';

export const setTriviaApiInputs = (inputs) => {
  return {
    type: SET_TRIVIA_API_INPUTS,
    payload: inputs,
  };
};

export const fetchTriviaAPI = () => {
  return async (dispatch, getState) => {

    try {
      const { apiInputs } = getState().game;
      const amount = apiInputs.amount
      let difficulty = ""
      if (apiInputs.difficulty != "any") {
        difficulty = `&difficulty=${apiInputs.difficulty}`
      }
      let category = ""
      if (apiInputs.category != "any") {
        category = `&category=${apiInputs.category}`
      }
      const apiUrl = `https://opentdb.com/api.php?amount=${amount}${difficulty}${category}`
      const response = await fetch(apiUrl);
      const data = await response.json();
      //console.log(data)

      dispatch({ type: FETCH_TRIVIA_API_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_TRIVIA_API_ERROR, error: error.message });
    }
  };
};
