import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from '../integrations/supabase/index.js';
import { useState } from 'react';
import { Box, Button, Input, VStack, HStack, Text } from '@chakra-ui/react';

const Venues = () => {
  const { data: venues, isLoading, error } = useVenues();
  const addVenue = useAddVenue();
  const updateVenue = useUpdateVenue();
  const deleteVenue = useDeleteVenue();

  const [newVenue, setNewVenue] = useState({ name: '', capacity: '', type: '' });
  const [editingVenue, setEditingVenue] = useState(null);

  const handleAddVenue = () => {
    addVenue.mutate(newVenue);
    setNewVenue({ name: '', capacity: '', type: '' });
  };

  const handleUpdateVenue = () => {
    updateVenue.mutate(editingVenue);
    setEditingVenue(null);
  };

  const handleDeleteVenue = (id) => {
    deleteVenue.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading venues</Text>;

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Box>
          <Input placeholder="Name" value={newVenue.name} onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })} />
          <Input placeholder="Capacity" value={newVenue.capacity} onChange={(e) => setNewVenue({ ...newVenue, capacity: e.target.value })} />
          <Input placeholder="Type" value={newVenue.type} onChange={(e) => setNewVenue({ ...newVenue, type: e.target.value })} />
          <Button onClick={handleAddVenue}>Add Venue</Button>
        </Box>
        {venues.map((venue) => (
          <Box key={venue.id} borderWidth="1px" borderRadius="lg" p={4} w="100%">
            {editingVenue?.id === venue.id ? (
              <Box>
                <Input placeholder="Name" value={editingVenue.name} onChange={(e) => setEditingVenue({ ...editingVenue, name: e.target.value })} />
                <Input placeholder="Capacity" value={editingVenue.capacity} onChange={(e) => setEditingVenue({ ...editingVenue, capacity: e.target.value })} />
                <Input placeholder="Type" value={editingVenue.type} onChange={(e) => setEditingVenue({ ...editingVenue, type: e.target.value })} />
                <Button onClick={handleUpdateVenue}>Update Venue</Button>
              </Box>
            ) : (
              <HStack justifyContent="space-between">
                <Text>{venue.name}</Text>
                <Text>{venue.capacity}</Text>
                <Text>{venue.type}</Text>
                <Button onClick={() => setEditingVenue(venue)}>Edit</Button>
                <Button onClick={() => handleDeleteVenue(venue.id)}>Delete</Button>
              </HStack>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Venues;