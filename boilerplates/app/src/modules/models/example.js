import { call, put } from 'dva/effects';

export default {

  namespace: 'example',

  state: {
  },

  subscriptions: [
    function ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/example') {
          dispatch({
            type: 'example/query',
            payload: location.query
          });
        }
      });
    },
  ],

  effects: {
    *['example/query']({ payload }) {
    },
  },

  reducers: {
    ['example/save'](state, action) {
      return { ...state, ...action.payload };
    },
  },

}
