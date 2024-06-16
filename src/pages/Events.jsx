import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';
import { useState } from 'react';
import { Box, Button, Input, VStack, HStack, Text } from '@chakra-ui/react';

const Events = () => {
  const { data: events, isLoading, error } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '' });
  const [editingEvent, setEditingEvent] = useState(null);

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

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Box>
          <Input placeholder="Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
          <Input placeholder="Date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          <Input placeholder="Venue" value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} />
          <Button onClick={handleAddEvent}>Add Event</Button>
        </Box>
        {events.map((event) => (
          <Box key={event.id} borderWidth="1px" borderRadius="lg" p={4} w="100%">
            {editingEvent?.id === event.id ? (
              <Box>
                <Input placeholder="Name" value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
                <Input placeholder="Date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
                <Input placeholder="Venue" value={editingEvent.venue} onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })} />
                <Button onClick={handleUpdateEvent}>Update Event</Button>
              </Box>
            ) : (
              <HStack justifyContent="space-between">
                <Text>{event.name}</Text>
                <Text>{event.date}</Text>
                <Text>{event.venue}</Text>
                <Button onClick={() => setEditingEvent(event)}>Edit</Button>
                <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
              </HStack>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Events;