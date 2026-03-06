import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    FlatList,
    SafeAreaView,
    StatusBar
} from 'react-native';

const DATA = [
    {
        id: '1',
        title: 'Eiffel Tower',
        image: 'https://images.unsplash.com/photo-1543305177-3e4b1029cffb?auto=format&fit=crop&w=400&q=80',
        country: 'France',
    },
    {
        id: '2',
        title: 'Colosseum',
        image: 'https://images.unsplash.com/photo-1575540306637-2309ec9e11fb?auto=format&fit=crop&w=400&q=80',
        country: 'Italy',
    },
    {
        id: '3',
        title: 'Statue of Liberty',
        image: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=400&q=80',
        country: 'USA',
    },
    {
        id: '4',
        title: 'Mount Fuji',
        image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=400&q=80',
        country: 'Japan',
    },
    {
        id: '5',
        title: 'Machu Picchu',
        image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=400&q=80',
        country: 'Peru',
    },
];

const WelcomeBanner = () => (
    <ScrollView style={styles.bannerContainer}>
        <Image
            source={{ uri: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80' }}
            style={styles.bannerImage}
        />
        <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Explore the World</Text>
            <Text style={styles.bannerDescription}>
                Discover amazing places, create unforgettable memories, and travel without limits.
            </Text>
        </View>
    </ScrollView>
);

const DestinationItem = ({ title, image, country }) => (
    <View style={styles.cardContainer}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={styles.badgeContainer}>
                <Text style={styles.cardCountry}>{country}</Text>
            </View>
        </View>
    </View>
);

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DestinationItem
                        title={item.title}
                        image={item.image}
                        country={item.country}
                    />
                )}
                ListHeaderComponent={<WelcomeBanner />}
                contentContainerStyle={styles.listContentArea}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
    },
    listContentArea: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    bannerContainer: {
        marginBottom: 24,
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    bannerImage: {
        width: '100%',
        height: 200,
    },
    bannerTextContainer: {
        padding: 20,
        alignItems: 'center',
    },
    bannerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 8,
        textAlign: 'center',
    },
    bannerDescription: {
        fontSize: 15,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 22,
    },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    cardImage: {
        width: '100%',
        height: 180,
    },
    cardInfo: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A202C',
        flex: 1,
    },
    badgeContainer: {
        backgroundColor: '#EBF4FF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginLeft: 10,
    },
    cardCountry: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#3182CE',
    },
});
