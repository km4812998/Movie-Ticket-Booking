import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { GetAllTheatres, UpdateTheatre } from '../../apicalls/theatres';

function TheatresList() {
    const [theatres = [], setTheatres] = useState([]);

    const getData = async () => {
        try {
            const response = await GetAllTheatres();
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

    const handleStateChange = async(theatre) => {
        try {
            const response = await UpdateTheatre({
                theatreId: theatre._id,
                ...theatre,
                isActive:!theatre.isActive,
            });
            if (response.success) {
                message.success(response.message)
                getData();
            }
            else {
                message.error(response.message)
            }
        }
        catch (error) {
            message.error(error.message)
        }
    };

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
            title:'owner',
            dataIndex: 'owner',
            render: (text, record) => {
                return record.owner.name;
            }
        },
        {
            title: 'status',
            dataIndex: 'isActive',
            render: (text, record) => {
                if (text) {
                    return "Approved"
                }
                else {
                    return "Pending / Blocked"
                }
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return( <div className="flex gap-1">
                    {record.isActive && <span className="underline"
                    onClick={()=>{
                        handleStateChange(record);
                    }}
                    >Block</span>}
                    {!record.isActive && <span className="underline"
                    onClick={()=>{
                        handleStateChange(record);
                    }}
                    >Approve</span>}
                </div>
                );
            }
        }
    ]

    useEffect(() => {
        getData()
    })

    return (
        <div>
            <Table columns={columns} dataSource={theatres} />
        </div>
    )
}

export default TheatresList;