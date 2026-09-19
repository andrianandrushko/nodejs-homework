export class ApiError extends Error {
    message;
    status;
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
        this.status = status;
    }
}
//# sourceMappingURL=api.error.js.map