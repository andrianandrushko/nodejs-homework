
export interface IOldPassword {
    _userId: string;
    password: string;
    currentHash: string;
    newPassword: string;
    createdAt: Date;
    updatedAt: Date;
}
