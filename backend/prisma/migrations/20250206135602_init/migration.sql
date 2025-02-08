-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "address1" TEXT,
    "address2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "mode" TEXT NOT NULL,
    "starts" TIMESTAMP(3) NOT NULL,
    "ends" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "coachId" INTEGER NOT NULL,
    "specializationId" INTEGER,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "issuedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "issuedBy" TEXT,
    "issuerUrl" TEXT,
    "certificationType" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coach" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "bio" TEXT,
    "gender" TEXT,
    "experienceYear" INTEGER,
    "hourlyRate" DECIMAL(65,30),
    "paymentPlanId" INTEGER,
    "availableTimeFrom" TIMESTAMP(3),
    "availableTimeTo" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 0,
    "specializationId" INTEGER,
    "addressesId" INTEGER,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "coachId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "isAnnouncement" BOOLEAN NOT NULL,
    "sessionLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "coachId" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentPlan" (
    "id" SERIAL NOT NULL,
    "coachId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "durationFrom" TIMESTAMP(3) NOT NULL,
    "durationTo" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Specialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuccessStory" (
    "id" SERIAL NOT NULL,
    "coachId" INTEGER NOT NULL,
    "feedbackId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuccessStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "encryptedPassword" TEXT NOT NULL,
    "resetPasswordToken" TEXT,
    "resetPasswordSentAt" TIMESTAMP(3),
    "rememberCreatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "username" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "bio" TEXT,
    "gender" TEXT,
    "specializationId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CertificationToCoach" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CertificationToCoach_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coach_email_key" ON "Coach"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_resetPasswordToken_key" ON "User"("resetPasswordToken");

-- CreateIndex
CREATE INDEX "_CertificationToCoach_B_index" ON "_CertificationToCoach"("B");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_addressesId_fkey" FOREIGN KEY ("addressesId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentPlan" ADD CONSTRAINT "PaymentPlan_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuccessStory" ADD CONSTRAINT "SuccessStory_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuccessStory" ADD CONSTRAINT "SuccessStory_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationToCoach" ADD CONSTRAINT "_CertificationToCoach_A_fkey" FOREIGN KEY ("A") REFERENCES "Certification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationToCoach" ADD CONSTRAINT "_CertificationToCoach_B_fkey" FOREIGN KEY ("B") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;
