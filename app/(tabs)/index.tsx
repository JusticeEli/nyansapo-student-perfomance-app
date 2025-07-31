import { StyleSheet } from 'react-native';

import {  ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ClassOverviewScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="default">
        Hello World me 
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});