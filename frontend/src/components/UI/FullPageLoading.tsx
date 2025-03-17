import {Flex, Spinner} from "@chakra-ui/react";

const FullPageLoading = () => {
    return(
        <Flex flexDirection={'column'} as={'section'} w={'full'} h={'100vh'} justifyContent={'center'} alignItems={'center'}>
            <Spinner size={'xl'} color={'white'} />
        </Flex>
    )
}

export default FullPageLoading;