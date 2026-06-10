import bcrypt from 'bcrypt'; 

const salt = 10;

export const hashPassword = async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    const isValid = await bcrypt.compare(password, hash);
    return isValid; 
}