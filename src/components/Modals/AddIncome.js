import React from 'react'
import { Modal, Button, Form, Input, DatePicker, Select } from 'antd';

function AddIncome({
    handleIncomeCancel,
    isIncomeModalVisible,
    onFinish,
}) {
    const [form] = Form.useForm();

    return (
        <Modal
            style={{fontWeight: 600}}
            title= "Add Income" 
            open={isIncomeModalVisible}
            onCancel={handleIncomeCancel}  
            footer= {null}    
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={(values) => {
                    onFinish(values, "income");
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
                            message:'Please input the source of income!',
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
                            message:'Please input the net salary from this income!',
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
                            message:'Please input the date of this income!',
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
                        <Select.Option value="Salary">Salary</Select.Option>
                        <Select.Option value="Freelance">Freelance</Select.Option>
                        <Select.Option value="Investment">Investment</Select.Option>        
                    </Select> 
                </Form.Item>

                <Button type='primary' htmlType='submit'>AddExpense</Button>
            </Form>

        </Modal>
    )
}

export default AddIncome
