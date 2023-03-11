import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';
import statsData from '../utils/mockStats';
import StatContainer from '../components/ui/StatContainer';
import HistoryItem from '../components/ui/HistoryItem';

export default function StatisticsScreen() {
    const [stats, setStats] = useState();
    const [correctItems, setCorrectItems] = useState();
    const [corrects, setCorrects] = useState(1);
    const [incorrects, setInorrects] = useState(1);
    const [history, setHistory] = useState(<Text>Loading...</Text>);

    // Need to fetch real stats from the server
    useEffect(() => {
        setStats(statsData);
    }, []);

    function historyHandler() {
        return (
            <FlatList
                data={correctItems}
                renderItem={(item) => (
                    <HistoryItem data={item.Date} questionCount={item.QuestionCount} character={item.Character} />
                )}
                keyExtractor={(item) => item.GameNumber}
            />
        );
    }

    // Display stats
    useEffect(() => {
        if (!stats) {
            return;
        }
        let dataLength = stats.length;
        let correctsNum = stats.filter((stat) => stat.IsCorrect).length;
        let incorrecsNum = dataLength - correctsNum;

        setCorrectItems(stats.filter((stat) => stat.IsCorrect));
        setCorrects(Math.round((correctsNum / dataLength) * 100));
        setInorrects(Math.round((incorrecsNum / dataLength) * 100));
        setHistory(historyHandler());
    }, [stats]);

    return (
        <GradientBackground>
            <ScrollView style={styles.rootContainer}>
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
                    <Text style={styles.historyHeader}>Guesses History</Text>
                    <View>{history}</View>
                </View>
            </ScrollView>
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
    },
});
