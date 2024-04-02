import { useSelector } from 'react-redux';
import RenderPage from './components/RenderPage';

export function ContentComponent() {
  const content = useSelector(state => state.content);

  return <div>{content}</div>;
}
