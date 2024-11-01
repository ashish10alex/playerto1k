-- AddForeignKey
ALTER TABLE "PlayerFixtureStatistic" ADD CONSTRAINT "PlayerFixtureStatistic_fixtureId_fkey" FOREIGN KEY ("fixtureId") REFERENCES "Fixture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
