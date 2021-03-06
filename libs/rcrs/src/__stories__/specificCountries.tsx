import React, { useState } from 'react';
import { CountrySelector, Provider, RegionSelector } from '@rcrs/rcrs';
import { AU, CA, US, NZ } from 'country-region-data';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const AllCountries = () => {
	const [country, setCountry] = useState("");
	const [region, setRegion] = useState("");

	return (
		<div>
			<h1>Specific Countries</h1>

			<p>
				A great way to reduce your bundle size is to only import the countries that you need to appear in
				the dropdown. The source data is from the <a href="https://github.com/country-regions/country-region-data">country-region-data</a> repo.
				If you're using typescript, you'll get typings for the available country name shortcode exports, otherwise
				look at the source repo data and look for the <code>countryShortCode</code> values in the <code>data.json</code>
				file. Those map to the named exports.
			</p>

			<h3>Demo</h3>
			<Provider value={{ countries: [AU, CA, US, NZ] }}>
				<CountrySelector value={country} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCountry(e.target.value)} />
				<RegionSelector country={country} value={region} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRegion(e.target.value)}/>
			</Provider>

			<h3>Code</h3>
			<SyntaxHighlighter language="typescript" style={atomOneDark}>{`import React, { useState } from 'react';
import { CountrySelector, Provider, RegionSelector } from 'react-country-region-data';
import { AU, CA, US, NZ } from "country-region-data";

const Example = () => {
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");

    return (
        <Provider value={{ countries: [AU, CA, US, NZ] }}>
            <CountrySelector value={country} onChange={(e) => setCountry(e.target.value)} />
            <RegionSelector country={country} value={region} onChange={(e) => setRegion(e.target.value)}/>
        </Provider>
    );
};`}</SyntaxHighlighter>
		</div>
	);
};

export default AllCountries;
