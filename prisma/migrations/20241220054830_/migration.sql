-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PackageTranslation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "packageId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "PackageTranslation_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PackageTranslation" ("id", "language", "name", "packageId") SELECT "id", "language", "name", "packageId" FROM "PackageTranslation";
DROP TABLE "PackageTranslation";
ALTER TABLE "new_PackageTranslation" RENAME TO "PackageTranslation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
