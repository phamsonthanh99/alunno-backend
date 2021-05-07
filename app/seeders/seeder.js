import { seederRole } from './role.seeder';
import { seederUser } from './user.seeder';
import { seederClass } from './class.seeder';
import { seederSubject } from './subject.seeder';
import { seederStudent } from './student.seeder';

export async function initial() {
    await seederRole();
    await seederUser();
    await seederClass();
    await seederSubject();
    await seederStudent();
}
