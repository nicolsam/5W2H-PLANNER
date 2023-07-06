import { motion } from 'framer-motion';
import { FC, useContext, useState } from 'react';

import { GlobalContext } from '@contexts/Context';

import Loading from '@components/Loading';
import MenuItem from '@components/Menu/Item';
import MenuItems from './items';

import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useEffect } from 'react';

import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoopIcon from '@mui/icons-material/Loop';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const variants = {
    open: {
        x: 0,
        display: 'block',
    },
    closed: {
        x: '-100%',
        transitionEnd: { display: 'none' },
    },
};

const Menu: FC = () => {

    const { company } = useContext(GlobalContext)

    const navigate = useNavigate();
    const location = useLocation();

    let currLocation;

    const [active, setActive] = useState<string>('/dashboard');
    const [open, isOpen] = useState<boolean>(true);
    const [currentLocation, setLocation] = useState<string>('/dashboard');

    const handleToggleMenu = () => {
        isOpen(!open);
    };

    async function logout() {

        toast.error('Deslogado com sucesso', {
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
        });

        navigate('/companies');
    }

    function back() {
        // resetCompany();
        navigate('/companies');
        setActive('/dashboard');
    }

    useEffect(() => {
        currLocation = location.pathname.split('/');
        setLocation(currLocation[1]);
    }, [location.pathname]);

    if (location.pathname === '/' || location.pathname === '/login') return null;

    return (
    <div className="h-screen fixed top-0 lg:sticky z-30">
        <div className="top-5 left-2 cursor-pointer bg-main-color rounded-full absolute p-1.5 z-10 lg:hidden">
            <MenuIcon
            className="text-4xl cursor-pointer sticky p-0 fill-white"
            onClick={handleToggleMenu}
            />
        </div>
        <div className="max-w-xs hidden lg:block box-border z-20 h-screen bg-main-color p-5 top-0 sticky flex flex-col items-center gap-4">
            <div className="h-4/5">
            <div className="lg:hidden w-full flex mb-5">
                <div className="cursor-pointer bg-secondary-color rounded-full p-2">
                <MenuIcon
                    className="fill-white text-3xl"
                    onClick={handleToggleMenu}
                />
                </div>
            </div>
            <div className="flex flex-col gap-3 text-white">
                {location.pathname === '/companies' ? (
                <MenuItem
                    title="Empresas"
                    link="/companies"
                    icon={<BusinessIcon />}
                    active={'/companies'}
                    key={6}
                />
                ) : (
                MenuItems.map((item: any, index: number) => {
                    return (
                    <MenuItem
                        title={item.title}
                        link={item.link}
                        icon={item.icon}
                        active={
                        active === currentLocation
                            ? active
                            : '/' + currentLocation
                        }
                        changeActive={(link: string) => setActive(link)}
                        key={index}
                    />
                    );
                })
                )}
            </div>
            </div>
            <div className="h-1/5 flex items-end">
            {location.pathname === '/companies' ? (
                <button
                className="w-full p-3 uppercase text-2xl text-white bg-danger"
                onClick={logout}
                >
                Sair
                </button>
            ) : (
                <div className="w-full rounded bg-secondary-color flex items-center justify-center flex-col gap-3 px-4 py-4">
                <div>
                    {company.attributes.name ? (
                    <p className="px-3 py-2 text-white font-semibold text-base text-center break-words">
                        {company.attributes.name}
                    </p>
                    ) : (
                    <Loading color="white" />
                    )}
                </div>

                <button
                    className="flex flex-row items-center gap-2 px-5 py-2 rounded uppercase text-lg text-white bg-danger hover:bg-danger-hover"
                    onClick={logout}
                >
                    <LogoutIcon className="text-2xl" />

                    <p>Sair</p>
                </button>
                </div>
            )}
            </div>
        </div>
        <div className="lg:hidden">
            <motion.div
            animate={open ? 'open' : 'closed'}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            variants={variants}
            className="box-border z-20 h-screen bg-main-color p-5 top-0 sticky flex flex-col items-center gap-4"
            >
            <div className="h-4/5">
                <div className="lg:hidden w-full flex mb-5">
                <div className="cursor-pointer bg-secondary-color rounded-full p-2">
                    <MenuIcon
                    className="fill-white text-3xl"
                    onClick={handleToggleMenu}
                    />
                </div>
                </div>
                <div className="flex flex-col gap-3 text-white">
                {location.pathname === '/companies' ? (
                    <MenuItem
                    title="Empresas"
                    link="/companies"
                    icon={<BusinessIcon />}
                    active={'/companies'}
                    key={6}
                    />
                ) : (
                    MenuItems.map((item: any, index: number) => {
                    return (
                        <MenuItem
                        title={item.title}
                        link={item.link}
                        icon={item.icon}
                        active={
                            active === currentLocation
                            ? active
                            : '/' + currentLocation
                        }
                        changeActive={(link: string) => setActive(link)}
                        key={index}
                        />
                    );
                    })
                )}
                </div>
            </div>
            <div className="h-1/5 flex items-end">
                {location.pathname === '/companies' ? (
                <button
                    className="w-full p-3 uppercase text-2xl text-white bg-danger"
                    onClick={logout}
                >
                    Sair
                </button>
                ) : (
                <div className="w-full rounded bg-secondary-color flex items-center justify-center flex-col gap-3 px-4 py-4">
                    <div>
                    {/* {company.name ? (
                        <p className="px-3 py-2 text-white font-semibold text-base">
                        {company.name}
                        </p>
                    ) : ( */}
                        
                        <Loading color="white" />

                    {/* )} */}
                    </div>
                    <button
                    className="flex flex-row items-center gap-2 px-5 py-2 rounded uppercase text-lg text-white bg-danger hover:bg-danger-hover"
                    onClick={back}
                    >
                    <LogoutIcon className="text-2xl" />
                    <p>Voltar</p>
                    </button>
                </div>
                )}
            </div>
            </motion.div>
        </div>
    </div>
  );
};

export default Menu;
