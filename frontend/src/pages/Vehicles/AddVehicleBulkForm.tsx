import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter, Button, Text, VStack, Divider
} from "@chakra-ui/react";
import {useRef, useState} from "react";
import {useAddBulkVehiclesCommand} from "../../hooks/mutations/vehicles/useAddBulkVehiclesCommand";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    workspaceId: string;
}

const AddVehicleBulkForm = ({isOpen, onClose, workspaceId}: Props) => {
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File>();
    
    const mutation = useAddBulkVehiclesCommand({
        onClose: onClose
    });
    
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    }
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    }
    
    const onSubmit = async () => {
        if (file) {
            await mutation.mutateAsync({
                workspaceId: workspaceId, // Replace with actual workspace ID
                file: file
            });
        }
    }
    
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Upload Csv File</ModalHeader>
                {!mutation.isPending && <ModalCloseButton />}
                
                <ModalBody>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        accept=".csv"
                        onChange={handleFileChange}
                    />
                    <Button onClick={handleButtonClick} isDisabled={mutation.isPending}>
                        {file ? 'Select another file' : 'Select file'}
                    </Button>

                    {file && (
                        <VStack mt={2}>
                            <Text>Selected file</Text>
                            
                            <Divider />
                            
                            <Text fontSize={'sm'} color={'gray.500'}>
                                {file.name}
                            </Text>
                            <Text fontSize={'xs'} color={'gray.400'}>
                                {file.size} bytes
                            </Text>
                        </VStack>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose} isDisabled={mutation.isPending}>
                        Close
                    </Button>
                    {file && <Button variant='ghost' onClick={onSubmit} isLoading={mutation.isPending}>Upload file</Button>}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddVehicleBulkForm