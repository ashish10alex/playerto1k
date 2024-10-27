-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "injured" BOOLEAN NOT NULL DEFAULT false,
    "nationality" TEXT NOT NULL,
    "photo" TEXT,
    "totalGoals" TEXT NOT NULL,
    "seasons" INTEGER[],
    "teamIds" TEXT[],
    "currentTeamId" INTEGER NOT NULL,
    "currentTeamName" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "form" TEXT NOT NULL,
    "playerIds" TEXT[],

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fixture" (
    "id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "homeTeamLogo" TEXT NOT NULL,
    "awayTeamLogo" TEXT NOT NULL,
    "statusShort" TEXT NOT NULL,
    "playerIds" INTEGER[],

    CONSTRAINT "Fixture_pkey" PRIMARY KEY ("id")
);
