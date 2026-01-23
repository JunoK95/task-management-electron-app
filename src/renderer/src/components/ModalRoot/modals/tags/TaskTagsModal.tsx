import Modal from '@/components/Modal/Modal';
import TaskTags from '@/components/TaskTags/TaskTags';
import { useAddTagToTask } from '@/queries/tags/useAddTagToTask';
import { useRemoveTagFromTask } from '@/queries/tags/useRemoveTagFromTask';
import { useTaskTags } from '@/queries/tags/useTaskTags';
import { useWorkspaceTags } from '@/queries/tags/useWorkspaceTags';

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

  const handleAddTag = (tagId: string) => {
    addTagToTask.mutate({ tag_id: tagId, task_id: taskId });
  };

  const handleRemoveTag = (tagId: string) => {
    removeTagFromTask.mutate({ tag_id: tagId, task_id: taskId });
  };
  console.log('Workspace Tags', workspaceTags);
  console.log('Task Tags', taskTags);

  return (
    <Modal open={true} onClose={onClose}>
      <div>Tags for Task {taskId}</div>
      {workspaceTags.map((tag) => (
        <TaskTags
          key={tag.id}
          label={tag.name}
          color={tag.color || undefined}
          onClick={() => handleAddTag(tag.id)}
        />
      ))}
      <div>Tags attached to Task:</div>
      {taskTags.map((tag) => (
        <TaskTags
          key={tag.id}
          label={tag.name}
          color={tag.color || undefined}
          onDeleteClick={() => handleRemoveTag(tag.id)}
        />
      ))}
    </Modal>
  );
}

export default TaskTagsModal;
