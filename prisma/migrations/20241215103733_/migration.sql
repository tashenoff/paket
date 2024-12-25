-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Package" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "quantityPerBox" INTEGER NOT NULL,
    "polyethylene" TEXT NOT NULL,
    "thickness" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sideFoldsSize" TEXT NOT NULL,
    "hasSideFolds" BOOLEAN NOT NULL,
    "hasPrint" BOOLEAN NOT NULL,
    "packing" TEXT NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "price" REAL NOT NULL DEFAULT 0.0,
    "volume" REAL NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT
);
INSERT INTO "new_Package" ("color", "description", "dimensions", "hasPrint", "hasSideFolds", "id", "imageUrl", "name", "packing", "polyethylene", "quantityPerBox", "sideFoldsSize", "size", "stockQuantity", "thickness", "volume", "weight") SELECT "color", "description", "dimensions", "hasPrint", "hasSideFolds", "id", "imageUrl", "name", "packing", "polyethylene", "quantityPerBox", "sideFoldsSize", "size", "stockQuantity", "thickness", "volume", "weight" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
