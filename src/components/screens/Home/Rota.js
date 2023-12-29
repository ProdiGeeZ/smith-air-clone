/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable, Title } from 'react-native-paper';

const mockRotaData = [
    { name: "Ethan Martinez", shift: "8am - 4pm", role: "Manager" },
    { name: "Jane Smith", shift: "9am - 5pm", role: "Sales Assistant" },
    { name: "Michael Johnson", shift: "9am - 5pm", role: "Sales Assistant" },
    { name: "Mohammed Saabir Ahmed", shift: "10am - 6pm", role: "Stock Assistant" },
    { name: "David Wilson", shift: "10am - 6pm", role: "Team Leader" },
    { name: "Linda Brown", shift: "11am - 7pm", role: "Sales Assistant" },
    { name: "Olivia Garcia", shift: "11am - 7pm", role: "Team Leader" },
];

const Rota = () => {
    return (
        <View style={styles.container}>
                <Title style={styles.header} variant={'titleLarge'}>Today's Rota</Title>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Shift</DataTable.Title>
                        <DataTable.Title>Role</DataTable.Title>
                    </DataTable.Header>

                    {mockRotaData.map((employee, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell style={styles.cell}>{employee.name}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{employee.shift}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{employee.role}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '##fafafa',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    card: {
        width: '95%',
        elevation: 1,
    },
    tableHeader: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    row: {
        alignItems: 'center', 
    },
    employeeName: {
        marginLeft: 10,
        fontSize: 15,
    },
    header: {
        fontSize: 24,
        color: '#000',
        padding: 15,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
    }
});

export default Rota;
