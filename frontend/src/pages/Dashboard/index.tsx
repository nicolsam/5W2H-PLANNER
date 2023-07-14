import useIsCompanySelected from '@hooks/useIsCompanySelected';

import MdCard from '@components/Card/MdCard';
import SmCard from '@components/Card/SmCard';
import Header from '@components/Layout/Header';
import Main from '@components/Layout/Main';
import { GlobalContext } from '@contexts/Context';
import { Chart } from '@models/Chart';
import GoalType from '@models/Goal';
import api from '@utils/api';
import { useContext, useEffect, useState } from 'react';

const Dashboard = () => {

    const { company } = useContext(GlobalContext);

    useIsCompanySelected();

    const [goalCount, setGoalCount] = useState({
        total: 0,
    })

    const [actionCount, setActionCount] = useState({
        total: 0,
        toStart: 0,
        developing: 0,
        completed: 0,
    });

    const [stageCount, setStageCount] = useState({
        total: 0,
        toStart: 0,
        developing: 0,
        completed: 0,
    });

    const [actionChart, setActionChart] = useState<Chart[]>([
        {
            color: 'rgb(248, 46, 10)',
            name: 'A Iniciar',
            percentage: 0,
        },
        {
            color: 'rgba(243, 228, 22, 0.884)',
            name: 'Em desenvolvimento',
            percentage: 0,
        },
        {
            color: 'rgba(19, 252, 70, 0.973)',
            name: 'Concluído',
            percentage: 0,
        },
    ]);
    
    const [stageChart, setStageChart] = useState<Chart[]>([
        {
            color: 'rgb(248, 46, 10)',
            name: 'A Iniciar',
            percentage: 0,
        },
        {
            color: 'rgba(243, 228, 22, 0.884)',
            name: 'Em desenvolvimento',
            percentage: 0,
        },
        {
            color: 'rgba(19, 252, 70, 0.973)',
            name: 'Concluído',
            percentage: 0,
        },
    ]);

    const [responsibleCount, setResponsibleCount] = useState(0); 

    const handleCount = async () => {
        try {
            
            const response = await api.companies.count(company.id)
            
            setGoalCount({
                total: response?.data.goal.total
            })

            setActionCount({
                total: response?.data.action.total,
                toStart: response?.data.action.toStart,
                developing: response?.data.action.inProgress,
                completed: response?.data.action.completed,
            })
            
            setStageCount({
                total: response?.data.stage.total,
                toStart: response?.data.stage.toStart,
                developing: response?.data.stage.inProgress,
                completed: response?.data.stage.completed,
            })


        } catch(error) {
            console.log(error);
        }
    }

    const handleCharts = async () => {

        setActionChart([
            {
                ...actionChart[0],
                percentage: calcPercent(actionCount.total, actionCount.toStart)
            },
            {
                ...actionChart[1],
                percentage: calcPercent(actionCount.total, actionCount.developing)
            },
            {
                ...actionChart[2],
                percentage: calcPercent(actionCount.total, actionCount.completed)
            },
        ])
        
        setStageChart([
            {
                ...actionChart[0],
                percentage: calcPercent(stageCount.total, stageCount.toStart)
            },
            {
                ...actionChart[1],
                percentage: calcPercent(stageCount.total, stageCount.developing)
            },
            {
                ...actionChart[2],
                percentage: calcPercent(stageCount.total, stageCount.completed)
            },
        ])

    }

    const handleResponsibleChart = async () => {
        try {

            const response = await api.companies.responsibles(company.id);

            setResponsibleCount(response?.data.length)


        } catch(error) {
            console.log(error)
        }
    }

    const calcPercent = (total: number | any, initial: number) => {
        if (typeof total != 'number' || typeof initial != 'number') {
            return 0;
        }

        if(total === 0 && initial === 0) {
            return 0;
        }

        const percent = (initial * 100) / total;
        return Number(percent.toFixed(0));
    };

    useEffect(() => {
        handleCount();
        handleResponsibleChart();
    }, [])

    useEffect(() => {
        handleCharts();
    }, [actionCount, stageCount])

    return (
        <Main>
            <Header description="Monitore o desenvolvimento do seu planejamento utilizando o Dashboard.">
                Dashboard
            </Header>

            <div className="mt-5 grid grid-rows-auto gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 lg:gap-3">
                <div className="2xl:cols-span-2 h-fit">
                    <SmCard description="Total de metas" amount={goalCount.total} type="number" />
                </div>
                <div className="2xl:cols-span-2 h-fit">
                    <SmCard description="Total de ações" amount={actionCount.total} type="number" />
                </div>
                <div className="2xl:cols-span-2 h-fit">
                    <SmCard description="Total de etapas" amount={stageCount.total} type="number" />
                </div>
                <div className="2xl:cols-span-2 h-fit">
                    <SmCard description="Total de responsáveis" amount={responsibleCount} type="number" />
                </div>
                <div className="col-span-1 md:col-span-1 lg:row-span-1 lg:col-span-2 xl:row-span-1 xl:col-span-1 2xl:col-span-2">
                    <MdCard name="Ações" charts={actionChart} />
                </div>
                <div className="col-span-1 md:col-span-1 lg:row-span-1 lg:col-span-2 xl:row-span-1 xl:col-span-1 2xl:col-span-2">
                    <MdCard name="Etapas" charts={stageChart} />
                </div>
            </div>
        </Main>
    );
}

export default Dashboard