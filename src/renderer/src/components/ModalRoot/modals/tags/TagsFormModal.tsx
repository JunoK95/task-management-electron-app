import TagsForm from '@/components/Forms/TagsForm/TagsForm';
import Modal from '@/components/Modal/Modal';
import { useModal } from '@/hooks/useModal';

type Props = {};

function TagsFormModal({}: Props) {
  const { close } = useModal();

  return (
    <Modal open={true} onClose={close}>
      <TagsForm />
    </Modal>
  );
}

export default TagsFormModal;
