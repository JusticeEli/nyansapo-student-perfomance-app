import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Appearance, ColorSchemeName } from 'react-native';
import { ArrowLeft, Download, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface StudentHeaderProps {
  studentName: string;
}

const StudentHeader = ({ studentName }: StudentHeaderProps) => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const isDarkTheme = theme === 'dark';

  const handleDownload = () => {
    Alert.alert(
      'Download Report',
      `Student Performance Report\n\nStudent: ${studentName}\nGenerated: ${new Date().toLocaleDateString()}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDarkTheme ? 'black' : 'white' }, // Black for dark theme, white for light theme
      ]}
    >
      <View style={styles.headerContainer}>
        <View style={styles.leftSection}>
          <TouchableOpacity
            style={[
              styles.backButton,
              { backgroundColor: isDarkTheme ? 'white' : 'black' }, // Opposite color for contrast
            ]}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={20} color={isDarkTheme ? 'black' : 'white'} />
          </TouchableOpacity>
          <View style={styles.studentInfo}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: isDarkTheme ? 'white' : 'black' }, // Opposite color for contrast
              ]}
            >
              <User size={24} color={isDarkTheme ? 'black' : 'white'} />
            </View>
            <View>
              <Text style={[styles.studentName, { color: isDarkTheme ? 'white' : 'black' }]}>
                {studentName}
              </Text>
              <Text style={[styles.subtitle, { color: isDarkTheme ? 'white' : 'black' }]}>
                Individual Performance Report
              </Text>
            </View>
          </View>
        </View>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 50,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 12,
    borderRadius: 50,
    marginRight: 12,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  downloadIcon: {
    marginRight: 8,
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default StudentHeader;