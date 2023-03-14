import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';
import StatContainer from '../components/ui/StatContainer';
import GlobStatItem from '../components/ui/GlobStatItem';
// Mock data for development:
import statsData from '../utils/mockStats';
import globData from '../utils/globData';

export default function StatisticsScreen() {
    // Personal stats
    const [personalStats, setPersonalStats] = useState();
    // Number of correcr guesses
    const [correctsNum, setCorrectsNum] = useState(1);
    // Number of incorrect guesses
    const [incorrectsNum, setInorrectsNum] = useState(1);
    // Global stats
    const [globStats, setGlobStats] = useState([]);

    useEffect(() => {
        // Need to fetch real stats from the server
        setPersonalStats(statsData);
        // Need to fetch real Global Data
        setGlobStats(globData);
    }, []);

    // Display stats
    useEffect(() => {
        if (!personalStats) {
            return;
        }

        let correctsNum = personalStats.filter((stat) => stat.IsCorrect).length;
        let incorrecsNum = personalStats.length - correctsNum;
        setCorrectsNum(Math.round((correctsNum / personalStats.length) * 100));
        setInorrectsNum(Math.round((incorrecsNum / personalStats.length) * 100));
    }, [personalStats]);

    return (
        <GradientBackground>
            <View style={styles.rootContainer}>
                <PrimaryHeader>Statistics</PrimaryHeader>
                <View style={styles.statsContainer}>
                    <StatContainer header={'Personal guesses precentage'}>
                        <View style={styles.statHeadersContainer}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[{ color: '#00649c' }, styles.statText]}>Corrects</Text>
                                <Text style={[{ color: '#00649c' }, styles.statText]}>{correctsNum}%</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={[{ color: '#9a0000' }, styles.statText]}>Incorrects</Text>
                                <Text style={[{ color: '#9a0000' }, styles.statText]}>{incorrectsNum}%</Text>
                            </View>
                        </View>
                        <View style={styles.barContainer}>
                            <View style={[{ backgroundColor: '#00649c', flex: correctsNum }, styles.barItem]}></View>
                            <View style={[{ backgroundColor: '#9a0000', flex: incorrectsNum }, styles.barItem]}></View>
                        </View>
                    </StatContainer>
                </View>
                <Text style={styles.otherStatsHeader}>Top 10 characters stats</Text>
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
        elevation: 4,
    },
    barItem: {
        height: 40,
    },
    otherStatsHeader: {
        marginVertical: 16,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
