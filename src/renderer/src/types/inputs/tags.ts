export type CreateTagInput = {
  workspace_id: string;
  name: string;
  color?: string;
};

export type AddTagToTaskInput = {
  tag_id: string;
  task_id: string;
};

export type RemoveTagFromTaskInput = AddTagToTaskInput;
