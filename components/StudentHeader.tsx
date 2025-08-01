import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ArrowLeft, Download, User } from 'lucide-react-native'; // Assuming you're using lucide-react-native for icons
import { useNavigation } from '@react-navigation/native'; // For navigation

interface StudentHeaderProps {
  studentName: string;
}

const StudentHeader = ({ studentName }: StudentHeaderProps) => {
  const navigation = useNavigation();

  const handleDownload = () => {
    // Mock download functionality
    Alert.alert(
      'Download Report',
      `Student Performance Report\n\nStudent: ${studentName}\nGenerated: ${new Date().toLocaleDateString()}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <View style={styles.leftSection}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.studentInfo}>
            <View style={styles.iconContainer}>
              <User size={24} color="white" />
            </View>
            <View>
              <Text style={styles.studentName}>{studentName}</Text>
              <Text style={styles.subtitle}>Individual Performance Report</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Download size={16} color="white" style={styles.downloadIcon} />
          <Text style={styles.downloadText}>Download Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'linear-gradient(to right, #1E88E5, #42A5F5)', // Replace with a gradient library if needed
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    marginRight: 12,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  downloadIcon: {
    marginRight: 8,
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});

export default StudentHeader;