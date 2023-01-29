import {GetStaticProps} from "next";
import {request} from "graphql-request";
import {Country} from "@/generated/types";
import {FC} from "react";
import Link from "next/link";

export const GET_COUNTRIES = `
  query {
    countries {
      name
      code
    }
  }
`;

interface Props {
    countries: Country[];
}


const CountriesPage: FC<Props> = ({countries}) => {
    return (
        <div className="flex justify-center p-10 h-screen">
            <div className="text-center w-full">
                <div className="flex justify-center gap-3">
                    <Link href={`/`}>
                        <button
                            className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 mb-4 inline-block">
                            Back
                        </button>
                    </Link>
                    <h1 className="text-2xl font-bold">List of
                    Countries
                    </h1>
                </div>
                <ul className="flex flex-wrap gap-5 mt-8 p-5">
                    {countries.map((country) => (
                        <li key={country.code} className="mt-4">
                            <Link as={`/countries/${country.code}`}
                                  href={`countries/[code]`}>
                                <button
                                    className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600">
                                    {country.name} ({country.code})
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


export const getStaticProps: GetStaticProps<Props> = async () => {
    const data = await request("https://countries.trevorblades.com", GET_COUNTRIES);
    return {
        props: {
            countries: data.countries,
        },
        revalidate: 60000,
    };
};


export default CountriesPage;
