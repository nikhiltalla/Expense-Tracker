import React, { useState } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles';
import { BarChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';

const chartTypes = ['bar', 'line'];
const ChartComponents = {
  bar: BarChart,
  line: LineChart
};

const getColor = (index) => {
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  return colors[index % colors.length];
};

export default function HomeScreen({ navigation, currentUser, setCurrentUser, expenses, deleteExpenseForUser }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const [chartTypeIndex, setChartTypeIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const openProfileModal = () => {
    setIsProfileModalVisible(true);
    setIsSettingsModalVisible(false);
  };

  const closeProfileModal = () => {
    setIsProfileModalVisible(false);
  };

  const pieChartData = expenses.map((expense, index) => ({
    name: expense.description,
    amount: expense.amount,
    color: getColor(index),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15
  }));

  const deleteExpense = (id) => {
    deleteExpenseForUser(currentUser.username, id);
  };

  const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const handleLogout = () => {
    setCurrentUser(null);
    navigation.navigate('Welcome');
  };

  const toggleChartType = () => {
    setChartTypeIndex((prevIndex) => (prevIndex + 1) % chartTypes.length);
  };

  const closeModal = () => setModalVisible(false);

  const chartData = {
    labels: expenses.map(expense => expense.description),
    datasets: [{
      data: expenses.map(expense => expense.amount)
    }]
  };

  const chartConfig = {
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={commonStyles.header}>Hello {currentUser.username}!</Text>
        <Ionicons
          name="person-circle-outline"
          size={30}
          color={colors.primary}
          onPress={() => setIsSettingsModalVisible(true)}
        />
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.expenseText}>{item.description}</Text>
            <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => deleteExpense(item.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <>
            <Text style={styles.totalExpense}>Total Expense: ${totalExpense.toFixed(2)}</Text>
            {expenses.length > 0 && (
              <>
                <TouchableOpacity
                  style={commonStyles.button}
                  onPress={() => setChartVisible(!chartVisible)}
                >
                  <Text style={commonStyles.buttonText}>
                    {chartVisible ? 'Hide Chart' : 'Show Chart'}
                  </Text>
                </TouchableOpacity>

                {chartVisible && (
                  <>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                      <TouchableOpacity onPress={() => setChartTypeIndex((chartTypeIndex + chartTypes.length - 1) % chartTypes.length)}>
                        <Ionicons name="arrow-back-circle-outline" size={30} color={colors.primary} />
                      </TouchableOpacity>
                      <Text style={{ marginHorizontal: 20 }}>{chartTypes[chartTypeIndex].toUpperCase()} CHART</Text>
                      <TouchableOpacity onPress={() => setChartTypeIndex((chartTypeIndex + 1) % chartTypes.length)}>
                        <Ionicons name="arrow-forward-circle-outline" size={30} color={colors.primary} />
                      </TouchableOpacity>
                    </View>

                    {chartTypes[chartTypeIndex] === 'bar' && (
                      <BarChart
                        data={chartData}
                        width={Dimensions.get('window').width - 16}
                        height={220}
                        yAxisLabel="$"
                        chartConfig={chartConfig}
                        verticalLabelRotation={30}
                        fromZero
                        style={{
                          marginVertical: 8,
                          borderRadius: 16,
                        }}
                      />
                    )}

                    {chartTypes[chartTypeIndex] === 'line' && (
                      <LineChart
                        data={chartData}
                        width={Dimensions.get('window').width - 16}
                        height={220}
                        yAxisLabel="$"
                        chartConfig={chartConfig}
                        bezier
                        style={{
                          marginVertical: 8,
                          borderRadius: 16,
                        }}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </>
        }
      />

      <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('Add Expense')}>
        <Text style={commonStyles.buttonText}>Add Expense</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isSettingsModalVisible}
        onRequestClose={() => setIsSettingsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={openProfileModal}
            >
              <Text style={styles.modalText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleLogout}
            >
              <Text style={styles.modalText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeModal}
            >
              <Text style={styles.modalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isProfileModalVisible}
        onRequestClose={closeProfileModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Name: {currentUser.username}</Text>
            <Text style={styles.modalText}>Email: {currentUser.email}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeProfileModal}
            >
              <Text style={styles.modalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.accent,
    borderRadius: 5,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: colors.textPrimary,
    shadowOffset: { height: 1, width: 0 },
    elevation: 3,
  },
  expenseText: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  expenseAmount: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  totalExpense: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: {
    backgroundColor: colors.button,
    padding: 10,
    elevation: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  modalText: {
    color: colors.buttonTitle,
    fontSize: 18,
    fontWeight: 'bold',
  }
});
