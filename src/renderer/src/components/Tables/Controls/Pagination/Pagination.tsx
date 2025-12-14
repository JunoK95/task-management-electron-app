import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.scss';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

export default function Pagination({ page, totalPages, onPageChange, isLoading }: Props) {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.btn}
        disabled={page <= 1 || isLoading}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={16} />
      </button>

      <span className={styles.info}>
        Page {page} of {totalPages}
      </span>

      <button
        className={styles.btn}
        disabled={page >= totalPages || isLoading}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
