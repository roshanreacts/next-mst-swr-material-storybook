import { useMemo } from "react";
import { types, applySnapshot } from "mobx-state-tree";
import { connectReduxDevtools } from "mst-middlewares";
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
    function start() {
      self.lastUpdate += 1;
    }

    function reset() {
      self.lastUpdate = 0;
    }

    function stop() {
      self.lastUpdate += 1;
    }

    return { start, stop, reset, postData, resetStore };
  });

export function initializeStore(snapshot = null) {
  const _store = store ?? Store.create({ lastUpdate: 0, posts: [] });

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;
  // connect devtools
  connectReduxDevtools(require("remotedev"), store);

  return store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
const initStore = (() => initializeStore({ lastUpdate: 0, posts: [] }))();
export const [PersistentStoreProvider, usePersistentStore] =
  createPersistentStore(
    Store,
    { lastUpdate: 0, posts: [] },
    {
      logging: true,
      devtool: true,
    }
  );
