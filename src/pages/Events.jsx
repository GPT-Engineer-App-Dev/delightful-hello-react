import { useEvents, useDeleteEvent } from '../integrations/supabase/index.js';
import { useState } from 'react';
import { Box, Button, Input, VStack, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Events = () => {
  const { data: events, isLoading, error } = useEvents();
  
  const deleteEvent = useDeleteEvent();

  const [searchTerm, setSearchTerm] = useState('');

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
      <Button colorScheme="blue" size="lg" as={Link} to="/create-event" mb={4}>Create Event</Button>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <AiOutlineSearch color="gray.500" />
        </InputLeftElement>
        <Input 
          placeholder="Search events" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          borderRadius="md"
          borderColor="gray.300"
          _placeholder={{ color: 'gray.500' }}
          pl={10}
        />
      </InputGroup>
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
                  <Button size="sm" variant="link" color="blue.500" as={Link} to={`/edit-event/${event.id}`}>Edit</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Events;