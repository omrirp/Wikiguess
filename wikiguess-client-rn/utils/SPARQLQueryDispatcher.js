export default class SPARQLQueryDispatcher {
    constructor(additions = '', minuses = '') {
        this.endpoint = `SELECT ?item ?itemLabel ?genderLabel ?dateOfDeath ?age
        (GROUP_CONCAT(DISTINCT ?occupationLabel; SEPARATOR=",") AS ?occupation) 
        (GROUP_CONCAT(DISTINCT ?countryOfCitizenshipLabel; SEPARATOR=",") AS ?countryOfCitizenship) ?death ?articles ?dateOfBirth
        (GROUP_CONCAT(DISTINCT ?residenceLabel; SEPARATOR=",") AS ?residence)
        (GROUP_CONCAT(DISTINCT ?ethnicGroupLabel; SEPARATOR=", ") AS ?ethnicGroup)
        
        # Politician exclusive
        (GROUP_CONCAT(DISTINCT ?academinDegreeLabel; SEPARATOR=",") AS ?academinDegree)
        # Musicians exclusive
        (GROUP_CONCAT(DISTINCT ?genreLabel; SEPARATOR=", ") AS ?genre)
        (GROUP_CONCAT(DISTINCT ?fieldOfWorkLabel; SEPARATOR=", ") AS ?fieldOfWork)
        # TV actors exclusive
        (GROUP_CONCAT(DISTINCT ?eyeColorLabel; SEPARATOR=", ") AS ?eyeColor)
        (GROUP_CONCAT(DISTINCT ?hairColorLabel; SEPARATOR=", ") AS ?hairColor)
         
        {
           ?item wdt:P31 wd:Q5;
                      # ===== Add here all the addition properties => wdt:P wd:Q; =====                    
                    ${additions}
                      # =====
                   
                       wdt:P21 ?gender;
                       wdt:P27 ?countryOfCitizenship;
                       wdt:P106 ?occupation;
                       
                       wikibase:sitelinks ?articles . 
          # ===== Add here all the not properties => MINUS {?item wdt:P wd:Q} =====
          ${minuses}
          # =====
          optional{ ?item wdt:P570 ?death.}
          optional{?item wdt:P569 ?dateOfBirth}
          optional{?item wdt:P570 ?dateOfDeath .}
          optional{?item wdt:P172 ?ethnicGroup .}
          optional{?item wdt:P551 ?residence .}
          # Politician exclusive
          optional{?item wdt:P512 ?academinDegree .}
          # Musicians exclusive
          optional{?item wdt:P136 ?genre .}
          optional{?item wdt:P101 ?fieldOfWork .}
          # TV actors exclusive
          optional{?item wdt:P101 ?fieldOfWork}
          optional{?item wdt:P1340 ?eyeColor}
          optional{?item wdt:P1884 ?hairColor}
        
          bind(year(?dateOfDeath)-year(?dateOfBirth) as ?deathAge)
          bind(year(xsd:dateTime(now()))-year(?dateOfBirth) as ?age)
          hint:Prior hint:rangeSafe true .
           SERVICE wikibase:label {
               bd:serviceParam wikibase:language "en" .
             ?item rdfs:label ?itemLabel .
             ?gender rdfs:label ?genderLabel .
             ?occupation rdfs:label ?occupationLabel .
             ?countryOfCitizenship rdfs:label ?countryOfCitizenshipLabel .
             ?residence rdfs:label ?residenceLabel .
             ?ethnicGroup rdfs:label ?ethnicGroupLabel .
             
             # Politician exclusive
             ?academinDegree rdfs:label ?academinDegreeLabel .
             # Musicians exclusive
             ?genre rdfs:label ?genreLabel .
             ?fieldOfWork rdfs:label ?fieldOfWorkLabel .
             # TV actors exclusive
             ?eyeColor rdfs:label ?eyeColorLabel .
             ?hairColor rdfs:label ?hairColorLabel .
                            
           } .
        } 
        GROUP BY ?item ?itemLabel ?genderLabel ?death ?articles ?dateOfBirth ?dateOfDeath  ?deathAge ?age 
        ORDER BY DESC (?articles)
        LIMIT 50`;
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

const oldQuery = `SELECT distinct ?item ?itemLabel ?genderLabel ?occupationLabel ?imageLabel ?militaryRankLabel
?countryLabel ?death ?articles ?dateOfBirth 
?residenceLabel ?militaryUnitLabel
?dateOfDeath ?deathAge ?age
{
?item wdt:P31 wd:Q5;
    wdt:P106 wd:Q82955;
    wdt:P27 wd:Q801;
    
    # Add here all the addition properties => wdt:P wd:Q
   
    wdt:P21 ?gender;
    wdt:P27 ?target_country;
    wdt:P27 ?country;
    wdt:P106 ?occupation;
    wdt:P551 ?residence;
    wikibase:sitelinks ?articles . 
# Add here all the not properties => MINUS {?item wdt:P wd:Q}

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
