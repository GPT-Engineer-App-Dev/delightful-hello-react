import { Box, Button, FormControl, FormLabel, Input, Heading, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { useAddEvent } from '../integrations/supabase/index.js';

const CreateEvent = () => {
  const addEvent = useAddEvent();
  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '' });

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: '', date: '', venue: '' });
  };

  return (
    <Box p={8} maxWidth="600px" mx="auto">
      <Heading as="h1" size="lg" mb={6}>Create a new event</Heading>
      <FormControl mb={4}>
        <FormLabel>Event name</FormLabel>
        <Input placeholder="Add a name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Date</FormLabel>
        <Input placeholder="Add a date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Venue</FormLabel>
        <Input placeholder="Add a venue" value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} />
      </FormControl>
      <Button colorScheme="blue" size="lg" width="full" onClick={handleAddEvent}>Create event</Button>
    </Box>
  );
};

export default CreateEvent;