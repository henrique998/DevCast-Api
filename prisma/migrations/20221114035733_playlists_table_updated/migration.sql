/*
  Warnings:

  - Added the required column `slug` to the `playlists` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_playlists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coverImage" TEXT,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_playlists" ("coverImage", "createdAt", "description", "id", "name") SELECT "coverImage", "createdAt", "description", "id", "name" FROM "playlists";
DROP TABLE "playlists";
ALTER TABLE "new_playlists" RENAME TO "playlists";
CREATE TABLE "new_episodes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "thumbnail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "members" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "publishedAt" TEXT NOT NULL,
    "playlistId" TEXT,
    CONSTRAINT "episodes_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_episodes" ("description", "duration", "id", "members", "publishedAt", "slug", "thumbnail", "title", "type", "url") SELECT "description", "duration", "id", "members", "publishedAt", "slug", "thumbnail", "title", "type", "url" FROM "episodes";
DROP TABLE "episodes";
ALTER TABLE "new_episodes" RENAME TO "episodes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
