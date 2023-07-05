import { Link } from 'react-router-dom';

import { Option } from './styles';

type Props = {
  title: string;
  link: string;
  icon: any;
  active: string;
  changeActive?: any;
};

const MenuItem = (props: Props) => {
  return (
    <Option
      isSelected={props.active === props.link}
      className="hover:bg-btn-hover"
      onClick={() => props.changeActive(props.link)}
    >
      <Link
        to={props.link}
        className="px-3 py-4 flex flex-row items-center uppercase text-2xl gap-4"
      >
        <span>{props.icon}</span>
        <h2>{props.title}</h2>
      </Link>
    </Option>
  );
};

export default MenuItem;
