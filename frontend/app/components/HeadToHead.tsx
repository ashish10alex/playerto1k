import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { format } from "date-fns"
import { FixturePredictionProps, MatchItemProps} from "@/types"

function FormBadge({ result }: { result: string }) {
    const color = result === 'W' ? 'bg-green-500' : result === 'D' ? 'bg-yellow-500' : 'bg-red-500';
    return <Badge className={`${color} text-white`}>{result}</Badge>;
}

const MatchItem: React.FC<MatchItemProps> = ({ fixtureId, date, competition, teams, score, status }) => {
    const parsedDate = new Date(date);
    const formattedDate = format(parsedDate, 'EEE, d MMM yy');
    const formattedTime = format(parsedDate, 'HH:mm');

    return (
        <div key={fixtureId} className="flex items-start space-x-4">
            <div className="flex flex-col items-center w-16">
                <Image src={competition.logo} alt={`${competition.name} logo`} width={24} height={24} className="mb-1" />
                <span className="text-xs text-gray-500 text-center">{competition.name}</span>
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <Image src={teams.home.logo} alt={`${teams.home.name} logo`} width={20} height={20} className="mr-2" />
                            <span className="text-sm">{teams.home.name}</span>
                        </div>
                        <div className="flex items-center mt-1">
                            <Image src={teams.away.logo} alt={`${teams.away.name} logo`} width={20} height={20} className="mr-2" />
                            <span className="text-sm">{teams.away.name}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {status === 'NS' ? (
                            <span className="text-sm mr-4"></span>
                        ) : (
                            <span className="text-sm mr-4">{score}</span>
                        )}
                        <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-500">{formattedDate}</span>
                            <span className="text-xs text-gray-500">{formattedTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Component({ competition, teams, headToHeads, potentialWinner}: FixturePredictionProps) {

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        <div className="flex justify-center items-center space-x-2">
                            <Image src={teams.home.logo} alt={teams.home.name} width={50} height={50} />
                            <span>{teams.home.name}</span>
                            <span>vs</span>
                            <span>{teams.away.name}</span>
                            <Image src={teams.away.logo} alt={teams.away.name} width={50} height={50} />
                        </div>
                    </CardTitle>

                    <div className="text-center mt-2">
                        <span className="text-sm">{new Date().toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-center mb-4">
                        <Image src={competition.logo} alt={competition.name} width={40} height={40} className="mr-2" />
                        <span className="text-lg font-semibold">{competition.name}</span>
                    </div>

                    <div className="text-center mt-2">
                        <span className="text-sm font-medium">Potential Winner: </span>
                        <span className="text-sm font-bold">{potentialWinner}</span>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="md:col-span-1 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Form</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold mb-2">{teams.home.name}</h3>
                                            <div className="flex space-x-1">
                                                {teams.home.recentForm.map((result, index) => (
                                                    <FormBadge key={index} result={result} />
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">{teams.away.name}</h3>
                                            <div className="flex space-x-1">
                                                {teams.away.recentForm.map((result, index) => (
                                                    <FormBadge key={index} result={result} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="md:row-span-2">
                                <CardHeader>
                                    <CardTitle>Recent Head-to-Head</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {headToHeads.map((match) => (
                                            <MatchItem key={match.fixtureId} {...match} />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
