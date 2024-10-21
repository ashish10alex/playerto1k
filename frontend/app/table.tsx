import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface TeamStat {
    response: {
        form: string;
        team: {
            name: string;
        };
    };
}

async function getPosts(teamId: number): Promise<TeamStat | null> {
    const response = await fetch(`/api/get_team_stat?team_id=${teamId}`)
    let output = await response.json()
    return output as TeamStat
}

const resultToHex = (result: string) => {
    return result
        .slice(-5) // Take only the last 5 characters
        .split('')
        .map(r => {
            switch (r.toLowerCase()) {
                case 'w':
                    return '&#x2705;'; // Green checkmark for win
                case 'l':
                    return '&#10060;'; // Red cross for loss
                case 'd':
                    return '&#x1F7E1;'; // Yellow circle for draw
                default:
                    return ''; // Return empty string for any unexpected character
            }
        }).join(' ');
}

export function TableComponent() {

    const teamOneId = 2939
    const teamTwoId = 2932

    const [teamOne, setTeamOne] = useState<TeamStat>({ response: { form: '', team: { name: 'one' } } })
    const [teamTwo, setTeamTwo] = useState<TeamStat>({ response: { form: '', team: { name: 'two' } } })

    useEffect(() => {
        getPosts(teamOneId).then(data => {
            if (data) setTeamOne(data)
        })
        getPosts(teamTwoId).then(data => {
            if (data) setTeamTwo(data)
        })

    }, [])

    let teamData = [
        {
            name: teamOne.response.team.name,
            result: teamOne.response.form,
        },
        {
            name: teamTwo.response.team.name,
            result: teamTwo.response.form,
        },
    ]

    return (
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Team</TableHead>
                    <TableHead>Last 5</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {teamData.map((team) => (
                    <TableRow key={team.name}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>
                            <span dangerouslySetInnerHTML={{ __html: resultToHex(team.result) }} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
