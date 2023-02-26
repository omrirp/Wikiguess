import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const dataJason = [
    { name: 'avi', age: 28, grade: 90, gender: 'male' },
    { name: 'dani', age: 25, grade: 90, gender: 'male' },
    { name: 'benny', age: 27, grade: 90, gender: 'male' },
    { name: 'shmulik', age: 26, grade: 85, gender: 'male' },
    { name: 'rivka', age: 25, grade: 70, gender: 'female' },
    { name: 'mazal', age: 28, grade: 95, gender: 'female' },
];

export default function Game() {
    let [questionNum, setQuestionNum] = useState(1);
    let [question, setQuestion] = useState('');
    let [data, setData] = useState(dataJason);

    function calculateEntropy(objects) {
        // create an object to store the entropy values for each field
        const entropyValues = {};

        // iterate over the array of objects
        for (const object of objects) {
            // iterate over the properties of each object
            for (const [field, value] of Object.entries(object)) {
                // calculate the entropy for the field
                const uniqueValues = new Set(objects.map((o) => o[field]));
                let entropy = 0;
                for (const val of uniqueValues) {
                    const probability = objects.filter((o) => o[field] === val).length / objects.length;
                    entropy -= probability * Math.log2(probability);
                }

                // add the entropy value for the field to the entropyValues object
                entropyValues[field] = entropy;
            }
        }

        return entropyValues;
    }

    // Find the attribute with the minimum entropy value
    function findMin(objArray) {
        let keys = Object.keys(objArray);
        let min = 100;
        let res;
        keys.forEach((k) => {
            if (objArray[k] < min) {
                res = [k, objArray[k]];
            }
        });
        return res;
    }

    // Decide what unique value to use for renderind the question
    function decision() {
        let probabilities = {};
        // Asumeing all object have the same attributes
        let keys = Object.keys(data[0]);

        // Iterating on every key (column) in the data
        keys.forEach((key) => {
            // Find the probabilities for each of the unique value in the data
            for (let i = 0; i < data.length; i++) {
                if (!probabilities[data[i][key]]) {
                    let probability = data.filter((o) => o[key] === data[i][key]).length / data.length;
                    probabilities[data[i][key]] = { probability, key };
                }
            }
        });
        // Result for probabilities- {unique valeu: probability, ...}
        console.log(probabilities);

        // Find the unique value that will be closest to cut the data to 50%
        // meaning |probability(value)-0.5| will give the minimum result
        let probKeys = Object.keys(probabilities);
        let toAsk;
        let cut = 1;
        probKeys.forEach((p) => {
            let calc = Math.abs(probabilities[p].probability - 0.5);
            if (cut > calc) {
                cut = calc;
                toAsk = [probabilities[p].key, p];
            }
        });
        // Result for toAsk- [name of the key, name of the unique value]
        return toAsk;
    }

    useEffect(() => {
        //let entropyObj = calculateEntropy(data);
        let [key, value] = decision();
        setQuestion('is you charectar ' + key + ' is ' + value + '?');
    }, [data]);

    return (
        <div>
            <div
                style={{
                    height: 350,
                    width: 350,
                    backgroundColor: '#00649c',
                    margin: 'auto',
                    marginTop: 50,
                    fontSize: 60,
                    borderRadius: 10,
                }}
            >
                LOGO
            </div>

            <div style={{ fontSize: 40, height: 150 }}>
                <span>{questionNum}. </span> <span>{question}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', height: 150 }} className='links btns'>
                <Button variant='success'>Yes</Button>
                <Button variant='danger'>No</Button>
                <Button variant='warning'>Dont know</Button>
            </div>
            <div>
                <Link to={'/menu'} style={{ fontSize: 25 }}>
                    end game
                </Link>
            </div>
        </div>
    );
}
