import Layout from '@/components/Layout';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { CustomTable } from '@/components/Table';
import Modal from 'react-modal';
import EntryForm from '@/components/EntryForm';



const StatusBadge = styled.span`
  background-color: ${(props) => (props.active ? '#d1ffd6' : '#ffd1d1')};
  color: ${(props) => (props.active ? '#30a14e' : '#a13030')};
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
`;
let initialValues = {
    name: '',
    status: 'Active',
    property: '',
    unit: '',
    role: '',
    lastInvited: Date.now(),
}


// Main Page Component
export default function PeoplePage() {
    const [activeTab, setActiveTab] = useState('people');
    const [approved, setApproved] = useState("approved");
    const [searchTerm, setSearchTerm] = useState('');
    const [peopleData, setPeopleData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState(initialValues);

    const modalRef = useRef(null);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddNewEntry = () => {
        console.log('Add new entry functionality triggered');
        // Add add new entry logic here
    };

    const filteredData = peopleData.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchPeopleData = async () => {
        try {
            const response = await fetch(`/api/people?status=${approved === 'approved' ? "Active" : "Inactive"}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPeopleData(data);
        } catch (error) {
            console.error('Error fetching people data:', error);
        }
    };

    useEffect(() => {
        fetchPeopleData();
    }, [approved]);


    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    const handleApprovedChange = (status) => {
        setApproved(status);
    }

    // Table Columns Configuration
    const columns = [
        { label: '', key: 'checkbox' },
        { label: 'Name', key: 'name' },
        { label: 'Status', key: 'status' },
        { label: 'Property', key: 'property' },
        { label: 'Unit', key: 'unit' },
        { label: 'Role', key: 'role' },
        { label: 'Last Invited', key: 'lastInvited' }
    ];




    const handleSelect = (values) => {
        console.log(JSON.stringify(values));
        setSelectedRows({
            ...values,
            firstName: values.name.split(' ')[0],
            lastName: values.name.split(' ')[1],
        });
        openModal();
    }

    // Open/Close modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleExport = async () => {
        try {
            const response = await fetch('/api/export');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'people_data.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    const handleBulkAdd = async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.csv';
        fileInput.onchange = async () => {
            const file = fileInput.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                try {
                    const response = await fetch('/api/bulkAdd', {
                        method: 'POST',
                        body: formData,
                    });
                    const result = await response.json();
                    fetchPeopleData();
                    console.log('Bulk add result:', result);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        };
        fileInput.click();
    };


    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                className="ReactModal__Content"
                overlayClassName="custom-overlay"
            >
                <CustomModalContent>
                    <EntryForm fetchPeopleData={fetchPeopleData} onRequestClose={closeModal} initialValues={selectedRows} />
                </CustomModalContent>
            </Modal>
            <Layout backgroundColor="black">
                <Container>
                    <Header>People</Header>

                    <Tabs>
                        <TabButton active={activeTab === 'people'} onClick={() => handleTabChange('people')}>
                            People
                        </TabButton>
                        <TabButton active={activeTab === 'properties'} onClick={() => handleTabChange('properties')}>
                            Properties
                        </TabButton>
                    </Tabs>

                    {/* Search input and action buttons */}
                    <ActionBar>
                        <div>
                            <Tab active={approved === 'approved'} onClick={() => handleApprovedChange('approved')}>
                                Approved
                            </Tab>
                            <Tab active={approved === 'awaitingApproval'} onClick={() => handleApprovedChange('awaitingApproval')}>
                                Awaiting Approval
                            </Tab>
                        </div>

                        <Box>
                            <SearchInput placeholder="Search by name or email" value={searchTerm}
                                onChange={handleSearch} />
                            <ButtonGroup>
                                <ActionButton onClick={handleExport}>
                                    <FaCloudUploadAlt fontSize={"1rem"} /> Export
                                </ActionButton>
                                <ActionButton onClick={handleBulkAdd}>
                                    <FaCloudDownloadAlt fontSize={"1rem"} /> Bulk Add
                                </ActionButton>
                                <ActionButton primary onClick={openModal}>
                                    <FaUserPlus fontSize={"1rem"} /> Add
                                </ActionButton>
                            </ButtonGroup>
                        </Box>

                    </ActionBar>
                    <CustomTable columns={columns} data={filteredData} onSelectRow={handleSelect} />
                </Container>


            </Layout>

        </>
    );
}

const customStyles = {
    content: {
        top: '0',
        right: '0',
        position: 'fixed',
        background: 'rgb(255, 255, 255)',
        borderRadius: '4px',
        outline: 'none',
        width: '25rem',
        overflow: 'hidden',
        zIndex: 1000,
        opacity: 1, // Ensure it shows after opening
        transition: 'opacity 0.3s ease-in-out',
        padding: 0
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};


const CustomModalContent = styled.div`
  &.ReactModal__Content {
    position: absolute;
    background: rgb(255, 255, 255);
    border-radius: 4px;
    outline: none;
     width: 25rem,
     height: 100%;
    right: 0%;
    padding : 0;

  }

  &.ReactModal__Content--after-open {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Container = styled.div`
  padding: 27px;
  max-width: 100%;
  margin: 0 auto;
`;

const Header = styled.h1`
  width: 100%;
  height: 41px;
  top: 46px;
  left: 27px;
  font-weight: bold;
  font-size: 2rem;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 5px solid #ddd;
`;

const TabButton = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  color: black;
  border: none;
  border-bottom: ${(props) => (props.active ? '5px solid #000' : 'none')};
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: ${(props) => (props.active ? '-5px' : '0')};
`;

// Search bar and button actions
const ActionBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 20px;
  padding: 10px 0;
  &.div {
    width: 100%;
    display: flex;
    tex-wrap: nowrap;
  }
`;

const Box = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    align-content: center;
`;

const SearchInput = styled.input`
  width: 200px;
   padding: 7px 10px 7px 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 12px;
     font-weight: medium;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
display: flex;
  padding: 7px 10px 7px 10px;
  gap: 5px;
  border-radius: 3px 0px 0px 0px;
  opacity: 0px;
   font-size: 12px;
   font-weight: medium;
   justify-content: center;
   align-items: center;
  border: ${(props) => (props.primary ? 'none' : '1px solid #000')};
  background-color: ${(props) => (props.primary ? '#000' : '#F0F0F0')};
  color: ${(props) => (props.primary ? '#fff' : '#000')};
 border: none;
  &:hover {
    background-color: ${(props) => (props.primary ? '#333' : '#f5f5f5')};
  }
`;

const Tab = styled.button`
  height: 30px;
  padding: 7px 14px 7px 14px;
  text-wrap: nowrap;
  gap: 15px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 50px;
  margin-right: 10px;
  background: ${(props) => (props.active ? '#000' : '#F0F0F0')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  border: none;
  cursor: pointer;
`;
