import type { QueryClient, QueryKey } from '@tanstack/react-query';

type ListShape<T> = {
  data: T[];
  total?: number;
};

export function optimisticPatchAutoLists<T extends { id: string }>(
  qc: QueryClient,
  opts: {
    entityKey: QueryKey;
    listPrefix: QueryKey; // e.g. ['tasks', workspaceId]
    id: string;
    patch: Partial<T>;
  }
) {
  const { entityKey, listPrefix, id, patch } = opts;

  const previousEntity = qc.getQueryData<T>(entityKey);

  const listQueries = qc.getQueryCache().findAll({
    predicate: (q) => {
      const key = q.queryKey;
      return Array.isArray(key) && listPrefix.every((part, i) => key[i] === part);
    }
  });

  const previousLists = listQueries.map((q) => ({
    key: q.queryKey,
    value: qc.getQueryData<ListShape<T>>(q.queryKey)
  }));

  // Patch single entity
  if (previousEntity) {
    qc.setQueryData<T>(entityKey, {
      ...previousEntity,
      ...patch
    });
  }

  // Patch ALL matching lists
  for (const { key, value } of previousLists) {
    if (!value) continue;

    qc.setQueryData<ListShape<T>>(key, {
      ...value,
      data: value.data.map((item) => (item.id === id ? { ...item, ...patch } : item))
    });
  }

  return {
    rollback() {
      if (previousEntity) {
        qc.setQueryData(entityKey, previousEntity);
      }

      for (const { key, value } of previousLists) {
        if (value) qc.setQueryData(key, value);
      }
    }
  };
}
