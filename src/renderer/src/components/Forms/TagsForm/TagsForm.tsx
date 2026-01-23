import { useState } from 'react';
import { useParams } from 'react-router-dom';

import SearchBar from '@/components/Tables/Controls/SearchBar/SearchBar';
import TaskTags from '@/components/TaskTags/TaskTags';
import { useWorkspaceTags } from '@/queries/tags/useWorkspaceTags';

type Props = {};

function TagsForm({}: Props) {
  const { workspaceId = '' } = useParams();
  const { data: tags = [] } = useWorkspaceTags(workspaceId);
  const [value, setValue] = useState('');

  return (
    <div>
      <SearchBar value={value} onChange={setValue} />
      <div>
        {tags.map((t) => (
          <TaskTags key={`tags-form-row-${t.id}`} color={t.color || ''} label={t.name} />
        ))}
      </div>
    </div>
  );
}

export default TagsForm;
