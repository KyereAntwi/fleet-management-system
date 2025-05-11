import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AddIcon,
  AttachmentIcon,
  ButtonGroup,
  MenuItemOption,
  SearchIcon,
  SettingsIcon,
  Th,
  Thead,
} from "@chakra-ui/icons";
import { getVehiclesQuery } from "../../hooks/queries/vehicles/getVehiclesQuery";
import InfoBanner from "../../components/UI/InfoBanner";
import { useParams, useSearchParams } from "react-router";
import { Vehicle } from "../../models/vehicles/vehicle";
import VehicleItem from "./VehicleItem";
import AddVehicleForm from "./AddVehicleForm";
import { useEffect, useState } from "react";
import AddVehicleBulkForm from "./AddVehicleBulkForm";
import { GetVehiclesRequest } from "../../models/vehicles/vehicleRequests";
import ErrorDisplay, { ErrorTypes } from "../../components/UI/Error";

const VehiclesList = () => {
  const { workspaceId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [request, setRequest] = useState<GetVehiclesRequest>({
    workspaceId: workspaceId!,
    keyword: "",
    initialCostFrom: 0,
    initialCostTo: 0,
    annualDepreciationFrom: 0,
    annualDepreciationTo: 0,
    mileageCovered: "",
    roadWorthyRenewalDateFrom: "",
    roadWorthyRenewalDateTo: "",
    insuranceRenewalDateFrom: "",
    insuranceRenewalDateTo: "",
    page: 1,
    pageSize: 20,
  });

  const [keywordFilter, setKeywordFilter] = useState<boolean>(false);
  const [initialCost, setInitialCost] = useState<boolean>(false);
  const [annualDepreciation, setAnnualDepreciation] = useState<boolean>(false);
  const [mileageCovered, setMileageCovered] = useState<boolean>(false);
  const [roadworthy, setRoadworthy] = useState<boolean>(false);
  const [insurance, setInsurance] = useState<boolean>(false);

  const { data, isLoading, error } = getVehiclesQuery(request);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenBulk,
    onOpen: onOpenBulk,
    onClose: onCloseBulk,
  } = useDisclosure();

  const dueRoadRenewals = searchParams.get("dueRoadRenewals") ?? "";
  const dueInsuranceRenewals = searchParams.get("dueInsuranceRenewals") ?? "";

  useEffect(() => {
    if (dueRoadRenewals) setRoadworthy(true);
    if (dueInsuranceRenewals) setInsurance(true);
  }, [dueRoadRenewals, dueInsuranceRenewals]);

  if (error) {
    console.error(error);
    return <ErrorDisplay message={error.message} type={ErrorTypes.SERVER} />;
  }

  return (
    <>
      <Flex as={"section"} flexDirection={"row"} w={"100%"} mx={"auto"} py={4}>
        <Heading
          mb={2}
          fontSize={{
            sm: "1.2rem",
            md: "1.8rem",
          }}
        >
          List of Vehicles
        </Heading>
        <Spacer />
        <Menu>
          <MenuButton
            as={Button}
            aria-label="Options"
            icon={<SettingsIcon />}
            variant="solid"
            size={{
              sm: "sm",
              md: "md",
            }}
            bg={"teal.400"}
          >
            Add a new vehicle
          </MenuButton>
          <MenuList>
            <MenuItem icon={<AddIcon />} onClick={onOpen}>
              Add single manually
            </MenuItem>
            <MenuItem icon={<AttachmentIcon />} onClick={onOpenBulk}>
              Import an Excel file
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Divider />

      <Flex
        as={"section"}
        flexDirection={"column"}
        w={"100%"}
        mx={"auto"}
        py={4}
      >
        <Flex
          flexDirection={"row"}
          w={"full"}
          mx={"auto"}
          py={4}
          alignItems={"space-between"}
        >
          <Flex
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Menu closeOnSelect={false}>
              <MenuButton as={Button} mr={2} minW={100}>
                Filter
              </MenuButton>
              <MenuList>
                <MenuOptionGroup
                  defaultValue={
                    dueRoadRenewals
                      ? ["roadworthy"]
                      : dueInsuranceRenewals
                      ? ["insurance"]
                      : []
                  }
                  title="Filter list by:"
                  type="checkbox"
                >
                  <MenuItemOption
                    value="keyword"
                    onClick={() => setKeywordFilter(!keywordFilter)}
                  >
                    Brand and Type
                  </MenuItemOption>
                  <MenuItemOption
                    value="initialCost"
                    onClick={() => setInitialCost(!initialCost)}
                  >
                    Initial Cost
                  </MenuItemOption>
                  <MenuItemOption
                    value="annualDepreciation"
                    onClick={() => setAnnualDepreciation(!annualDepreciation)}
                  >
                    Annual Depreciation
                  </MenuItemOption>
                  <MenuItemOption
                    value="mileage"
                    onClick={() => setMileageCovered(!mileageCovered)}
                  >
                    Mileage Covered
                  </MenuItemOption>
                  <MenuItemOption
                    value="roadworthy"
                    onClick={() => setRoadworthy(!roadworthy)}
                  >
                    Roadworthy Renewal Date
                  </MenuItemOption>
                  <MenuItemOption
                    value="insurance"
                    onClick={() => setInsurance(!insurance)}
                  >
                    Insurance Renewal Date
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>

            {keywordFilter && (
              <FormControl gap={2} mr={4}>
                <FormLabel>Brand and Type</FormLabel>
                <InputGroup size={"sm"}>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="search brand and type here ..."
                    onChange={(e) =>
                      setRequest({
                        ...request,
                        keyword: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
            )}

            {initialCost && (
              <FormControl gap={2} mr={4}>
                <FormLabel>Initial Cost</FormLabel>
                <InputGroup size={"sm"} mb={4}>
                  <Input
                    type="number"
                    placeholder="initial cost from ..."
                    onChange={(e) =>
                      setRequest({
                        ...request,
                        initialCostFrom: Number(e.target.value),
                      })
                    }
                  />
                </InputGroup>

                <InputGroup size={"sm"}>
                  <Input
                    type="number"
                    placeholder="initial cost to ..."
                    onChange={(e) =>
                      setRequest({
                        ...request,
                        initialCostTo: Number(e.target.value),
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
            )}

            {annualDepreciation && (
              <FormControl gap={2} mr={4}>
                <FormLabel>Annual Depreciation</FormLabel>
                <InputGroup size={"sm"} mb={4}>
                  <Input
                    type="number"
                    placeholder="Annual depreciation from ..."
                    onChange={(e) =>
                      setRequest({
                        ...request,
                        annualDepreciationFrom: Number(e.target.value),
                      })
                    }
                  />
                </InputGroup>

                <InputGroup size={"sm"}>
                  <Input
                    type="number"
                    placeholder="Annual depreciation to ..."
                    onChange={(e) =>
                      setRequest({
                        ...request,
                        annualDepreciationTo: Number(e.target.value),
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
            )}

            {mileageCovered && (
              <FormControl gap={2} mr={4}>
                <FormLabel>Mileage Covered</FormLabel>
                <InputGroup size={"sm"}>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="search mileage covered ..."
                    onChange={(e) =>
                      setRequest({
                        ...request,
                        mileageCovered: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
            )}

            {roadworthy && (
              <FormControl gap={2} mr={4}>
                <FormLabel>Roadworthy Renewal</FormLabel>
                <InputGroup size={"sm"} mb={4}>
                  <Input
                    type="date"
                    title="Roadworthy Renewal from ..."
                    onChange={(e) =>
                      setRequest({
                        ...request,
                        roadWorthyRenewalDateFrom: e.target.value,
                      })
                    }
                  />
                </InputGroup>

                <InputGroup size={"sm"}>
                  <Input
                    type="datetime-local"
                    title="Roadworthy Renewal to ..."
                    onChange={(e) =>
                      setRequest({
                        ...request,
                        roadWorthyRenewalDateTo: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
            )}

            {insurance && (
              <FormControl gap={2} mr={4}>
                <FormLabel>Insurance Renewal</FormLabel>
                <InputGroup size={"sm"} mb={4}>
                  <Input
                    type="date"
                    title="Insurance Renewal from ..."
                    onChange={(e) =>
                      setRequest({
                        ...request,
                        insuranceRenewalDateFrom: e.target.value,
                      })
                    }
                  />
                </InputGroup>

                <InputGroup size={"sm"}>
                  <Input
                    type="date"
                    title="Insurance Renewal to ..."
                    onChange={(e) =>
                      setRequest({
                        ...request,
                        insuranceRenewalDateTo: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
            )}
          </Flex>

          <Spacer />

          <ButtonGroup size={"sm"} isAttached>
            <Button
              disabled={
                isLoading || request.page === 1 || data?.data?.count === 0
              }
              onClick={() =>
                setRequest({
                  ...request,
                  page: request.page === 1 ? 1 : request.page - 1,
                })
              }
            >
              Prev
            </Button>
            <Button
              disabled={
                isLoading ||
                data?.data?.count === 0 ||
                data?.data?.count! <= request.pageSize
              }
              onClick={() =>
                setRequest({
                  ...request,
                  page:
                    data?.data?.count === request.pageSize
                      ? 1
                      : request.page + 1,
                })
              }
            >
              Next
            </Button>
          </ButtonGroup>
        </Flex>

        <Divider />

        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : data?.data?.count! === 0 ? (
          <>
            <Center>
              <InfoBanner message={"No records found"} />
            </Center>
          </>
        ) : (
          <TableContainer w={"full"}>
            <Table variant={"simple"}>
              <Thead>
                <Th>Created At</Th>
                <Th>Type and Brand</Th>
                <Th>Initial Cost</Th>
                <Th>Insurance Renewal Date</Th>
                <Th>Mileage Covered</Th>
                <Th>Road Worthy Renewal Date</Th>
              </Thead>
              <Tbody>
                {data?.data?.data.map((vehicle: Vehicle) => (
                  <VehicleItem key={vehicle.vehicleId} vehicle={vehicle} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Flex>

      <AddVehicleForm
        isOpen={isOpen}
        onClose={onClose}
        workspaceId={workspaceId!}
      />
      <AddVehicleBulkForm
        workspaceId={workspaceId!}
        isOpen={isOpenBulk}
        onClose={onCloseBulk}
      />
    </>
  );
};

export default VehiclesList;
