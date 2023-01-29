import request from "graphql-request";
import {GET_COUNTRIES} from "@/pages/countries";
import {Country} from "@/generated/types";
import {FC} from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import Link from "next/link";


export const GET_COUNTRY = `
 query ($code: ID!) {
  country(code: $code) {
    name
    code
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}
`;

interface Props {
    country: Country;
}

const CountryPage: FC<Props> = ({country}) => {
    return (
        <div className="flex justify-center h-screen p-10">
            <div className="text-center w-full p-6 bg-white rounded-lg">
                <Link href={`/countries`}>
                    <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 mb-4 inline-block">
                        Back
                    </button>
                </Link>
                <h1 className="text-2xl font-bold">{country.name}</h1>
                <p className="text-gray-700 mt-2">Code: {country.code}</p>
                <p className="text-gray-700 mt-2">Emoji: {country.emoji}</p>
                <p className="text-gray-700 mt-2">Language: {country.languages[0].name}</p>
            </div>
        </div>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const data = await request("https://countries.trevorblades.com", GET_COUNTRIES);
    const paths = data.countries.map((country: Country) => ({
        params: {code: country.code},
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const code = context.params?.code;
    const data = await request(
        `https://countries.trevorblades.com`,
        GET_COUNTRY,
        {code: code}
    );
    console.log(data)
    return {
        props: {
            country: data.country,
        },
        revalidate: 60000,
    };
};

export default CountryPage;




