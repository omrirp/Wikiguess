export default class SPARQLQueryDispatcher {
    constructor(additions = '', nots = '') {
        this.endpoint = `SELECT distinct ?item ?itemLabel ?genderLabel ?occupationLabel ?imageLabel ?militaryRankLabel
        ?countryLabel ?death ?articles ?dateOfBirth 
        ?residenceLabel ?militaryUnitLabel
        ?dateOfDeath ?deathAge ?age
    {
        ?item wdt:P31 wd:Q5;
            wdt:P106 wd:Q82955;
            wdt:P27 wd:Q801;
            
            # Add here all the addition properties => wdt:P wd:Q
            ${additions}
            wdt:P21 ?gender;
            wdt:P27 ?target_country;
            wdt:P27 ?country;
            wdt:P106 ?occupation;
            wdt:P551 ?residence;
            wikibase:sitelinks ?articles . 
        # Add here all the not properties => MINUS {?item wdt:P wd:Q}
        ${nots}
        
        optional{?item wdt:P570 ?death.}
        optional{?item wdt:P7779 ?militaryUnit.}
        optional{?item wdt:P569 ?dateOfBirth}
        optional{?item wdt:P570 ?dateOfDeath .}
        optional{?item wdt:P18 ?image .}
        optional{?item wdt:P410 ?militaryRank .}
        bind(year(?dateOfDeath)-year(?dateOfBirth) as ?deathAge)
        bind(year(xsd:dateTime(now()))-year(?dateOfBirth) as ?age)
        SERVICE wikibase:label {
            bd:serviceParam wikibase:language "en".
        }
    } 
    ORDER BY DESC (?articles)`;
    }

    async query() {
        const fullUrl = 'https://query.wikidata.org/sparql' + '?query=' + encodeURIComponent(this.endpoint);
        const headers = { Accept: 'application/sparql-results+json' };

        const response = await fetch(fullUrl, { headers });
        const data = await response.json();

        const results = data.results.bindings
            .filter((binding) => binding.item != null) // filter out empty objects
            .map((binding) => {
                const result = {};
                for (const key in binding) {
                    result[key] = binding[key].value;
                }
                return result;
            });

        return results;
    }
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `SELECT distinct ?item ?itemLabel ?genderLabel  ?occupationLabel ?imageLabel ?militaryRankLabel
?countryLabel ?death ?articles ?dateOfBirth 
?residenceLabel ?militaryUnitLabel
?dateOfDeath  ?deathAge ?age
{
?item wdt:P31 wd:Q5;
wdt:P106 wd:Q82955;
wdt:P27 wd:Q801;
wdt:P21 ?gender;
wdt:P27 ?target_country;
wdt:P27 ?country;
wdt:P106 ?occupation;
wdt:P551 ?residence;
wikibase:sitelinks ?articles . 
optional{ ?item wdt:P570 ?death.}
optional{?item  wdt:P7779 ?militaryUnit.}
optional{?item wdt:P569 ?dateOfBirth}
optional{?item wdt:P570 ?dateOfDeath .}
optional{?item wdt:P18 ?image .}
optional{?item wdt:P410 ?militaryRank .}

bind(year(?dateOfDeath)-year(?dateOfBirth) as ?deathAge)
bind(year(xsd:dateTime(now()))-year(?dateOfBirth) as ?age)

SERVICE wikibase:label {
bd:serviceParam wikibase:language "en" .
?item rdfs:label ?itemLabel .
?gender rdfs:label ?genderLabel .
?occupation rdfs:label ?occupationLabel .
?country rdfs:label ?countryLabel .
?residence rdfs:label ?residenceLabel .
?militaryUnit rdfs:label ?militaryUnitLabel .
?image rdfs:label ?imageLabel.
?militaryRank rdfs:label ?militaryRankLabel.
} .
} ORDER BY DESC (?articles)`;

const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
queryDispatcher.query(sparqlQuery).then((results) => setData(results));
