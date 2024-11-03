import React from 'react';
import { FaClock,  FaStar, FaBullseye, FaShareAlt, FaShieldAlt, FaExchangeAlt, FaRunning, FaHandPaper, FaCaretSquareRight, FaCaretSquareLeft, FaUserFriends } from 'react-icons/fa';
import { IoMdFootball } from "react-icons/io";
import MatchItem from '../match';
import { FixtureStats } from '@/types';
import Image from 'next/image';
import RatingBox from './RatingsBox';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const FixtureStatsComponent: React.FC<{ stats: FixtureStats }> = ({ stats }) => {
    return (

        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        <div className="flex justify-center items-center space-x-2">
                            <Image src={stats.homeTeamLogo} alt={stats.homeTeamName} width={50} height={50} />
                            <span>{stats?.homeTeamName}</span>
                            <span>vs</span>
                            <span>{stats?.awayTeamName}</span>
                            <Image src={stats?.awayTeamLogo} alt={stats?.awayTeamName} width={50} height={50} />
                        </div>
                    </CardTitle>

                    <div className="text-center mt-2">
                        <span className="text-sm">{new Date().toLocaleDateString()}</span>
                    </div>
                </CardHeader>
            </Card>

            <div className="rounded-lg p-2 w-full shadow-md">

                <StatSection title="General">
                    <StatItem icon={<FaClock />} label="Minutes" value={stats?.playerFixtureStatistics[0]?.games_minutes} />
                    <StatItem icon={<FaStar />} label="Rating" value={<RatingBox rating={stats?.playerFixtureStatistics[0]?.games_rating || ""} />} />
                    <StatItem icon={<FaHandPaper />} label="Cards" value={`🟨 ${stats?.playerFixtureStatistics[0]?.cards_yellow} 🟥 ${stats?.playerFixtureStatistics[0]?.cards_red}`} />
                </StatSection>

                <StatSection title="Goals & Shots">
                    <StatItem icon={<IoMdFootball />} label="Goals" value={stats?.playerFixtureStatistics[0]?.goals_total || 0} />
                    <StatItem icon={<FaBullseye />} label="Shots (On Target)" value={`${stats?.playerFixtureStatistics[0]?.shots_total} (${stats?.playerFixtureStatistics[0]?.shots_on})`} />
                    <StatItem icon={<FaCaretSquareRight />} label="Penalties Scored" value={stats?.playerFixtureStatistics[0]?.penalty_scored} />
                    <StatItem icon={<FaCaretSquareLeft />} label="Penalties Missed" value={stats?.playerFixtureStatistics[0]?.penalty_missed} />
                </StatSection>

                <StatSection title="Passing">
                    <StatItem icon={<FaShareAlt />} label="Passes (accurate)" value={`${stats?.playerFixtureStatistics[0]?.passes_total} (${stats?.playerFixtureStatistics[0]?.passes_accuracy})`} />
                    <StatItem icon={<FaUserFriends />} label="Key Passes" value={stats?.playerFixtureStatistics[0]?.passes_key} />
                    <StatItem icon={<FaRunning />} label="Dribbles (Success)" value={`${stats?.playerFixtureStatistics[0]?.dribbles_attempts} (${stats?.playerFixtureStatistics[0]?.dribbles_success || 0})`} />
                </StatSection>

                <StatSection title="Defensive Actions">
                    <StatItem icon={<FaShieldAlt />} label="Tackles" value={stats?.playerFixtureStatistics[0]?.tackles_total} />
                    <StatItem icon={<FaExchangeAlt />} label="Interceptions" value={stats?.playerFixtureStatistics[0]?.tackles_interceptions} />
                    <StatItem icon={<FaExchangeAlt />} label="Duels (Won)" value={`${stats?.playerFixtureStatistics[0]?.duels_total} (${stats?.playerFixtureStatistics[0]?.duels_won})`} />
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

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number | undefined | React.ReactNode }> = ({ icon, label, value }) => (
    <div className="bg-white p-3 rounded-md flex items-center shadow-sm hover:bg-gray-100 transition-colors duration-300">
        <span className="mr-3 text-blue-500">{icon}</span>
        <span className="font-semibold mr-2">{label}:</span>
        <span className="text-gray-700">{value}</span>
    </div>
);

export default FixtureStatsComponent
