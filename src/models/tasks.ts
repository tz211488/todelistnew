import { Effect, Reducer } from 'umi';

export interface TaskStateType {
  tasks: TaskListModel;
  category: any;
}

export interface TagType {
  uid: string;
  label: string;
}

export interface TaskItemType {
  uid: string;
  title: string;
  description: string;
  child: string[];
  parent: string;
  status: 0 | 1 | 2;
  progress: number;
  tags: TagType[];
  categorys: string;
  startTime: any;
  endTime: any;
  alertTime: any;
  alertType: any;
}

export interface TaskListModel {
  byId: {
    [id: string]: TaskItemType;
  };
  allIds: string[];
}

export interface TaskModelType {
  namespace: 'tasks';
  state: TaskStateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    addTask: Reducer<TaskStateType>;
    deleteTask: Reducer<TaskStateType>;
    updateTask: Reducer<TaskStateType>;
    // editTask: Reducer<TaskStateType>;
  };
}

const normalize: (taskList: TaskItemType[]) => TaskListModel = (taskList) => {
  const tempObject: TaskListModel = {
    byId: {},
    allIds: [],
  };
  taskList.forEach((item) => {
    tempObject.byId[item.uid] = item;
    tempObject.allIds.push(item.uid);
  });

  return tempObject;
};

const denormalize: (taskList: TaskListModel) => TaskItemType[] = (taskList) => {
  return Object.values(taskList.byId);
};

const TaskModel: TaskModelType = {
  namespace: 'tasks',
  state: {
    tasks: {
      byId: {},
      allIds: [],
    },
    category: {
      a: 'dsd',
    },
  },
  effects: {
    *fetch(_, { put }) {
      yield put({
        type: 'addTask',
        payload: {},
      });
    },
  },
  reducers: {
    addTask(state, { payload }) {
      const tempList = denormalize(state?.tasks as TaskListModel);
      tempList.push(payload);
      return {
        ...(state as TaskStateType),
        tasks: normalize(tempList),
      };
    },

    deleteTask(state, { payload }) {
      const tempList = denormalize(state?.tasks as TaskListModel);
      const indexUid = tempList.findIndex((item) => item.uid === payload.uid);
      tempList.splice(indexUid, 1);
      return {
        ...(state as TaskStateType),
        tasks: normalize(tempList),
      };
    },
    updateTask(state, { payload }) {
      const byId = { ...(state?.tasks.byId as object) };
      delete byId[payload];
      const allIds = [...(state?.tasks.allIds as string[]), payload.uid];
      const tempIndex = allIds.indexOf(payload);
      allIds.splice(tempIndex, 1);
      return {
        ...(state as TaskStateType),
        tasks: { byId, allIds },
      };
    },
  },
};

export default TaskModel;
