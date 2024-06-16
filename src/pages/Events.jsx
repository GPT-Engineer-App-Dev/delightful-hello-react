import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';
import { useState } from 'react';
import { Box, Button, Input, VStack, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const Events = () => {
  const { data: events, isLoading, error } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '' });
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: '', date: '', venue: '' });
  };

  const handleUpdateEvent = () => {
    updateEvent.mutate(editingEvent);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  const filteredEvents = events?.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>Events</Heading>
      <Box mb={4} position="relative">
        <Input 
          placeholder="Search events" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          borderRadius="md"
          borderColor="gray.300"
          _placeholder={{ color: 'gray.500' }}
          pl={10}
        />
        <SearchIcon position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.500" />
      </Box>
      <TableContainer border="1px" borderColor="gray.200" borderRadius="md">
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th>ID</Th>
              <Th>Created at</Th>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Venue</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEvents.map((event) => (
              <Tr key={event.id}>
                <Td>#{event.id}</Td>
                <Td color="blue.500">{new Date(event.created_at).toLocaleDateString()}</Td>
                <Td>{event.name}</Td>
                <Td color="blue.500">{new Date(event.date).toLocaleDateString()}</Td>
                <Td color="blue.500">{event.venue}</Td>
                <Td>
                  <Button size="sm" variant="link" color="blue.500" onClick={() => setEditingEvent(event)}>Edit</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <VStack spacing={4} mt={4}>
        <Box>
          <Input placeholder="Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
          <Input placeholder="Date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          <Input placeholder="Venue" value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} />
          <Button onClick={handleAddEvent}>Add Event</Button>
        </Box>
        {editingEvent && (
          <Box>
            <Input placeholder="Name" value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
            <Input placeholder="Date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
            <Input placeholder="Venue" value={editingEvent.venue} onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })} />
            <Button onClick={handleUpdateEvent}>Update Event</Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Events;