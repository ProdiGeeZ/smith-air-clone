import React, { useState, useEffect } from 'react';
import { FIREBASE_DB } from '../../../../firebaseConfig';
import { onValue, ref } from 'firebase/database';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const dbRef = ref(FIREBASE_DB, '/employees');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const filteredData = Object.keys(data).map(key => ({
        employee_name: data[key].employee_name,
        job_role: data[key].job_role,
        profile_avatar: data[key].profile_avatar
      }));
      setContacts(filteredData);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Avatar.Image size={50} source={{ uri: item.profile_avatar }} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.employee_name}</Text>
        <Text style={styles.jobRole}>{item.job_role}</Text>
      </View>
      <IconButton icon="message-outline" onPress={() => console.log('Message', item)} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 18,
  },
  jobRole: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Contacts;
