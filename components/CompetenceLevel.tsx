import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface CompetenceLevelProps {
  level: 'BE' | 'AE' | 'ME' | 'EE';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'pill';
}

const CompetenceLevel = ({ level, size = 'md', variant = 'badge' }: CompetenceLevelProps) => {
  const getColorStyles = (level: string) => {
    switch (level) {
      case 'BE':
        return { backgroundColor: '#FFCDD2', color: '#B71C1C', borderColor: '#E57373' }; // Red
      case 'AE':
        return { backgroundColor: '#FFF9C4', color: '#F57F17', borderColor: '#FFD54F' }; // Yellow
      case 'ME':
        return { backgroundColor: '#C8E6C9', color: '#1B5E20', borderColor: '#81C784' }; // Green
      case 'EE':
        return { backgroundColor: '#BBDEFB', color: '#0D47A1', borderColor: '#64B5F6' }; // Blue
      default:
        return { backgroundColor: '#E0E0E0', color: '#757575', borderColor: '#BDBDBD' }; // Muted
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'sm':
        return { fontSize: 12, paddingHorizontal: 8, paddingVertical: 4 };
      case 'lg':
        return { fontSize: 16, paddingHorizontal: 16, paddingVertical: 8 };
      default:
        return { fontSize: 14, paddingHorizontal: 12, paddingVertical: 6 };
    }
  };

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'pill':
        return { borderRadius: 50 };
      default:
        return { borderRadius: 4 };
    }
  };

  const colorStyles = getColorStyles(level);
  const sizeStyles = getSizeStyles(size);
  const variantStyles = getVariantStyles(variant);

  return (
    <View
      style={[
        styles.container,
        colorStyles,
        sizeStyles,
        variantStyles,
      ]}
    >
      <Text style={[styles.text, { color: colorStyles.color }]}>{level}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
  },
});

export default CompetenceLevel;