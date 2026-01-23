import { useState } from 'react';

import { Button } from '@/components/Button/Button';
import ColorPicker from '@/components/ColorPicker/ColorPicker';
import Input from '@/components/Input/Input';
import TaskTags from '@/components/TaskTags/TaskTags';
import { useCreateTag } from '@/queries/tags/useCreateTag';

import styles from './CreateTagForm.module.scss';

type Props = {
  workspaceId: string;
};

function CreateTagForm({ workspaceId }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [colorValue, setColorValue] = useState('#475569');

  const createTag = useCreateTag(workspaceId);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    createTag.mutate({ workspace_id: workspaceId, name: inputValue, color: colorValue });
  };

  const handleColorChange = (color: string) => {
    console.log(color);
    setColorValue(color);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.row}>
        <div className={styles.leftColumn}>
          <div className={styles.tagPreview}>
            <TaskTags color={colorValue} label={inputValue || 'tag name'} />
          </div>
          <div className={styles.inputWrapper}>
            <Input placeholder="Tag name" value={inputValue} onChange={handleChange} />
          </div>
        </div>
        <div>
          <ColorPicker value={colorValue} onChange={handleColorChange} />
        </div>
      </div>

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

export default CreateTagForm;
