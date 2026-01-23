import { useParams } from 'react-router-dom';

import TagsForm from '@/components/Forms/TagsForm/TagsForm';
import { useModal } from '@/hooks/useModal';

type Props = {};

function TagsPage({}: Props) {
  const { workspaceId } = useParams();
  const { openCreateTags } = useModal();

  const handleCreateTagClick = () => {
    openCreateTags(workspaceId || '');
  };

  return (
    <div>
      <button onClick={handleCreateTagClick}>Create Tag</button>
      <TagsForm />
    </div>
  );
}

export default TagsPage;
