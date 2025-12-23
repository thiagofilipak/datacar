import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="index" 
        options={{
          title: 'Meus Carros',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'car-sport' : 'car-sport-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cadastro" 
        options={{
          title: 'Cadastro/Atualizações',
          headerShown: false, 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={28} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}