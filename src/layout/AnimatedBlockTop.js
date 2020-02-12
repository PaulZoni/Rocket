import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {CARD_HEIGHT} from '../index';
import {CARD_WIDTH} from '../components/Card';
import {windowHeight} from '../utils';

const topMargin = windowHeight / 5;

const HEADER_MAX_HEIGHT_TOP_TEXT = 100;
const HEADER_MIN_HEIGHT_TOP_TEXT = 30;
const HEADER_SCROLL_DISTANCE_TOP_TEXT =
  HEADER_MAX_HEIGHT_TOP_TEXT - HEADER_MIN_HEIGHT_TOP_TEXT;

const HEADER_MAX_HEIGHT_TOP_CARD = 60;
const HEADER_MIN_HEIGHT_TOP_CARD = 200 - windowHeight / 6;
const HEADER_SCROLL_DISTANCE_TOP_CARD = 100;

interface Props {
  scrollY: Animated.Value;
  topTitle: string;
  bottomTitle: string;
}

const AnimatedBlockTop = ({
  scrollY,
  topTitle,
  bottomTitle,
  children,
}: Props) => (
  <Animated.View
    style={[
      styles.animatedWrapperTop,
      {
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [0, HEADER_SCROLL_DISTANCE_TOP_CARD],
              outputRange: [
                HEADER_MAX_HEIGHT_TOP_CARD,
                HEADER_MIN_HEIGHT_TOP_CARD,
              ],
              extrapolate: 'clamp',
              useNativeDriver: true,
            }),
          },
        ],
      },
    ]}>
    <View style={styles.wrapperCardContentTop}>
      <View style={styles.externalCentering}>
        <View style={styles.internalCentering}>{children}</View>
      </View>
      <View style={styles.topTextWrapper}>
        <Animated.Text
          style={[
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, HEADER_SCROLL_DISTANCE_TOP_TEXT],
                    outputRange: [
                      HEADER_MAX_HEIGHT_TOP_TEXT,
                      HEADER_MIN_HEIGHT_TOP_TEXT,
                    ],
                    extrapolate: 'clamp',
                    useNativeDriver: true,
                  }),
                },
              ],
              opacity: scrollY.interpolate({
                inputRange: [0, 100, 300],
                outputRange: [1, 0.5, 0],
                extrapolate: 'clamp',
                useNativeDriver: true,
              }),
            },
            styles.topText,
          ]}>
          {topTitle}
        </Animated.Text>
      </View>
      <View style={styles.bottomTextWrapper}>
        <Animated.Text
          style={[
            {
              opacity: scrollY.interpolate({
                inputRange: [0, 100, 300],
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
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  animatedWrapperTop: {
    position: 'absolute',
    top: topMargin,
    width: '100%',
  },
  wrapperCardContentTop: {
    alignSelf: 'center',
    width: '100%',
    height: CARD_HEIGHT + 50,
  },
  internalCentering: {
    position: 'relative',
    left: '-50%',
  },
  externalCentering: {
    position: 'absolute',
    zIndex: 2,
    left: '50%',
  },
  topText: {
    position: 'relative',
    top: 80,
    left: '-50%',
    zIndex: 1,
    textAlign: 'center',
    width: CARD_WIDTH,
  },
  topTextWrapper: {
    left: '50%',
    position: 'absolute',
  },
  bottomTextWrapper: {
    width: '100%',
    height: '100%',
    paddingBottom: 15,
    justifyContent: 'flex-end',
  },
  bottomText: {
    alignSelf: 'center',
  },
});

export default AnimatedBlockTop;
