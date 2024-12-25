-- CreateTable
CREATE TABLE "Package" (
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
    "volume" REAL NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT
);
