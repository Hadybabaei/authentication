/*
  Warnings:

  - You are about to drop the `ChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatRoomToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "_ChatRoomToUsers" DROP CONSTRAINT "_ChatRoomToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatRoomToUsers" DROP CONSTRAINT "_ChatRoomToUsers_B_fkey";

-- DropTable
DROP TABLE "ChatRoom";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "_ChatRoomToUsers";
