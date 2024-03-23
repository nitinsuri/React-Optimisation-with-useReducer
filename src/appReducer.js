export const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: null,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        isLoading: true,
        data: null,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        isLoading: false,
        data: null,
        error: 'Something is not right, nothing found to show.',
      };
  }
};
