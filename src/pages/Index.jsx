import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Hello World</Text>
      <Button as={Link} to="/create-event" colorScheme="blue">Create Event</Button>
        <Button as={Link} to="/edit-event" colorScheme="blue">Edit Event</Button>
      </VStack>
    </Container>
  );
};

export default Index;