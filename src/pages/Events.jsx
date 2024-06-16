import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';
import { useState } from 'react';
import { Box, Button, Input, VStack, HStack, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

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
      <VStack spacing={4}>
        <Box position="relative" width="100%">
          <Input 
            placeholder="Search events" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            mb={4}
            borderRadius="md"
            borderColor="gray.300"
            _placeholder={{ color: 'gray.500' }}
            pl={10}
          />
          <Box position="absolute" top="50%" left={3} transform="translateY(-50%)">
            <FaSearch color="gray.500" />
          </Box>
        </Box>
        <TableContainer width="100%">
          <Table variant="simple">
            <Thead>
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
                  <Td>{new Date(event.created_at).toLocaleDateString()}</Td>
                  <Td>{event.name}</Td>
                  <Td>{new Date(event.date).toLocaleDateString()}</Td>
                  <Td>{event.venue}</Td>
                  <Td>
                    <Button size="sm" onClick={() => setEditingEvent(event)}>Edit</Button>
                    <Button size="sm" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
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