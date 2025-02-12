import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

const hashedPassword = await bcrypt.hash('123456', 10);

async function main() {
    console.log("Seeding database...");

    // Create Specializations
    const specializations = await prisma.specialization.createMany({
        data: Array.from({ length: 5 }).map(() => ({
            name: faker.word.noun(),
            description: faker.lorem.sentence(),
        })),
    });

    const specializationIds = await prisma.specialization.findMany({ select: { id: true } });

    // Create Users
    const users = await Promise.all(
        Array.from({ length: 10 }).map(() =>
            prisma.user.create({
                data: {
                    email: faker.internet.email(),
                    encryptedPassword: hashedPassword,
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    username: faker.internet.userName(),
                    phone: faker.phone.number(),
                    gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
                    specializationId: faker.helpers.arrayElement(specializationIds).id,
                },
            })
        )
    );

    // Create Addresses
    const addresses = await Promise.all(
        Array.from({ length: 5 }).map(() =>
            prisma.address.create({
                data: {
                    address1: faker.location.streetAddress(),
                    city: faker.location.city(),
                    state: faker.location.state(),
                    pincode: faker.location.zipCode(),
                },
            })
        )
    );

    // Create Coaches
    const coaches = await Promise.all(
        Array.from({ length: 5 }).map(() =>
            prisma.coach.create({
                data: {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    phone: faker.phone.number(),
                    bio: faker.lorem.paragraph(),
                    gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
                    experienceYear: faker.number.int({ min: 1, max: 20 }),
                    hourlyRate: faker.finance.amount(20, 100, 2),
                    address: { connect: { id: faker.helpers.arrayElement(addresses).id } },
                    specialization: { connect: { id: faker.helpers.arrayElement(specializationIds).id } },
                },
            })
        )
    );

    // Create Appointments
    await Promise.all(
        Array.from({ length: 10 }).map(() =>
            prisma.appointment.create({
                data: {
                    name: faker.lorem.words(3),
                    from: faker.date.future(),
                    to: faker.date.future(),
                    duration: faker.number.float({ min: 0.5, max: 3, precision: 0.1 }),
                    mode: faker.helpers.arrayElement(["Online", "In-Person"]),
                    starts: faker.date.future(),
                    ends: faker.date.future(),
                    user: { connect: { id: faker.helpers.arrayElement(users).id } },
                    coach: { connect: { id: faker.helpers.arrayElement(coaches).id } },
                },
            })
        )
    );

    // Create Feedback
    await Promise.all(
        Array.from({ length: 10 }).map(() =>
            prisma.feedback.create({
                data: {
                    rating: faker.number.int({ min: 1, max: 5 }),
                    description: faker.lorem.sentences(2),
                    user: { connect: { id: faker.helpers.arrayElement(users).id } },
                    coach: { connect: { id: faker.helpers.arrayElement(coaches).id } },
                },
            })
        )
    );

    // Create Payment History
    await Promise.all(
        Array.from({ length: 5 }).map(() =>
            prisma.paymentHistory.create({
                data: {
                    transactionId: faker.string.uuid(),
                    mode: faker.helpers.arrayElement(["Credit Card", "PayPal", "UPI"]),
                    status: faker.helpers.arrayElement(["Pending", "Completed", "Failed"]),
                    user: { connect: { id: faker.helpers.arrayElement(users).id } },
                    coach: { connect: { id: faker.helpers.arrayElement(coaches).id } },
                },
            })
        )
    );

    console.log("Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
