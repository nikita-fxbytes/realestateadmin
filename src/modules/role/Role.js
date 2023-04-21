import React from 'react'
import CommonMessage from '../../helper/message/CommonMessage';
import PageHeading from '../../components/pageheading/PageHeading';
import Table from '../../components/table/Table';
const Role = () => {
  const {name, created_at, action, role} = CommonMessage;
  const header = [name, created_at, action];
  const rows = [
    {name: 'nikita', age: 13, email:'nikita@fxbytes.com'},
    {name: 'nikita', age: 13, email:'nikita@fxbytes.com'}
  ];
  return (
  <>
    <PageHeading heading={role}/>
    <Table heading={role} header={header} rowData={rows} path='roles'/>
  </>
  )
}

export default Role;

