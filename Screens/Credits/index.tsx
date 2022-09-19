import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import { useRecoilValue } from 'recoil'
import PurchaseAtom from '../../assets/atoms/Purchase'
import getAllBalance from '../../assets/atoms/Purchase/selectors/getAllBalance'
import getInBalance from '../../assets/atoms/Purchase/selectors/getInBalance'
import getOutBalance from '../../assets/atoms/Purchase/selectors/getOutBalance'
import COLORS from '../../Constants/styles'

import styles from './styles'

const Credits = () => {
  const [viewStatus, setViewStatus] = useState('All') //All, In, Out
  const getAll = useRecoilValue(getAllBalance)
  const getIn = useRecoilValue(getInBalance)
  const getOut = useRecoilValue(getOutBalance)

  const RenderMenuOptions = () => (
    <View style={{ height: 100, alignItems: 'center' }}>
      <View style={styles.menu}>
        <View style={[styles.rowNav, styles.bordertop, { backgroundColor: 'white' }]}>
          <View style={styles.imgContainer}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113__340.png'
              }}
              resizeMode={'cover'}
              style={styles.perfilImg}
            />
          </View>
          <View>
            <Text style={[styles.menuText]}>Account Name</Text>
            <Text style={[{ fontSize: 14, fontFamily: 'Corbel' }]}>Account Number</Text>
          </View>
        </View>
        <View
          style={[styles.rowNavCredits, styles.borderbottom, { backgroundColor: COLORS.white }]}
        >
          <View
            style={{
              width: '49.5%',
              height: '100%',
              backgroundColor: COLORS.blue,
              borderBottomLeftRadius: 10
            }}
          >
            <View style={{ alignItems: 'center', paddingTop: 4 }}>
              <Text style={{ color: 'white', fontFamily: 'Corbel', fontSize: 14 }}>Pending</Text>
              <Text style={{ color: 'white', fontFamily: 'Corbel', fontSize: 14 }}>{`00,00$`}</Text>
            </View>
          </View>
          <View
            style={{
              width: '49.5%',
              height: '100%',
              backgroundColor: COLORS.blue,
              borderBottomRightRadius: 10
            }}
          >
            <View style={{ alignItems: 'center', paddingTop: 4 }}>
              <Text style={{ color: 'white', fontFamily: 'Corbel', fontSize: 14 }}>Balance</Text>
              <Text style={{ color: 'white', fontFamily: 'Corbel', fontSize: 14 }}>{`00,00$`}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
  //   const renderItem = ({ item }: any) => (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         borderBottomWidth: 1,
  //         borderBottomColor: '#CFD5D7',
  //         justifyContent: 'space-around'
  //       }}
  //     >
  //       <View style={{ paddingVertical: 14 }}>
  //         {item?.type === 'IN' ? (
  //           <View style={styles.inContainer}>
  //             <Text style={styles.inOutText}>{`${item?.type.toString().toLowerCase()}`}</Text>
  //           </View>
  //         ) : (
  //           <View style={styles.outContainer}>
  //             <Text style={styles.inOutText}>{`${item?.type.toString().toLowerCase()}`}</Text>
  //           </View>
  //         )}
  //       </View>
  //       <View style={{ marginLeft: -40 }}>
  //         <Text style={styles.inOutText}>{`${item?.day}`}</Text>
  //         <Text style={styles.transactionText}>{`${item?.transactionName}`}</Text>
  //       </View>
  //       <Text style={[styles.transactionText]}>{`${item?.value},00$`}</Text>
  //     </View>
  //   )

  return (
    <View>
      <View style={{ height: 40 }}>
        <View style={styles.borderNav} />
      </View>
      <RenderMenuOptions />

      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TouchableOpacity onPress={() => setViewStatus('All')} style={{ width: '33.333%' }}>
          <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Corbel' }}>ALL</Text>
          <View style={[styles.line, viewStatus === 'All' ? styles.active : styles.inactive]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setViewStatus('In')} style={{ width: '33.333%' }}>
          <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Corbel' }}>IN</Text>
          <View style={[styles.line, viewStatus === 'In' ? styles.active : styles.inactive]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setViewStatus('Out')} style={{ width: '33.333%' }}>
          <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Corbel' }}>OUT</Text>
          <View style={[styles.line, viewStatus === 'Out' ? styles.active : styles.inactive]} />
        </TouchableOpacity>
      </View>
      {viewStatus === 'All' && (
        // <FlatList
        //   data={getAll}
        //   renderItem={renderItem}
        //   showsVerticalScrollIndicator={false}
        //   keyExtractor={(item, index) => `${item}@${index}`}
        //   style={{ marginBottom: 'auto' }}
        // />
        <ScrollView style={{ marginBottom: 'auto' }} showsVerticalScrollIndicator={false}>
          {getAll.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#CFD5D7',
                justifyContent: 'space-around'
              }}
            >
              <View style={{ paddingVertical: 14 }}>
                {item?.type === 'IN' ? (
                  <View style={styles.inContainer}>
                    <Text style={styles.inOutText}>{`${item?.type.toString().toLowerCase()}`}</Text>
                  </View>
                ) : (
                  <View style={styles.outContainer}>
                    <Text style={styles.inOutText}>{`${item?.type.toString().toLowerCase()}`}</Text>
                  </View>
                )}
              </View>
              <View style={{ marginLeft: -40 }}>
                <Text style={styles.inOutText}>{`${item?.day}`}</Text>
                <Text style={styles.transactionText}>{`${item?.transactionName}`}</Text>
              </View>
              <Text style={[styles.transactionText]}>{`${item?.value},00$`}</Text>
            </View>
          ))}
        </ScrollView>
      )}
      {viewStatus === 'In' && (
        // <FlatList
        //   data={getIn ?? []}
        //   renderItem={renderItem}
        //   showsVerticalScrollIndicator={false}
        //   keyExtractor={(item, index) => `${item}@${index}`}
        //   style={{ marginBottom: 'auto' }}
        // />
        <ScrollView style={{ marginBottom: 'auto' }} showsVerticalScrollIndicator={false}>
          {getIn?.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#CFD5D7',
                justifyContent: 'space-around'
              }}
            >
              <View style={{ paddingVertical: 14 }}>
                {item?.type === 'IN' ? (
                  <View style={styles.inContainer}>
                    <Text style={styles.inOutText}>{`${item?.type.toString().toLowerCase()}`}</Text>
                  </View>
                ) : (
                  <View style={styles.outContainer}>
                    <Text style={styles.inOutText}>{`${item?.type.toString().toLowerCase()}`}</Text>
                  </View>
                )}
              </View>
              <View style={{ marginLeft: -40 }}>
                <Text style={styles.inOutText}>{`${item?.day}`}</Text>
                <Text style={styles.transactionText}>{`${item?.transactionName}`}</Text>
              </View>
              <Text style={[styles.transactionText]}>{`${item?.value},00$`}</Text>
            </View>
          ))}
        </ScrollView>
      )}
      {viewStatus === 'Out' && (
        // <FlatList
        //   data={getOut ?? []}
        //   renderItem={renderItem}
        //   showsVerticalScrollIndicator={false}
        //   keyExtractor={(item, index) => `${item}@${index}`}
        //   style={{ marginBottom: 'auto' }}
        // />
        <ScrollView style={{ marginBottom: 'auto' }} showsVerticalScrollIndicator={false}>
          {getOut?.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#CFD5D7',
                justifyContent: 'space-around'
              }}
            >
              <View style={{ paddingVertical: 14 }}>
                {item?.type === 'IN' ? (
                  <View style={styles.inContainer}>
                    <Text style={styles.inOutText}>{`${item?.type.toString().toLowerCase()}`}</Text>
                  </View>
                ) : (
                  <View style={styles.outContainer}>
                    <Text style={styles.inOutText}>{`${item?.type.toString().toLowerCase()}`}</Text>
                  </View>
                )}
              </View>
              <View style={{ marginLeft: -40 }}>
                <Text style={styles.inOutText}>{`${item?.day}`}</Text>
                <Text style={styles.transactionText}>{`${item?.transactionName}`}</Text>
              </View>
              <Text style={[styles.transactionText]}>{`${item?.value},00$`}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

export default Credits
