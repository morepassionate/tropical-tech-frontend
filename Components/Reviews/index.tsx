import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import COLORS from '../../Constants/styles'

type ReviewsProps = {
  user?: string
  userImage?: string
  dateOfPost?: string
  comment?: string
}
const Reviews: React.FC<ReviewsProps> = (props) => {
  const { comment, dateOfPost, user, userImage } = props
  return (
    <View style={styles.container}>
      <View style={styles.topInfos}>
        <Image source={{ uri: userImage }} resizeMode={'cover'} style={styles.imgStyle} />
        <View>
          <Text style={styles.userText}>{`User`}</Text>
          <Text style={styles.dateText}>{`August 2021`}</Text>
        </View>
      </View>
      <Text style={styles.comment}>{`Comment, Comment, Comment`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.75,
    borderRadius: 8,
    borderColor: COLORS.primary90,
    maxHeight: 234,
    maxWidth: 234
  },
  topInfos: {
    flexDirection: 'row',
    padding: 17,
    alignItems: 'center'
  },
  imgStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 16
  },
  userText: {
    fontSize: 18,
    fontFamily: 'Corbel'
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Corbel',
    color: COLORS.primary70
  },
  comment: {
    paddingHorizontal: 17,
    paddingBottom: 17
  }
})

export default Reviews
