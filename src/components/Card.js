import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  color: string;
}

export const CARD_HEIGHT = 150;
export const CARD_WIDTH = 300;

const Card = ({color}: Props) => (
  <View style={[styles.card, {backgroundColor: color}]} />
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
  },
});

export default Card;
