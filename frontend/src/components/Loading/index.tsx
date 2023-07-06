import LoopIcon from '@mui/icons-material/Loop';

type Props = {
    color?: string
}

const Loading = ({ color = "black" }: Props) => {
    return (
        <div className="px-3 py-2">
            <LoopIcon className={`animate-spin text-2xl fill-white text-${color}`} />
        </div>
    )
}

export default Loading