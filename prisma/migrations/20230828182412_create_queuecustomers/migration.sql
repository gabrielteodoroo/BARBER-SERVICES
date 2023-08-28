-- CreateTable
CREATE TABLE "queuecustomer" (
    "id" SERIAL NOT NULL,
    "queueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "isAwaiting" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "queuecustomer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "queuecustomer" ADD CONSTRAINT "queuecustomer_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "queues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
