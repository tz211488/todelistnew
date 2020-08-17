import { Effect, Reducer, Subscription } from 'umi';
import { taskMenu } from '@/components/ModalMenu/TaskMenu';

export interface TaskStateType {
  tasks: TaskListModel;
  category: CategoryListType;
}

export interface TagType {
  uid: string;
  label: string;
}

export interface CategoryItemType {
  uid: string;
  label: string;
  taskList: any[];
}

export interface CategoryListType {
  byId: {
    [id: string]: CategoryItemType;
  };
  allIds: string[];
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
    addChildTask: Effect;
    deleteWithLevel: Effect;
  };
  reducers: {
    addTask: Reducer<TaskStateType>;
    deleteTask: Reducer<TaskStateType>;
    deleteTaskList: Reducer<TaskStateType>;
    updateTask: Reducer<TaskStateType>;
    updateTaskList: Reducer<TaskStateType>;

    addCategory: Reducer<TaskStateType>;
    deleteCategory: Reducer<TaskStateType>;
    updateCategory: Reducer<TaskStateType>;

    // editTask: Reducer<TaskStateType>;
  };
  subscriptions: { onClick: Subscription };
}

const normalize = (taskList: any) => {
  const tempObject: {
    byId: any;
    allIds: string[];
  } = {
    byId: {},
    allIds: [],
  };
  taskList.forEach((item: any) => {
    tempObject.byId[item.uid] = item;
    tempObject.allIds.push(item.uid);
  });

  return tempObject;
};

const denormalize = (taskList: any) => {
  return Object.values(taskList.byId);
};

const initState: TaskStateType = {
  tasks: {
    byId: {},
    allIds: [],
  },
  category: {
    byId: {
      adb: {
        uid: 'adb',
        label: 'asdfasdf',
        taskList: [{ uid: 'abc', isSelected: false }],
      },
    },
    allIds: ['abc'],
  },
};

const TaskModel: TaskModelType = {
  namespace: 'tasks',
  state: initState,
  effects: {
    *addChildTask({ payload }, { put, select }) {
      const { childItem, parentUid } = payload;
      const childUid = childItem.uid;

      // 子组件添加父组件标志
      childItem.parent = parentUid;

      const parentItem = yield select((state: any) => state.tasks.tasks.byId[parentUid]);

      if (!parentItem.child.indexOf(childUid)) {
        parentItem.child.push(childUid);
      }

      yield put({
        type: 'addTask',
        payload: childItem,
      });

      yield put({
        type: 'updateTask',
        payload: parentItem,
      });
    },

    *deleteWithLevel({ payload }, { put, select }) {
      const deleteItem = yield select((state: any) => state.tasks.tasks.byId[payload.uid]);
      // 判断该task是否有child parent
      if (!deleteItem.parent && !deleteItem.child.length) {
        yield put({
          type: 'deleteTask',
          payload: { uid: payload.uid },
        });
      } else {
        // 修改父task
        if (deleteItem.parent) {
          const parentItem = yield select(
            (state: any) => state.tasks.tasks.byId[deleteItem.parent],
          );

          const uidIndex = parentItem.child.indexOf(deleteItem.uid);

          if (uidIndex) {
            parentItem.child.splice(uidIndex, 1);
          }

          yield put({
            type: 'updateTask',
            payload: parentItem,
          });
        }

        // 修改子task

        if (deleteItem.child.length) {
          // 判断是什么模式，如果 payload.deleteType = 0#全部删除  1#自动赋值子组件瞬移到上一级  2#成为顶级task

          const parentUid = payload.deleteType === 2 ? '' : deleteItem.parent;

          if (payload.deleteType === 0) {
            yield put({
              type: 'deleteTaskList',
              payload: deleteItem.child,
            });
          } else {
            yield put({
              type: 'updateTaskList',
              payload: {
                editList: deleteItem.child,
                editInfo: {
                  parent: parentUid,
                },
              },
            });
          }
        }
      }
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
      const indexUid = tempList.findIndex((item: any) => item.uid === payload.uid);
      tempList.splice(indexUid, 1);
      return {
        ...(state as TaskStateType),
        tasks: normalize(tempList),
      };
    },

    deleteTaskList(state, { payload }) {
      let tempList = denormalize(state?.tasks as TaskListModel);

      tempList = tempList.filter((item: any) => !payload.includes(item.uid));
      return {
        ...(state as TaskStateType),
        tasks: normalize(tempList),
      };
    },
    updateTask(state, { payload }) {
      const byId = { ...(state?.tasks.byId as object) };
      byId[payload.uid] = { ...byId[payload.uid], ...payload };

      return {
        ...(state as TaskStateType),
        tasks: { byId, allIds: state?.tasks.allIds as string[] },
      };
    },
    updateTaskList(state, { payload }) {
      let tempList = denormalize(state?.tasks as TaskListModel);

      tempList = tempList.map((item: any) => {
        let itemTemp;
        if (payload.editList.includes(item.uid)) {
          itemTemp = { ...item, ...payload.editInfo };
        }

        return itemTemp;
      });

      return {
        ...(state as TaskStateType),
        tasks: normalize(tempList),
      };
    },

    addCategory(state, { payload }) {
      const tempList = denormalize(state?.category as CategoryListType);
      tempList.push(payload);
      return {
        ...(state as TaskStateType),
        category: normalize(tempList),
      };
    },

    deleteCategory(state, { payload }) {
      const tempList = denormalize(state?.category as CategoryListType);
      const indexUid = tempList.findIndex((item: any) => item.uid === payload.uid);
      tempList.splice(indexUid, 1);
      return {
        ...(state as TaskStateType),
        category: normalize(tempList),
      };
    },

    updateCategory(state, { payload }) {
      const byId = { ...(state?.category.byId as object) };
      byId[payload.uid] = { ...byId[payload.uid], ...payload };

      return {
        ...(state as TaskStateType),
        category: { byId, allIds: state?.category.allIds as string[] },
      };
    },
  },
  subscriptions: {
    onClick(): void {
      document.addEventListener('click', () => {
        taskMenu.close();
      });
    },
  },
};

export default TaskModel;
