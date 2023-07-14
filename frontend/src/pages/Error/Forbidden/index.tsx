import { Link, useNavigate } from "react-router-dom";

// TODO Make a better Forbidden error page
const Forbidden = () => {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Forbidden</h1>

            <Link to="/company/login">Fazer login</Link>
        </div>

    )
}

export default Forbidden