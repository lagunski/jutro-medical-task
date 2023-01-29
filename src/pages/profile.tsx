import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import Link from "next/link";

const GET_Country = gql`
    {
        country(code: "PL") {
            name
            code
        }
    }
`;

function ProfilePage() {
    const {data, loading, error} = useQuery(GET_Country);

    if (loading) return <p className="text-center p-5">Loading...</p>;
    if (error) return <p className="text-center p-5">Error: {error.message}</p>;

    const {name, code} = data.country;

    return (
        <div className="flex justify-center h-screen p-10">
            <div className="flex gap-5 justify-center text-center w-full p-6">
                <Link href={`/countries`}>
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 mb-4 inline-block">
                        Back
                    </button>
                </Link>
                <Link as={`/countries/${code}`} href={`countries/[code]`}>
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 inline-block">
                        {name} ({code})
                    </button>
                </Link>
            </div>
        </div>
    );
}


export default ProfilePage;
