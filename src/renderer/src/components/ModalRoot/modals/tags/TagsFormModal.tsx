import { Modal } from 'juno-ui-library';

import CreateTagForm from '@/components/Forms/CreateTagForm/CreateTagForm';

type Props = {
  workspaceId: string;
  onClose: () => void;
};

function TagsFormModal({ workspaceId, onClose }: Props) {
  return (
    <Modal open={true} onClose={onClose} title="Create Tag">
      <CreateTagForm workspaceId={workspaceId} />
    </Modal>
  );
}

export default TagsFormModal;
