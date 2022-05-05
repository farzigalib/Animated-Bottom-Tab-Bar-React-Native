import React, { useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { styles } from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Tab1 from './Screen/Tab1';
import Tab2 from './Screen/Tab2';
import Tab3 from './Screen/Tab3';
import Tab4 from './Screen/Tab4';

const Tab = createBottomTabNavigator();

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -24 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -24 },
  1: { scale: 1, translateY: 7 },
};

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = (props) => {
  const { onPress, lableText, iconName, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 4,
            borderColor: '#fff',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animatable.View
            ref={circleRef}
            style={{
              ...StyleSheet.absoluteFillObject,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#637aff',
              borderRadius: 25,
            }}
          />
          <FontAwesome
            name={iconName}
            size={30}
            color={focused ? '#900' : '#000'}
            style={{
              position: "absolute",
            }}
          />
        </View>
        <Animatable.Text
          ref={textRef}
          style={{
            fontSize: 15,
            textAlign: 'center',
            color: '#900',
          }}>
          {lableText}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === "android" ? 75 : 85,
            backgroundColor: '#ffffff',
            elevation: 0,
          },
        }}>
        <Tab.Screen
          name="Tab1"
          component={Tab1}
          options={({ navigation }) => ({
            tabBarLabel: 'Tab1',
            tabBarButton: (props) => (
              <TabButton
                iconName="home"
                lableText="Home"
                onPress={() => navigation.navigator('Tab1')}
                {...props}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Tab2"
          component={Tab2}
          options={({ navigation }) => ({
            tabBarLabel: 'Tab2',
            tabBarButton: (props) => (
              <TabButton
                iconName="lock"
                lableText="Drives"
                onPress={() => navigation.navigator('Tab2')}
                {...props}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Tab3"
          component={Tab3}
          options={({ navigation }) => ({
            tabBarLabel: 'Tab3',
            tabBarButton: (props) => (
              <TabButton
                iconName="user"
                lableText="Alert"
                onPress={() => navigation.navigator('Tab3')}
                {...props}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Tab4"
          component={Tab4}
          options={({ navigation }) => ({
            tabBarLabel: 'Tab4',
            tabBarButton: (props) => (
              <TabButton
                iconName="bolt"
                lableText="UpSkill"
                onPress={() => navigation.navigator('Tab4')}
                {...props}
              />
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
