import * as admin from 'firebase-admin'
import {userAId, userBId, userCId} from './mock'

export default class TestAdminAuthRepository {
    constructor(readonly adminAuth: admin.auth.Auth) {
    }

    async fetchUserRecord(userId: string): Promise<admin.auth.UserRecord> {
        return await this.adminAuth.getUser(userId)
    }

    async fetchUserARecord(): Promise<admin.auth.UserRecord> {
        return this.fetchUserRecord(userAId)
    }

    async setupUsers(): Promise<void> {
        await this.adminAuth.createUser({uid: userAId})
        await this.adminAuth.createUser({uid: userBId})
        await this.adminAuth.createUser({uid: userCId})
    }

    async deleteUsers(): Promise<void> {
        const users = await this.adminAuth.listUsers()
        await this.adminAuth.deleteUsers(users.users.map(user => user.uid))
    }
}
