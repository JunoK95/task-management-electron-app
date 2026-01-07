import { format, formatDistanceToNow } from 'date-fns';

import styles from './TimeCard.module.scss';

type Props = {
  dateString: string | null;
};

function TimeCard({ dateString }: Props) {
  const renderContent = () => {
    if (!dateString) {
      return 'No date provided';
    }

    return (
      <>
        <div className={styles.day}>{format(new Date(dateString), 'EEEE')}</div>
        <div className={styles.month}>{format(new Date(dateString), 'MMM dd')}</div>
        <div className={styles.timeAgo}>
          {formatDistanceToNow(new Date(dateString), { addSuffix: true })}
        </div>
      </>
    );
  };

  return <div className={styles.card}>{renderContent()}</div>;
}

export default TimeCard;
