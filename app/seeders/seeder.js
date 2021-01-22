import { seederRole } from './role.seeder';
import { seederUser } from './user.seeder';

export async function initial() {
    await seederRole();
    await seederUser();
}
