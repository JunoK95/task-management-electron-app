import { ChevronRight } from 'lucide-react';

import { Project } from '@/types';

import styles from './ProjectItem.module.scss';

type Props = {
  project: Project;
  onClick?: () => void;
};

function ProjectItem({ project, onClick }: Props) {
  const { name } = project;

  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.left}>{name}</div>
      <div className={styles.right}>
        <ChevronRight size={16} />
      </div>
    </div>
  );
}

export default ProjectItem;
