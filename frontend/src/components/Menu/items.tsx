import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const MenuItems = [
    {
        id: 1,
        title: 'Dashboard',
        link: '/dashboard',
        icon: <DashboardIcon className="min-w-full min-h-full" />,
    },
    {
        id: 2,
        title: 'Planejamento',
        link: '/planning',
        icon: <AssignmentIcon className="min-w-full min-h-full" />,
    },
    {
        id: 3,
        title: 'Responsáveis',
        link: '/responsibles',
        icon: <PeopleAltIcon className="min-w-full min-h-full" />,
    },
    {
        id: 4,
        title: 'Áreas',
        link: '/areas',
        icon: <AccountBalanceIcon className="min-w-full min-h-full" />,
    },
];

export default MenuItems;
