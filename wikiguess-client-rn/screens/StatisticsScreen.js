import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';
import statsData from '../utils/mockStats';
import globData from '../utils/mockStats';
import StatContainer from '../components/ui/StatContainer';
import HistoryItem from '../components/ui/HistoryItem';

export default function StatisticsScreen() {
    const [stats, setStats] = useState();
    const [correctStats, setCorrectStats] = useState([]);
    const [corrects, setCorrects] = useState(1);
    const [incorrects, setInorrects] = useState(1);
    const [history, setHistory] = useState(<Text>Loading...</Text>);

    // Need to fetch real stats from the server
    useEffect(() => {
        setStats(statsData);
    }, []);

    // Display stats
    useEffect(() => {
        if (!stats) {
            return;
        }
        setCorrectStats(stats.filter((stat) => stat.IsCorrect));
        let dataLength = stats.length;
        let correctsNum = stats.filter((stat) => stat.IsCorrect).length;
        let incorrecsNum = dataLength - correctsNum;
        setCorrects(Math.round((correctsNum / dataLength) * 100));
        setInorrects(Math.round((incorrecsNum / dataLength) * 100));
    }, [stats]);

    return (
        <GradientBackground>
            <View style={styles.rootContainer}>
                <PrimaryHeader>Statistics</PrimaryHeader>
                <View style={styles.statsContainer}>
                    <StatContainer header={'Personal guesses precentage'}>
                        <View style={styles.statHeadersContainer}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[{ color: '#00649c' }, styles.statText]}>Corrects</Text>
                                <Text style={[{ color: '#00649c' }, styles.statText]}>{corrects}%</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[{ color: '#9a0000' }, styles.statText]}>Incorrects</Text>
                                <Text style={[{ color: '#9a0000' }, styles.statText]}>{incorrects}%</Text>
                            </View>
                        </View>
                        <View style={styles.barContainer}>
                            <View style={[{ backgroundColor: '#00649c', flex: corrects }, styles.barItem]}></View>
                            <View style={[{ backgroundColor: '#9a0000', flex: incorrects }, styles.barItem]}></View>
                        </View>
                    </StatContainer>
                </View>
                <Text style={styles.historyHeader}>Guesses History</Text>
                <FlatList
                    data={correctStats}
                    renderItem={(itemData) => {
                        return <HistoryItem date={itemData.item.Date} questionCount={itemData.item.QuestionCount} character={itemData.item.Character} />;
                    }}
                    keyExtractor={(item) => item.GameNumber}
                />
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    statsContainer: {
        alignItems: 'center',
    },
    statHeadersContainer: {
        flexDirection: 'row',
    },
    statText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    barContainer: {
        borderRadius: 16,
        flexDirection: 'row',
        margin: 10,
        overflow: 'hidden',
    },
    barItem: {
        height: 40,
    },
    historyHeader: {
        marginVertical: 10,
        fontSize: 21,
        textAlign: 'center',
    },
});
