
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const teamData = [
    {
        name: "INV001",
        result: "w, w, w, w, w",
    },
    {
        name: "INV002",
        result: "l, l, w, w, w",
    },
]

const resultToHex = (result: string) => {
    return result.split(', ').map(r => r === 'w' ? '&#x2705;' : '&#10060;').join(' ');
};

console.log(resultToHex('w, w, w, w, w'));



export function TableComponent() {
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
