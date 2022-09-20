import React, { useState } from 'react'
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import EditICon from '../../assets/icons/Edit'
import COLORS from '../../Constants/styles'
import styles from './styles'
import { useRecoilState } from 'recoil'
import AuthStatus from '../../assets/atoms/AuthStatus'

const Account = ({ navigation }: any) => {
  const [viewStatus, setViewStatus] = useState('Rewards')
  const [detailsOrSecurity, setDetailsOrSecurity] = useState('Details')
  const [authStatus, setAuthStatus] = useRecoilState(AuthStatus)
  const [isEditing, setIsEditing] = useState(true)
  const mockInput = [
    { title: 'First name', placeholder: 'User' },
    { title: 'Last name', placeholder: 'Name' },
    { title: 'Address line 1', placeholder: 'Line 1' },
    { title: 'Address line 2', placeholder: 'Line 2' },
    { title: 'State/ Province/ Region', placeholder: 'Brazil' },
    { title: 'City/ Town', placeholder: 'Brazilia' },
    { title: 'Postal/ Zip code', placeholder: '72000000' }
  ]

  const RenderMenuOptions = () => (
    <View style={{ height: 100, alignItems: 'center' }}>
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => setViewStatus('Details')}
          activeOpacity={0.9}
          style={[
            styles.rowNav,
            styles.bordertop,
            viewStatus === 'Details'
              ? { backgroundColor: COLORS.blue }
              : { backgroundColor: 'white' }
          ]}
        >
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
            <Text
              style={[
                styles.menuText,
                viewStatus === 'Details' ? { color: 'white' } : { color: COLORS.primary90 }
              ]}
            >
              Personal details
            </Text>
            <Text
              style={[
                { fontSize: 14, fontFamily: 'Corbel' },
                viewStatus === 'Details' ? { color: 'white' } : { color: COLORS.primary90 }
              ]}
            >
              Name Surname
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewStatus('Rewards')}
          activeOpacity={0.9}
          style={[
            styles.rowNav,
            styles.borderbottom,
            viewStatus === 'Rewards'
              ? { backgroundColor: COLORS.blue }
              : { backgroundColor: 'white' }
          ]}
        >
          <Text
            style={[
              styles.menuText,
              viewStatus === 'Rewards' ? { color: 'white' } : { color: COLORS.primary90 }
            ]}
          >
            Rewards and Wallet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  const RenderNotLoggedOptions = () => (
    <View style={{ height: 50, alignItems: 'center', marginBottom: 100 }}>
      <View style={styles.menuLogout}>
        <TouchableOpacity
          onPress={() => setViewStatus('Rewards')}
          activeOpacity={0.9}
          style={[
            styles.rowNav,
            styles.borderbottom,
            viewStatus === 'Rewards'
              ? { backgroundColor: COLORS.blue }
              : { backgroundColor: 'white' }
          ]}
        >
          <Text
            style={[
              styles.menuText,
              viewStatus === 'Rewards' ? { color: 'white' } : { color: COLORS.primary90 }
            ]}
          >
            Rewards and Wallet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  return (
    <ScrollView>
      <View style={{ height: 40 }}>
        <View style={styles.borderNav} />
      </View>
      {authStatus?.isAuthenticated ? <RenderMenuOptions /> : <RenderNotLoggedOptions />}

      {viewStatus === 'Rewards' && (
        <>
          {authStatus?.isAuthenticated && (
            <>
              <View
                style={[
                  styles.rowContent,
                  {
                    marginHorizontal: 40,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }
                ]}
              >
                <IconButton
                  icon={'eye-off'}
                  size={20}
                  color={COLORS.primary}
                  style={styles.notMargin}
                />

                <View style={[styles.rowContent, { alignItems: 'center' }]}>
                  <Text
                    style={{
                      fontFamily: 'Corbel',
                      fontSize: 18,
                      color: COLORS.primary90,
                      marginRight: 15
                    }}
                  >
                    Currency
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Corbel',
                      fontSize: 18,
                      color: COLORS.primary90
                    }}
                  >
                    $
                  </Text>
                  <IconButton
                    icon={'chevron-down'}
                    size={20}
                    color={COLORS.primary90}
                    style={styles.notMargin}
                  />
                </View>
              </View>

              <Image
                source={require('../../assets/img/cardAccount.png')}
                resizeMode={'cover'}
                style={{ height: 200, width: '100%', alignSelf: 'center' }}
              />
            </>
          )}
          {authStatus?.isAuthenticated && (
            <Button
              mode={'contained'}
              style={[styles.buttonStyle, { marginTop: 40 }]}
              onPress={() => navigation.navigate('Credits')}
            >
              View credits
            </Button>
          )}
          <Button
            mode={'contained'}
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('ManagePayment')}
          >
            Payment Method
          </Button>
          <Button mode={'contained'} style={styles.buttonStyle}>
            Customer Support
          </Button>
          {authStatus?.isAuthenticated ? (
            <Button
              mode={'contained'}
              style={styles.logout}
              onPress={() => setAuthStatus({ isAuthenticated: false })}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              mode={'contained'}
              style={styles.logout}
              onPress={() => navigation.navigate('LoginRegisterFlow')}
            >
              Sign In
            </Button>
          )}
        </>
      )}
      {viewStatus === 'Details' && (
        <>
          <View style={styles.rowContent}>
            <View style={styles.completedMenu}>
              <TouchableOpacity
                onPress={() => setDetailsOrSecurity('Details')}
                style={[
                  { borderBottomWidth: 5 },
                  detailsOrSecurity === 'Details'
                    ? { borderBottomColor: COLORS.blue }
                    : { borderBottomColor: '#CFD5D7' }
                ]}
              >
                <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Corbel' }}>
                  DETAILS
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.completedMenu}>
              <TouchableOpacity
                onPress={() => setDetailsOrSecurity('Security')}
                style={[
                  { borderBottomWidth: 5 },
                  detailsOrSecurity === 'Security'
                    ? { borderBottomColor: COLORS.blue }
                    : { borderBottomColor: '#CFD5D7' }
                ]}
              >
                <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Corbel' }}>
                  SECURITY
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {detailsOrSecurity === 'Details' && (
            <View style={{ marginHorizontal: 40 }}>
              <View style={{ marginTop: 15 }} />
              {!isEditing ? (
                <TouchableOpacity
                  onPress={() => setIsEditing(!isEditing)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'rgba(27, 102, 253, 0.5) 100%)',
                      paddingVertical: 2,
                      paddingHorizontal: 8,
                      borderRadius: 12
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Corbel',
                        fontSize: 16,
                        color: COLORS.blue
                      }}
                    >
                      Save
                    </Text>
                    <IconButton
                      icon={'check-circle-outline'}
                      size={15}
                      color={COLORS.blue}
                      style={styles.notMargin}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setIsEditing(!isEditing)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16, color: COLORS.blue }}>
                    Edit
                  </Text>
                  <EditICon />
                </TouchableOpacity>
              )}
              <View
                style={{
                  borderWidth: 1.5,
                  borderColor: COLORS.primary,
                  borderRadius: 12
                }}
              >
                <TextInput
                  mode={'flat'}
                  outlineColor={'transparent'}
                  activeOutlineColor={'transparent'}
                  placeholder={'Username'}
                  placeholderTextColor={'black'}
                  underlineColor={'transparent'}
                  activeUnderlineColor={'transparent'}
                  disabled={isEditing}
                  style={[
                    styles.inputBlue,
                    styles.container,
                    { marginTop: 20, fontWeight: 'bold' }
                  ]}
                />
                {mockInput.map((item, index) => (
                  <View style={styles.container} key={index}>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: 'Corbel',
                        color: COLORS.primary90,
                        marginTop: 15,
                        marginBottom: 5
                      }}
                    >
                      {item.title}
                    </Text>
                    <TextInput
                      mode={'flat'}
                      outlineColor={'transparent'}
                      activeOutlineColor={'transparent'}
                      placeholder={item.placeholder}
                      style={styles.input}
                      underlineColor={'transparent'}
                      activeUnderlineColor={'transparent'}
                    />
                  </View>
                ))}
                <View style={styles.container}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Corbel',
                      color: COLORS.primary90,
                      marginTop: 15,
                      marginBottom: 5
                    }}
                  >
                    {`Phone number`}
                  </Text>
                  <TextInput
                    mode={'flat'}
                    outlineColor={'transparent'}
                    activeOutlineColor={'transparent'}
                    placeholder={'+55 00 00000-9999'}
                    style={styles.input}
                    underlineColor={'transparent'}
                    activeUnderlineColor={'transparent'}
                  />
                </View>
                <View style={styles.container}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Corbel',
                      color: COLORS.primary90,
                      marginTop: 15,
                      marginBottom: 5
                    }}
                  >
                    {`E-mail address`}
                  </Text>
                  <TextInput
                    mode={'flat'}
                    outlineColor={'transparent'}
                    activeOutlineColor={'transparent'}
                    placeholder={'User email'}
                    style={[styles.input, { marginBottom: 30 }]}
                    underlineColor={'transparent'}
                    activeUnderlineColor={'transparent'}
                  />
                </View>
              </View>
            </View>
          )}
          {detailsOrSecurity === 'Security' && (
            <View style={{ marginHorizontal: 40 }}>
              <View style={{ marginTop: 15 }} />
              {!isEditing ? (
                <TouchableOpacity
                  onPress={() => setIsEditing(!isEditing)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'rgba(27, 102, 253, 0.5) 100%)',
                      paddingVertical: 2,
                      paddingHorizontal: 8,
                      borderRadius: 12
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Corbel',
                        fontSize: 16,
                        color: COLORS.blue
                      }}
                    >
                      Save
                    </Text>
                    <IconButton
                      icon={'check-circle-outline'}
                      size={15}
                      color={COLORS.blue}
                      style={styles.notMargin}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setIsEditing(!isEditing)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16, color: COLORS.blue }}>
                    Edit
                  </Text>
                  <EditICon />
                </TouchableOpacity>
              )}
              <View
                style={{
                  borderWidth: 1.5,
                  borderColor: COLORS.primary,
                  borderRadius: 12
                }}
              >
                <View style={styles.container}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Corbel',
                      color: COLORS.primary90,
                      marginTop: 15,
                      marginBottom: 5
                    }}
                  >
                    {`Password`}
                  </Text>
                  <TextInput
                    mode={'flat'}
                    outlineColor={'transparent'}
                    activeOutlineColor={'transparent'}
                    // placeholder={'+55 00 00000-9999'}
                    style={styles.input}
                    underlineColor={'transparent'}
                    activeUnderlineColor={'transparent'}
                  />
                </View>
                <View style={styles.container}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Corbel',
                      color: COLORS.primary90,
                      marginTop: 15,
                      marginBottom: 5
                    }}
                  >
                    {`Password confirmation`}
                  </Text>
                  <TextInput
                    mode={'flat'}
                    outlineColor={'transparent'}
                    activeOutlineColor={'transparent'}
                    // placeholder={'+55 00 00000-9999'}
                    style={styles.input}
                    underlineColor={'transparent'}
                    activeUnderlineColor={'transparent'}
                  />
                </View>
                <View style={styles.container}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Corbel',
                      color: COLORS.primary90,
                      marginTop: 15,
                      marginBottom: 5
                    }}
                  >
                    {`Question 1`}
                  </Text>
                  <TextInput
                    mode={'flat'}
                    outlineColor={'transparent'}
                    activeOutlineColor={'transparent'}
                    placeholder={'Selected question'}
                    placeholderTextColor={'white'}
                    style={[styles.inputBlue]}
                    underlineColor={'transparent'}
                    activeUnderlineColor={'transparent'}
                    right={<TextInput.Icon name={'chevron-right'} color={'white'} />}
                  />
                </View>
                <View style={styles.container}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Corbel',
                      color: COLORS.primary90,
                      marginTop: 15,
                      marginBottom: 5
                    }}
                  >
                    {`Answer`}
                  </Text>
                  <TextInput
                    mode={'flat'}
                    outlineColor={'transparent'}
                    activeOutlineColor={'transparent'}
                    // placeholder={'+55 00 00000-9999'}
                    style={styles.input}
                    underlineColor={'transparent'}
                    activeUnderlineColor={'transparent'}
                  />
                </View>
                <View style={styles.container}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Corbel',
                      color: COLORS.primary90,
                      marginTop: 15,
                      marginBottom: 5
                    }}
                  >
                    {`Question 2`}
                  </Text>
                  <TextInput
                    mode={'flat'}
                    outlineColor={'transparent'}
                    activeOutlineColor={'transparent'}
                    placeholder={'Selected question'}
                    placeholderTextColor={'white'}
                    style={[styles.inputBlue]}
                    underlineColor={'transparent'}
                    activeUnderlineColor={'transparent'}
                    right={<TextInput.Icon name={'chevron-right'} color={'white'} />}
                  />
                </View>
                <View style={styles.container}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Corbel',
                      color: COLORS.primary90,
                      marginTop: 15,
                      marginBottom: 5
                    }}
                  >
                    {`Answer`}
                  </Text>
                  <TextInput
                    mode={'flat'}
                    outlineColor={'transparent'}
                    activeOutlineColor={'transparent'}
                    // placeholder={'+55 00 00000-9999'}
                    style={styles.input}
                    underlineColor={'transparent'}
                    activeUnderlineColor={'transparent'}
                  />
                </View>

                <View style={{ marginHorizontal: 30 }}>
                  <Text style={{ marginTop: 18 }}>Uploaded documentation:</Text>
                  <View
                    style={[
                      styles.rowContent,
                      { alignItems: 'center', justifyContent: 'space-between' }
                    ]}
                  >
                    <Text style={styles.text12}>PROOF OF ADDRESS DOCUMENT</Text>
                    <TouchableOpacity>
                      <Text style={styles.text11}>Remove</Text>
                      <IconButton
                        icon={'close-circle-outline'}
                        size={24}
                        color={COLORS.primary}
                        style={styles.notMargin}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      styles.rowContent,
                      { alignItems: 'center', justifyContent: 'space-between' }
                    ]}
                  >
                    <Text style={styles.text12}>ID DOCUMENT</Text>
                    <TouchableOpacity>
                      <Text style={styles.text11}>Remove</Text>
                      <IconButton
                        icon={'close-circle-outline'}
                        size={24}
                        color={COLORS.primary}
                        style={styles.notMargin}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        </>
      )}
    </ScrollView>
  )
}

export default Account
