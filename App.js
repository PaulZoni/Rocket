import React, {useState, useRef} from 'react';
import {StyleSheet, ScrollView, View, Animated} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Card, CARD_HEIGHT} from './src';
import AnimatedBlockTop from './src/layout/AnimatedBlockTop';
import AnimatedBlockBottom from './src/layout/AnimatedBlockBottom';
import {ScrollDistance, windowHeight} from './src/utils';

const topTitleCardOne =
  'Это виртуальная карта рокетбанка. Она как физическая только виртуальная';
const bottomTitleCardOne = 'виртуальная карта';

const topTitleCardTwo = 'физическая карта';
const bottomTitleCardTwo =
  'Это физическая карта рокетбанка. Она как виртуальная только физическая';

const App = () => {
  const [scrollY] = useState(new Animated.Value(0));
  const scroll = useRef(null);

  const snapToEdge = event => {
    const {y} = event.nativeEvent.contentOffset;
    if (y > 0 && y < ScrollDistance / 2) {
      if (scroll.current) {
        scroll.current.scrollTo({y: 0, animated: true});
      }
    } else if (ScrollDistance / 2 <= y && y < ScrollDistance) {
      if (scroll.current) {
        scroll.current.scrollTo({y: ScrollDistance, animated: true});
      }
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScrollEndDrag={snapToEdge}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}])}
      scrollEventThrottle={1}
      ref={scroll}
      style={styles.scrollView}>
      <View style={styles.content}>
        <AnimatedBlockTop
          scrollY={scrollY}
          topTitle={topTitleCardOne}
          bottomTitle={bottomTitleCardOne}>
          <Card color={Colors.primary} />
        </AnimatedBlockTop>
        <AnimatedBlockBottom
          scrollY={scrollY}
          bottomTitle={bottomTitleCardTwo}
          topTitle={topTitleCardTwo}>
          <Card color={Colors.light} />
        </AnimatedBlockBottom>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  content: {
    backgroundColor: Colors.white,
    height: windowHeight + ScrollDistance,
    width: '100%',
    paddingTop: CARD_HEIGHT,
  },
});

export default App;
