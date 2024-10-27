
import React from 'react';
import { ComboboxComponent } from './combobox';

let ronaldoId = 874
let portugalId = 27

let playerId = ronaldoId
let nationId = portugalId

//TODO: Fetch player data from API
let playerData = {
    name: "Cristiano Ronaldo",
    team: "Al Nassr",
    teamLogo: "https://media.api-sports.io/football/teams/2939.png",
    dateOfBirth: "5 Feb 1985",
    height: 187,
    preferredFoot: "Right",
    shirtNumber: 7,
    photoUrl: `https://media.api-sports.io/football/players/${playerId}.png`,
    nationLogo: `https://media.api-sports.io/football/teams/${nationId}.png`,
    goals: 5,
    assists: 2,
    matchesPlayed: 5,
    age: 39,
    nationality: "Portugal",
    position: "Forward",
}

export const SofaPlayerEmbed = () => {
    return (
            <div className="max-w-[730px] w-full">
            <ComboboxComponent className="w-full mb-2" />

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 flex items-center border-b">
                    <img
                        src={playerData.photoUrl}
                        alt={playerData.name}
                        className="w-24 h-24 rounded-full mr-4"
                    />
                    <h2 className="text-2xl font-bold">{playerData.name}</h2>
                </div>

                <div className="p-4 flex items-center border-b">
                    <img
                        src={playerData.teamLogo}
                        alt={playerData.team}
                        className="w-8 h-8 mr-2"
                    />
                    <span className="font-semibold">Current club: {playerData.team}</span>
                </div>

                <div className="p-4 grid grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <span className="text-gray-600">Nationality</span>
                        <div className="flex items-center">
                            <img
                                src={playerData.nationLogo}
                                alt={playerData.nationality}
                                className="w-6 h-6 mr-1"
                            />
                            <span className="font-semibold">{playerData.nationality}</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-600">Date of Birth</span>
                        <span className="font-semibold">{playerData.dateOfBirth}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-600">Age</span>
                        <span className="font-semibold">{playerData.age} yrs</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-600">Height</span>
                        <span className="font-semibold">{playerData.height} cm</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-600">Preferred foot</span>
                        <span className="font-semibold">{playerData.preferredFoot}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-600">Position</span>
                        <span className="font-semibold">{playerData.position}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-600">Shirt number</span>
                        <span className="font-semibold">{playerData.shirtNumber}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SofaPlayerEmbed;
