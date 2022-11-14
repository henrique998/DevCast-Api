-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "publishedAt" TEXT NOT NULL
);
INSERT INTO "new_episodes" ("description", "duration", "id", "members", "publishedAt", "slug", "thumbnail", "title", "type", "url") SELECT "description", "duration", "id", "members", "publishedAt", "slug", "thumbnail", "title", "type", "url" FROM "episodes";
DROP TABLE "episodes";
ALTER TABLE "new_episodes" RENAME TO "episodes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
