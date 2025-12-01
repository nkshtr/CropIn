const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agri-advisory');
        console.log('MongoDB Connected');

        const adminExists = await User.findOne({ email: 'admin@agriadvisor.com' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const adminUser = await User.create({
            name: 'System Admin',
            email: 'admin@agriadvisor.com',
            password: 'admin123', // Will be hashed by pre-save hook
            role: 'admin',
            location: {
                address: 'Headquarters',
                coordinates: [77.1025, 28.7041] // Delhi
            }
        });

        console.log('Admin user created successfully');
        console.log('Email: admin@agriadvisor.com');
        console.log('Password: admin123');

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
