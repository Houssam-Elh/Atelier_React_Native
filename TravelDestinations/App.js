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
        title: 'Matterhorn',
        image: 'https://media.viacation.com/blogs/c5bc83609f70c322d8017.webp',
        country: 'Switzerland',
    },
    {
        id: '2',
        title: 'Prague Castle',
        image: 'https://cdn-imgix.headout.com/media/images/f0d43fdf48a2b735da4ae08016f0e626-This%20is%20a%20Photograph%20of%20Prague%20Castle.jpg',
        country: 'Czechia',
    },
    {
        id: '3',
        title: 'Santorini',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80',
        country: 'Greece',
    },
    {
        id: '4',
        title: 'Big Ben',
        image: 'https://res.cloudinary.com/aenetworks/image/upload/c_fill,w_1200,h_630,g_auto,dpr_auto,f_auto,q_auto:eco/v1/this-day-in-history-05-31-1859-big-ben-in-london',
        country: 'UK',
    },
    {
        id: '5',
        title: 'Sagrada Familia',
        image: 'https://c.files.bbci.co.uk/03DB/production/_97778900_df00cf9e-2d5a-4cf8-8961-480156a86e5c.jpg',
        country: 'Spain',
    },
    {
        id: '6',
        title: 'Neuschwanstein Castle',
        image: 'https://www.radiustours.com/wp-content/uploads/sites/1996/2023/11/neuschwanstein-castle-day-trip.webp?w=700&h=700&zoom=2',
        country: 'Germany',
    },
    {
        id: '7',
        title: 'Acropolis',
        image: 'https://cdn.britannica.com/99/255999-159-73560D25/Parthenon-temple-at-the-Acropolis-of-Athens-Greece-built-5th-century-BC.jpg',
        country: 'Greece',
    },
    {
        id: '8',
        title: 'Amalfi Coast',
        image: 'https://www.ontheluce.com/wp-content/uploads/2022/06/Amalfi-Coast-1440x900.jpg',
        country: 'Italy',
    },
    {
        id: '9',
        title: 'Plitvice Lakes',
        image: 'https://travelwithneweyes.com/wp-content/uploads/2022/08/20210905_114428-min.jpg',
        country: 'Croatia',
    },
    {
        id: '10',
        title: 'Tromso Fjords',
        image: 'https://images.musement.com/cover/0158/41/tromso-fjords-adobestock-260508056-jpeg_header-15740437.jpg',
        country: 'Norway',
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
