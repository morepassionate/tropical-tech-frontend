import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import COLORS from '../../Constants/styles'
import { hotelbedImg } from '../../Constants/styles'

type GalleryProps = {
  imagesArray?: string[]
}
const GridGalleryImages: React.FC<GalleryProps> = (props) => {
  const { imagesArray } = props
  return (
    <>
      {!!imagesArray && imagesArray?.length < 5 ? (
        <View style={styles.flexImgs}>
          <Image style={styles.firstImage} source={{ uri: `${hotelbedImg}${imagesArray[0]}` }} />
          <View style={styles.column60}>
            <Image style={styles.secondImage} source={{ uri: `${hotelbedImg}${imagesArray[1]}` }} />
            <View style={styles.row100}>
              <Image
                style={styles.thirdImage}
                source={{ uri: `${hotelbedImg}${imagesArray[2]}` }}
              />
              <Image
                style={styles.fourtyImage}
                source={{ uri: `${hotelbedImg}${imagesArray[3]}` }}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.flexImgs}>
          <Image style={styles.firstImage} source={{ uri: `${hotelbedImg}${imagesArray?.[0]}` }} />
          <View style={styles.column60}>
            <Image
              style={styles.secondImage}
              source={{ uri: `${hotelbedImg}${imagesArray?.[1]}` }}
            />
            <View style={styles.row100}>
              <Image
                style={styles.thirdImage}
                source={{ uri: `${hotelbedImg}${imagesArray?.[2]}` }}
              />
              <View style={styles.fourtyImage}>
                <TouchableOpacity style={styles.moreBackground}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.moreText}>{`${
                      !!imagesArray && imagesArray?.length - 4
                    }`}</Text>
                    <Text style={styles.more}>+</Text>
                  </View>
                </TouchableOpacity>
                <Image
                  style={styles.imgMore}
                  source={{ uri: `${hotelbedImg}${imagesArray?.[3]}` }}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  )
}
const styles = StyleSheet.create({
  flexImgs: {
    width: '100%',
    height: 160,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 40,
    marginTop: 10,
    alignContent: 'space-between',
    marginHorizontal: 5
  },
  firstImage: {
    height: '100%',
    width: '39%',
    borderRadius: 12,
    marginRight: '1%'
  },
  secondImage: {
    height: '49%',
    width: '100%',
    borderRadius: 12,
    marginLeft: '1%',
    marginBottom: '1%'
  },
  thirdImage: {
    height: '49%',
    width: '49%',
    borderRadius: 12,
    marginHorizontal: '1%',
    marginTop: '1%'
  },
  fourtyImage: {
    height: '49%',
    width: '49%',
    borderRadius: 12,
    marginHorizontal: '1%',
    marginTop: '1%'
  },
  column60: {
    flexDirection: 'column',
    width: '60%'
  },
  row100: {
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  moreBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: COLORS.primary80,
    opacity: 0.9,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  moreText: {
    fontSize: 30,
    fontFamily: 'Corbel',
    color: 'white'
  },
  more: {
    fontSize: 20,
    fontFamily: 'Corbel',
    color: 'white'
  },
  imgMore: {
    width: '100%',
    height: '100%',
    borderRadius: 12
  }
})

export default GridGalleryImages
