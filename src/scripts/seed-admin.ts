import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const adminAccounts = [
    {
        email: 'admin1@cuddlecart.com',
        password: 'Admin@123',
        name: 'Admin One',
        phoneNumber: '+1234567890',
        role: 'admin' as const,
    },
    {
        email: 'admin2@cuddlecart.com',
        password: 'Admin@123',
        name: 'Admin Two',
        phoneNumber: '+1234567891',
        role: 'admin' as const,
    },
];

async function seedAdmins() {
    try {
        await dbConnect();
        console.log('Connected to database');

        for (const admin of adminAccounts) {
            // Check if admin already exists
            const existingAdmin = await User.findOne({ email: admin.email });

            if (existingAdmin) {
                console.log(`Admin ${admin.email} already exists, skipping...`);
                continue;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(admin.password, 10);

            // Create admin user
            try {
                const newAdmin = await User.create({
                    email: admin.email,
                    password: hashedPassword,
                    name: admin.name,
                    phoneNumber: admin.phoneNumber,
                    role: admin.role,
                });

                console.log(`✓ Created admin account: ${newAdmin.email}`);
            } catch (err: any) {
                if (err.code === 11000) {
                    console.log(`Admin ${admin.email} already exists (duplicate key), skipping...`);
                } else {
                    throw err;
                }
            }
        }

        console.log('\n✓ Admin seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admins:', error);
        process.exit(1);
    }
}

seedAdmins();
