class DevConfig {

    // Backend urls:
    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl = "http://localhost:4000/api/login/";
    public readonly vacationsUrl = "http://localhost:4000/api/vacations/";
    public readonly likesUrl = "http://localhost:4000/api/vacations/likes/";

    //Axios options:
    public readonly axiosOptions = {
        headers: { // Tell axios to also send the image:
            "Content-Type": "multipart/form-data" // We're sending also files.
        }
    };
}

class ProdConfig {

    // Backend urls:
    public readonly registerUrl = "http://35.162.164.30:4000/api/register/";
    public readonly loginUrl = "http://35.162.164.30:4000/api/login/";
    public readonly vacationsUrl = "http://35.162.164.30:4000/api/vacations/";
    public readonly likesUrl = "http://35.162.164.30:4000/api/vacations/likes/";

    //Axios options:
    public readonly axiosOptions = {
        headers: { // Tell axios to also send the image:
            "Content-Type": "multipart/form-data" // We're sending also files.
        }
    };
}

const appConfig = new DevConfig();
// const appConfig = new ProdConfig();
export default appConfig;
