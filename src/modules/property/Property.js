import PageHeading from "../../components/pageheading/PageHeading";
import Table from "../../components/table/Table";
import PropertyMessage from "../../helper/message/PropertyMessage";

const Property = () => {
  const {title} = PropertyMessage;
  const header = ['Name', 'Age', 'Email'];
  const rows = [
    {name: 'nikita', age: 13, email:'nikita@fxbytes.com'},
    {name: 'nikita', age: 13, email:'nikita@fxbytes.com'}
  ];
  return (
  <>
    <PageHeading heading='Properties'/>
    <Table heading={title} header={header} rowData={rows} path='properties'/>
  </>
 
  )
}
export default Property;
