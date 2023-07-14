import ErrorRobot from '@components/Robot/robot';
import ErrorIcon from '@mui/icons-material/Error';

const Forbidden = () => {

    return (
        <div className="relative bg-secondary-color w-full h-screen flex flex-col justify-center items-center gap-10">
            <div className="absolute top-1/4 flex flex-row justify-center items-center gap-7">
                <ErrorIcon color="error" style={{ fontSize: 80 }} />
                <div className="flex flex-col">
                    <h1 className="text-white font-semibold text-4xl lg:text-6xl xl:text-7xl">403</h1>
                    <p className="text-white text-xl lg:text-2xl xl:text-3xl">Acesso recusado</p>
                </div>
            </div>
            <div className="h-fit absolute top-2/3">
                <ErrorRobot />
            </div>
        </div>

    )
}

export default Forbidden