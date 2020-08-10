import { Effect, Reducer } from 'umi';

import { queryCurrent, query as queryUsers } from '@/services/user';

export type Task = {
  title: string;
  des?: string;
};

export interface TaskModelState {
  // taskList: {
  //   byIds?: {
  //     [id: string]: Task;
  //   };
  //   allIds?: string[];
  // };
  taskList: Task[];
}

export interface TaskModelType {
  namespace: 'task';
  state: TaskModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<TaskModelState>;
    addTask: Reducer<TaskModelState>;
    updateTask: Reducer<TaskModelState>;
  };
}

const TaskModel: TaskModelType = {
  namespace: 'task',

  state: {
    taskList: [
      {
        title: 'adsfasdfa',
      },
    ],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state) {
      return {
        ...state,
        taskList: [],
      };
    },
    addTask(state, { payload }) {
      return {
        ...state,
        taskList: [...(state as any).taskList, payload],
      };
    },
    updateTask(state, { payload }) {
      const taskList = [...(state as any).taskList];
      taskList[payload.index][payload.attr] = payload.value;
      return {
        ...state,
        taskList,
      };
    },
  },
};

export default TaskModel;
