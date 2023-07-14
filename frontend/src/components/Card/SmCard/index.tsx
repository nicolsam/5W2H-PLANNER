import { Card } from './styles';

type Props = {
    type: 'number' | 'percent';
    amount: number | undefined;
    description: string;
};

const SmCard = ({ type, amount, description }: Props) => {
    return (
        <Card className="h-full px-2 py-5 md:py-3 lg:px-4 lg:py-5 bg-main-color text-white rounded">
        <h2 className="text-3xl md:mb-2 lg:mb-2">
            {amount}
            {type == 'percent' && '%'}
        </h2>
        <p className="xl:text-base 2xl:text-base">{description}</p>
        </Card>
    );
};

export default SmCard;
