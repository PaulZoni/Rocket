import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {CARD_WIDTH} from '../components/Card';
import {windowHeight, ScrollDistance} from '../utils';

const HEADER_MAX_HEIGHT_BOTTOM_CARD = windowHeight - ScrollDistance;
const HEADER_MIN_HEIGHT_BOTTOM_CARD = 250;
const HEADER_SCROLL_DISTANCE_BOTTOM_CARD =
  HEADER_MAX_HEIGHT_BOTTOM_CARD - HEADER_MIN_HEIGHT_BOTTOM_CARD;

const HEADER_MAX_HEIGHT_BOTTOM_TEXT = 500;
const HEADER_MIN_HEIGHT_BOTTOM_TEXT = 300;
const HEADER_SCROLL_DISTANCE_BOTTOM_TEXT =
  HEADER_MAX_HEIGHT_BOTTOM_TEXT - HEADER_MIN_HEIGHT_BOTTOM_TEXT;

interface Props {
  scrollY: Animated.Value;
  bottomTitle: string;
  topTitle: string;
}

const AnimatedBlockBottom = ({
  scrollY,
  bottomTitle,
  topTitle,
  children,
}: Props) => {
  return (
    <Animated.View
      style={[
        styles.animatedWrapperBottom,
        {
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE_BOTTOM_CARD],
                outputRange: [
                  HEADER_MAX_HEIGHT_BOTTOM_CARD,
                  HEADER_MIN_HEIGHT_BOTTOM_CARD,
                ],
                extrapolate: 'clamp',
                useNativeDriver: true,
              }),
            },
          ],
        },
      ]}>
      <View style={styles.wrapperCardContent}>
        <Animated.Text
          style={{
            alignSelf: 'center',
            marginBottom: 10,
            opacity: scrollY.interpolate({
              inputRange: [0, 20, 50],
              outputRange: [1, 0.5, 0],
              extrapolate: 'clamp',
              useNativeDriver: true,
            }),
          }}>
          {topTitle}
        </Animated.Text>
        {children}
        <Animated.Text
          style={[
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, HEADER_SCROLL_DISTANCE_BOTTOM_TEXT],
                    outputRange: [
                      HEADER_MAX_HEIGHT_BOTTOM_TEXT,
                      HEADER_MIN_HEIGHT_BOTTOM_TEXT,
                    ],
                    extrapolate: 'clamp',
                    useNativeDriver: true,
                  }),
                },
              ],
              opacity: scrollY.interpolate({
                inputRange: [0, 150, 300],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp',
                useNativeDriver: true,
              }),
            },
            styles.bottomText,
          ]}>
          {bottomTitle}
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedWrapperBottom: {
    position: 'absolute',
    top: 200,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  wrapperCardContent: {
    alignSelf: 'center',
  },
  bottomText: {
    position: 'absolute',
    bottom: 250,
    textAlign: 'center',
    width: CARD_WIDTH,
  },
});

export default AnimatedBlockBottom;
