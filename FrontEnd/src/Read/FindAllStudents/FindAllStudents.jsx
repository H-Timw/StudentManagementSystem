/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import './FindAllStudents.css'
import {
  Space,
  Form,
  Input,
  InputNumber,
  Typography,
  Button,
} from "antd";
import { UserOutlined, CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import axios from "axios";
const { Title } = Typography;

export default function FindAllStudents() {
  const [studentsDB, setStudentsDB] = useState(null);
  const [students, setStudents] = useState(null);
  const [IdDesc, setIdSort] = useState(true);
  const [phoneDesc, setPhoneSort] = useState(true);
  const [nameDesc, setNameSort] = useState(true);
  const [classDesc, setClassSort] = useState(true);
  const [genderDesc, setGenderSort] = useState(true);
  //first load studetns from database
  useEffect(()=>{
    getAllStudents();
  },[])
  // when database changes, update students
  useEffect(()=>{
    setStudents(studentsDB);
  },[studentsDB])
  // get data
  const getAllStudents = function () {
    axios.get("http://localhost:8090/api/v1/Students/all")
    .then(response => {
      setStudentsDB(response.data);
    })
    .catch(error => {
      window.alert(error.message);
    });
  };

  //sort table
  const sortByID = () => {
    if(IdDesc) setStudents(students.sort((a, b) => b.idNumber - a.idNumber));
    else setStudents(students.sort((a, b) => a.idNumber - b.idNumber));
    setIdSort(!IdDesc);
  }
  const sortByPhone = () => {
    if(phoneDesc) setStudents(students.sort((a, b) => a.contactNumber - b.contactNumber));
    else setStudents(students.sort((a, b) => b.contactNumber - a.contactNumber));
    setPhoneSort(!phoneDesc);
  }
  const sortByName = () => {
    if(nameDesc) setStudents(students.sort((a, b) =>
    {
      if ( a.nameStudent < b.nameStudent ){
        return -1;
      }
      if ( a.nameStudent > b.nameStudent ){
        return 1;
      }
      return 0;
    }
  ));
    else setStudents(students.sort((a, b) =>
    {
      if ( a.nameStudent < b.nameStudent ){
        return 1;
      }
      if ( a.nameStudent > b.nameStudent ){
        return -1;
      }
      return 0;
    }
  ));
    setNameSort(!nameDesc);
  }
  const sortByClass = () => {
    if(classDesc) setStudents(students.sort((a, b) =>
    {
      if ( a.classId < b.classId ){
        return -1;
      }
      if ( a.classId > b.classId ){
        return 1;
      }
      return 0;
    }
  ));
    else setStudents(students.sort((a, b) =>
    {
      if ( a.classId < b.classId ){
        return 1;
      }
      if ( a.classId > b.classId ){
        return -1;
      }
      return 0;
    }
  ));
  setClassSort(!classDesc);
  }
  const sortByGender = () => {
    if(genderDesc) setStudents(students.sort((a, b) =>
    {
      if ( a.genderStudent < b.genderStudent ){
        return -1;
      }
      if ( a.genderStudent > b.genderStudent ){
        return 1;
      }
      return 0;
    }
  ));
    else setStudents(students.sort((a, b) =>
    {
      if ( a.genderStudent < b.genderStudent ){
        return 1;
      }
      if ( a.genderStudent > b.genderStudent ){
        return -1;
      }
      return 0;
    }
  ));
    setGenderSort(!genderDesc);
  }
  const formItemLayout ={
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }
  return (
    <Space
      direction="vertical"
      align="center"
      style={{ width: "100%", height: "100%"}}
    >
      <Space direction="vertical" align="center">
        {students && <Form layout="vertical" style={{ maxWidth: 600 }} >
          <Space direction="horizontal">
            <Title level={4} style={{ margin: 20 }}>
              Search By ID
            </Title>
            <InputNumber
              defaultValue={null}
              placeholder="Enter ID"
              onPressEnter={() => getAllStudents()}
              prefix={<UserOutlined />}
              min={0}
              max={students.length+1}
            />
          </Space>
        </Form>}
        <Button type="primary" onClick={() => getAllStudents()}>
          {students==null?"Show All Students":"Reload List"}
        </Button>
      </Space>
      <Space style={{ paddingBottom: 300 }}>
        {students && <Form
          {...formItemLayout}
          layout="horizontal">
          <Space>
              <Button type="text" onClick={sortByID} >ID{IdDesc?<CaretDownOutlined />:<CaretUpOutlined />}</Button>
              <Button type="text" onClick={sortByPhone} >Phone{phoneDesc?<CaretDownOutlined />:<CaretUpOutlined />}</Button>
              <Button type="text" onClick={sortByName} >Name{nameDesc?<CaretDownOutlined />:<CaretUpOutlined />}</Button>
              <Button type="text" onClick={sortByClass} >Class{classDesc?<CaretDownOutlined />:<CaretUpOutlined />}</Button>
              <Button type="text" onClick={sortByGender} >Gender{genderDesc?<CaretDownOutlined />:<CaretUpOutlined />}</Button>
          </Space>
          {students.map((student, index) => {
            return (
                <Form key={index} layout="inline">
                  <Input style={{width:'40px'}} defaultValue={student.idNumber} disabled/>
                  <InputNumber style={{width:'120px'}} defaultValue={student.contactNumber} disabled/>
                  <Input style={{width:'150px'}} defaultValue={student.nameStudent} />
                  <Input style={{width:'40px'}} defaultValue={student.classId}/>
                  <Input style={{width:'80px'}} defaultValue={student.genderStudent}/>
                  <button onClick={()=>{}}>Edit</button>
                </Form>
              )
          })}
          <tbody id="add"></tbody>
        </Form>}
      </Space>
    </Space>
  );
}
