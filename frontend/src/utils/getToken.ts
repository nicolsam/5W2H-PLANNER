function getToken(auth: string) {

    const token = auth.split(" ")[1];

    return token;

}

export default getToken;