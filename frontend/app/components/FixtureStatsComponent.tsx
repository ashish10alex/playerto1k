import React from 'react';
import { FaFutbol, FaClock, FaTshirt, FaStar, FaFlag, FaBullseye, FaShareAlt, FaShieldAlt, FaExchangeAlt, FaRunning, FaHandPaper, FaCaretSquareRight, FaCaretSquareLeft, FaUserFriends, FaFootballBall } from 'react-icons/fa';
import MatchItem from '../match';

interface FixtureStats {
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


const FixtureStatsComponent: React.FC<{ stats: FixtureStats }> = ({ stats }) => {
    console.log(stats);
    return (

        <div>
            <MatchItem
                key={stats?.id}
                fixtureId={stats?.id}
                homeTeam={stats?.homeTeamName}
                homeTeamLogo={stats?.homeTeamLogo}
                awayTeam={stats?.awayTeamName}
                awayTeamLogo={stats?.awayTeamLogo}
                goals={stats?.goals}
                date={isNaN(Date.parse(stats?.date)) ? new Date() : new Date(stats?.date)}
                status={stats?.status}
                onClick={() => { }}
            />

            <div className="bg-gray-100 rounded-lg p-2 w-full shadow-md">

                <StatSection title="General">
                    <StatItem icon={<FaClock />} label="Minutes" value={stats?.playerFixtureStatistics[0]?.games_minutes} />
                    <StatItem icon={<FaTshirt />} label="Number" value={stats?.playerFixtureStatistics[0]?.games_number} />
                    <StatItem icon={<FaFutbol />} label="Position" value={stats?.playerFixtureStatistics[0]?.games_position} />
                    <StatItem icon={<FaStar />} label="Rating" value={stats?.playerFixtureStatistics[0]?.games_rating} />
                    <StatItem icon={<FaFlag />} label="Captain" value={stats?.playerFixtureStatistics[0]?.games_captain ? 'Yes' : 'No'} />
                </StatSection>

                <StatSection title="Goals & Shots">
                    <StatItem icon={<FaFootballBall />} label="Goals" value={stats?.playerFixtureStatistics[0]?.goals_total || 0} />
                    <StatItem icon={<FaBullseye />} label="Shots (On Target)" value={`${stats?.playerFixtureStatistics[0]?.shots_total} (${stats?.playerFixtureStatistics[0]?.shots_on})`} />
                    <StatItem icon={<FaCaretSquareRight />} label="Penalties Scored" value={stats?.playerFixtureStatistics[0]?.penalty_scored} />
                    <StatItem icon={<FaCaretSquareLeft />} label="Penalties Missed" value={stats?.playerFixtureStatistics[0]?.penalty_missed} />
                </StatSection>

                <StatSection title="Passing">
                    <StatItem icon={<FaShareAlt />} label="Passes (accurate)" value={`${stats?.playerFixtureStatistics[0]?.passes_total} (${stats?.playerFixtureStatistics[0]?.passes_accuracy})`} />
                    <StatItem icon={<FaUserFriends />} label="Key Passes" value={stats?.playerFixtureStatistics[0]?.passes_key} />
                </StatSection>

                <StatSection title="Defensive Actions">
                    <StatItem icon={<FaShieldAlt />} label="Tackles" value={stats?.playerFixtureStatistics[0]?.tackles_total} />
                    <StatItem icon={<FaExchangeAlt />} label="Interceptions" value={stats?.playerFixtureStatistics[0]?.tackles_interceptions} />
                    <StatItem icon={<FaExchangeAlt />} label="Duels (Won)" value={`${stats?.playerFixtureStatistics[0]?.duels_total} (${stats?.playerFixtureStatistics[0]?.duels_won})`} />
                </StatSection>

                <StatSection title="Dribbling & Fouls">
                    <StatItem icon={<FaRunning />} label="Dribbles (Success)" value={`${stats?.playerFixtureStatistics[0]?.dribbles_attempts} (${stats?.playerFixtureStatistics[0]?.dribbles_success})`} />
                    <StatItem icon={<FaHandPaper />} label="Cards" value={`🟨 ${stats?.playerFixtureStatistics[0]?.cards_yellow} 🟥 ${stats?.playerFixtureStatistics[0]?.cards_red}`} />
                </StatSection>
            </div>
        </div>
    );
};

const StatSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-2">
        <h3 className="text-l font-semibold mb-3 text-gray-700">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {children}
        </div>
    </div>
);

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number | undefined }> = ({ icon, label, value }) => (
    <div className="bg-white p-3 rounded-md flex items-center shadow-sm">
        <span className="mr-3 text-blue-500">{icon}</span>
        <span className="font-semibold mr-2">{label}:</span>
        <span className="text-gray-700">{value}</span>
    </div>
);

export default FixtureStatsComponent
