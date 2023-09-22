import React from 'react';
import { Modal, Button, Form, Input, DatePicker, Select } from 'antd';

function AddExpense({
    handleExpenseCancel,
    isExpenseModalVisible,
    onFinish,
}) {
    const [form] = Form.useForm();

    return (
        <Modal
            style={{fontWeight: 600}}
            title= "Add Expense" 
            open={isExpenseModalVisible}
            onCancel={handleExpenseCancel}  
            footer = {null}      
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={(values) => {
                    onFinish(values, "expense");
                    form.resetFields();
                }}
            >
                <Form.Item 
                    style={{fontWeight: 600}}
                    label = "Name"
                    name= "name"
                    rules={[
                        {
                            required : true ,
                            message:'Please enter the name of the transaction!',
                        },
                    ]}
                >
                    <Input type='text' className='custom-input' />
                </Form.Item>

                <Form.Item 
                    style={{fontWeight: 600}}
                    label = "Amount"
                    name= "amount"
                    rules={[
                        {
                            required : true ,
                            message:'Please enter the expense amount!',
                        },
                    ]}
                >
                    <Input type='number' className='custom-input' />
                </Form.Item>

                <Form.Item 
                    style={{fontWeight: 600}}
                    label = "Date"
                    name= "date"
                    rules={[
                        {
                            required : true ,
                            message:'Please enter the expense date!',
                        },
                    ]}
                >
                    <DatePicker className='custom-input' format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item 
                    style={{fontWeight: 600}}
                    label = "Tag"
                    name= "tag"
                    rules={[
                        {
                            required : true ,
                            message:'Please select a tag!',
                        },
                    ]}
                >
                    <Select className='select-input-2'>
                        <Select.Option value="Bills">Bills</Select.Option>
                        <Select.Option value="Clothings">Clothings</Select.Option>
                        <Select.Option value="Education">Education</Select.Option>
                        <Select.Option value="Food">Food</Select.Option>
                        <Select.Option value="Office">Office</Select.Option>        
                    </Select> 
                </Form.Item>

                <Button type='primary' htmlType='submit'>AddExpense</Button>
            </Form>

        </Modal>
    )
}

export default AddExpense
