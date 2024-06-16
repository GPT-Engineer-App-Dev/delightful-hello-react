import { Box, Button, FormControl, FormLabel, Input, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useEvent, useUpdateEvent } from '../integrations/supabase/index.js';
import { useParams } from 'react-router-dom';

const EditEvent = () => {
  const { id } = useParams();
  const { data: event, isLoading } = useEvent(id);
  const updateEvent = useUpdateEvent();
  const [editingEvent, setEditingEvent] = useState({ id: '', name: '', date: '', venue: '' });

  useEffect(() => {
    if (event) {
      setEditingEvent(event);
    }
  }, [event]);

  const handleUpdateEvent = () => {
    updateEvent.mutate(editingEvent);
  };

  if (isLoading) return <Text>Loading...</Text>;
  return (
    <Box p={8} maxWidth="600px" mx="auto">
      <Heading as="h1" size="lg" mb={6}>Edit event</Heading>
      <FormControl mb={4}>
        <FormLabel>Event name</FormLabel>
        <Input placeholder="Add a name" value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Date</FormLabel>
        <Input placeholder="Add a date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Venue</FormLabel>
        <Input placeholder="Add a venue" value={editingEvent.venue} onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })} />
      </FormControl>
      <Button colorScheme="blue" size="lg" width="full" onClick={handleUpdateEvent}>Update event</Button>
    </Box>
  );
};

export default EditEvent;