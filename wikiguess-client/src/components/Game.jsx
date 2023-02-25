import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const dataJason = [
    { name: 'avi', age: 28, grade: 85, gender: 'male' },
    { name: 'beny', age: 27, grade: 90, gender: 'male' },
    { name: 'shmulik', age: 27, grade: 96, gender: 'male' },
    { name: 'rivka', age: 25, grade: 80, gender: 'female' },
    { name: 'mazal', age: 28, grade: 85, gender: 'female' },
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

    // Deside what unique value to use for renderind the question
    // Inputs:
    // data- the fetched data from the server
    // key- the attribute name with the minimum entropy value
    function decision(data, key) {
        let probabilities = {};

        // Find the probabilities for each of the unique values within the
        // Result for probabilities- {unique valeu: probability, ...}
        for (let i = 0; i < data.length; i++) {
            if (!probabilities[data[i][key]]) {
                probabilities[data[i][key]] = data.filter((o) => o[key] === data[i][key]).length / data.length;
            }
        }

        // Find the unique value that will be to closest to cut the data to 50%
        let probKeys = Object.keys(probabilities);
        let toAsk;
        let cut = 1;
        probKeys.forEach((p) => {
            let calc = Math.abs(probabilities[p] - 0.5);
            if (cut > calc) {
                cut = calc;
                toAsk = p;
            }
        });

        return toAsk;
    }

    useEffect(() => {
        let entropyArr = calculateEntropy(data);
        let [minKey, minVal] = findMin(entropyArr);
        let toAsk = decision(data, minKey);

        setQuestion('Is you charectar ' + minKey + ' is ' + toAsk + '?');
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
