import ErrorPage from "../Error";

const NotFound = () => {

    return (
        <ErrorPage  
            code={404}
            description="A página que você está procurando não existe."
            button={{
                text: "PÁGINA DE LOGIN",
                url: "/company/login"
            }}
        />
    )
}

export default NotFound;