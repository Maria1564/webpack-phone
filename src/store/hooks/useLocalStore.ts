import { useEffect, useRef } from "react";

export interface ILocalStore {
  destroy: () => void;
}

export const useLocalStore = <T extends ILocalStore>(
  creatorLocalStore: () => T
): T => {
  const store = useRef<null | T>(null);

  if (store.current === null) {
    store.current = creatorLocalStore();
  }

  useEffect(() => {
    return store.current?.destroy();
  });

  return store.current;
};
