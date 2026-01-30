import { useParams } from 'react-router-dom';

import { Button } from '@/components/Button/Button';
import SearchBar from '@/components/Tables/Controls/SearchBar/SearchBar';
import { TagsTable } from '@/components/Tables/TagsTable/TagsTable';
import { useModal } from '@/hooks/useModal';
import { useWorkspaceTags } from '@/queries/tags/useWorkspaceTags';

import styles from './TagsPage.module.scss';

type Props = {};

function TagsPage({}: Props) {
  const { workspaceId } = useParams();
  const { data: tags = [] } = useWorkspaceTags(workspaceId || '');
  const { openCreateTags } = useModal();

  const handleCreateTagClick = () => {
    openCreateTags(workspaceId || '');
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <SearchBar value="" onChange={() => {}} />
        <Button className={styles.createBtn} onClick={handleCreateTagClick}>
          + Create
        </Button>
      </div>

      <TagsTable data={tags} selectedTagIds={[]} onRowClick={() => {}} />
    </div>
  );
}

export default TagsPage;
