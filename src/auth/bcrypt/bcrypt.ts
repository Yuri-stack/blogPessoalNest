import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class Bcrypt {

    async encryptPassword(password: string) {
        let salt: number = 10
        return await bcrypt.hash(password, salt);
    }

    async comparePassword(passwordDatabase: string, passwordTyped: string): Promise<boolean> {
        return bcrypt.compareSync(passwordTyped, passwordDatabase);
    }

}