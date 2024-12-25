-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PackageSize" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "packageId" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "sideFolds" TEXT,
    "stockQuantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "PackageSize_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PackageSize" ("id", "packageId", "price", "sideFolds", "size", "stockQuantity") SELECT "id", "packageId", "price", "sideFolds", "size", "stockQuantity" FROM "PackageSize";
DROP TABLE "PackageSize";
ALTER TABLE "new_PackageSize" RENAME TO "PackageSize";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
