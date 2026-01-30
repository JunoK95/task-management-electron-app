import { useMemo, useState } from 'react';

import Modal from '@/components/Modal/Modal';
import SearchBar from '@/components/Tables/Controls/SearchBar/SearchBar';
import { TagsTable } from '@/components/Tables/TagsTable/TagsTable';
import { useAddTagToTask } from '@/queries/tags/useAddTagToTask';
import { useRemoveTagFromTask } from '@/queries/tags/useRemoveTagFromTask';
import { useTaskTags } from '@/queries/tags/useTaskTags';
import { useWorkspaceTags } from '@/queries/tags/useWorkspaceTags';
import { Tag } from '@/types';

type Props = {
  taskId: string;
  workspaceId: string;
  onClose: () => void;
};

function TaskTagsModal({ taskId, workspaceId, onClose }: Props) {
  const { data: workspaceTags = [] } = useWorkspaceTags(workspaceId);
  const { data: taskTags = [] } = useTaskTags(taskId);

  const addTagToTask = useAddTagToTask(taskId);
  const removeTagFromTask = useRemoveTagFromTask(taskId);

  const [searchValue, setSearchValue] = useState('');

  const selectedTagIds = useMemo(() => taskTags.map((tag) => tag.id), [taskTags]);

  const attachTag = (tagId: string) => {
    addTagToTask.mutate({ tag_id: tagId, task_id: taskId });
  };

  const detachTag = (tagId: string) => {
    removeTagFromTask.mutate({ tag_id: tagId, task_id: taskId });
  };

  const handleRowClick = (tag: Tag, isSelected: boolean) => {
    const alreadySelected = selectedTagIds.includes(tag.id);
    if (isSelected === alreadySelected) return;

    isSelected ? attachTag(tag.id) : detachTag(tag.id);
  };

  return (
    <Modal open onClose={onClose}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minWidth: '400px'
        }}
      >
        <SearchBar value={searchValue} onChange={setSearchValue} />

        <TagsTable
          data={workspaceTags}
          selectedTagIds={selectedTagIds}
          onRowClick={handleRowClick}
        />
      </div>
    </Modal>
  );
}

export default TaskTagsModal;
