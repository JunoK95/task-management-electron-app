import { useState } from 'react';

import Modal from '@/components/Modal/Modal';
import SearchBar from '@/components/Tables/Controls/SearchBar/SearchBar';
import { useAddTagToTask } from '@/queries/tags/useAddTagToTask';
import { useRemoveTagFromTask } from '@/queries/tags/useRemoveTagFromTask';
import { useTaskTags } from '@/queries/tags/useTaskTags';
import { useWorkspaceTags } from '@/queries/tags/useWorkspaceTags';
import { Tag } from '@/types';

import { TagsTable } from './TagsTable';

type Props = {
  taskId: string;
  workspaceId: string;
  onClose: () => void;
};

function TaskTagsModal({ taskId, workspaceId, onClose }: Props) {
  console.log('TaskTagsModal Props:', { taskId, workspaceId });
  const { data: workspaceTags = [] } = useWorkspaceTags(workspaceId);
  const { data: taskTags = [] } = useTaskTags(taskId);
  const addTagToTask = useAddTagToTask(taskId);
  const removeTagFromTask = useRemoveTagFromTask(taskId);
  const [searchValue, setSearchValue] = useState('');

  const selectedTagIds = taskTags.map((tag) => tag.id);

  const handleAddTag = (tagId: string) => {
    addTagToTask.mutate({ tag_id: tagId, task_id: taskId });
  };

  const handleRemoveTag = (tagId: string) => {
    removeTagFromTask.mutate({ tag_id: tagId, task_id: taskId });
  };
  console.log('Workspace Tags', workspaceTags);
  console.log('Task Tags', taskTags);

  const handleRowClick = (tag: Tag, isSelected: boolean) => {
    if (isSelected) {
      handleAddTag(tag.id);
    } else {
      handleRemoveTag(tag.id);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }}>
        <SearchBar value={searchValue} onChange={(value) => setSearchValue(value)} />
        <div>
          <TagsTable
            data={workspaceTags}
            onRowClick={handleRowClick}
            selectedTagIds={selectedTagIds}
          />
        </div>
      </div>
    </Modal>
  );
}

export default TaskTagsModal;
