import { useParams } from 'react-router-dom';
import { useTaskDetails } from '../../../queries/useTaskDetails';

type Props = {};

function TaskDetailsPage({}: Props) {
  const { id } = useParams<{ id: string }>();
  const { data } = useTaskDetails(id);

  console.log('Task Details:', data);
  return (
    <div>
      <h1>
        {data.title} - {data?.status}
      </h1>
    </div>
  );
}

export default TaskDetailsPage;
