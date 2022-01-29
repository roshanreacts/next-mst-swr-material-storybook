import { types, applySnapshot } from "mobx-state-tree";
import createPersistentStore from "mst-persistent-store";

let store;

const Post = types
  .model({
    id: types.identifierNumber,
    title: types.string,
    body: types.string,
    userId: types.number,
  })
  .actions((self) => ({
    setTitle(title) {
      self.title = title;
    },
    log() {
      console.log(self.toJSON());
    },
  }));

const Store = types
  .model({
    lastUpdate: types.number,
    posts: types.array(Post),
  })
  .actions((self) => {
    let timer;
    let initialState = { lastUpdate: 0, posts: [] };
    function afterCreate() {
      initialState = getSnapshot(self);
    }
    function resetStore() {
      applySnapshot(self, initialState);
    }
    function postData(posts) {
      self.posts = posts;
      return self.posts;
    }
    function plus() {
      self.lastUpdate += 1;
    }

    function reset() {
      self.lastUpdate = 0;
    }

    function minus() {
      self.lastUpdate -= 1;
    }

    return { plus, minus, reset, postData, resetStore };
  });

// To keep the store persistent
export const [PersistentStoreProvider, usePersistentStore] =
  createPersistentStore(
    Store,
    { lastUpdate: 0, posts: [] },
    {
      logging: true,
      devtool: true,
    }
  );
