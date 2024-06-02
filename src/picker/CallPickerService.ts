import axios from "axios";

export class CallPickerService {
    private readonly host: string
    
    constructor() {
        this.host = process.env.PICKER_HOST;
        if (this.host === undefined) this.host = "localhost"
    }

    async callService(path: string) {
        // console.log("Calling the picker service...");
        axios.get(`http://${this.host}:3000/api/picker/${path}`)
            .then(response => {
                // Process the response data
                // console.log(response.data);
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    }

    async startPeriodicCalls(range: number, path: string) {
        await this.callService(path);

        setInterval(async () => {
            await this.callService(path);
        }, range);
    }
}
