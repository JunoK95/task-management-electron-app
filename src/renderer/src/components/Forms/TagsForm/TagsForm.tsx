import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/Button/Button';
import ColorPicker from '@/components/ColorPicker/ColorPicker';
import Input from '@/components/Input/Input';
import SearchBar from '@/components/Tables/Controls/SearchBar/SearchBar';
import TaskTags from '@/components/TaskTags/TaskTags';
import { useCreateTag } from '@/queries/tags/useCreateTag';
import { useWorkspaceTags } from '@/queries/tags/useWorkspaceTags';

type Props = {};

function TagsForm({}: Props) {
  const { workspaceId = '' } = useParams();
  const { data: tags = [] } = useWorkspaceTags(workspaceId);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [colorValue, setColorValue] = useState('');

  const createTag = useCreateTag(workspaceId);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    createTag.mutate({ workspace_id: workspaceId, name: inputValue, color: '#0D0D0D' });
  };

  console.log('Available Tags', tags);

  return (
    <div>
      <div>
        <Input label={'Tag label'} value={inputValue} onChange={handleChange} />
        <div>
          <ColorPicker value={colorValue} onChange={(color: string) => setColorValue(color)} />
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
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
