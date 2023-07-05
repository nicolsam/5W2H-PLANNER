import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const MenuItems = [
    {
        id: 1,
        title: 'Dashboard',
        link: '/dashboard',
        icon: <DashboardIcon />,
    },
    {
        id: 2,
        title: 'Planejamento',
        link: '/planning',
        icon: <AssignmentIcon />,
    },
    {
        id: 3,
        title: 'Responsáveis',
        link: '/responsibles',
        icon: <PeopleAltIcon />,
    },
];

export default MenuItems;
