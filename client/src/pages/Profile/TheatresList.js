import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
// import { useNavigate } from 'react-router-dom';
import TheatreForm from './TheatreForm';
import { Table, message } from 'antd';
import { DeleteTheatre, GetAllTheatresByOwner } from '../../apicalls/theatres';
import { useSelector } from 'react-redux';
import Shows from './Shows';

function TheatresList() {
    const { user } = useSelector(state => state.users);
    const [showTheatreFormModal = false, setShowTheatreFormModal] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [formType = "add", setFormType] = useState("add");
    const [theatres = [], setTheatres] = useState([]);

    const [openShowsModal=false, setOpenShowsModal] =useState(false);

    // const navigate = useNavigate();
    const getData = async () => {
        try {
            const response = await GetAllTheatresByOwner({
                owner: user._id
            })
            if (response.success) {
                setTheatres(response.data)
            }
            else {
                message.error(response.message)
            }
        }
        catch (error) {
            message.error(error.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await DeleteTheatre({
                theatreId: id
            })
            if (response.success) {
                message.success(response.message)
                getData()
            }
            else {
                message.error(response.message)
            }
        }
        catch (error) {
            message.error(error.message)
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'email',
            dataIndex: 'email',
        },
        {
            title: 'status',
            dataIndex:'isActive',
            render: (text, record) => {
                if(text){
                    return "Approved"
                }
                else{
                    return "Pending / Blocked"
                }
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return (
                <div className="flex gap-1 items-center">
                    <i className="ri-delete-bin-fill"
                        onClick={() => {
                            handleDelete(record._id);
                        }}
                    ></i>
                    <i className="ri-edit-2-fill"
                        onClick={() => {
                            setFormType("edit");
                            setSelectedTheatre(record);
                            setShowTheatreFormModal(true);
                        }}
                    ></i>

                    {record.isActive && <span className='underline'
                        onClick={()=>{
                            setSelectedTheatre(record);
                            setOpenShowsModal(true);
                        }}
                    >Shows</span>}
                </div>
                )
            }
        }
    ]

    useEffect(() => {
        getData()
    })

    return (
        <div>
            <div className="flex justify-end mb-1">
                <Button
                    title="Add Theatre"
                    onClick={() => {
                        setFormType("add");
                        setShowTheatreFormModal(true);
                    }}
                />
            </div>

            <Table columns={columns} dataSource={theatres} />




            {showTheatreFormModal && ( <TheatreForm
                showTheatreFormModal={showTheatreFormModal}
                setShowTheatreFormModal={setShowTheatreFormModal}
                formType={formType}
                setFormType={setFormType}
                selectedTheatre={selectedTheatre}
                setSelectedTheatre={setSelectedTheatre}
                getData={getData}
            />
            )}

            
            {openShowsModal && ( <Shows
                openShowsModal={openShowsModal}
                setOpenShowsModal={setOpenShowsModal}
                theatre={selectedTheatre}
            />
            )}
        </div>
    )
}

export default TheatresList;