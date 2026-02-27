import Card from '@/components/Card/Card';
import { Project } from '@/types';

import styles from './ProjectThumbnail.module.scss';

type Props = {
  project: Project;
  onClick?: () => void;
};

function ProjectThumbnail({ project, onClick }: Props) {
  const { name } = project;

  return (
    <Card className={styles.container} onClick={onClick}>
      <div className={styles.name}>{name}</div>
    </Card>
  );
}

export default ProjectThumbnail;
