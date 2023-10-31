-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "middle_name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "verification_code" TEXT,
    "verified_status" BOOLEAN DEFAULT false,
    "verification_expire_time" TIMESTAMP(3),
    "country" TEXT,
    "country_tag" TEXT,
    "phone_number" TEXT,
    "last_login" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_number_key" ON "Users"("phone_number");
