import CreateTagForm from '@/components/Forms/CreateTagForm/CreateTagForm';
import Modal from '@/components/Modal/Modal';

type Props = {
  workspaceId: string;
  onClose: () => void;
};

function TagsFormModal({ workspaceId, onClose }: Props) {
  return (
    <Modal open={true} onClose={onClose}>
      <CreateTagForm workspaceId={workspaceId} />
    </Modal>
  );
}

export default TagsFormModal;
