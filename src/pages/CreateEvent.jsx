import { Box, Button, FormControl, FormLabel, Input, Select, Heading, SimpleGrid } from '@chakra-ui/react';

const CreateEvent = () => {
  return (
    <Box p={8} maxWidth="600px" mx="auto">
      <Heading as="h1" size="lg" mb={6}>Create a new event</Heading>
      <FormControl mb={4}>
        <FormLabel>Event name</FormLabel>
        <Input placeholder="Add a name" />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Input placeholder="Add a description" />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Location</FormLabel>
        <Select placeholder="Select a location">
          <option value="location1">Location 1</option>
          <option value="location2">Location 2</option>
        </Select>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Address</FormLabel>
        <Input placeholder="Add an address" />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Timezone</FormLabel>
        <Select placeholder="Select a timezone">
          <option value="timezone1">Timezone 1</option>
          <option value="timezone2">Timezone 2</option>
        </Select>
      </FormControl>
      <SimpleGrid columns={2} spacing={4} mb={4}>
        <FormControl>
          <FormLabel>Starts</FormLabel>
          <Input placeholder="MM/DD/YYYY, 12:00 PM" />
        </FormControl>
        <FormControl>
          <FormLabel>Ends</FormLabel>
          <Input placeholder="MM/DD/YYYY, 12:00 PM" />
        </FormControl>
      </SimpleGrid>
      <Button colorScheme="blue" size="lg" width="full">Create event</Button>
    </Box>
  );
};

export default CreateEvent;