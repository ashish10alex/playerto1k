
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


export interface FixtureStats {
    playerFixtureStatistics: [{
        playerId: number;
        fixtureId: number;
        createdAt: string;
        updatedAt: string;
        games_minutes: number;
        games_number: number;
        games_position: string;
        games_rating: string;
        games_captain: boolean;
        games_substitute: boolean;
        offsides: number;
        shots_total: number;
        shots_on: number;
        goals_total: number | null;
        goals_conceded: number;
        goals_assists: number | null;
        goals_saves: number | null;
        passes_total: number;
        passes_key: number;
        passes_accuracy: string;
        tackles_total: number;
        tackles_blocks: number | null;
        tackles_interceptions: number;
        duels_total: number;
        duels_won: number;
        dribbles_attempts: number;
        dribbles_success: number;
        dribbles_past: number;
        fouls_drawn: number | null;
        fouls_committed: number | null;
        cards_yellow: number;
        cards_red: number;
        penalty_won: number | null;
        penalty_commited: number | null;
        penalty_scored: number;
        penalty_missed: number;
        penalty_saved: number | null;
    }],
    id: number;
    date: string;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamLogo: string;
    awayTeamLogo: string;
    goals: string;
    status: string;
}

