export class LoginRequest {
    public username: string;
    public password: string;

    /**
     * Constructor
     * @param username 
     * @param password 
     */
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}