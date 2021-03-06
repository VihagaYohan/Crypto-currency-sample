import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    LogBox
} from 'react-native';

// constants
import { SIZES, COLORS, FONTS, icons, dummyData, images } from '../constants'

// components
import { PriceAlert,TransactionHistory } from '../components'

const Home = ({ navigation }) => {
    const [trending, setTrending] = useState(dummyData.trendingCurrencies)
    const [transactionHistory, setTransactionHistory] = useState(dummyData.transactionHistory)

    useEffect(()=>{
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    },[])

    function renderHeader() {

        // trending component
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity style={{
                    width: 180,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    marginLeft: index == 0 ? SIZES.padding : 0,
                    marginRight: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: COLORS.white
                }} onPress={()=>navigation.navigate("CryptoDetail",{
                    currency:item
                })}>
                    {/* currency */}
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image source={item.image}
                                resizeMode="cover"
                                style={{
                                    marginTop: 5,
                                    width: 25,
                                    height: 25
                                }} />
                        </View>

                        <View style={{ marginLeft: SIZES.base }}>
                            <Text style={{ ...FONTS.h2 }}>{item.currency}</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>{item.code}</Text>
                        </View>
                    </View>

                    {/* values */}
                    <View style={{ marginTop: SIZES.radius }}>
                        <Text style={{ ...FONTS.h2 }}>${item.amount}</Text>
                        <Text style={{ color: item.type == "I" ? COLORS.green : COLORS.red, ...FONTS.h3 }}>{item.changes}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{
                width: '100%',
                height: 290,
                ...styles.shadow
            }}>
                <ImageBackground style={{
                    flex: 1,
                    alignItems: 'center'
                }} source={images.banner}>
                    {/* header bar */}
                    <View style={{
                        marginTop: SIZES.padding * 2,
                        width: '100%',
                        alignItems: 'flex-end',
                        paddingHorizontal: SIZES.padding
                    }}>
                        <TouchableOpacity style={{
                            width: 35,
                            height: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }} onPress={() => console.log('Notification pressed')}>
                            <Image source={icons.notification_white}
                                resizeMode="contain"
                                style={{ flex: 1 }} />
                        </TouchableOpacity>
                    </View>

                    {/* balance */}
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Your Portfolio Balance</Text>
                        <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.h1 }}>${dummyData.portfolio.balance}</Text>
                        <Text style={{
                            color: COLORS.white, ...FONTS.body5
                        }}>{dummyData.portfolio.changes} Last 24 hours</Text>
                    </View>

                    {/* tranding */}
                    <View style={{
                        position: 'absolute',
                        bottom: '-30%'
                    }}>
                        <Text style={{ marginLeft: SIZES.padding, color: COLORS.white, ...FONTS.h2 }}>Trending</Text>
                        <FlatList contentContainerStyle={{ marginTop: SIZES.base }}
                            data={trending}
                            keyExtractor={item => `${item.id}`}
                            renderItem={renderItem}
                            horizontal
                            showsHorizontalScrollIndicator={false} />

                    </View>
                </ImageBackground>
            </View>
        )
    }

    const renderAlert = () => {
        return (
            <PriceAlert />
        )
    }

    const renderNotice = () => {
        return (
            <View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.secondary,
                ...styles.shadow
            }}>
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Investment Safety</Text>
                <Text style={{
                    color: COLORS.white, ...FONTS.body4, marginTop: SIZES.base,
                    lineHeight: 18
                }}>It's very difficult time to an Investment,
                    especially when the market is volatile. Learn how to use the dolloar cost averging to your advantage.
                </Text>

                <TouchableOpacity style={{
                    marginTop: SIZES.base
                }} onPress={() => console.log('Learn more')}>
                    <Text style={{ textDecorationLine: 'underline', color: COLORS.green, ...FONTS.h3 }}>Learn More</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderTransactionHistory = ()=>{
        return(
            <TransactionHistory 
            customContainerStyle={{...styles.shadow}}
            history={transactionHistory}/>
        )
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, paddingBottom: 130 }}>
                {renderHeader()}

                {renderAlert()}

                {renderNotice()}

                {renderTransactionHistory()}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default Home;