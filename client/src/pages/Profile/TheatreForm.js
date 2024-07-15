import { Form, Modal, message } from 'antd';
// import FormItem from 'antd/es/form/FormItem';
// import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import Button from '../../components/Button'
import { AddTheatre, UpdateTheatre } from '../../apicalls/theatres';
import { useSelector } from 'react-redux';

function TheatreForm({
    showTheatreFormModal,
    setShowTheatreFormModal,
    formType,
    setFormType,
    selectedTheatre,
    setSelectedTheatre,
    getData,
    }
){
    const {user} =useSelector(state =>state.users)
    const onFinish =async(values) => {
        values.owner=user._id
        try {
            let response =null;
            if(formType === "add"){
                response = await AddTheatre(values)
            }
            else{
                values.theatreId=selectedTheatre._id;
                response = await UpdateTheatre(values)
            }

            if(response.success){
                message.success(response.message);
                setShowTheatreFormModal(false);
                setSelectedTheatre(null);
                getData();
            }
            else{
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return(
        <Modal
        title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
        open={showTheatreFormModal}
        onCancel={() => {
          setShowTheatreFormModal(false);
          setSelectedTheatre(null);
        }}
        footer={null}
      >

        <Form
        layout='vertical'
        onFinish={onFinish}
        initialValues={selectedTheatre}
        >

            <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the name of the theatre' }]}
            >
                <input type='text'/> 
            </Form.Item>

            <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter the address of the Theatre'}]}
            >
                <textarea type='text'/>
            </Form.Item>

            
            <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Please enter the phone number of the Theatre'}]}
            >
                <input type='text'/>
            </Form.Item>

            <Form.Item 
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter the email of the Theatre'}]}
            >
                <input type='text'/>
            </Form.Item>
            <div className='flex justify-end gap-1'>
                    <Button title="Cancel" typt='button'
                    onClick={()=>{
                        setShowTheatreFormModal(false);
                        setSelectedTheatre(null); 
                    }}
                    />
                    <Button title="Save" type='submit'/>
                </div>
            
        </Form>
        </Modal>
    )
}

export default TheatreForm;