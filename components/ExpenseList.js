import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ExpenseList = ({ expenses, deleteExpense }) => {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>{item.description}</Text>
            <Text style={styles.text}>${item.amount.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => deleteExpense(item.id)}>
                <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={expenses}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#f9c2ff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        marginHorizontal: 10
    },
    text: {
        fontSize: 16
    }
});

export default ExpenseList;
