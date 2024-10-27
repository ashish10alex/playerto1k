
export interface Fixture {
    id: number;
    season: number;
    date: string;
    homeTeamId: number;
    homeTeamName: string;
    homeTeamLogo: string;
    awayTeamId: number;
    awayTeamName: string;
    awayTeamLogo: string;
    goals: string;
    statusShort: string;
    players?: any[];
}

