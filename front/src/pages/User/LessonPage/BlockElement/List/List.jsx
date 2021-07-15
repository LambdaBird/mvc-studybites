import { ListContentType } from '../types';

const List = ({ content }) => {
  const { style, items } = content.data;
  if (style === 'ordered') {
    return (
      <ol>
        {items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
  }

  if (style === 'unordered') {
    return (
      <ul>
        {items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
  return null;
};

List.propTypes = {
  content: ListContentType,
};

export default List;
