import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import StrandCard from './StrandCard'; // Assuming StrandCard is already implemented

interface StrandListProps {
  strandList: {
    strandId: string;
    strand: string;
    workCovered: number;
    students: {
      studentId: string;
      name: string;
      competence: string;
    }[];
  }[];
}

const StrandList = ({ strandList }: StrandListProps) => {
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
    <View style={styles.container}>
      <FlatList
        data={strandList}
        key={numColumns}
        keyExtractor={(item) => item.strandId}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <StrandCard strand={item} onStudentClick={(id) => console.log(id)} />
          </View>
        )}
        numColumns={numColumns} // Dynamically set the number of columns
        columnWrapperStyle={numColumns > 1 ? styles.row : null} // Apply row style only for multiple columns
        contentContainerStyle={styles.contentContainer} // Style for the FlatList container
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between', // Add space between columns
    marginBottom: 16,
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 8, // Add spacing between cards
  },
});

export default StrandList;