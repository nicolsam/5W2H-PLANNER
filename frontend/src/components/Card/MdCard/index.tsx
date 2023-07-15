import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { Card, CChart, Color } from './styles';

import { Chart } from '@models/Chart';

type Props = {
    name: string;
    charts: Chart[];
};

const MdCard = ({ name, charts }: Props) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const options = {
        plugins: {
        legend: {
            display: false,
        },
        },
    };

    const data = {
        labels: charts.map((chart) => chart.name),
        datasets: [
        {
            data: charts.map((chart) => chart.percentage),
            backgroundColor: charts.map((charts) => charts.color),
            borderWidth: 1,
        },
        ],
    };

    return (
        <Card className="h-full max-h-max md:p-5 bg-main-color text-white rounded flex flex-col gap-2 lg:gap-5 xl:py-8 2xl:px-2">
            <h2 className="text-center px-4 py-6 font-bold text-xl md:py-1 md:whitespace-nowrap lg:whitespace-normal md:text-center md:text-2xl lg:font-bold lg:break-words xl:text-left xl:font-bold 2xl:whitespace-normal">
                {name}
            </h2>
            <div className="flex flex-col-reverse gap-3 md:items-center lg:flex-row lg:justify-center xl:justify-start xl:grid-5">
                <div className="lg:w-1/2 flex justify-center md:items-center">
                <table className="mb-5 px-4 md:px-0 md:mb-0 table-auto sm:text-base md:text-lg lg:text-xl xl:text-base 2xl:text-xl">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Ação</th>
                        <th>%</th>
                    </tr>
                    </thead>
                    <tbody>
                    {charts.map((chart, index: number) => (
                        <tr key={index}>
                        <td className="px-1 py-1 text-center xl:w-1/6 2xl:px-2">
                            <Color color={chart.color} />
                        </td>
                        <td className="px-2 py-1 2xl:px-2 whitespace-nowrap">
                            {chart.name}
                        </td>
                        <td className="px-2 py-1 xl:w-1/4 2xl:px-2 text-center">
                            {chart.percentage}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <CChart className="p-10 md:p-5 md:w-1/2 lg:w-1/3 lg:p-2 xl:w-1/2 xl:px-4 flex justify-center sm:items-center">
                <Doughnut data={data} options={options} />
                </CChart>
            </div>
        </Card>
    );
};

export default MdCard;
