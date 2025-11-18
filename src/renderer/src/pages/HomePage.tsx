import { JSX } from 'react';

type Props = {};

function HomePage({}: Props): JSX.Element {
  console.log('HomePage rendered');
  return <div>HomePage</div>;
}

export default HomePage;
