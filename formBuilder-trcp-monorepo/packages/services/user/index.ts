import { randomBytes, createHmac } from 'node:crypto';
import { type CreateUserWithEmailAndPasswordInputType, createUserWithEmailAndPasswordInput } from "./model";
import { db, eq } from '@repo/database';
import { usersTable } from '@repo/database/models/user';

export class UserService {
    private async getUserByEmail(email: string) {
        const result = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (!result || result.length === 0)
            return null;
        return result[0];
    }

    public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordInputType) {
        const { fullName, email, password } = await createUserWithEmailAndPasswordInput.parseAsync(payload);

        // Check if user is already existing or not
        const existingUserWithEmail = await this.getUserByEmail(email);
        if (existingUserWithEmail)
            throw new Error(`User with ${email} email already exists`);

        // calculate salt and hash the password
        const salt = randomBytes(16).toString('hex');
        const hash = createHmac('sha256', salt).update(password).digest('hex');

        const userInsertResult = await db.insert(usersTable).values({ email, fullName, password: hash, salt }).returning({
            id: usersTable.id
        })
        
        if(!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id)
            throw new Error('something went wrong while creating a user');

        return {
            id: userInsertResult[0]?.id
        }
    }
}