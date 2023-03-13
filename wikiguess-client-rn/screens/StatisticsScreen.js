import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';
import statsData from '../utils/mockStats';
import globData from '../utils/globData';
import StatContainer from '../components/ui/StatContainer';
import GlobStatItem from '../components/ui/GlobStatItem';

export default function StatisticsScreen() {
    const [stats, setStats] = useState();
    const [globStats, setGlobStats] = useState([]);
    const [corrects, setCorrects] = useState(1);
    const [incorrects, setInorrects] = useState(1);

    // Need to fetch real stats from the server
    useEffect(() => {
        setStats(statsData);
        // Need to fetch real Global Data
        setGlobStats(globData);
    }, []);

    // Display stats
    useEffect(() => {
        if (!stats) {
            return;
        }

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
                <Text style={styles.historyHeader}>top 10 characters stats</Text>
                <FlatList
                    data={globStats}
                    renderItem={(itemData) => {
                        return <GlobStatItem character={itemData.item.character} avgQuestionCount={itemData.item.avgQuestionCount} />;
                    }}
                    keyExtractor={(item, key) => item.character}
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
