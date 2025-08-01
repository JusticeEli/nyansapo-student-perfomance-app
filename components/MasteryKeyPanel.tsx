import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import CompetenceLevel from './CompetenceLevel'; // Assuming CompetenceLevel is already implemented

const competenceLevels = [
  {
    code: 'BE',
    meaning: 'Below Expectation',
    description: 'Needs significant support',
  },
  {
    code: 'AE',
    meaning: 'Approaching Expectation',
    description: 'Developing with some support needed',
  },
  {
    code: 'ME',
    meaning: 'Meeting Expectation',
    description: 'Consistently meets standards',
  },
  {
    code: 'EE',
    meaning: 'Exceeding Expectation',
    description: 'Advanced mastery achieved',
  },
];

const MasteryKeyPanel = () => {
      const [numColumns, setNumColumns] = useState(2); // Default to 2 columns
    
      useEffect(() => {
        const updateNumColumns = () => {
          const screenWidth = Dimensions.get('window').width;
          setNumColumns(screenWidth < 600 ? 1 : 2); // Use 1 column for smaller screens, 2 for larger
        };
    
        // Add event listener for screen size changes
        const subscription = Dimensions.addEventListener('change', updateNumColumns);
    
        // Set initial number of columns
        updateNumColumns();
    
        // Cleanup the event listener on unmount
        return () => subscription?.remove();
      }, []);
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Mastery Key</Text>
      </View>
      <FlatList
        data={competenceLevels}
        key={numColumns}
        keyExtractor={(item) => item.code}
        numColumns={numColumns} // Dynamically set the number of columns
        columnWrapperStyle={numColumns > 1 ? styles.row : null} 
        renderItem={({ item }) => (
          <View style={styles.levelRow}>
            <CompetenceLevel level={item.code} size="sm" />
            <View style={styles.levelDetails}>
              <Text style={styles.levelMeaning}>{item.meaning}</Text>
              <Text style={styles.levelDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(30, 136, 229, 0.2)', // Light blue border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E88E5', // Education primary color
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelDetails: {
    flex: 1,
    marginLeft: 12,
  },
  levelMeaning: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  levelDescription: {
    fontSize: 12,
    color: '#757575', // Muted foreground color
  },
  row: {
    justifyContent: 'space-between', // Add space between columns
    marginBottom: 16,
  },
});

export default MasteryKeyPanel;