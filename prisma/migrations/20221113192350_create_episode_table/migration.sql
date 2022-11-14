-- CreateTable
CREATE TABLE "episode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "thumbnail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "members" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "publishedAt" DATETIME NOT NULL
);
